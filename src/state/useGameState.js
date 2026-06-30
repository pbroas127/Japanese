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
  FREEZE_COST,
  STARTING_FREEZES,
} from '../data/gameData'

const STORAGE_KEY = 'forest-of-hiragana:v2'
const NODE_ORDER = WORLD.nodes.map((n) => n.id)

const DEFAULT_STATE = {
  xp: 0,
  streak: 0, // consecutive DAYS with a completed lesson
  bestStreak: 0,
  lastActive: null, // YYYY-MM-DD of the last day a lesson was cleared
  freezes: STARTING_FREEZES,
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

export function getNodeStatus(nodeId, completed) {
  if (completed.includes(nodeId)) return 'completed'
  const firstIncomplete = NODE_ORDER.find((id) => !completed.includes(id))
  return nodeId === firstIncomplete ? 'current' : 'locked'
}

function uniq(arr) {
  return [...new Set(arr)]
}

// ── Daily-streak helpers ──
function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
function dayDiff(a, b) {
  return Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000)
}

// Advance the daily streak when a lesson is cleared. Same-day clears don't
// bump it; a 1-day gap continues it; bigger gaps are bridged by streak freezes
// (one freeze per missed day) and otherwise reset the streak to 1.
function advanceStreak(prev) {
  const today = todayStr()
  if (prev.lastActive === today) {
    return { streak: prev.streak, freezes: prev.freezes, lastActive: today, milestone: null }
  }
  let streak
  let freezes = prev.freezes
  if (!prev.lastActive) {
    streak = 1
  } else {
    const gap = dayDiff(prev.lastActive, today)
    if (gap <= 1) {
      streak = prev.streak + 1
    } else {
      const missed = gap - 1
      if (freezes >= missed) {
        freezes -= missed
        streak = prev.streak + 1
      } else {
        streak = 1
      }
    }
  }
  return { streak, freezes, lastActive: today, milestone: crossedMilestone(prev.streak, streak) }
}

export function useGameState() {
  const [state, setState] = useState(loadInitial)
  const [flash, setFlash] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* ignore */
    }
  }, [state])

  const getStatus = useCallback((nodeId) => getNodeStatus(nodeId, state.completed), [state.completed])

  const passLesson = useCallback((node, correct, total) => {
    const lesson = getLesson(node.lessonId)
    const kanaChars = lesson ? lesson.kana.map((k) => k.char) : []
    setState((prev) => {
      const s = advanceStreak(prev)
      const bonus = s.milestone ? s.milestone.bonus : 0
      if (s.milestone) setFlash({ text: `${s.milestone.label} +${bonus} petals`, tier: s.milestone.tier })
      return {
        ...prev,
        completed: prev.completed.includes(node.id) ? prev.completed : [...prev.completed, node.id],
        xp: prev.xp + XP_LESSON_CLEAR + correct * XP_PER_CORRECT,
        petals: prev.petals + PETALS_LESSON_CLEAR + correct * PETALS_PER_CORRECT + bonus,
        streak: s.streak,
        bestStreak: Math.max(prev.bestStreak, s.streak),
        freezes: s.freezes,
        lastActive: s.lastActive,
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

  // Failing a lesson no longer affects the daily streak; the attempt still
  // counts toward accuracy.
  const failLesson = useCallback((_node, correct, total) => {
    setState((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        totalQuestions: prev.stats.totalQuestions + total,
        totalCorrect: prev.stats.totalCorrect + correct,
      },
    }))
  }, [])

  const winBoss = useCallback((node) => {
    setState((prev) => {
      const s = advanceStreak(prev)
      const bonus = s.milestone ? s.milestone.bonus : 0
      setFlash({ text: 'World Cleared!', tier: 'legend' })
      return {
        ...prev,
        completed: prev.completed.includes(node.id) ? prev.completed : [...prev.completed, node.id],
        xp: prev.xp + XP_BOSS_CLEAR,
        petals: prev.petals + PETALS_BOSS_CLEAR + bonus,
        streak: s.streak,
        bestStreak: Math.max(prev.bestStreak, s.streak),
        freezes: s.freezes,
        lastActive: s.lastActive,
        stats: { ...prev.stats, bossesDefeated: prev.stats.bossesDefeated + 1 },
      }
    })
  }, [])

  // Losing the boss doesn't break a daily streak.
  const loseBoss = useCallback(() => {}, [])

  const buyFreeze = useCallback(() => {
    setState((prev) =>
      prev.petals >= FREEZE_COST ? { ...prev, petals: prev.petals - FREEZE_COST, freezes: prev.freezes + 1 } : prev,
    )
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
    buyFreeze,
    updateSetting,
    signIn,
    signOut,
    reset,
    clearFlash,
  }
}
