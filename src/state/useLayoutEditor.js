import { useCallback, useEffect, useState } from 'react'
import { WORLD } from '../data/gameData'

// ──────────────────────────────────────────────────────────────────────────
//  useLayoutEditor — holds the draggable layout (node positions, Kiko's spot,
//  and the path waypoints) while you arrange the map in-app. Persists to
//  localStorage so a reload keeps your arrangement. Export the result and
//  paste it back so the coordinates can be baked into gameData.js.
// ──────────────────────────────────────────────────────────────────────────
const KEY = 'foh:layout-editor:v2'

function defaultLayout() {
  const nodes = {}
  WORLD.nodes.forEach((n) => {
    nodes[n.id] = { x: n.pos.x, y: n.pos.y }
  })
  return {
    nodes,
    kiko: { x: WORLD.kikoHome.x, y: WORLD.kikoHome.y },
    path: WORLD.nodes.map((n) => ({ x: n.pos.x, y: n.pos.y })),
  }
}

export function useLayoutEditor() {
  const [layout, setLayout] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) return JSON.parse(raw)
    } catch {
      /* ignore */
    }
    return defaultLayout()
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(layout))
    } catch {
      /* ignore */
    }
  }, [layout])

  const setNode = useCallback((id, pos) => {
    setLayout((l) => ({ ...l, nodes: { ...l.nodes, [id]: pos } }))
  }, [])
  const setKiko = useCallback((pos) => setLayout((l) => ({ ...l, kiko: pos })), [])
  const setWaypoint = useCallback((i, pos) => {
    setLayout((l) => {
      const path = [...l.path]
      path[i] = pos
      return { ...l, path }
    })
  }, [])
  const addWaypoint = useCallback(() => {
    setLayout((l) => ({ ...l, path: [...l.path, { x: 50, y: 50 }] }))
  }, [])
  const removeWaypoint = useCallback((i) => {
    setLayout((l) => ({ ...l, path: l.path.filter((_, idx) => idx !== i) }))
  }, [])
  const reset = useCallback(() => setLayout(defaultLayout()), [])

  return { layout, setNode, setKiko, setWaypoint, addWaypoint, removeWaypoint, reset }
}
