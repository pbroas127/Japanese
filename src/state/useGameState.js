import { useCallback, useEffect, useMemo, useState } from 'react'
import { WORLD, XP_LESSON_CLEAR, XP_BOSS_CLEAR } from '../data/gameData'

const STORAGE_KEY = 'forest-of-hiragana:v1'
const NODE_ORDER = WORLD.nodes.map((n) => n.id)

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore corrupt storage */
  }
  return { xp: 0, streak: 0, bestStreak: 0, completed: [] }
}

// Derive a node's visual status purely from which nodes are completed.
// completed → cleared; the first not-completed node → current; rest → locked.
export function getNodeStatus(nodeId, completed) {
  if (completed.includes(nodeId)) return 'completed'
  const firstIncomplete = NODE_ORDER.find((id) => !completed.includes(id))
  return nodeId === firstIncomplete ? 'current' : 'locked'
}

export function useGameState() {
  const [state, setState] = useState(loadInitial)

  // Persist progress locally (no backend in the MVP).
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage may be unavailable; ignore */
    }
  }, [state])

  const getStatus = useCallback((nodeId) => getNodeStatus(nodeId, state.completed), [state.completed])

  // Clear a lesson node: mark complete, unlock next, gain XP, grow streak.
  const passLesson = useCallback((nodeId, correctCount, total) => {
    setState((prev) => {
      const completed = prev.completed.includes(nodeId)
        ? prev.completed
        : [...prev.completed, nodeId]
      const gained = XP_LESSON_CLEAR + correctCount * 10
      const streak = prev.streak + 1
      return {
        ...prev,
        completed,
        xp: prev.xp + gained,
        streak,
        bestStreak: Math.max(prev.bestStreak, streak),
      }
    })
  }, [])

  // Failed a lesson: no unlock, streak resets.
  const failLesson = useCallback(() => {
    setState((prev) => ({ ...prev, streak: 0 }))
  }, [])

  // Won the boss: complete the world, big XP, streak grows.
  const winBoss = useCallback((nodeId) => {
    setState((prev) => {
      const completed = prev.completed.includes(nodeId)
        ? prev.completed
        : [...prev.completed, nodeId]
      const streak = prev.streak + 1
      return {
        ...prev,
        completed,
        xp: prev.xp + XP_BOSS_CLEAR,
        streak,
        bestStreak: Math.max(prev.bestStreak, streak),
      }
    })
  }, [])

  // Lost the boss: streak resets, node stays incomplete.
  const loseBoss = useCallback(() => {
    setState((prev) => ({ ...prev, streak: 0 }))
  }, [])

  const reset = useCallback(() => {
    setState({ xp: 0, streak: 0, bestStreak: 0, completed: [] })
  }, [])

  const worldComplete = useMemo(() => state.completed.includes('boss'), [state.completed])

  return {
    ...state,
    worldComplete,
    getStatus,
    passLesson,
    failLesson,
    winBoss,
    loseBoss,
    reset,
  }
}
