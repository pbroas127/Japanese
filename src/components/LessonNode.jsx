import { motion } from 'framer-motion'
import { NODE_ASSETS, NODE_FALLBACK } from '../assets/assetMap'
import Icon from './Icon'

// ──────────────────────────────────────────────────────────────────────────
//  LessonNode — a themed place embedded in the world. The marker communicates
//  the node's function; locked nodes use a distinct sealed asset; completed
//  nodes get a consistent check badge; the current node glows (centered on the
//  marker) and shows a small info panel directly above it.
// ──────────────────────────────────────────────────────────────────────────
export default function LessonNode({ node, status, title, onSelect }) {
  const isBoss = node.type === 'boss'
  const clickable = status === 'current'
  const set = NODE_ASSETS[node.marker] || NODE_ASSETS.book
  const fallback = NODE_FALLBACK[node.marker] || NODE_FALLBACK.book
  const src = status === 'locked' ? set.locked : set.unlocked

  // Info panel sits directly above the marker, centered. Only flips below for
  // a node that would otherwise run off the top of the scene.
  const place = node.pos.y < 15 ? 'below' : 'above'

  return (
    <div
      className={`node node--${status} node--${node.marker} ${isBoss ? 'node--boss' : ''}`}
      style={{ left: `${node.pos.x}%`, top: `${node.pos.y}%` }}
    >
      {status === 'current' && (
        <motion.span
          className="node__glow"
          animate={{ scale: [1, 1.25, 1], opacity: [0.55, 0, 0.55] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <motion.button
        className="node__marker"
        onClick={() => clickable && onSelect(node)}
        disabled={!clickable}
        aria-label={`${node.place} — ${status}`}
        whileTap={clickable ? { scale: 0.92 } : {}}
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
      </motion.button>

      {status === 'completed' && (
        <span className="node__check">
          <Icon name="check" size={14} />
        </span>
      )}

      {isBoss && status !== 'locked' && <span className="node__boss-tag">BOSS</span>}

      {status === 'current' && (
        <motion.div
          className={`node__info node__info--${place}`}
          initial={{ opacity: 0, y: place === 'above' ? 6 : -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <span className="node__info-place">{node.place}</span>
          <span className="node__info-title">{title}</span>
          <span className="node__info-cta">Tap to {isBoss ? 'challenge' : 'start'}</span>
        </motion.div>
      )}
    </div>
  )
}
