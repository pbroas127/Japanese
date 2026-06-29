import { motion } from 'framer-motion'
import { KIKO_ASSETS, KIKO_FALLBACK } from '../assets/assetMap'

// ──────────────────────────────────────────────────────────────────────────
//  KikoCharacter — the fox mascot.
//
//  framer-motion drives the "idle → action → idle" loop. The parent flips
//  `state` to a transient value (happy / sad / excited / attack / hurt) and
//  useTransientState returns it to 'idle' automatically, so Kiko is never
//  stuck in a non-idle pose. Each non-idle variant plays once; idle loops a
//  gentle breathing float forever.
// ──────────────────────────────────────────────────────────────────────────

const VARIANTS = {
  idle: {
    y: [0, -6, 0],
    rotate: 0,
    scale: 1,
    transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
  },
  happy: {
    y: [0, -26, 0, -12, 0],
    scale: [1, 1.07, 1],
    rotate: [0, -4, 4, 0],
    transition: { duration: 0.9, ease: 'easeOut' },
  },
  sad: {
    y: [0, 9, 6],
    rotate: [0, -3, 3, -2, 0],
    opacity: [1, 0.9, 1],
    transition: { duration: 0.95, ease: 'easeInOut' },
  },
  excited: {
    y: [0, -20, 0, -16, 0],
    rotate: [0, -7, 7, -4, 0],
    scale: [1, 1.09, 1],
    transition: { duration: 0.85, ease: 'easeOut' },
  },
  attack: {
    x: [0, 38, -8, 0],
    rotate: [0, -9, 0],
    scale: [1, 1.09, 1],
    transition: { duration: 0.7, ease: 'easeInOut' },
  },
  hurt: {
    x: [0, -15, 13, -8, 6, 0],
    rotate: [0, -7, 7, 0],
    transition: { duration: 0.7, ease: 'easeInOut' },
  },
  // ambient/contextual map poses (loop gently)
  studying: {
    y: [0, -3, 0],
    rotate: [0, -1.5, 1.5, 0],
    transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
  },
  bossPrep: {
    y: [0, -5, 0],
    scale: [1, 1.03, 1],
    transition: { duration: 1.1, repeat: Infinity, ease: 'easeInOut' },
  },
  // one-shot celebratory / movement poses
  jumping: {
    y: [0, -34, 0],
    scaleY: [1, 1.06, 1],
    transition: { duration: 0.7, ease: 'easeOut' },
  },
  victory: {
    y: [0, -18, 0, -10, 0],
    rotate: [0, -6, 6, 0],
    scale: [1, 1.07, 1],
    transition: { duration: 1.0, repeat: 1, ease: 'easeOut' },
  },
}

export default function KikoCharacter({
  state = 'idle',
  size = 180,
  flip = false,
  shadow = true,
  className = '',
}) {
  const src = KIKO_ASSETS[state] || KIKO_ASSETS.idle
  const hurtFlash = state === 'hurt'

  return (
    <div
      className={`character ${className}`}
      style={{ width: size, height: size, transform: flip ? 'scaleX(-1)' : undefined }}
    >
      <motion.img
        key={state}
        src={src}
        alt={`Kiko ${state}`}
        className="character__img"
        draggable={false}
        onError={(e) => {
          if (!e.currentTarget.dataset.fb) {
            e.currentTarget.dataset.fb = '1'
            e.currentTarget.src = KIKO_FALLBACK
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
      {shadow && <div className="character__shadow" />}
    </div>
  )
}
