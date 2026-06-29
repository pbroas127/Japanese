import { motion } from 'framer-motion'

// ──────────────────────────────────────────────────────────────────────────
//  QuizCard — shows one kana prompt and four romaji choices.
//  After an answer, the chosen + correct options are highlighted, then the
//  parent advances. `locked` prevents double-answering during feedback.
// ──────────────────────────────────────────────────────────────────────────
export default function QuizCard({ question, chosen, locked, onAnswer, prompt = 'kana' }) {
  return (
    <div className="quiz">
      <p className="quiz__hint">{prompt === 'kana' ? 'Which sound is this?' : 'Pick the kana'}</p>

      <motion.div
        className="quiz__prompt"
        key={question.id}
        initial={{ scale: 0.6, opacity: 0, rotate: -6 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16 }}
      >
        {question.prompt}
      </motion.div>

      <div className="quiz__options">
        {question.options.map((opt) => {
          const isChosen = chosen === opt
          const isAnswer = question.answer === opt
          let cls = 'quiz__option'
          if (locked && isAnswer) cls += ' is-correct'
          else if (locked && isChosen && !isAnswer) cls += ' is-wrong'
          else if (locked) cls += ' is-dim'

          return (
            <motion.button
              key={opt}
              className={cls}
              disabled={locked}
              onClick={() => onAnswer(opt)}
              whileTap={{ scale: 0.94 }}
              whileHover={locked ? {} : { y: -3 }}
            >
              {opt}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
