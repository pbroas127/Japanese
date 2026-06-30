import { motion } from 'framer-motion'
import KikoCharacter from './KikoCharacter'
import Icon from './Icon'
import { CURRENCY, FREEZE_COST } from '../data/gameData'

// ──────────────────────────────────────────────────────────────────────────
//  ProgressPage — the player's profile, daily streak (+ freezes) & stats.
// ──────────────────────────────────────────────────────────────────────────
export default function ProgressPage({ game }) {
  const name = game.account.signedIn ? game.account.username : 'Guest Explorer'

  const stats = [
    { label: 'Level', value: game.level, icon: 'star' },
    { label: 'Total XP', value: game.xp, icon: 'sparkle' },
    { label: CURRENCY.name, value: game.petals, icon: 'petal' },
    { label: 'Lessons cleared', value: game.stats.lessonsCompleted, icon: 'book' },
    { label: 'Accuracy', value: `${game.accuracy}%`, icon: 'practice' },
    { label: 'Bosses defeated', value: game.stats.bossesDefeated, icon: 'sword' },
    { label: 'World complete', value: `${game.completionPct}%`, icon: 'tree' },
    { label: 'Kana mastered', value: `${game.kanaMastered}/${game.totalKana}`, icon: 'star' },
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

      {/* Daily streak + freezes */}
      <div className="streak-card">
        <div className="streak-card__main">
          <Icon name="flame" size={30} className="streak-card__flame" />
          <div>
            <span className="streak-card__num">{game.streak}</span>
            <span className="streak-card__unit"> day{game.streak === 1 ? '' : 's'}</span>
            <span className="streak-card__best">Best {game.bestStreak}</span>
          </div>
        </div>
        <div className="streak-card__freeze">
          <span className="streak-card__freeze-count">
            <Icon name="freeze" size={18} /> {game.freezes}
          </span>
          <button
            className="btn btn--ghost btn--sm"
            disabled={game.petals < FREEZE_COST}
            onClick={game.buyFreeze}
          >
            Buy freeze · {FREEZE_COST} <Icon name="petal" size={13} />
          </button>
        </div>
      </div>
      <p className="streak-note">A streak freeze protects your streak for one missed day — used automatically.</p>

      <div className="bar-stat">
        <div className="bar-stat__row">
          <span>Kana mastered</span>
          <span>{game.kanaMastered} / {game.totalKana}</span>
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
            <Icon name={s.icon} size={22} className="stat-card__icon" />
            <span className="stat-card__value">{s.value}</span>
            <span className="stat-card__label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
