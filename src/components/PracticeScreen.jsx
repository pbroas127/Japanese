import { useMemo, useState } from 'react'
import { buildPracticeSteps, buildMatchPairs, buildTypeDeck, buildReviewSteps, countDueItems } from '../data/gameData'
import StageRunner from './StageRunner'
import MatchGame from './MatchGame'
import TypeDrill from './TypeDrill'
import KikoCharacter from './KikoCharacter'
import Icon from './Icon'

// ──────────────────────────────────────────────────────────────────────────
//  PracticeScreen — a practice hub. A smart Daily Review (spaced repetition)
//  sits up top, then pick a deck (Kana / Words) and a drill (Flashcards /
//  Multiple choice / Match-up / Typing). Everything draws from what you've
//  mastered; the review prioritises whatever is due / most overdue.
//
//  The session's content is built once when you start it (not in a memo), so
//  recording SRS results mid-session never reshuffles the questions under you.
// ──────────────────────────────────────────────────────────────────────────
const DRILLS = [
  { id: 'flash', label: 'Flashcards', desc: 'Study one at a time', icon: 'book' },
  { id: 'choice', label: 'Multiple choice', desc: 'Pick the right answer', icon: 'check' },
  { id: 'match', label: 'Match-up', desc: 'Pair them up fast', icon: 'sparkle' },
  { id: 'type', label: 'Typing', desc: 'Type the romaji', icon: 'study' },
]

export default function PracticeScreen({ masteredChars, srs = {}, onReview }) {
  const [view, setView] = useState('hub') // hub | play | summary
  const [deck, setDeck] = useState('kana')
  const [drill, setDrill] = useState('choice')
  const [playData, setPlayData] = useState(null)
  const [result, setResult] = useState(null)

  const dueCount = useMemo(() => countDueItems(srs, masteredChars), [srs, masteredChars])

  // Build a session's content once, at start (uses the latest srs snapshot).
  const buildData = (d) => {
    if (d === 'review') return { steps: buildReviewSteps(srs, masteredChars, 12) }
    if (d === 'match') return { pairs: buildMatchPairs(masteredChars, deck) }
    if (d === 'type') return { deck: buildTypeDeck(masteredChars, deck) }
    return { steps: buildPracticeSteps(masteredChars, deck, d, 10) }
  }

  const start = () => {
    setPlayData(buildData(drill))
    setView('play')
  }
  const startReview = () => {
    setDrill('review')
    setPlayData(buildData('review'))
    setView('play')
  }
  const again = () => {
    setPlayData(buildData(drill))
    setView('play')
  }
  const toHub = () => {
    if (drill === 'review') setDrill('choice')
    setView('hub')
  }
  const finish = (r) => {
    setResult({ ...r, drill })
    setView('summary')
  }

  // ── HUB ──
  if (view === 'hub') {
    return (
      <div className="page practice-hub">
        <h2 className="page__title">Practice</h2>
        <p className="page__sub">Pick a deck, then how you want to drill</p>

        <button className="review-cta" onClick={startReview} disabled={masteredChars.length === 0}>
          <span className="review-cta__icon">
            <Icon name="sparkle" size={22} />
          </span>
          <span className="review-cta__text">
            <span className="review-cta__title">Daily Review</span>
            <span className="review-cta__sub">
              {masteredChars.length === 0
                ? 'Clear a lesson to unlock'
                : dueCount > 0
                  ? `${dueCount} due now`
                  : 'All caught up — review anyway'}
            </span>
          </span>
          {dueCount > 0 && <span className="review-cta__badge">{dueCount}</span>}
        </button>

        <div className="deck-toggle">
          <button className={`deck-toggle__btn ${deck === 'kana' ? 'is-on' : ''}`} onClick={() => setDeck('kana')}>
            Kana
          </button>
          <button className={`deck-toggle__btn ${deck === 'words' ? 'is-on' : ''}`} onClick={() => setDeck('words')}>
            Words
          </button>
        </div>

        <div className="drill-grid">
          {DRILLS.map((d) => (
            <button
              key={d.id}
              className={`drill-card ${drill === d.id ? 'is-on' : ''}`}
              onClick={() => setDrill(d.id)}
            >
              <span className="drill-card__icon">
                <Icon name={d.icon} size={22} />
              </span>
              <span className="drill-card__label">{d.label}</span>
              <span className="drill-card__desc">{d.desc}</span>
            </button>
          ))}
        </div>

        <button className="btn btn--primary practice-hub__start" onClick={start}>
          Start practice →
        </button>
        <p className="practice-hub__note">More decks (sentences, phrases) coming soon</p>
      </div>
    )
  }

  // ── PLAY ──
  if (view === 'play' && playData) {
    return (
      <div className="page practice-play">
        <button className="practice-play__back" onClick={toHub} aria-label="Back to practice">
          ‹ Practice
        </button>
        {drill === 'match' ? (
          <MatchGame pairs={playData.pairs} onDone={finish} />
        ) : drill === 'type' ? (
          <TypeDrill deck={playData.deck} onDone={finish} />
        ) : (
          <StageRunner steps={playData.steps} onReview={onReview} onDone={finish} />
        )}
      </div>
    )
  }

  // ── SUMMARY ──
  const scored = result && result.total > 0
  const great = scored && result.correct / result.total >= 0.8
  return (
    <div className="page practice-done">
      <KikoCharacter state={great ? 'victory' : 'happy'} size={130} />
      <h2 className="page__title">
        {result?.drill === 'review' ? 'Review done!' : result?.drill === 'flash' ? 'Nice review!' : 'Set complete'}
      </h2>
      {scored && (
        <p className="practice-summary__score">
          {result.correct} / {result.total}
        </p>
      )}
      <p className="page__sub">{great ? 'Sharp work — keep the streak going!' : 'Every rep makes it stick.'}</p>
      <div className="stage-done__actions">
        <button className="btn btn--primary" onClick={again}>
          Again →
        </button>
        <button className="btn btn--ghost btn--sm" onClick={toHub}>
          Back to practice
        </button>
      </div>
    </div>
  )
}
