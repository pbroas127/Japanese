import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { buildQuiz, PASS_THRESHOLD, XP_LESSON_CLEAR, XP_PER_CORRECT } from '../data/gameData'
import { useTransientState } from '../state/useTransientState'
import KikoCharacter from './KikoCharacter'
import QuizCard from './QuizCard'
import ResultPanel from './ResultPanel'
import ProgressHUD from './ProgressHUD'

// ──────────────────────────────────────────────────────────────────────────
//  LessonScreen — intro (kana + examples) → quiz → result.
//  Pass = score ≥ PASS_THRESHOLD → unlock + XP + streak. Fail = streak reset.
// ──────────────────────────────────────────────────────────────────────────
export default function LessonScreen({ node, lesson, xp, streak, onPass, onFail, onExit }) {
  const quiz = useMemo(() => buildQuiz(lesson), [lesson])
  const total = quiz.length

  const [phase, setPhase] = useState('intro') // intro | quiz | result
  const [qIndex, setQIndex] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [locked, setLocked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [result, setResult] = useState(null)
  const [kikoState, playKiko] = useTransientState('idle')

  const question = quiz[qIndex]

  const finish = (finalCorrect) => {
    const pass = finalCorrect / total >= PASS_THRESHOLD
    if (pass) onPass(node, finalCorrect, total)
    else onFail(node)
    setResult({
      pass,
      correct: finalCorrect,
      total,
      xpGained: pass ? XP_LESSON_CLEAR + finalCorrect * XP_PER_CORRECT : 0,
      streak: pass ? streak + 1 : 0,
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

  return (
    <div className="screen lesson" style={{ '--accent': lesson.accent }}>
      <ProgressHUD xp={xp} streak={streak} />

      <button className="lesson__back" onClick={onExit} aria-label="Back to map">
        ‹ Map
      </button>

      <AnimatePresence mode="wait">
        {/* ── INTRO ── */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
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

            <div className="examples">
              <h3 className="examples__heading">Words you can read</h3>
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

            <motion.button
              className="btn btn--primary"
              onClick={() => setPhase('quiz')}
              whileTap={{ scale: 0.95 }}
            >
              Start Quiz →
            </motion.button>
          </motion.div>
        )}

        {/* ── QUIZ ── */}
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
