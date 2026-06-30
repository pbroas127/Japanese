import { motion } from 'framer-motion'
import { levelFromXp, xpIntoLevel, XP_PER_LEVEL, streakTier, CURRENCY } from '../data/gameData'
import Icon from './Icon'

// ──────────────────────────────────────────────────────────────────────────
//  TopHUD — fantasy status bar: level crest, XP bar, streak (with milestone
//  glow), Sakura Petals currency, and profile / settings buttons.
// ──────────────────────────────────────────────────────────────────────────
export default function TopHUD({ xp, streak, petals, onOpenProfile, onOpenSettings, onOpenStreak, compact = false }) {
  const level = levelFromXp(xp)
  const pct = Math.min(100, Math.round((xpIntoLevel(xp) / XP_PER_LEVEL) * 100))
  const tier = streakTier(streak)

  return (
    <div className="hud">
      <div className="hud__crest">
        <span className="hud__crest-ring" />
        <span className="hud__crest-num">{level}</span>
      </div>

      <div className="hud__center">
        <div className="hud__xp-track">
          <motion.div
            className="hud__xp-fill"
            animate={{ width: `${pct}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          />
          <span className="hud__xp-label">{xp} XP</span>
        </div>
      </div>

      <motion.button
        type="button"
        className={`hud__chip hud__chip--streak tier-${tier} ${streak > 0 ? 'is-hot' : ''}`}
        animate={streak > 0 ? { scale: [1, 1.16, 1] } : { scale: 1 }}
        transition={{ duration: 0.4 }}
        key={streak}
        title={`${streak}-day streak`}
        onClick={onOpenStreak}
        disabled={!onOpenStreak}
        whileTap={onOpenStreak ? { scale: 0.92 } : {}}
      >
        <Icon name="flame" size={16} className="hud__chip-icon" />
        <span className="hud__chip-val">{streak}</span>
      </motion.button>

      <div className="hud__chip hud__chip--petals" title={CURRENCY.name}>
        <Icon name="petal" size={16} className="hud__chip-icon" />
        <span className="hud__chip-val">{petals}</span>
      </div>

      {!compact && (
        <div className="hud__btns">
          <button className="hud__icon-btn" onClick={onOpenProfile} aria-label="Profile">
            <Icon name="profile" size={18} />
          </button>
          <button className="hud__icon-btn" onClick={onOpenSettings} aria-label="Settings">
            <Icon name="settings" size={18} />
          </button>
        </div>
      )}
    </div>
  )
}
