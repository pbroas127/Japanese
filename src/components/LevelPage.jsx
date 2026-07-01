import { useMemo, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  XP_PER_LEVEL,
  xpIntoLevel,
  LEVEL_TITLES,
  titleForLevel,
  nextTitleMilestone,
  LEVEL_UP_PETALS,
  LEVEL_UP_MILESTONE_PETALS,
} from '../data/gameData'
import Icon from './Icon'

const TRACK_LENGTH = 50 // levels shown on the roadmap

function rewardFor(level) {
  const isMilestone = level % 5 === 0
  const title = LEVEL_TITLES.find((t) => t.level === level)
  return { petals: isMilestone ? LEVEL_UP_MILESTONE_PETALS : LEVEL_UP_PETALS, heart: isMilestone, title }
}

// ──────────────────────────────────────────────────────────────────────────
//  LevelPage — opened from the level crest in the HUD. A "battle pass"-style
//  roadmap: your rank title, XP progress to the next level, and every level
//  ahead with exactly what it pays out — petals every level, a bonus heart
//  every 5th, and a new rank title at the named milestones. Makes leveling up
//  something to look forward to instead of a number that just goes up.
// ──────────────────────────────────────────────────────────────────────────
export default function LevelPage({ game, onClose }) {
  const { level, xp } = game
  const title = titleForLevel(level)
  const next = nextTitleMilestone(level)
  const intoLevel = xpIntoLevel(xp)
  const pct = Math.round((intoLevel / XP_PER_LEVEL) * 100)
  const listRef = useRef(null)

  const rows = useMemo(() => Array.from({ length: TRACK_LENGTH }, (_, i) => i + 1), [])

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-level="${level}"]`)
    if (el) el.scrollIntoView({ block: 'center' })
  }, [level])

  return (
    <div className="page level-page">
      <button className="streak-page__back" onClick={onClose} aria-label="Back to map">
        ‹ Map
      </button>

      <motion.div
        className="level-hero"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
      >
        <span className="level-hero__num">{level}</span>
        <span className="level-hero__title">{title}</span>
      </motion.div>

      <div className="level-xp">
        <div className="hud__xp-track level-xp__track">
          <motion.div className="hud__xp-fill" animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 120, damping: 18 }} />
          <span className="hud__xp-label">
            {intoLevel} / {XP_PER_LEVEL} XP
          </span>
        </div>
        {next && (
          <span className="level-xp__next">
            {next.level - level} level{next.level - level === 1 ? '' : 's'} to <b>{next.title}</b>
          </span>
        )}
      </div>

      <div className="level-track" ref={listRef}>
        {rows.map((lvl) => {
          const reward = rewardFor(lvl)
          const state = lvl < level ? 'done' : lvl === level ? 'current' : 'upcoming'
          return (
            <div key={lvl} data-level={lvl} className={`level-row level-row--${state}`}>
              <span className="level-row__badge">{state === 'done' ? <Icon name="check" size={13} /> : lvl}</span>
              <span className="level-row__body">
                <span className="level-row__reward">
                  +{reward.petals} <Icon name="petal" size={12} />
                  {reward.heart && (
                    <>
                      {' '}
                      &amp; +1 <Icon name="heart" size={12} />
                    </>
                  )}
                </span>
                {reward.title && <span className="level-row__title">New rank: {reward.title.title}</span>}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
