import { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WORLDS, getLesson, getKikoLine } from '../data/gameData'
import { WORLD_ASSETS, WORLD_FALLBACK } from '../assets/assetMap'
import LessonNode from './LessonNode'
import KikoCharacter from './KikoCharacter'
import DialogueBubble from './DialogueBubble'
import Icon from './Icon'
import { smoothPath } from '../utils/path'

// ──────────────────────────────────────────────────────────────────────────
//  WorldMap — every world stacked into one vertical scroll. The FIRST world
//  sits at the bottom; later worlds climb upward. A world stays sealed (grey
//  overlay + lock) until the previous world's boss is cleared. Kiko lives in
//  whichever world is currently active. Scroll clamps to the stack, so you
//  can't scroll past the top of the last world or the bottom of the first.
//
//  Backgrounds, node coordinates and paths are shared placeholders for now —
//  real per-world art + hand-placed nodes come later.
// ──────────────────────────────────────────────────────────────────────────
export default function WorldMap({ getStatus, getProgress, onSelectNode, worldComplete, flash, onClearFlash }) {
  const scrollRef = useRef(null)

  const activeWorldId = useMemo(() => {
    const w = WORLDS.find((world) => world.nodes.some((n) => getStatus(n.id) === 'current'))
    return (w || WORLDS[WORLDS.length - 1]).id
  }, [getStatus])

  // Center the active world on first paint.
  useEffect(() => {
    const el = scrollRef.current?.querySelector(`[data-world="${activeWorldId}"]`)
    if (el) el.scrollIntoView({ block: 'center' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!flash) return
    const t = setTimeout(onClearFlash, 2600)
    return () => clearTimeout(t)
  }, [flash, onClearFlash])

  // First world at the bottom → render the list reversed (last world on top).
  const ordered = [...WORLDS].reverse()

  return (
    <div className="worldmap" ref={scrollRef}>
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

      <div className="worldmap__stack">
        {ordered.map((world) => {
          const idx = WORLDS.findIndex((w) => w.id === world.id)
          const unlocked = world.nodes.some((n) => getStatus(n.id) !== 'locked')
          const isActive = world.id === activeWorldId
          const prevWorld = WORLDS[idx - 1]

          const currentNode = isActive ? world.nodes.find((n) => getStatus(n.id) === 'current') : null
          const completedCount = world.nodes.filter((n) => getStatus(n.id) === 'completed').length
          const kikoPose = worldComplete ? 'victory' : currentNode?.type === 'boss' ? 'bossPrep' : 'studying'
          const line = getKikoLine({ currentNode, completedCount })

          return (
            <section
              key={world.id}
              data-world={world.id}
              className={`world ${unlocked ? '' : 'is-locked'} ${isActive ? 'is-active' : ''}`}
            >
              <div className="world__label">
                {!unlocked && <Icon name="lock" size={13} />}
                <span>{world.name}</span>
              </div>

              <div className="worldmap__scene" style={{ aspectRatio: `${world.art.w} / ${world.art.h}` }}>
                <img
                  className="worldmap__bg-img"
                  src={WORLD_ASSETS[world.id] || WORLD_ASSETS.forest}
                  alt={world.name}
                  draggable={false}
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fb) {
                      e.currentTarget.dataset.fb = '1'
                      e.currentTarget.src = WORLD_FALLBACK[world.id] || WORLD_FALLBACK.forest
                    }
                  }}
                />
                <div className="worldmap__vignette" />

                {unlocked && world.path.length >= 2 && (
                  <svg className="worldmap__trail" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                      d={smoothPath(world.path)}
                      fill="none"
                      stroke="rgba(255,255,255,0.7)"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeDasharray="0.1 4.5"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                )}

                {world.nodes.map((node) => (
                  <LessonNode
                    key={node.id}
                    node={node}
                    status={getStatus(node.id)}
                    stagesDone={getProgress?.(node.id).stagesDone ?? 0}
                    title={node.type === 'boss' ? world.bossName : getLesson(node.lessonId)?.title}
                    onSelect={onSelectNode}
                  />
                ))}

                {isActive && (
                  <div
                    className="worldmap__kiko"
                    style={{ left: `${world.kikoHome.x}%`, top: `${world.kikoHome.y}%` }}
                  >
                    <DialogueBubble text={line} />
                    <KikoCharacter state={kikoPose} size={104} />
                  </div>
                )}

                {!unlocked && (
                  <div className="world__lock">
                    <span className="world__lock-badge">
                      <Icon name="lock" size={30} />
                    </span>
                    <span className="world__lock-text">Clear {prevWorld?.name} to enter</span>
                  </div>
                )}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
