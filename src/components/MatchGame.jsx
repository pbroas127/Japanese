import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

// ──────────────────────────────────────────────────────────────────────────
//  MatchGame — tap a tile on the left, then its partner on the right. Correct
//  pairs lock in green; a wrong tap flashes red. Clearing the board finishes.
// ──────────────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function MatchGame({ pairs, onDone }) {
  const lefts = useMemo(() => pairs.map((p) => ({ id: p.id, text: p.left })), [pairs])
  const rights = useMemo(() => shuffle(pairs).map((p) => ({ id: p.id, text: p.right })), [pairs])

  const [selL, setSelL] = useState(null)
  const [wrong, setWrong] = useState(null) // { l, r }
  const [matched, setMatched] = useState([])

  const pickRight = (id) => {
    if (matched.includes(id) || wrong) return
    if (selL == null) return
    if (id === selL) {
      const m = [...matched, id]
      setMatched(m)
      setSelL(null)
      if (m.length === pairs.length) setTimeout(() => onDone({ correct: pairs.length, total: pairs.length }), 450)
    } else {
      setWrong({ l: selL, r: id })
      setTimeout(() => {
        setWrong(null)
        setSelL(null)
      }, 480)
    }
  }

  const tileCls = (side, id) => {
    let cls = 'match__tile'
    if (matched.includes(id)) cls += ' is-matched'
    else if (side === 'L' && selL === id) cls += ' is-sel'
    if (wrong && wrong[side === 'L' ? 'l' : 'r'] === id) cls += ' is-wrong'
    return cls
  }

  return (
    <div className="match">
      <p className="match__hint">Tap a tile, then its match</p>
      <div className="match__cols">
        <div className="match__col">
          {lefts.map((t) => (
            <motion.button
              key={t.id}
              className={tileCls('L', t.id)}
              disabled={matched.includes(t.id)}
              onClick={() => !wrong && setSelL(selL === t.id ? null : t.id)}
              whileTap={{ scale: 0.95 }}
            >
              {t.text}
            </motion.button>
          ))}
        </div>
        <div className="match__col">
          {rights.map((t) => (
            <motion.button
              key={t.id}
              className={tileCls('R', t.id)}
              disabled={matched.includes(t.id)}
              onClick={() => pickRight(t.id)}
              whileTap={{ scale: 0.95 }}
            >
              {t.text}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
