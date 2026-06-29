import { motion } from 'framer-motion'
import { BOSS_ASSETS, BOSS_FALLBACK } from '../assets/assetMap'

// ──────────────────────────────────────────────────────────────────────────
//  BossCharacter — the Hiragana Guardian (friendly wolf spirit).
//
//  Same animation system as Kiko: idle → action → idle. States: idle,
//  attack, hurt. The boss faces left (toward Kiko) so its attack lunges left.
// ──────────────────────────────────────────────────────────────────────────

const VARIANTS = {
  idle: {
    y: [0, -8, 0],
    rotate: 0,
    scale: 1,
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
  attack: {
    x: [0, -46, 10, 0],
    rotate: [0, 7, 0],
    scale: [1, 1.07, 1],
    transition: { duration: 0.7, ease: 'easeInOut' },
  },
  hurt: {
    x: [0, 18, -14, 9, -5, 0],
    rotate: [0, 6, -6, 0],
    transition: { duration: 0.7, ease: 'easeInOut' },
  },
}

export default function BossCharacter({ state = 'idle', size = 240, shadow = true, className = '' }) {
  const src = BOSS_ASSETS[state] || BOSS_ASSETS.idle
  const hurtFlash = state === 'hurt'

  return (
    <div className={`character ${className}`} style={{ width: size, height: size }}>
      <motion.img
        key={state}
        src={src}
        alt={`Hiragana Guardian ${state}`}
        className="character__img"
        draggable={false}
        onError={(e) => {
          if (!e.currentTarget.dataset.fb) {
            e.currentTarget.dataset.fb = '1'
            e.currentTarget.src = BOSS_FALLBACK
          }
        }}
        variants={VARIANTS}
        initial={false}
        animate={state}
      />
      {hurtFlash && (
        <motion.div
          className="character__flash"
          initial={{ opacity: 0.55 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
      {shadow && <div className="character__shadow character__shadow--boss" />}
    </div>
  )
}
