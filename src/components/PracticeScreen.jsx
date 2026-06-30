import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { buildPracticeQuestions } from '../data/gameData'
import { useTransientState } from '../state/useTransientState'
import KikoCharacter from './KikoCharacter'
import QuizCard from './QuizCard'

// ──────────────────────────────────────────────────────────────────────────
//  PracticeScreen — endless free drill over the kana you've mastered.
//  No node progression; just reps and instant feedback from Kiko.
// ──────────────────────────────────────────────────────────────────────────
export default function PracticeScreen({ masteredChars }) {
  const [round, setRound] = useState(0)
  const questions = useMemo(() => buildPracticeQuestions(masteredChars, 10), [masteredChars, round])
  const total = questions.length

  const [qIndex, setQIndex] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [locked, setLocked] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)
  const [kikoState, playKiko] = useTransientState('idle')

  const restart = () => {
    setRound((r) => r + 1)
    setQIndex(0)
    setChosen(null)
    setLocked(false)
    setCorrect(0)
    setDone(false)
  }

  const handleAnswer = (opt) => {
    if (locked) return
    setChosen(opt)
    setLocked(true)
    const isCorrect = opt === questions[qIndex].answer
    if (isCorrect) setCorrect((c) => c + 1)
    playKiko(isCorrect ? 'happy' : 'sad', 900)
    setTimeout(() => {
      if (qIndex + 1 < total) {
        setQIndex((i) => i + 1)
        setChosen(null)
        setLocked(false)
      } else {
        setDone(true)
      }
    }, 1050)
  }

  return (
    <div className="page practice-page">
      <h2 className="page__title">Practice</h2>
      <p className="page__sub">Free drill · {masteredChars.length > 0 ? 'your mastered kana' : 'starter kana'}</p>

      <KikoCharacter state={kikoState} size={120} />

      {!done ? (
        <>
          <div className="practice-meter">
            {qIndex + 1} / {total} · {correct} correct
          </div>
          <QuizCard question={questions[qIndex]} chosen={chosen} locked={locked} onAnswer={handleAnswer} />
        </>
      ) : (
        <motion.div
          className="practice-summary"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <p className="practice-summary__score">
            {correct} / {total}
          </p>
          <p className="practice-summary__label">
            {correct === total ? 'Perfect run!' : 'Nice drilling — keep going!'}
          </p>
          <button className="btn btn--primary" onClick={restart}>
            New Set →
          </button>
        </motion.div>
      )}
    </div>
  )
}
