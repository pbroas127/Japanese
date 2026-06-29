import { useCallback, useEffect, useRef, useState } from 'react'

// ──────────────────────────────────────────────────────────────────────────
//  useTransientState — drives the "idle → action → idle" animation loop.
//
//  Calling `play('happy')` sets the state to 'happy', then automatically
//  returns it to the idle/base state after `duration` ms. This guarantees
//  characters never get stuck in a non-idle state.
// ──────────────────────────────────────────────────────────────────────────
export function useTransientState(base = 'idle', defaultDuration = 900) {
  const [state, setState] = useState(base)
  const timer = useRef(null)

  const play = useCallback(
    (next, duration = defaultDuration) => {
      if (timer.current) clearTimeout(timer.current)
      setState(next)
      if (next !== base) {
        timer.current = setTimeout(() => setState(base), duration)
      }
    },
    [base, defaultDuration],
  )

  // Force back to idle immediately (used on unmount / screen change).
  const reset = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    setState(base)
  }, [base])

  useEffect(() => () => timer.current && clearTimeout(timer.current), [])

  return [state, play, reset]
}
