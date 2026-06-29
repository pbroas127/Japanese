import { motion } from 'framer-motion'
import { WORLD_ASSETS, WORLD_FALLBACK } from '../assets/assetMap'

// ──────────────────────────────────────────────────────────────────────────
//  LessonNode — a single map marker.
//  States: locked (dim + 🔒), current (glowing pulse + label), completed (✅).
//  Boss nodes are larger and tinted. Kiko never stands on a node.
// ──────────────────────────────────────────────────────────────────────────
export default function LessonNode({ node, status, onSelect }) {
  const isBoss = node.type === 'boss'
  const clickable = status === 'current'

  return (
    <button
      className={`node node--${status} ${isBoss ? 'node--boss' : ''}`}
      style={{ left: `${node.pos.x}%`, top: `${node.pos.y}%` }}
      onClick={() => clickable && onSelect(node)}
      disabled={!clickable}
      aria-label={`${isBoss ? 'Boss' : 'Lesson'} ${node.label} — ${status}`}
    >
      {/* pulsing ring on the active node */}
      {status === 'current' && (
        <motion.span
          className="node__ring"
          animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <motion.span
        className="node__disc"
        animate={
          status === 'current'
            ? { y: [0, -5, 0] }
            : { y: 0 }
        }
        transition={{ duration: 1.6, repeat: status === 'current' ? Infinity : 0, ease: 'easeInOut' }}
        whileTap={clickable ? { scale: 0.9 } : {}}
      >
        <img
          src={WORLD_ASSETS.node}
          alt=""
          className="node__img"
          draggable={false}
          onError={(e) => {
            if (!e.currentTarget.dataset.fb) {
              e.currentTarget.dataset.fb = '1'
              e.currentTarget.src = WORLD_FALLBACK.node
            }
          }}
        />
        <span className="node__face">
          {status === 'completed' ? '✅' : isBoss ? '👹' : node.label}
        </span>
        {status === 'locked' && <span className="node__lock">🔒</span>}
      </motion.span>

      {isBoss && status !== 'locked' && <span className="node__boss-label">BOSS</span>}
    </button>
  )
}
