import { useMemo, useState } from 'react'
import { buildPracticeSteps, buildMatchPairs, buildTypeDeck } from '../data/gameData'
import StageRunner from './StageRunner'
import MatchGame from './MatchGame'
import TypeDrill from './TypeDrill'
import KikoCharacter from './KikoCharacter'
import Icon from './Icon'

// ──────────────────────────────────────────────────────────────────────────
//  PracticeScreen — a practice hub. Pick a deck (Kana / Words) and a drill
//  (Flashcards / Multiple choice / Match-up / Typing), then run it. Everything
//  draws from what you've mastered, with a starter set for brand-new players.
// ──────────────────────────────────────────────────────────────────────────
const DRILLS = [
  { id: 'flash', label: 'Flashcards', desc: 'Study one at a time', icon: 'book' },
  { id: 'choice', label: 'Multiple choice', desc: 'Pick the right answer', icon: 'check' },
  { id: 'match', label: 'Match-up', desc: 'Pair them up fast', icon: 'sparkle' },
  { id: 'type', label: 'Typing', desc: 'Type the romaji', icon: 'study' },
]

export default function PracticeScreen({ masteredChars }) {
  const [view, setView] = useState('hub') // hub | play | summary
  const [deck, setDeck] = useState('kana')
  const [drill, setDrill] = useState('choice')
  const [session, setSession] = useState(0)
  const [result, setResult] = useState(null)

  const data = useMemo(() => {
    if (view !== 'play') return null
    if (drill === 'match') return { pairs: buildMatchPairs(masteredChars, deck) }
    if (drill === 'type') return { deck: buildTypeDeck(masteredChars, deck) }
    return { steps: buildPracticeSteps(masteredChars, deck, drill, 10) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, drill, deck, session, masteredChars])

  const start = () => {
    setSession((s) => s + 1)
    setView('play')
  }
  const finish = (r) => {
    setResult({ ...r, drill })
    setView('summary')
  }
  const again = () => {
    setSession((s) => s + 1)
    setView('play')
  }

  // ── HUB ──
  if (view === 'hub') {
    return (
      <div className="page practice-hub">
        <h2 className="page__title">Practice</h2>
        <p className="page__sub">Pick a deck, then how you want to drill</p>

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
  if (view === 'play' && data) {
    return (
      <div className="page practice-play">
        <button className="practice-play__back" onClick={() => setView('hub')} aria-label="Back to practice">
          ‹ Practice
        </button>
        {drill === 'match' ? (
          <MatchGame pairs={data.pairs} onDone={finish} />
        ) : drill === 'type' ? (
          <TypeDrill deck={data.deck} onDone={finish} />
        ) : (
          <StageRunner steps={data.steps} onDone={finish} />
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
      <h2 className="page__title">{result?.drill === 'flash' ? 'Nice review!' : 'Set complete'}</h2>
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
        <button className="btn btn--ghost btn--sm" onClick={() => setView('hub')}>
          Back to practice
        </button>
      </div>
    </div>
  )
}
