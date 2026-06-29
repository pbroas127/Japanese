import { motion } from 'framer-motion'
import { levelFromXp, xpIntoLevel, XP_PER_LEVEL } from '../data/gameData'

// ──────────────────────────────────────────────────────────────────────────
//  ProgressHUD — persistent top bar: level, XP progress, and streak flame.
// ──────────────────────────────────────────────────────────────────────────
export default function ProgressHUD({ xp, streak }) {
  const level = levelFromXp(xp)
  const into = xpIntoLevel(xp)
  const pct = Math.min(100, Math.round((into / XP_PER_LEVEL) * 100))

  return (
    <div className="hud">
      <div className="hud__level">
        <span className="hud__level-badge">Lv {level}</span>
      </div>

      <div className="hud__xp">
        <div className="hud__xp-track">
          <motion.div
            className="hud__xp-fill"
            animate={{ width: `${pct}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          />
        </div>
        <span className="hud__xp-label">{xp} XP</span>
      </div>

      <motion.div
        className={`hud__streak ${streak > 0 ? 'is-hot' : ''}`}
        animate={streak > 0 ? { scale: [1, 1.18, 1] } : { scale: 1 }}
        transition={{ duration: 0.4 }}
        key={streak}
      >
        <span className="hud__streak-flame" aria-hidden>🔥</span>
        <span className="hud__streak-count">{streak}</span>
      </motion.div>
    </div>
  )
}
