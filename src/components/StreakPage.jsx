import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FREEZE_COST } from '../data/gameData'
import Icon from './Icon'

// ──────────────────────────────────────────────────────────────────────────
//  StreakPage — opened from the flame in the HUD. Shows the daily streak, a
//  live countdown to the local reset, key stats, freezes, and a Duolingo-style
//  calendar of practiced days + freeze days. All dates are in the device's
//  local time zone (plain Date), so the countdown matches the player's clock.
// ──────────────────────────────────────────────────────────────────────────
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function ymd(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function StreakPage({ game, onClose }) {
  const {
    streak,
    bestStreak,
    freezes,
    history = [],
    freezeDays = [],
    streakActiveToday,
    petals,
    buyFreeze,
  } = game

  const [now, setNow] = useState(() => new Date())
  const [monthOffset, setMonthOffset] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  // Time left until local midnight (the streak reset).
  const { h, m, s } = useMemo(() => {
    const midnight = new Date(now)
    midnight.setHours(24, 0, 0, 0)
    let diff = Math.max(0, Math.floor((midnight - now) / 1000))
    const hh = Math.floor(diff / 3600)
    diff %= 3600
    return { h: hh, m: Math.floor(diff / 60), s: diff % 60 }
  }, [now])

  const historySet = useMemo(() => new Set(history), [history])
  const freezeSet = useMemo(() => new Set(freezeDays), [freezeDays])
  const today = ymd(new Date())

  // Displayed month grid.
  const view = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)
  const year = view.getFullYear()
  const month = view.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const canBuy = petals >= FREEZE_COST

  return (
    <div className="page streak-page">
      <button className="streak-page__back" onClick={onClose} aria-label="Back to map">
        ‹ Map
      </button>

      <motion.div
        className={`streak-hero ${streak > 0 ? 'is-lit' : ''}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
      >
        <span className="streak-hero__flame">
          <Icon name="flame" size={54} />
        </span>
        <span className="streak-hero__num">{streak}</span>
        <span className="streak-hero__label">day streak</span>
      </motion.div>

      <div className={`streak-status ${streakActiveToday ? 'is-safe' : ''}`}>
        {streakActiveToday ? (
          <>
            <span className="streak-status__title">
              <Icon name="check" size={15} /> Practiced today — streak safe
            </span>
            <span className="streak-status__sub">
              New day in {h}h {m}m {s}s
            </span>
          </>
        ) : (
          <>
            <span className="streak-status__title">Practice today to keep your streak</span>
            <span className="streak-status__sub">
              {h}h {m}m {s}s left today
            </span>
          </>
        )}
      </div>

      <div className="streak-stats">
        <div className="streak-stat">
          <span className="streak-stat__v">{bestStreak}</span>
          <span className="streak-stat__l">Best streak</span>
        </div>
        <div className="streak-stat">
          <span className="streak-stat__v">{history.length}</span>
          <span className="streak-stat__l">Days practiced</span>
        </div>
        <div className="streak-stat">
          <span className="streak-stat__v">
            {freezes} <Icon name="freeze" size={14} />
          </span>
          <span className="streak-stat__l">Freezes</span>
        </div>
      </div>

      <button className="btn btn--ghost btn--sm streak-page__buy" onClick={buyFreeze} disabled={!canBuy}>
        <Icon name="freeze" size={15} /> Buy freeze · {FREEZE_COST}
        <Icon name="petal" size={14} />
      </button>

      <div className="cal">
        <div className="cal__head">
          <button className="cal__nav" onClick={() => setMonthOffset((o) => o - 1)} aria-label="Previous month">
            ‹
          </button>
          <span className="cal__title">
            {MONTHS[month]} {year}
          </span>
          <button
            className="cal__nav"
            onClick={() => setMonthOffset((o) => Math.min(0, o + 1))}
            disabled={monthOffset >= 0}
            aria-label="Next month"
          >
            ›
          </button>
        </div>
        <div className="cal__grid">
          {WEEKDAYS.map((w, i) => (
            <span key={`wd-${i}`} className="cal__wd">
              {w}
            </span>
          ))}
          {cells.map((d, i) => {
            if (d == null) return <span key={`e-${i}`} className="cal__cell is-empty" />
            const ds = ymd(new Date(year, month, d))
            const done = historySet.has(ds)
            const frozen = freezeSet.has(ds)
            const isToday = ds === today
            return (
              <span
                key={ds}
                className={`cal__cell ${done ? 'is-done' : ''} ${frozen ? 'is-frozen' : ''} ${isToday ? 'is-today' : ''}`}
              >
                {done ? <Icon name="flame" size={15} /> : frozen ? <Icon name="freeze" size={14} /> : d}
              </span>
            )
          })}
        </div>
        <div className="cal__legend">
          <span><i className="cal__dot is-done" /> Practiced</span>
          <span><i className="cal__dot is-frozen" /> Freeze used</span>
        </div>
      </div>
    </div>
  )
}
