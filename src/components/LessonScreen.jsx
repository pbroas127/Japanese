import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { buildQuiz, PASS_THRESHOLD, XP_LESSON_CLEAR, XP_PER_CORRECT } from '../data/gameData'
import { useTransientState } from '../state/useTransientState'
import KikoCharacter from './KikoCharacter'
import QuizCard from './QuizCard'
import ResultPanel from './ResultPanel'
import StageDots from './StageDots'
import TopHUD from './TopHUD'

// ──────────────────────────────────────────────────────────────────────────
//  LessonScreen — a 3-stage level:
//    1 · Learn  — meet the kana (no scoring)
//    2 · Use    — see them inside real words (no scoring)
//    3 · Quiz   — graded recall; ≥ PASS_THRESHOLD clears the level
//
//  Stages 1 & 2 are banked the moment you advance past them, so leaving before
//  the quiz keeps your dots filled (2/3) and re-entering resumes at the quiz.
//  Failing the quiz leaves the level at 2/3 — the node keeps flashing.
// ──────────────────────────────────────────────────────────────────────────
const STAGE_LABELS = ['Learn', 'Use', 'Quiz']

export default function LessonScreen({
  node,
  lesson,
  xp,
  streak,
  petals,
  stagesDone = 0,
  onStage,
  onPass,
  onFail,
  onExit,
}) {
  const quiz = useMemo(() => buildQuiz(lesson), [lesson])
  const total = quiz.length

  // Resume at the first unfinished stage.
  const startPhase = stagesDone >= 2 ? 'quiz' : stagesDone === 1 ? 'use' : 'learn'
  const [phase, setPhase] = useState(startPhase) // learn | use | quiz | result
  const [banked, setBanked] = useState(stagesDone) // live dot count for the header

  const [qIndex, setQIndex] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [locked, setLocked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [result, setResult] = useState(null)
  const [kikoState, playKiko] = useTransientState('idle')

  const question = quiz[qIndex]

  // Bank a non-quiz stage (1 = Learn, 2 = Use) and move on.
  const advance = (stage, nextPhase) => {
    onStage?.(node, stage)
    setBanked((b) => Math.max(b, stage))
    setPhase(nextPhase)
  }

  const finish = (finalCorrect) => {
    const pass = finalCorrect / total >= PASS_THRESHOLD
    if (pass) onPass(node, finalCorrect, total)
    else onFail(node, finalCorrect, total)
    setResult({
      pass,
      correct: finalCorrect,
      total,
      xpGained: pass ? XP_LESSON_CLEAR + finalCorrect * XP_PER_CORRECT : 0,
      streak: pass ? streak + 1 : streak,
    })
    setPhase('result')
  }

  const handleAnswer = (opt) => {
    if (locked) return
    setChosen(opt)
    setLocked(true)
    const isCorrect = opt === question.answer
    const newCorrect = correctCount + (isCorrect ? 1 : 0)
    setCorrectCount(newCorrect)
    playKiko(isCorrect ? (streak >= 3 ? 'excited' : 'happy') : 'sad', 950)

    setTimeout(() => {
      if (qIndex + 1 < total) {
        setQIndex((i) => i + 1)
        setChosen(null)
        setLocked(false)
      } else {
        finish(newCorrect)
      }
    }, 1150)
  }

  const stageIndex = phase === 'use' ? 1 : phase === 'quiz' ? 2 : 0

  return (
    <div className="screen lesson" style={{ '--accent': lesson.accent }}>
      <TopHUD xp={xp} streak={streak} petals={petals} compact />

      <button className="lesson__back" onClick={onExit} aria-label="Back to map">
        ‹ Map
      </button>

      {/* Stage header — shows where you are + banked dots */}
      {phase !== 'result' && (
        <div className="lesson__stages">
          <StageDots done={banked} className="lesson__stages-dots" />
          <span className="lesson__stages-label">
            Stage {stageIndex + 1} of 3 · {STAGE_LABELS[stageIndex]}
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* ── STAGE 1 · LEARN ── */}
        {phase === 'learn' && (
          <motion.div
            key="learn"
            className="lesson__intro"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
          >
            <h2 className="lesson__title">{lesson.title}</h2>
            <p className="lesson__subtitle">{lesson.subtitle}</p>

            <div className="kana-grid">
              {lesson.kana.map((k, i) => (
                <motion.div
                  className="kana-chip"
                  key={k.char}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.05 * i, type: 'spring', stiffness: 240, damping: 16 }}
                >
                  <span className="kana-chip__char">{k.char}</span>
                  <span className="kana-chip__romaji">{k.romaji}</span>
                </motion.div>
              ))}
            </div>

            <div className="lesson__kiko">
              <KikoCharacter state={kikoState} size={120} />
            </div>

            <motion.button className="btn btn--primary" onClick={() => advance(1, 'use')} whileTap={{ scale: 0.95 }}>
              Next: Use →
            </motion.button>
          </motion.div>
        )}

        {/* ── STAGE 2 · USE ── */}
        {phase === 'use' && (
          <motion.div
            key="use"
            className="lesson__intro"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
          >
            <h2 className="lesson__title">Use it in words</h2>
            <p className="lesson__subtitle">See your new kana inside real words</p>

            <div className="examples">
              {lesson.examples.map((ex) => (
                <div className="example-row" key={ex.kana}>
                  <span className="example-row__kana">{ex.kana}</span>
                  <span className="example-row__romaji">{ex.romaji}</span>
                  <span className="example-row__meaning">{ex.meaning}</span>
                </div>
              ))}
            </div>

            <div className="lesson__kiko">
              <KikoCharacter state={kikoState} size={120} />
            </div>

            <motion.button className="btn btn--primary" onClick={() => advance(2, 'quiz')} whileTap={{ scale: 0.95 }}>
              Start Quiz →
            </motion.button>
          </motion.div>
        )}

        {/* ── STAGE 3 · QUIZ ── */}
        {phase === 'quiz' && (
          <motion.div
            key="quiz"
            className="lesson__quiz"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
          >
            <div className="lesson__progress">
              {quiz.map((q, i) => (
                <span
                  key={q.id}
                  className={`pip ${i < qIndex ? 'is-done' : ''} ${i === qIndex ? 'is-active' : ''}`}
                />
              ))}
            </div>

            <KikoCharacter state={kikoState} size={120} />

            <QuizCard question={question} chosen={chosen} locked={locked} onAnswer={handleAnswer} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── RESULT ── */}
      <AnimatePresence>
        {phase === 'result' && result && (
          <ResultPanel
            pass={result.pass}
            correct={result.correct}
            total={result.total}
            xpGained={result.xpGained}
            streak={result.streak}
            onContinue={onExit}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
