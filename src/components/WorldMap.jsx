import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WORLD, getLesson, getKikoLine } from '../data/gameData'
import { WORLD_ASSETS, WORLD_FALLBACK } from '../assets/assetMap'
import LessonNode from './LessonNode'
import KikoCharacter from './KikoCharacter'
import DialogueBubble from './DialogueBubble'

// Convert node points into a smooth Catmull-Rom → Bézier path.
function smoothPath(pts) {
  if (pts.length < 2) return ''
  const d = [`M ${pts[0].x} ${pts[0].y}`]
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d.push(`C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`)
  }
  return d.join(' ')
}

export default function WorldMap({ getStatus, onSelectNode, worldComplete, streak, flash, onClearFlash }) {
  const nodes = WORLD.nodes
  const points = nodes.map((n) => n.pos)
  const fullPath = smoothPath(points)

  const currentIndex = nodes.findIndex((n) => getStatus(n.id) === 'current')
  const currentNode = currentIndex >= 0 ? nodes[currentIndex] : null
  const travelEnd = currentIndex >= 0 ? currentIndex : nodes.length - 1
  const traveledPath = smoothPath(points.slice(0, travelEnd + 1))

  const completedCount = nodes.filter((n) => getStatus(n.id) === 'completed').length

  // Where Kiko stands (a clearing beside the current node) and how she reacts.
  const anchor = currentNode || nodes[nodes.length - 1]
  const kikoPos = anchor.kiko
  const kikoPose = worldComplete
    ? 'victory'
    : currentNode?.type === 'boss'
      ? 'bossPrep'
      : streak >= 3
        ? 'excited'
        : 'studying'
  const line = getKikoLine({ currentNode, completedCount })

  // Auto-dismiss the milestone toast.
  useEffect(() => {
    if (!flash) return
    const t = setTimeout(onClearFlash, 2600)
    return () => clearTimeout(t)
  }, [flash, onClearFlash])

  return (
    <div className="worldmap">
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
        <path
          d={fullPath}
          fill="none"
          stroke="rgba(60,40,25,0.45)"
          strokeWidth="6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={fullPath}
          fill="none"
          stroke="rgba(245,230,196,0.8)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="0.1 5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={traveledPath}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.9"
        />
      </svg>

      {nodes.map((node) => (
        <LessonNode
          key={node.id}
          node={node}
          status={getStatus(node.id)}
          title={node.type === 'boss' ? 'Hiragana Guardian' : getLesson(node.lessonId)?.title}
          onSelect={onSelectNode}
        />
      ))}

      {/* Kiko stands in a clearing beside the node, never on it */}
      <div className="worldmap__kiko" style={{ left: `${kikoPos.x}%`, top: `${kikoPos.y}%` }}>
        <DialogueBubble text={line} />
        <KikoCharacter state={kikoPose} size={104} />
      </div>

      <AnimatePresence>
        {flash && (
          <motion.div
            className="worldmap__flash"
            initial={{ scale: 0, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14 }}
          >
            {flash.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
