import { motion } from 'framer-motion'
import { NODE_ASSETS, NODE_FALLBACK } from '../assets/assetMap'

// ──────────────────────────────────────────────────────────────────────────
//  LessonNode — a themed place embedded in the world (book / study / scroll /
//  lantern / altar / torii). The marker itself communicates the node's
//  function. Locked nodes use a distinct "sealed" asset (not a lock overlay);
//  completed nodes get a wooden ✅ badge; the current node glows, pulses and
//  shows a small info panel.
// ──────────────────────────────────────────────────────────────────────────
export default function LessonNode({ node, status, title, onSelect }) {
  const isBoss = node.type === 'boss'
  const clickable = status === 'current'
  const set = NODE_ASSETS[node.marker] || NODE_ASSETS.book
  const fallback = NODE_FALLBACK[node.marker] || NODE_FALLBACK.book
  const src = status === 'locked' ? set.locked : set.unlocked

  return (
    <div
      className={`node node--${status} node--${node.marker} ${isBoss ? 'node--boss' : ''}`}
      style={{ left: `${node.pos.x}%`, top: `${node.pos.y}%` }}
    >
      {status === 'current' && (
        <motion.span
          className="node__glow"
          animate={{ scale: [1, 1.3, 1], opacity: [0.55, 0, 0.55] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <motion.button
        className="node__marker"
        onClick={() => clickable && onSelect(node)}
        disabled={!clickable}
        aria-label={`${node.place} — ${status}`}
        animate={status === 'current' ? { y: [0, -6, 0] } : { y: 0 }}
        transition={{ duration: 1.7, repeat: status === 'current' ? Infinity : 0, ease: 'easeInOut' }}
        whileTap={clickable ? { scale: 0.9 } : {}}
        whileHover={clickable ? { scale: 1.06 } : {}}
      >
        <img
          src={src}
          alt=""
          className="node__img"
          draggable={false}
          onError={(e) => {
            if (!e.currentTarget.dataset.fb) {
              e.currentTarget.dataset.fb = '1'
              e.currentTarget.src = fallback
            }
          }}
        />
        {status === 'completed' && <span className="node__check">✅</span>}
      </motion.button>

      {isBoss && status !== 'locked' && <span className="node__boss-tag">BOSS</span>}

      {status === 'current' && (
        <motion.div
          className="node__info"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <span className="node__info-place">{node.place}</span>
          <span className="node__info-title">{title}</span>
          <span className="node__info-cta">Tap to {isBoss ? 'challenge' : 'start'} →</span>
        </motion.div>
      )}
    </div>
  )
}
