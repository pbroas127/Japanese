import { useCallback, useEffect, useState } from 'react'
import { WORLDS } from '../data/gameData'

// ──────────────────────────────────────────────────────────────────────────
//  useLayoutEditor — dev-only tool state for hand-placing a world's Kiko home,
//  dotted path, and node positions on its real background art. Holds one
//  layout per EDITABLE world (World 1 / forest is finalized and excluded),
//  persisted to localStorage, with an Export that dumps every edited world at
//  once so it can be pasted back and baked into gameData.js in one go.
// ──────────────────────────────────────────────────────────────────────────
const KEY = 'foh:layout-editor:v3'
export const EDITABLE_WORLD_IDS = WORLDS.filter((w) => w.id !== 'forest').map((w) => w.id)

function defaultLayoutFor(worldId) {
  const world = WORLDS.find((w) => w.id === worldId)
  const nodes = {}
  world.nodes.forEach((n) => {
    nodes[n.id] = { ...n.pos }
  })
  return { kiko: { ...world.kikoHome }, path: world.path.map((p) => ({ ...p })), nodes }
}

function defaultState() {
  const state = {}
  EDITABLE_WORLD_IDS.forEach((id) => {
    state[id] = defaultLayoutFor(id)
  })
  return state
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const saved = JSON.parse(raw)
      const base = defaultState()
      // Merge saved over defaults so a newly-added editable world isn't missing.
      return { ...base, ...saved }
    }
  } catch {
    /* ignore corrupt storage */
  }
  return defaultState()
}

export function useLayoutEditor() {
  const [state, setState] = useState(loadInitial)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* ignore */
    }
  }, [state])

  const setNode = useCallback((worldId, nodeId, pos) => {
    setState((prev) => ({ ...prev, [worldId]: { ...prev[worldId], nodes: { ...prev[worldId].nodes, [nodeId]: pos } } }))
  }, [])

  const setKiko = useCallback((worldId, pos) => {
    setState((prev) => ({ ...prev, [worldId]: { ...prev[worldId], kiko: pos } }))
  }, [])

  const setWaypoint = useCallback((worldId, i, pos) => {
    setState((prev) => {
      const path = [...prev[worldId].path]
      path[i] = pos
      return { ...prev, [worldId]: { ...prev[worldId], path } }
    })
  }, [])

  const addWaypoint = useCallback((worldId) => {
    setState((prev) => {
      const path = prev[worldId].path
      const last = path[path.length - 1] || { x: 50, y: 50 }
      return { ...prev, [worldId]: { ...prev[worldId], path: [...path, { x: last.x, y: Math.max(0, last.y - 5) }] } }
    })
  }, [])

  const removeWaypoint = useCallback((worldId, i) => {
    setState((prev) => ({ ...prev, [worldId]: { ...prev[worldId], path: prev[worldId].path.filter((_, idx) => idx !== i) } }))
  }, [])

  const reset = useCallback((worldId) => {
    setState((prev) => ({ ...prev, [worldId]: defaultLayoutFor(worldId) }))
  }, [])

  return { layouts: state, setNode, setKiko, setWaypoint, addWaypoint, removeWaypoint, reset }
}
