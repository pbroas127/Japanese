import { motion } from 'framer-motion'
import { WORLD, getLesson } from '../data/gameData'

const MARKER_ICON = {
  book: '📖',
  study: '🧠',
  scroll: '📜',
  lantern: '🏮',
  altar: '🔥',
  torii: '⛩️',
}

// ──────────────────────────────────────────────────────────────────────────
//  LearnScreen — a tidy list view of every lesson + the boss, with status.
//  Current and completed (replay) nodes are openable; locked ones are not.
// ──────────────────────────────────────────────────────────────────────────
export default function LearnScreen({ getStatus, onSelectNode }) {
  return (
    <div className="page learn-page">
      <h2 className="page__title">Lessons</h2>
      <p className="page__sub">Forest of Hiragana · World 1</p>

      <div className="learn-list">
        {WORLD.nodes.map((node, i) => {
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
              transition={{ delay: i * 0.05 }}
              whileTap={open ? { scale: 0.98 } : {}}
            >
              <span className="learn-card__icon">{MARKER_ICON[node.marker]}</span>
              <span className="learn-card__text">
                <span className="learn-card__title">
                  {node.type === 'boss' ? 'Hiragana Guardian' : lesson.title}
                </span>
                <span className="learn-card__sub">
                  {node.type === 'boss' ? 'Boss · ' + node.place : lesson.subtitle}
                </span>
              </span>
              <span className={`learn-card__status status-${status}`}>
                {status === 'completed' ? '✅' : status === 'current' ? '▶' : '🔒'}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
