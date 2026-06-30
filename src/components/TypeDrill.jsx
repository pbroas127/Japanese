import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

// ──────────────────────────────────────────────────────────────────────────
//  TypeDrill — production recall: see the kana/word, type the romaji. The
//  hardest (and stickiest) drill. Shows the right answer on a miss.
// ──────────────────────────────────────────────────────────────────────────
export default function TypeDrill({ deck, onDone }) {
  const [i, setI] = useState(0)
  const [val, setVal] = useState('')
  const [state, setState] = useState('idle') // idle | right | wrong
  const correctRef = useRef(0)
  const item = deck[i]

  const submit = (e) => {
    e.preventDefault()
    if (state !== 'idle' || !val.trim()) return
    const ok = val.trim().toLowerCase() === item.answer.toLowerCase()
    if (ok) correctRef.current += 1
    setState(ok ? 'right' : 'wrong')
    setTimeout(() => {
      if (i + 1 < deck.length) {
        setI(i + 1)
        setVal('')
        setState('idle')
      } else {
        onDone({ correct: correctRef.current, total: deck.length })
      }
    }, 1150)
  }

  return (
    <form className="type" onSubmit={submit}>
      <div className="type__meter">
        {i + 1} / {deck.length}
      </div>

      <motion.div
        className={`type__prompt ${/[぀-ヿ]/.test(item.prompt) && item.prompt.length <= 4 ? '' : 'type__prompt--text'}`}
        key={item.id}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {item.prompt}
      </motion.div>
      {item.hint && <p className="type__sub">{item.hint}</p>}

      <input
        className={`type__input ${state === 'right' ? 'is-right' : state === 'wrong' ? 'is-wrong' : ''}`}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="type romaji…"
        autoFocus
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        readOnly={state !== 'idle'}
      />

      {state === 'wrong' && <p className="type__answer">Answer: {item.answer}</p>}

      <button className="btn btn--primary" type="submit" disabled={state !== 'idle'}>
        Check
      </button>
    </form>
  )
}
