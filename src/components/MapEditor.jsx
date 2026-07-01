import { useMemo, useRef, useState } from 'react'
import { WORLDS } from '../data/gameData'
import { NODE_ASSETS, NODE_FALLBACK, WORLD_ASSETS, WORLD_FALLBACK } from '../assets/assetMap'
import { useLayoutEditor, EDITABLE_WORLD_IDS } from '../state/useLayoutEditor'
import { smoothPath } from '../utils/path'
import KikoCharacter from './KikoCharacter'

// ──────────────────────────────────────────────────────────────────────────
//  MapEditor — a built-in layout tool for World 2 and World 3 (World 1 is
//  already finalized). Switch worlds with the tabs, drag the nodes, Kiko, and
//  path waypoints onto that world's real background, shape the dotted curve,
//  then Export every edited world at once to paste back and bake in.
// ──────────────────────────────────────────────────────────────────────────
export default function MapEditor({ onExit }) {
  const { layouts, setNode, setKiko, setWaypoint, addWaypoint, removeWaypoint, reset } = useLayoutEditor()
  const [worldId, setWorldId] = useState(EDITABLE_WORLD_IDS[0])
  const world = WORLDS.find((w) => w.id === worldId)
  const layout = layouts[worldId]
  const sceneRef = useRef(null)
  const [showExport, setShowExport] = useState(false)
  const [copied, setCopied] = useState(false)

  const pct = (clientX, clientY) => {
    const r = sceneRef.current.getBoundingClientRect()
    const x = Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100))
    const y = Math.min(100, Math.max(0, ((clientY - r.top) / r.height) * 100))
    return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 }
  }
  const drag = (onMove) => (e) => {
    e.preventDefault()
    e.stopPropagation()
    const move = (ev) => onMove(pct(ev.clientX, ev.clientY))
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  // Dumps EVERY editable world's current layout in one paste-able blob.
  const exportText = useMemo(
    () =>
      JSON.stringify(
        Object.fromEntries(
          EDITABLE_WORLD_IDS.map((id) => {
            const w = WORLDS.find((x) => x.id === id)
            return [
              id,
              {
                kikoHome: layouts[id].kiko,
                nodes: w.nodes.map((n) => ({ id: n.id, pos: layouts[id].nodes[n.id] })),
                path: layouts[id].path,
              },
            ]
          }),
        ),
        null,
        2,
      ),
    [layouts],
  )

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(exportText)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard may be blocked; the textarea is still selectable */
    }
  }

  const markerSet = NODE_ASSETS[worldId] || NODE_ASSETS.forest

  return (
    <div className="editor">
      <div className="editor__bar editor__bar--top">
        <span className="editor__title">Layout editor</span>
        <button className="editor__done" onClick={onExit}>Done</button>
      </div>

      <div className="editor__worlds">
        {EDITABLE_WORLD_IDS.map((id) => (
          <button
            key={id}
            className={`editor__world-tab ${id === worldId ? 'is-on' : ''}`}
            onClick={() => setWorldId(id)}
          >
            {WORLDS.find((w) => w.id === id).name}
          </button>
        ))}
      </div>

      <div className="editor__stage">
        <div className="worldmap__scene editor__scene" ref={sceneRef}>
          <img
            className="worldmap__bg-img"
            src={WORLD_ASSETS[worldId] || WORLD_ASSETS.forest}
            alt=""
            draggable={false}
            onError={(e) => {
              if (!e.currentTarget.dataset.fb) {
                e.currentTarget.dataset.fb = '1'
                e.currentTarget.src = WORLD_FALLBACK[worldId] || WORLD_FALLBACK.forest
              }
            }}
          />

          <svg className="worldmap__trail" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d={smoothPath(layout.path)}
              fill="none"
              stroke="#fff"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="0.1 4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {layout.path.map((p, i) => (
            <button
              key={i}
              className="editor__wp"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              onPointerDown={drag((pos) => setWaypoint(worldId, i, pos))}
              onDoubleClick={() => removeWaypoint(worldId, i)}
              title={`waypoint ${i + 1} (double-tap to delete)`}
            >
              {i + 1}
            </button>
          ))}

          {world.nodes.map((node) => {
            const pos = layout.nodes[node.id]
            const set = markerSet[node.marker] || markerSet.book
            return (
              <div
                key={node.id}
                className={`editor__node ${node.type === 'boss' ? 'is-boss' : ''}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onPointerDown={drag((p) => setNode(worldId, node.id, p))}
              >
                <img
                  src={set.unlocked}
                  alt=""
                  draggable={false}
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fb) {
                      e.currentTarget.dataset.fb = '1'
                      e.currentTarget.src = NODE_FALLBACK[node.marker]
                    }
                  }}
                />
                <span className="editor__tag">
                  {node.label} · {pos.x},{pos.y}
                </span>
              </div>
            )
          })}

          <div
            className="editor__kiko"
            style={{ left: `${layout.kiko.x}%`, top: `${layout.kiko.y}%` }}
            onPointerDown={drag((pos) => setKiko(worldId, pos))}
          >
            <KikoCharacter state="idle" size={84} shadow={false} />
            <span className="editor__tag">fox · {layout.kiko.x},{layout.kiko.y}</span>
          </div>
        </div>
      </div>

      <div className="editor__bar editor__bar--bottom">
        <button className="editor__btn" onClick={() => addWaypoint(worldId)}>+ Vertex</button>
        <button className="editor__btn" onClick={() => removeWaypoint(worldId, layout.path.length - 1)}>- Vertex</button>
        <button className="editor__btn" onClick={() => reset(worldId)}>Reset</button>
        <button className="editor__btn editor__btn--primary" onClick={() => setShowExport(true)}>Export</button>
      </div>

      {showExport && (
        <div className="editor__export" onClick={() => setShowExport(false)}>
          <div className="editor__export-card" onClick={(e) => e.stopPropagation()}>
            <h3>Copy this &amp; paste it back to me</h3>
            <p className="editor__export-note">Includes every world you've edited, not just the one shown.</p>
            <textarea className="editor__export-text" readOnly value={exportText} onFocus={(e) => e.target.select()} />
            <div className="editor__export-actions">
              <button className="editor__btn" onClick={() => setShowExport(false)}>Close</button>
              <button className="editor__btn editor__btn--primary" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
