import { motion } from 'framer-motion'
import { WORLDS, getLesson } from '../data/gameData'
import Icon from './Icon'

const MARKER_ICON = {
  book: 'book',
  study: 'study',
  scroll: 'scroll',
  lantern: 'lantern',
  altar: 'flame',
  torii: 'torii',
  meadow: 'sparkle',
  canyon: 'flame',
}
const STATUS_ICON = { completed: 'check', current: 'play', locked: 'lock' }

// ──────────────────────────────────────────────────────────────────────────
//  LearnScreen — a tidy list of every lesson + boss across all worlds, grouped
//  by world. Current and completed (replay) nodes open; locked ones don't.
// ──────────────────────────────────────────────────────────────────────────
export default function LearnScreen({ getStatus, onSelectNode }) {
  return (
    <div className="page learn-page">
      <h2 className="page__title">Lessons</h2>
      <p className="page__sub">Your journey through hiragana</p>

      {WORLDS.map((world, wi) => (
        <div className="learn-world" key={world.id}>
          <h3 className="learn-world__name">
            World {wi + 1} · {world.name}
          </h3>
          <div className="learn-list">
            {world.nodes.map((node, i) => {
              const status = getStatus(node.id)
              const lesson = node.type === 'boss' ? null : getLesson(node.lessonId)
              const open = status === 'current' || status === 'completed'
              return (
                <motion.button
                  key={node.id}
                  className={`learn-card learn-card--${status} ${node.type === 'boss' ? 'is-boss' : ''}`}
                  disabled={!open}
                  onClick={() => open && onSelectNode(node)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileTap={open ? { scale: 0.98 } : {}}
                >
                  <span className="learn-card__icon">
                    <Icon name={MARKER_ICON[node.marker]} size={26} />
                  </span>
                  <span className="learn-card__text">
                    <span className="learn-card__title">
                      {node.type === 'boss' ? world.bossName : lesson.title}
                    </span>
                    <span className="learn-card__sub">
                      {node.type === 'boss' ? 'Boss · ' + node.place : lesson.subtitle}
                    </span>
                  </span>
                  <span className={`learn-card__status status-${status}`}>
                    <Icon name={STATUS_ICON[status]} size={18} />
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
