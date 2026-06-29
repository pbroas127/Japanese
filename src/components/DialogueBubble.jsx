import { AnimatePresence, motion } from 'framer-motion'

// ──────────────────────────────────────────────────────────────────────────
//  DialogueBubble — Kiko's contextual speech bubble. Sits above Kiko in the
//  world and re-animates whenever the line changes.
// ──────────────────────────────────────────────────────────────────────────
export default function DialogueBubble({ text, side = 'up' }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        className={`bubble bubble--${side}`}
        initial={{ opacity: 0, y: 8, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      >
        {text}
        <span className="bubble__tail" />
      </motion.div>
    </AnimatePresence>
  )
}
