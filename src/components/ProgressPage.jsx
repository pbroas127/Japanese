import { motion } from 'framer-motion'
import KikoCharacter from './KikoCharacter'
import { CURRENCY } from '../data/gameData'

// ──────────────────────────────────────────────────────────────────────────
//  ProgressPage — the player's profile & stats.
// ──────────────────────────────────────────────────────────────────────────
export default function ProgressPage({ game }) {
  const name = game.account.signedIn ? game.account.username : 'Guest Explorer'

  const stats = [
    { label: 'Level', value: game.level, icon: '⭐' },
    { label: 'Total XP', value: game.xp, icon: '✨' },
    { label: CURRENCY.name, value: game.petals, icon: CURRENCY.icon },
    { label: 'Lessons cleared', value: game.stats.lessonsCompleted, icon: '📖' },
    { label: 'Accuracy', value: `${game.accuracy}%`, icon: '🎯' },
    { label: 'Best streak', value: `${game.bestStreak} 🔥`, icon: '🔥' },
    { label: 'Bosses defeated', value: game.stats.bossesDefeated, icon: '⚔️' },
    { label: 'World complete', value: `${game.completionPct}%`, icon: '🌳' },
  ]

  return (
    <div className="page progress-page">
      <div className="profile-head">
        <KikoCharacter state={game.worldComplete ? 'victory' : 'idle'} size={92} />
        <div className="profile-head__text">
          <h2 className="profile-head__name">{name}</h2>
          <p className="profile-head__tag">Forest of Hiragana</p>
        </div>
      </div>

      <div className="bar-stat">
        <div className="bar-stat__row">
          <span>Kana mastered</span>
          <span>
            {game.kanaMastered} / {game.totalKana}
          </span>
        </div>
        <div className="bar-stat__track">
          <motion.div
            className="bar-stat__fill"
            animate={{ width: `${(game.kanaMastered / game.totalKana) * 100}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          />
        </div>
      </div>

      <div className="stat-grid">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat-card"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <span className="stat-card__icon">{s.icon}</span>
            <span className="stat-card__value">{s.value}</span>
            <span className="stat-card__label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
