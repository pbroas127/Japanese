import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  WORLD,
  getLesson,
  crossedMilestone,
  levelFromXp,
  TOTAL_KANA,
  XP_LESSON_CLEAR,
  XP_BOSS_CLEAR,
  XP_PER_CORRECT,
  PETALS_LESSON_CLEAR,
  PETALS_BOSS_CLEAR,
  PETALS_PER_CORRECT,
} from '../data/gameData'

const STORAGE_KEY = 'forest-of-hiragana:v2'
const NODE_ORDER = WORLD.nodes.map((n) => n.id)

const DEFAULT_STATE = {
  xp: 0,
  streak: 0,
  bestStreak: 0,
  petals: 0,
  completed: [],
  stats: { lessonsCompleted: 0, totalQuestions: 0, totalCorrect: 0, bossesDefeated: 0, kana: [] },
  settings: { sound: true, music: false, notifications: false, reducedMotion: false },
  account: { signedIn: false, username: null },
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw)
      return {
        ...DEFAULT_STATE,
        ...saved,
        stats: { ...DEFAULT_STATE.stats, ...(saved.stats || {}) },
        settings: { ...DEFAULT_STATE.settings, ...(saved.settings || {}) },
        account: { ...DEFAULT_STATE.account, ...(saved.account || {}) },
      }
    }
  } catch {
    /* ignore corrupt storage */
  }
  return DEFAULT_STATE
}

// Derive a node's status purely from which nodes are completed.
export function getNodeStatus(nodeId, completed) {
  if (completed.includes(nodeId)) return 'completed'
  const firstIncomplete = NODE_ORDER.find((id) => !completed.includes(id))
  return nodeId === firstIncomplete ? 'current' : 'locked'
}

function uniq(arr) {
  return [...new Set(arr)]
}

export function useGameState() {
  const [state, setState] = useState(loadInitial)
  const [flash, setFlash] = useState(null) // transient milestone/event toast

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage may be unavailable; ignore */
    }
  }, [state])

  const getStatus = useCallback((nodeId) => getNodeStatus(nodeId, state.completed), [state.completed])

  // Clear a lesson: unlock + XP + petals + streak + stats, with milestone bonus.
  const passLesson = useCallback((node, correct, total) => {
    const lesson = getLesson(node.lessonId)
    const kanaChars = lesson ? lesson.kana.map((k) => k.char) : []
    setState((prev) => {
      const newStreak = prev.streak + 1
      const milestone = crossedMilestone(prev.streak, newStreak)
      const bonus = milestone ? milestone.bonus : 0
      if (milestone) setFlash({ text: `${milestone.label} +${bonus} 🌸`, tier: milestone.tier })
      return {
        ...prev,
        completed: prev.completed.includes(node.id) ? prev.completed : [...prev.completed, node.id],
        xp: prev.xp + XP_LESSON_CLEAR + correct * XP_PER_CORRECT,
        petals: prev.petals + PETALS_LESSON_CLEAR + correct * PETALS_PER_CORRECT + bonus,
        streak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        stats: {
          ...prev.stats,
          lessonsCompleted: prev.stats.lessonsCompleted + 1,
          totalQuestions: prev.stats.totalQuestions + total,
          totalCorrect: prev.stats.totalCorrect + correct,
          kana: uniq([...prev.stats.kana, ...kanaChars]),
        },
      }
    })
  }, [])

  // Failed a lesson: no unlock, streak resets, but the attempt still counts.
  const failLesson = useCallback((_node, correct, total) => {
    setState((prev) => ({
      ...prev,
      streak: 0,
      stats: {
        ...prev.stats,
        totalQuestions: prev.stats.totalQuestions + total,
        totalCorrect: prev.stats.totalCorrect + correct,
      },
    }))
  }, [])

  const winBoss = useCallback((node) => {
    setState((prev) => {
      const newStreak = prev.streak + 1
      const milestone = crossedMilestone(prev.streak, newStreak)
      const bonus = milestone ? milestone.bonus : 0
      setFlash({ text: 'World Cleared! 🌳', tier: 'legend' })
      return {
        ...prev,
        completed: prev.completed.includes(node.id) ? prev.completed : [...prev.completed, node.id],
        xp: prev.xp + XP_BOSS_CLEAR,
        petals: prev.petals + PETALS_BOSS_CLEAR + bonus,
        streak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        stats: { ...prev.stats, bossesDefeated: prev.stats.bossesDefeated + 1 },
      }
    })
  }, [])

  const loseBoss = useCallback(() => {
    setState((prev) => ({ ...prev, streak: 0 }))
  }, [])

  const updateSetting = useCallback((key, value) => {
    setState((prev) => ({ ...prev, settings: { ...prev.settings, [key]: value } }))
  }, [])

  const signIn = useCallback((username) => {
    setState((prev) => ({ ...prev, account: { signedIn: true, username: username || 'Explorer' } }))
  }, [])
  const signOut = useCallback(() => {
    setState((prev) => ({ ...prev, account: { signedIn: false, username: null } }))
  }, [])

  const reset = useCallback(() => {
    setFlash(null)
    setState({ ...DEFAULT_STATE, stats: { ...DEFAULT_STATE.stats, kana: [] } })
  }, [])

  const clearFlash = useCallback(() => setFlash(null), [])

  const derived = useMemo(() => {
    const { stats } = state
    return {
      level: levelFromXp(state.xp),
      worldComplete: state.completed.includes('boss'),
      accuracy: stats.totalQuestions ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100) : 0,
      kanaMastered: stats.kana.length,
      totalKana: TOTAL_KANA,
      completionPct: Math.round((state.completed.length / WORLD.nodes.length) * 100),
    }
  }, [state])

  return {
    ...state,
    ...derived,
    flash,
    getStatus,
    passLesson,
    failLesson,
    winBoss,
    loseBoss,
    updateSetting,
    signIn,
    signOut,
    reset,
    clearFlash,
  }
}
