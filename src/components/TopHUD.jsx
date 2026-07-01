import { motion } from 'framer-motion'
import { levelFromXp, xpIntoLevel, XP_PER_LEVEL, streakTier, CURRENCY } from '../data/gameData'
import { MAX_HEARTS, HEART_COST } from '../utils/hearts'
import Icon from './Icon'
import StreakFlame from './StreakFlame'

// ──────────────────────────────────────────────────────────────────────────
//  TopHUD — fantasy status bar: level crest (tap for the Level Path), XP bar,
//  hearts (tap for detail, + to buy one), streak (tap for detail), Sakura
//  Petals currency, and profile / settings buttons.
// ──────────────────────────────────────────────────────────────────────────
export default function TopHUD({
  xp,
  streak,
  petals,
  hearts = MAX_HEARTS,
  onOpenProfile,
  onOpenSettings,
  onOpenStreak,
  onOpenLevel,
  onOpenHearts,
  onBuyHeart,
  compact = false,
}) {
  const level = levelFromXp(xp)
  const pct = Math.min(100, Math.round((xpIntoLevel(xp) / XP_PER_LEVEL) * 100))
  const tier = streakTier(streak)
  const canBuyHeart = hearts < MAX_HEARTS && petals >= HEART_COST

  return (
    <div className="hud">
      <button type="button" className="hud__crest" onClick={onOpenLevel} disabled={!onOpenLevel} aria-label="Level path">
        <span className="hud__crest-ring" />
        <span className="hud__crest-num">{level}</span>
      </button>

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
        className={`hud__chip hud__chip--hearts ${hearts <= 0 ? 'is-empty' : ''}`}
        title={`${hearts} of ${MAX_HEARTS} hearts`}
        onClick={onOpenHearts}
        disabled={!onOpenHearts}
      >
        <Icon name="heart" size={15} className="hud__chip-icon" />
        <span className="hud__chip-val">{hearts}</span>
        {onBuyHeart && (
          <span
            className={`hud__chip-plus ${!canBuyHeart ? 'is-off' : ''}`}
            role="button"
            aria-label="Buy a heart"
            onClick={(e) => {
              e.stopPropagation()
              if (canBuyHeart) onBuyHeart()
            }}
          >
            <Icon name="plus" size={9} />
          </span>
        )}
      </motion.button>

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
        <StreakFlame lit={streak > 0} size={16} className="hud__chip-icon" />
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
