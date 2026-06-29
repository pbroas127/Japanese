import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { buildBossQuestions, BOSS } from '../data/gameData'
import { useTransientState } from '../state/useTransientState'
import KikoCharacter from './KikoCharacter'
import BossCharacter from './BossCharacter'
import QuizCard from './QuizCard'
import ProgressHUD from './ProgressHUD'

// ──────────────────────────────────────────────────────────────────────────
//  BossFight — the Hiragana Guardian.
//  Correct → Kiko attacks, boss is hurt + loses HP. Wrong → boss attacks,
//  Kiko is hurt + loses HP. Win at boss 0 HP, lose at Kiko 0 HP. Animations
//  are synced to each hit and always settle back to idle.
// ──────────────────────────────────────────────────────────────────────────
export default function BossFight({ node, xp, streak, onWin, onLose, onExit }) {
  const questions = useMemo(() => buildBossQuestions(12), [])

  const [bossHp, setBossHp] = useState(BOSS.maxHp)
  const [kikoHp, setKikoHp] = useState(BOSS.kikoMaxHp)
  const [qIndex, setQIndex] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [locked, setLocked] = useState(false)
  const [phase, setPhase] = useState('fight') // fight | win | lose

  const [kikoState, playKiko] = useTransientState('idle')
  const [bossState, playBoss] = useTransientState('idle')

  const question = questions[qIndex % questions.length]

  const handleAnswer = (opt) => {
    if (locked || phase !== 'fight') return
    setChosen(opt)
    setLocked(true)
    const isCorrect = opt === question.answer

    if (isCorrect) {
      playKiko('attack', 700)
      setTimeout(() => playBoss('hurt', 700), 260)
    } else {
      playBoss('attack', 700)
      setTimeout(() => playKiko('hurt', 700), 260)
    }

    const nextBossHp = isCorrect ? Math.max(0, bossHp - BOSS.damageToBoss) : bossHp
    const nextKikoHp = isCorrect ? kikoHp : Math.max(0, kikoHp - BOSS.damageToKiko)
    if (isCorrect) setBossHp(nextBossHp)
    else setKikoHp(nextKikoHp)

    setTimeout(() => {
      if (nextBossHp <= 0) {
        onWin(node)
        setPhase('win')
      } else if (nextKikoHp <= 0) {
        onLose(node)
        setPhase('lose')
      } else {
        setQIndex((i) => i + 1)
        setChosen(null)
        setLocked(false)
      }
    }, 1250)
  }

  const bossPct = (bossHp / BOSS.maxHp) * 100
  const kikoPct = (kikoHp / BOSS.kikoMaxHp) * 100

  return (
    <div className="screen boss">
      <ProgressHUD xp={xp} streak={streak} />

      <button className="lesson__back" onClick={onExit} aria-label="Flee to map">
        ‹ Flee
      </button>

      <h2 className="boss__title">⚔️ {BOSS.name}</h2>

      <div className="boss__arena">
        {/* Boss side */}
        <div className="boss__fighter boss__fighter--enemy">
          <HpBar label={BOSS.name} pct={bossPct} variant="enemy" />
          <BossCharacter state={bossState} size={180} />
        </div>

        {/* Kiko side */}
        <div className="boss__fighter boss__fighter--hero">
          <HpBar label="Kiko" pct={kikoPct} variant="hero" />
          <KikoCharacter state={kikoState} size={150} />
        </div>
      </div>

      {phase === 'fight' && (
        <div className="boss__quiz">
          <QuizCard question={question} chosen={chosen} locked={locked} onAnswer={handleAnswer} />
        </div>
      )}

      <AnimatePresence>
        {phase !== 'fight' && (
          <motion.div
            className="result-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`result-panel ${phase === 'win' ? 'is-pass' : 'is-fail'}`}
              initial={{ scale: 0.7, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              {phase === 'win' ? (
                <>
                  <KikoCharacter state="excited" size={150} shadow={false} />
                  <h2 className="result-panel__title">Guardian Calmed!</h2>
                  <p className="result-panel__sub">
                    You cleared the Forest of Hiragana. Kiko earned +{250} XP!
                  </p>
                  <motion.button className="btn btn--primary" onClick={onExit} whileTap={{ scale: 0.95 }}>
                    Finish World 🌳
                  </motion.button>
                </>
              ) : (
                <>
                  <KikoCharacter state="sad" size={150} shadow={false} />
                  <h2 className="result-panel__title">Kiko Fainted…</h2>
                  <p className="result-panel__sub">The Guardian was too strong this time. Regroup and try again!</p>
                  <motion.button className="btn btn--primary" onClick={onExit} whileTap={{ scale: 0.95 }}>
                    Back to map
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function HpBar({ label, pct, variant }) {
  return (
    <div className={`hpbar hpbar--${variant}`}>
      <div className="hpbar__row">
        <span className="hpbar__name">{label}</span>
        <span className="hpbar__pct">{Math.round(pct)}%</span>
      </div>
      <div className="hpbar__track">
        <motion.div
          className="hpbar__fill"
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        />
      </div>
    </div>
  )
}
