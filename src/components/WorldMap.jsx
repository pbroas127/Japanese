import { motion } from 'framer-motion'
import { WORLD } from '../data/gameData'
import { WORLD_ASSETS, WORLD_FALLBACK } from '../assets/assetMap'
import LessonNode from './LessonNode'
import KikoCharacter from './KikoCharacter'
import ProgressHUD from './ProgressHUD'

// ──────────────────────────────────────────────────────────────────────────
//  WorldMap — the Forest of Hiragana hub.
//  Forest background + a winding trail + the lesson/boss nodes. Progress is
//  shown only through node states; Kiko stands beside the map as a guide,
//  never on a node.
// ──────────────────────────────────────────────────────────────────────────
export default function WorldMap({ xp, streak, getStatus, onSelectNode, worldComplete }) {
  const trail = WORLD.nodes.map((n) => `${n.pos.x},${n.pos.y}`).join(' ')

  return (
    <div className="screen worldmap">
      <ProgressHUD xp={xp} streak={streak} />

      <div className="worldmap__banner">
        <h1 className="worldmap__title">Forest of Hiragana</h1>
        <p className="worldmap__subtitle">World 1 · Learn your first kana</p>
      </div>

      <div className="worldmap__scene">
        <img
          className="worldmap__bg-img"
          src={WORLD_ASSETS.background}
          alt="Forest world"
          draggable={false}
          onError={(e) => {
            if (!e.currentTarget.dataset.fb) {
              e.currentTarget.dataset.fb = '1'
              e.currentTarget.src = WORLD_FALLBACK.background
            }
          }}
        />
        <div className="worldmap__vignette" />

        <svg className="worldmap__trail" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={trail}
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2.4 3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {WORLD.nodes.map((node) => (
          <LessonNode
            key={node.id}
            node={node}
            status={getStatus(node.id)}
            onSelect={onSelectNode}
          />
        ))}

        <KikoCharacter
          state={worldComplete ? 'excited' : 'idle'}
          size={120}
          className="worldmap__kiko"
        />

        {worldComplete && (
          <motion.div
            className="worldmap__cleared"
            initial={{ scale: 0, rotate: -8 }}
            animate={{ scale: 1, rotate: -8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          >
            🌳 World Cleared! 🌳
          </motion.div>
        )}
      </div>
    </div>
  )
}
