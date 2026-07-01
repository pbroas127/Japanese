import { useEffect, useMemo, useState } from 'react'
import { HEART_COST, MAX_HEARTS, msToNextHeart } from '../utils/hearts'
import Icon from './Icon'

// ──────────────────────────────────────────────────────────────────────────
//  HeartsPage — opened from the hearts chip in the HUD, or automatically when
//  the player tries to start a level/boss with zero hearts. Shows the current
//  count, a live countdown to the next regen, a buy button (petals for now),
//  and a reminder that beating a boss refills them all.
// ──────────────────────────────────────────────────────────────────────────
export default function HeartsPage({ game, onClose, outOfHeartsNotice = false }) {
  const { hearts, heartsUpdatedAt, petals, buyHeart } = game
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const msLeft = useMemo(() => msToNextHeart(hearts, heartsUpdatedAt, now), [hearts, heartsUpdatedAt, now])
  const h = Math.floor(msLeft / 3600000)
  const m = Math.floor((msLeft % 3600000) / 60000)
  const s = Math.floor((msLeft % 60000) / 1000)

  const full = hearts >= MAX_HEARTS
  const canBuy = !full && petals >= HEART_COST

  return (
    <div className="page hearts-page">
      <button className="streak-page__back" onClick={onClose} aria-label="Back to map">
        ‹ Map
      </button>

      {outOfHeartsNotice && (
        <div className="hearts-page__notice">Out of hearts — wait for one to regenerate or buy one to keep going.</div>
      )}

      <div className="hearts-hero">
        <div className="hearts-hero__row">
          {Array.from({ length: MAX_HEARTS }).map((_, i) => (
            <Icon key={i} name="heart" size={34} className={i < hearts ? 'is-full' : 'is-empty'} />
          ))}
        </div>
        <span className="hearts-hero__count">
          {hearts} / {MAX_HEARTS}
        </span>
      </div>

      <div className={`streak-status ${full ? 'is-safe' : ''}`}>
        {full ? (
          <span className="streak-status__title">
            <Icon name="check" size={15} /> Hearts full
          </span>
        ) : (
          <>
            <span className="streak-status__title">Next heart in</span>
            <span className="streak-status__sub">
              {h}h {m}m {s}s
            </span>
          </>
        )}
      </div>

      <button className="btn btn--primary hearts-page__buy" onClick={buyHeart} disabled={!canBuy}>
        <Icon name="plus" size={14} /> Buy a heart · {HEART_COST} <Icon name="petal" size={14} />
      </button>

      <div className="hearts-info">
        <p>
          <Icon name="heart" size={14} /> Lose one when you fail a lesson quiz or a boss fight.
        </p>
        <p>
          <Icon name="sword" size={14} /> Defeat a world's boss to fully refill your hearts.
        </p>
        <p>
          <Icon name="petal" size={14} /> Or buy one anytime with Sakura Petals.
        </p>
      </div>
    </div>
  )
}
