// ──────────────────────────────────────────────────────────────────────────
//  hearts.js — lives/hearts regen math (Duolingo-style: one shared timer
//  ticking toward the NEXT heart, not a separate timer per missing heart).
// ──────────────────────────────────────────────────────────────────────────
export const MAX_HEARTS = 5
export const HEART_REGEN_MS = 4 * 60 * 60 * 1000 // 4 hours per heart
export const HEART_COST = 30 // petals to buy one heart

// Roll forward any regen earned since `updatedAt`, preserving partial
// progress toward the next heart when not yet full.
export function settleHearts(hearts, updatedAt, now = Date.now()) {
  if (hearts >= MAX_HEARTS) return { hearts, updatedAt: now }
  const elapsed = now - updatedAt
  const gained = Math.floor(elapsed / HEART_REGEN_MS)
  if (gained <= 0) return { hearts, updatedAt }
  const next = Math.min(MAX_HEARTS, hearts + gained)
  const consumedMs = gained * HEART_REGEN_MS
  return { hearts: next, updatedAt: next >= MAX_HEARTS ? now : updatedAt + consumedMs }
}

// Milliseconds until the next heart regenerates (0 if already full). Assumes
// `hearts`/`updatedAt` have already been settled, so elapsed < HEART_REGEN_MS.
export function msToNextHeart(hearts, updatedAt, now = Date.now()) {
  if (hearts >= MAX_HEARTS) return 0
  return Math.max(0, HEART_REGEN_MS - (now - updatedAt))
}
