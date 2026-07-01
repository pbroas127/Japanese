import { useState } from 'react'
import { STREAK_FLAME_ASSETS } from '../assets/assetMap'
import Icon from './Icon'

// ──────────────────────────────────────────────────────────────────────────
//  StreakFlame — the two Higgsfield-generated flame states (warm/lit vs
//  cold/extinguished) used everywhere the streak count itself is shown.
//  Falls back to the plain vector flame icon if either image fails to load.
// ──────────────────────────────────────────────────────────────────────────
export default function StreakFlame({ lit, size = 16, className = '' }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <Icon name="flame" size={size} className={className} />
  return (
    <img
      className={`icon icon--raster ${className}`}
      src={lit ? STREAK_FLAME_ASSETS.lit : STREAK_FLAME_ASSETS.unlit}
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: 'contain' }}
      alt=""
      draggable={false}
      onError={() => setFailed(true)}
    />
  )
}
