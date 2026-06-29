import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WORLD, getLesson, getKikoLine } from '../data/gameData'
import { WORLD_ASSETS, WORLD_FALLBACK } from '../assets/assetMap'
import LessonNode from './LessonNode'
import KikoCharacter from './KikoCharacter'
import DialogueBubble from './DialogueBubble'

// ──────────────────────────────────────────────────────────────────────────
//  WorldMap — the Forest of Hiragana hub.
//
//  The scene is locked to the background art's aspect ratio, so each node's %
//  position lands on the painted dirt-path clearing on every device. The path
//  is the one painted into the art (no drawn overlay). Kiko lives permanently
//  on her dirt patch (WORLD.kikoHome) and only changes pose with progress.
// ──────────────────────────────────────────────────────────────────────────
export default function WorldMap({ getStatus, onSelectNode, worldComplete, streak, flash, onClearFlash }) {
  const nodes = WORLD.nodes
  const currentNode = nodes.find((n) => getStatus(n.id) === 'current') || null
  const completedCount = nodes.filter((n) => getStatus(n.id) === 'completed').length

  const kikoPose = worldComplete
    ? 'victory'
    : currentNode?.type === 'boss'
      ? 'bossPrep'
      : 'studying'
  const line = getKikoLine({ currentNode, completedCount })

  useEffect(() => {
    if (!flash) return
    const t = setTimeout(onClearFlash, 2600)
    return () => clearTimeout(t)
  }, [flash, onClearFlash])

  return (
    <div className="worldmap">
      <div className="worldmap__scene" style={{ aspectRatio: `${WORLD.art.w} / ${WORLD.art.h}` }}>
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

        {nodes.map((node) => (
          <LessonNode
            key={node.id}
            node={node}
            status={getStatus(node.id)}
            title={node.type === 'boss' ? 'Hiragana Guardian' : getLesson(node.lessonId)?.title}
            onSelect={onSelectNode}
          />
        ))}

        {/* Kiko's permanent home spot — never moves, only reacts */}
        <div
          className="worldmap__kiko"
          style={{ left: `${WORLD.kikoHome.x}%`, top: `${WORLD.kikoHome.y}%` }}
        >
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
    </div>
  )
}
