import { useCallback, useEffect, useMemo, useState } from 'react'
import { review } from '../utils/srs'
import { settleHearts, MAX_HEARTS, HEART_COST } from '../utils/hearts'
import {
  WORLDS,
  TOTAL_NODES,
  getWorldOf,
  worldUnlocked,
  worldBossId,
  jumpToNode,
  getLesson,
  crossedMilestone,
  levelFromXp,
  vocabUnlockedFor,
  titleForLevel,
  sumLevelUpRewards,
  TOTAL_KANA,
  XP_LESSON_CLEAR,
  XP_BOSS_CLEAR,
  XP_PER_CORRECT,
  PETALS_LESSON_CLEAR,
  PETALS_BOSS_CLEAR,
  PETALS_PER_CORRECT,
  PETALS_PER_STAGE,
  FREEZE_COST,
  STARTING_FREEZES,
} from '../data/gameData'

const STORAGE_KEY = 'forest-of-hiragana:v2'
const LAST_BOSS_ID = worldBossId(WORLDS[WORLDS.length - 1])

const DEFAULT_STATE = {
  xp: 0,
  streak: 0, // consecutive DAYS with a completed lesson
  bestStreak: 0,
  lastActive: null, // YYYY-MM-DD of the last day a lesson was cleared
  history: [], // every YYYY-MM-DD the player completed something (for the calendar)
  freezeDays: [], // days bridged by a streak freeze (shown on the calendar)
  freezes: STARTING_FREEZES,
  petals: 0,
  hearts: MAX_HEARTS,
  heartsUpdatedAt: Date.now(),
  completed: [],
  // Per-node stage progress for the 3-stage levels (Learn → Use → Quiz).
  // { [nodeId]: { stagesDone: 0..3, quizPassed: boolean } }
  progress: {},
  // Spaced-repetition memory per item — { 'k:あ' | 'w:ねこ': srsCard }.
  srs: {},
  stats: { lessonsCompleted: 0, totalQuestions: 0, totalCorrect: 0, bossesDefeated: 0, kana: [] },
  settings: { sound: true, music: false, notifications: false, reducedMotion: false },
  account: { signedIn: false, username: null },
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw)
      const merged = {
        ...DEFAULT_STATE,
        ...saved,
        stats: { ...DEFAULT_STATE.stats, ...(saved.stats || {}) },
        settings: { ...DEFAULT_STATE.settings, ...(saved.settings || {}) },
        account: { ...DEFAULT_STATE.account, ...(saved.account || {}) },
      }
      // Credit any heart regen that happened while the app was closed.
      const settled = settleHearts(merged.hearts, merged.heartsUpdatedAt)
      return { ...merged, hearts: settled.hearts, heartsUpdatedAt: settled.updatedAt }
    }
  } catch {
    /* ignore corrupt storage */
  }
  return DEFAULT_STATE
}

export function getNodeStatus(nodeId, completed) {
  const world = getWorldOf(nodeId)
  if (!world) return 'locked'
  // Whole world is sealed until the previous world's boss is cleared.
  if (!worldUnlocked(world.id, completed)) return 'locked'
  if (completed.includes(nodeId)) return 'completed'
  const order = world.nodes.map((n) => n.id)
  const firstIncomplete = order.find((id) => !completed.includes(id))
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
// The date strings strictly between two days (the missed days a freeze covers).
function missedDates(fromStr, toStr) {
  const out = []
  let d = new Date(fromStr + 'T00:00:00')
  const end = new Date(toStr + 'T00:00:00')
  d = new Date(d.getTime() + 86400000)
  while (d < end) {
    out.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)
    d = new Date(d.getTime() + 86400000)
  }
  return out
}

// Advance the daily streak when a lesson is cleared. Same-day clears don't
// bump it; a 1-day gap continues it; bigger gaps are bridged by streak freezes
// (one freeze per missed day) and otherwise reset the streak to 1.
function advanceStreak(prev) {
  const today = todayStr()
  // Already counted today — completing more lessons doesn't bump the streak.
  if (prev.lastActive === today) {
    return { streak: prev.streak, freezes: prev.freezes, lastActive: today, milestone: null, freezeUsedDays: [] }
  }
  let streak
  let freezes = prev.freezes
  let freezeUsedDays = []
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
        freezeUsedDays = missedDates(prev.lastActive, today)
      } else {
        streak = 1
      }
    }
  }
  return { streak, freezes, lastActive: today, milestone: crossedMilestone(prev.streak, streak), freezeUsedDays }
}

// ── Hearts helper ──
// Losing a heart when full starts a fresh regen timer; losing one while
// already below max leaves the existing shared timer untouched (Duolingo-
// style: one timer counts toward the NEXT heart, not one per missing heart).
function loseOneHeart(prev) {
  const settled = settleHearts(prev.hearts, prev.heartsUpdatedAt)
  const wasFull = settled.hearts >= MAX_HEARTS
  return { hearts: Math.max(0, settled.hearts - 1), heartsUpdatedAt: wasFull ? Date.now() : settled.updatedAt }
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

  // Read a node's stage progress (with a safe default for untouched nodes).
  const getProgress = useCallback(
    (nodeId) => state.progress[nodeId] || { stagesDone: 0, quizPassed: false },
    [state.progress],
  )

  // Mark a non-quiz stage (1 = Learn, 2 = Use) as finished. Only ever raises
  // the count, never lowers it, so re-entering a level keeps your progress.
  // Record one review result against an item's SRS card (fires on every graded
  // multiple-choice answer, in lessons and in practice).
  const recordReview = useCallback((itemKey, correct) => {
    if (!itemKey) return
    setState((prev) => ({ ...prev, srs: { ...prev.srs, [itemKey]: review(prev.srs[itemKey], correct) } }))
  }, [])

  const completeStage = useCallback((nodeId, stage) => {
    setState((prev) => {
      const cur = prev.progress[nodeId] || { stagesDone: 0, quizPassed: false }
      if (cur.stagesDone >= stage) return prev
      // Small petal reward for finishing a (non-quiz) stage.
      return {
        ...prev,
        petals: prev.petals + PETALS_PER_STAGE,
        progress: { ...prev.progress, [nodeId]: { ...cur, stagesDone: stage } },
      }
    })
  }, [])

  const passLesson = useCallback((node, correct, total) => {
    const lesson = getLesson(node.lessonId)
    const kanaChars = lesson ? lesson.kana.map((k) => k.char) : []
    setState((prev) => {
      const s = advanceStreak(prev)
      const streakBonus = s.milestone ? s.milestone.bonus : 0
      const xpGain = XP_LESSON_CLEAR + correct * XP_PER_CORRECT
      const nextXp = prev.xp + xpGain
      const lvl = sumLevelUpRewards(levelFromXp(prev.xp), levelFromXp(nextXp))

      // Level-up takes priority over a streak-milestone flash if both land at once.
      if (lvl.leveledUp) {
        setFlash({ text: `Level ${lvl.newLevel} — ${titleForLevel(lvl.newLevel)}! +${lvl.petals} petals`, tier: 'legend' })
      } else if (s.milestone) {
        setFlash({ text: `${s.milestone.label} +${streakBonus} petals`, tier: s.milestone.tier })
      }

      const settledHearts = settleHearts(prev.hearts, prev.heartsUpdatedAt)
      const hearts = lvl.milestoneHeart ? Math.min(MAX_HEARTS, settledHearts.hearts + 1) : settledHearts.hearts

      return {
        ...prev,
        completed: prev.completed.includes(node.id) ? prev.completed : [...prev.completed, node.id],
        progress: { ...prev.progress, [node.id]: { stagesDone: 3, quizPassed: true } },
        xp: nextXp,
        petals: prev.petals + PETALS_LESSON_CLEAR + correct * PETALS_PER_CORRECT + streakBonus + lvl.petals,
        hearts,
        heartsUpdatedAt: settledHearts.updatedAt,
        streak: s.streak,
        bestStreak: Math.max(prev.bestStreak, s.streak),
        freezes: s.freezes,
        lastActive: s.lastActive,
        history: prev.history.includes(s.lastActive) ? prev.history : [...prev.history, s.lastActive],
        freezeDays: s.freezeUsedDays.length ? uniq([...prev.freezeDays, ...s.freezeUsedDays]) : prev.freezeDays,
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

  // Failing a lesson no longer affects the daily streak, but it costs a heart.
  const failLesson = useCallback((_node, correct, total) => {
    setState((prev) => ({
      ...prev,
      ...loseOneHeart(prev),
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
      const xpGain = XP_BOSS_CLEAR
      const nextXp = prev.xp + xpGain
      const lvl = sumLevelUpRewards(levelFromXp(prev.xp), levelFromXp(nextXp))
      setFlash({ text: 'World Cleared!', tier: 'legend' })
      return {
        ...prev,
        completed: prev.completed.includes(node.id) ? prev.completed : [...prev.completed, node.id],
        xp: nextXp,
        petals: prev.petals + PETALS_BOSS_CLEAR + (s.milestone ? s.milestone.bonus : 0) + lvl.petals,
        // Defeating a boss fully refills your hearts.
        hearts: MAX_HEARTS,
        heartsUpdatedAt: Date.now(),
        streak: s.streak,
        bestStreak: Math.max(prev.bestStreak, s.streak),
        freezes: s.freezes,
        lastActive: s.lastActive,
        history: prev.history.includes(s.lastActive) ? prev.history : [...prev.history, s.lastActive],
        freezeDays: s.freezeUsedDays.length ? uniq([...prev.freezeDays, ...s.freezeUsedDays]) : prev.freezeDays,
        stats: { ...prev.stats, bossesDefeated: prev.stats.bossesDefeated + 1 },
      }
    })
  }, [])

  // Losing the boss doesn't break a daily streak, but it costs a heart.
  const loseBoss = useCallback(() => {
    setState((prev) => ({ ...prev, ...loseOneHeart(prev) }))
  }, [])

  const buyFreeze = useCallback(() => {
    setState((prev) =>
      prev.petals >= FREEZE_COST ? { ...prev, petals: prev.petals - FREEZE_COST, freezes: prev.freezes + 1 } : prev,
    )
  }, [])

  const buyHeart = useCallback(() => {
    setState((prev) => {
      const settled = settleHearts(prev.hearts, prev.heartsUpdatedAt)
      if (settled.hearts >= MAX_HEARTS || prev.petals < HEART_COST) return { ...prev, hearts: settled.hearts, heartsUpdatedAt: settled.updatedAt }
      const hearts = settled.hearts + 1
      return {
        ...prev,
        petals: prev.petals - HEART_COST,
        hearts,
        heartsUpdatedAt: hearts >= MAX_HEARTS ? Date.now() : settled.updatedAt,
      }
    })
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

  // Credit any heart regen earned while the app has been sitting open (on top
  // of the load-time settle in loadInitial), so a heart appears without
  // requiring a refresh. The countdown UI itself ticks every second on its own.
  useEffect(() => {
    const t = setInterval(() => {
      setState((prev) => {
        if (prev.hearts >= MAX_HEARTS) return prev
        const settled = settleHearts(prev.hearts, prev.heartsUpdatedAt)
        if (settled.hearts === prev.hearts) return prev
        return { ...prev, hearts: settled.hearts, heartsUpdatedAt: settled.updatedAt }
      })
    }, 30000)
    return () => clearInterval(t)
  }, [])

  // Dev tool: jump straight to any node, auto-completing everything before it.
  const jumpTo = useCallback((nodeId) => {
    const { completed, progress, kana } = jumpToNode(nodeId)
    setState((prev) => ({
      ...prev,
      completed,
      progress,
      xp: completed.length * XP_LESSON_CLEAR,
      stats: { ...prev.stats, kana: uniq([...prev.stats.kana, ...kana]) },
    }))
  }, [])

  const derived = useMemo(() => {
    const { stats } = state
    const level = levelFromXp(state.xp)
    const settledHearts = settleHearts(state.hearts, state.heartsUpdatedAt)
    return {
      level,
      levelTitle: titleForLevel(level),
      vocabUnlocked: vocabUnlockedFor(level),
      worldComplete: state.completed.includes(LAST_BOSS_ID),
      streakActiveToday: state.lastActive === todayStr(),
      accuracy: stats.totalQuestions ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100) : 0,
      kanaMastered: stats.kana.length,
      totalKana: TOTAL_KANA,
      completionPct: Math.round((state.completed.length / TOTAL_NODES) * 100),
      hearts: settledHearts.hearts,
      heartsUpdatedAt: settledHearts.updatedAt,
      outOfHearts: settledHearts.hearts <= 0,
    }
  }, [state])

  return {
    ...state,
    ...derived,
    flash,
    getStatus,
    getProgress,
    completeStage,
    recordReview,
    passLesson,
    failLesson,
    winBoss,
    loseBoss,
    buyFreeze,
    buyHeart,
    updateSetting,
    signIn,
    signOut,
    reset,
    clearFlash,
    jumpTo,
  }
}
