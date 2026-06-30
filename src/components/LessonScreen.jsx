import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  buildLearnSteps,
  buildUseSteps,
  buildQuizSteps,
  PASS_THRESHOLD,
  XP_LESSON_CLEAR,
  XP_PER_CORRECT,
} from '../data/gameData'
import KikoCharacter from './KikoCharacter'
import ResultPanel from './ResultPanel'
import StageRunner from './StageRunner'
import StageDots from './StageDots'
import TopHUD from './TopHUD'

// ──────────────────────────────────────────────────────────────────────────
//  LessonScreen — a 3-stage level, each stage a full interactive mini-lesson:
//    1 · Learn — study cards + recognise the sound
//    2 · Use   — study real words + match words ↔ meanings
//    3 · Quiz  — graded mix of everything; ≥ PASS_THRESHOLD clears the level
//
//  Each stage ends on a completion screen → Next stage or Back to map. Stages
//  bank the moment you finish them, so leaving keeps your dots. Failing the
//  quiz offers Try again / Return to map and leaves the level at 2/3.
// ──────────────────────────────────────────────────────────────────────────
const bodyMotion = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
}
const STAGE_LABELS = ['Learn', 'Use', 'Quiz']

export default function LessonScreen({
  node,
  lesson,
  xp,
  streak,
  petals,
  stagesDone = 0,
  streakActiveToday = false,
  onStage,
  onReview,
  onPass,
  onFail,
  onExit,
}) {
  const learnSteps = useMemo(() => buildLearnSteps(lesson), [lesson])
  const useSteps = useMemo(() => buildUseSteps(lesson), [lesson])
  const [quizKey, setQuizKey] = useState(0)
  const quizSteps = useMemo(() => buildQuizSteps(lesson), [lesson, quizKey])

  // Resume at the first unfinished stage.
  const startPhase = stagesDone >= 2 ? 'quiz' : stagesDone === 1 ? 'use' : 'learn'
  const [phase, setPhase] = useState(startPhase) // learn | use | quiz | stageDone | result
  const [banked, setBanked] = useState(stagesDone)
  const [inter, setInter] = useState(null) // stage-complete interstitial payload
  const [result, setResult] = useState(null)

  const headerStage = phase === 'use' ? 2 : phase === 'quiz' ? 3 : 1

  const finishLearn = (score) => {
    onStage?.(node.id, 1)
    setBanked((b) => Math.max(b, 1))
    setInter({ title: 'Stage 1 complete', sub: 'You met the kana', score, next: 'use', nextLabel: 'Next: Use →' })
    setPhase('stageDone')
  }

  const finishUse = (score) => {
    onStage?.(node.id, 2)
    setBanked((b) => Math.max(b, 2))
    setInter({ title: 'Stage 2 complete', sub: 'You used them in words', score, next: 'quiz', nextLabel: 'Start Quiz →' })
    setPhase('stageDone')
  }

  const finishQuiz = ({ correct, total }) => {
    const pass = total ? correct / total >= PASS_THRESHOLD : true
    if (pass) onPass(node, correct, total)
    else onFail(node, correct, total)
    // The streak only advances on the first level cleared each day.
    setResult({
      pass,
      correct,
      total,
      xpGained: pass ? XP_LESSON_CLEAR + correct * XP_PER_CORRECT : 0,
      streak: pass && !streakActiveToday ? streak + 1 : streak,
    })
    setPhase('result')
  }

  const retryQuiz = () => {
    setResult(null)
    setQuizKey((k) => k + 1)
    setPhase('quiz')
  }

  return (
    <div className="screen lesson" style={{ '--accent': lesson.accent }}>
      <TopHUD xp={xp} streak={streak} petals={petals} compact />

      <button className="lesson__back" onClick={onExit} aria-label="Back to map">
        ‹ Map
      </button>

      {phase !== 'result' && (
        <div className="lesson__stages">
          <StageDots done={banked} className="lesson__stages-dots" />
          <span className="lesson__stages-label">
            {phase === 'stageDone'
              ? `${banked} of 3 stages done`
              : `Stage ${headerStage} of 3 · ${STAGE_LABELS[headerStage - 1]}`}
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* ── STAGE 1 · LEARN ── */}
        {phase === 'learn' && (
          <motion.div key="learn" className="lesson__stage-body" {...bodyMotion}>
            <h2 className="lesson__title">{lesson.title}</h2>
            <p className="lesson__subtitle">{lesson.subtitle}</p>
            <StageRunner steps={learnSteps} streak={streak} onReview={onReview} onDone={finishLearn} />
          </motion.div>
        )}

        {/* ── STAGE 2 · USE ── */}
        {phase === 'use' && (
          <motion.div key="use" className="lesson__stage-body" {...bodyMotion}>
            <h2 className="lesson__title">Use it in words</h2>
            <p className="lesson__subtitle">Your new kana inside real words</p>
            <StageRunner steps={useSteps} streak={streak} onReview={onReview} onDone={finishUse} />
          </motion.div>
        )}

        {/* ── STAGE 3 · QUIZ ── */}
        {phase === 'quiz' && (
          <motion.div key={`quiz-${quizKey}`} className="lesson__stage-body" {...bodyMotion}>
            <h2 className="lesson__title">Quiz</h2>
            <p className="lesson__subtitle">Everything you just learned</p>
            <StageRunner steps={quizSteps} streak={streak} onReview={onReview} onDone={finishQuiz} />
          </motion.div>
        )}

        {/* ── STAGE COMPLETE (Learn / Use) ── */}
        {phase === 'stageDone' && inter && (
          <motion.div key="stageDone" className="stage-done" {...bodyMotion}>
            <KikoCharacter state="excited" size={150} shadow={false} />
            <h2 className="stage-done__title">{inter.title}</h2>
            <p className="stage-done__sub">{inter.sub}</p>
            {inter.score && inter.score.total > 0 && (
              <p className="stage-done__score">
                {inter.score.correct} / {inter.score.total} correct
              </p>
            )}
            <StageDots done={banked} className="stage-done__dots" />
            <div className="stage-done__actions">
              <motion.button className="btn btn--primary" onClick={() => setPhase(inter.next)} whileTap={{ scale: 0.95 }}>
                {inter.nextLabel}
              </motion.button>
              <button className="btn btn--ghost btn--sm" onClick={onExit}>
                Back to map
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── RESULT (quiz) ── */}
      <AnimatePresence>
        {phase === 'result' && result && (
          <ResultPanel
            pass={result.pass}
            correct={result.correct}
            total={result.total}
            xpGained={result.xpGained}
            streak={result.streak}
            onContinue={onExit}
            onRetry={result.pass ? null : retryQuiz}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
