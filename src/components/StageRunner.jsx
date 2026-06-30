import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTransientState } from '../state/useTransientState'
import KikoCharacter from './KikoCharacter'
import QuizCard from './QuizCard'

// ──────────────────────────────────────────────────────────────────────────
//  StageRunner — runs an ordered list of lesson "steps" (study cards +
//  multiple-choice items) with a progress bar and Kiko reactions, then reports
//  the score. Reused by every stage (Learn / Use / Quiz) and by Practice.
// ──────────────────────────────────────────────────────────────────────────

function StudyCard({ step, onNext }) {
  return (
    <motion.div
      className="flash"
      key={step.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
    >
      <p className="flash__hint">{step.word ? 'New word — read it aloud' : 'New kana — say it aloud'}</p>
      <div className={`flash__card ${step.word ? 'is-word' : ''}`}>
        <span className="flash__char">{step.char}</span>
        <span className="flash__romaji">{step.romaji}</span>
        {step.tip && <span className="flash__tip">{step.tip}</span>}
      </div>
      <motion.button className="btn btn--primary" onClick={onNext} whileTap={{ scale: 0.95 }}>
        Got it →
      </motion.button>
    </motion.div>
  )
}

export default function StageRunner({ steps, streak = 0, onDone, onReview }) {
  const gradedTotal = useMemo(() => steps.filter((s) => s.type === 'choice').length, [steps])
  const [i, setI] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [locked, setLocked] = useState(false)
  const correctRef = useRef(0)
  const [kikoState, playKiko] = useTransientState('idle')

  const step = steps[i]

  const advance = () => {
    if (i + 1 < steps.length) {
      setI(i + 1)
      setChosen(null)
      setLocked(false)
    } else {
      onDone({ correct: correctRef.current, total: gradedTotal })
    }
  }

  const handleAnswer = (opt) => {
    if (locked) return
    setChosen(opt)
    setLocked(true)
    const ok = opt === step.answer
    if (ok) correctRef.current += 1
    if (step.item) onReview?.(step.item, ok)
    playKiko(ok ? (streak >= 3 ? 'excited' : 'happy') : 'sad', 900)
    setTimeout(advance, 1050)
  }

  return (
    <div className="stage-run">
      <div className="stage-run__bar">
        <motion.div
          className="stage-run__bar-fill"
          animate={{ width: `${(i / steps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <KikoCharacter state={kikoState} size={104} />

      <AnimatePresence mode="wait">
        {step.type === 'flash' ? (
          <StudyCard key={step.id} step={step} onNext={advance} />
        ) : (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            style={{ width: '100%' }}
          >
            <QuizCard question={step} chosen={chosen} locked={locked} onAnswer={handleAnswer} hint={step.hint} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
