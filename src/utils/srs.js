// ──────────────────────────────────────────────────────────────────────────
//  srs.js — a lightweight spaced-repetition scheduler (SM-2 inspired).
//
//  Each "card" tracks how well one item (a kana or a word) is known:
//    { reps, interval (days), ease, due (ms timestamp), lapses, last }
//  Answer it right → the interval grows and it comes back later.
//  Answer it wrong → it resets and comes back soon.
//  Review surfaces whatever is due / most overdue first.
// ──────────────────────────────────────────────────────────────────────────
export const DAY = 86400000

export function newCard() {
  return { reps: 0, interval: 0, ease: 2.3, due: 0, lapses: 0, last: 0 }
}

// Update a card after a single review. `correct` is a boolean.
export function review(card, correct, now = Date.now()) {
  const c = card || newCard()
  let { reps, interval, ease, lapses } = c
  if (correct) {
    reps += 1
    if (reps === 1) interval = 1
    else if (reps === 2) interval = 3
    else interval = Math.max(1, Math.round(interval * ease))
    ease = Math.min(2.8, ease + 0.05)
  } else {
    reps = 0
    interval = 0 // due again right away
    lapses += 1
    ease = Math.max(1.6, ease - 0.2)
  }
  return { reps, interval, ease, due: now + interval * DAY, lapses, last: now }
}

// A never-seen item counts as due.
export function isDue(card, now = Date.now()) {
  return !card || card.due <= now
}

// How overdue a card is (bigger = more urgent). Never-seen sorts to the top.
export function overdueScore(card, now = Date.now()) {
  return card ? now - card.due : Number.MAX_SAFE_INTEGER
}
