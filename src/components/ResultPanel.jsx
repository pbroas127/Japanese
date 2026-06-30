import { motion } from 'framer-motion'
import KikoCharacter from './KikoCharacter'
import Icon from './Icon'

// ──────────────────────────────────────────────────────────────────────────
//  ResultPanel — shown after a lesson (and after the boss).
//  Kiko reacts: happy on a pass, sad on a fail.
// ──────────────────────────────────────────────────────────────────────────
export default function ResultPanel({
  pass,
  correct,
  total,
  xpGained,
  petalsGained = 0,
  streak,
  onContinue,
  onRetry,
  continueLabel = 'Back to map',
}) {
  return (
    <motion.div
      className="result-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`result-panel ${pass ? 'is-pass' : 'is-fail'}`}
        initial={{ scale: 0.7, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      >
        <KikoCharacter state={pass ? 'happy' : 'sad'} size={150} shadow={false} />

        <h2 className="result-panel__title">{pass ? 'Lesson Cleared!' : 'Not Quite…'}</h2>
        <p className="result-panel__sub">
          {pass
            ? 'Kiko learned new kana and grew stronger!'
            : 'The kana slipped away. Give it another try!'}
        </p>

        <div className="result-panel__stats">
          <div className="result-stat">
            <span className="result-stat__value">
              {correct}/{total}
            </span>
            <span className="result-stat__label">Correct</span>
          </div>
          <div className="result-stat">
            <span className="result-stat__value">+{xpGained}</span>
            <span className="result-stat__label">XP</span>
          </div>
          {petalsGained > 0 && (
            <motion.div
              className="result-stat"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 240, damping: 16, delay: 0.3 }}
            >
              <span className="result-stat__value result-stat__value--petals">
                +{petalsGained} <Icon name="petal" size={15} />
              </span>
              <span className="result-stat__label">Petals</span>
            </motion.div>
          )}
          <div className="result-stat">
            <span className="result-stat__value result-stat__value--streak">
              {streak} <Icon name="flame" size={16} />
            </span>
            <span className="result-stat__label">Day streak</span>
          </div>
        </div>

        <div className="result-panel__actions">
          {!pass && onRetry && (
            <motion.button className="btn btn--primary" onClick={onRetry} whileTap={{ scale: 0.95 }}>
              Try again
            </motion.button>
          )}
          <motion.button
            className={`btn ${pass || !onRetry ? 'btn--primary' : 'btn--ghost'}`}
            onClick={onContinue}
            whileTap={{ scale: 0.95 }}
          >
            {pass ? continueLabel : 'Return to map'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
