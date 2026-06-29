import { useMemo, useRef, useState } from 'react'
import { WORLD } from '../data/gameData'
import { NODE_ASSETS, NODE_FALLBACK, WORLD_ASSETS, WORLD_FALLBACK } from '../assets/assetMap'
import { useLayoutEditor } from '../state/useLayoutEditor'
import { smoothPath } from '../utils/path'
import KikoCharacter from './KikoCharacter'

// ──────────────────────────────────────────────────────────────────────────
//  MapEditor — a built-in layout tool. Drag the nodes, Kiko, and path
//  waypoints onto the painted dirt path, shape the dotted curve, then Export
//  the coordinates to paste back. Meant to be removed once positions are baked.
// ──────────────────────────────────────────────────────────────────────────
export default function MapEditor({ onExit }) {
  const { layout, setNode, setKiko, setWaypoint, addWaypoint, removeWaypoint, reset } = useLayoutEditor()
  const sceneRef = useRef(null)
  const [showExport, setShowExport] = useState(false)
  const [copied, setCopied] = useState(false)

  // pointer position → % of the scene (clamped, 1 decimal)
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

  const exportText = useMemo(
    () =>
      JSON.stringify(
        {
          kikoHome: layout.kiko,
          nodes: WORLD.nodes.map((n) => ({ id: n.id, pos: layout.nodes[n.id] })),
          path: layout.path,
        },
        null,
        2,
      ),
    [layout],
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

  return (
    <div className="editor">
      <div className="editor__bar editor__bar--top">
        <span className="editor__title">🛠 Layout editor</span>
        <button className="editor__done" onClick={onExit}>Done</button>
      </div>

      <div className="editor__stage">
        <div
          className="worldmap__scene editor__scene"
          ref={sceneRef}
          style={{ aspectRatio: `${WORLD.art.w} / ${WORLD.art.h}` }}
        >
          <img
            className="worldmap__bg-img"
            src={WORLD_ASSETS.background}
            alt=""
            draggable={false}
            onError={(e) => {
              if (!e.currentTarget.dataset.fb) {
                e.currentTarget.dataset.fb = '1'
                e.currentTarget.src = WORLD_FALLBACK.background
              }
            }}
          />

          {/* editable dotted path */}
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

          {/* path waypoints */}
          {layout.path.map((p, i) => (
            <button
              key={i}
              className="editor__wp"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              onPointerDown={drag((pos) => setWaypoint(i, pos))}
              onDoubleClick={() => removeWaypoint(i)}
              title={`waypoint ${i + 1} (double-tap to delete)`}
            >
              {i + 1}
            </button>
          ))}

          {/* nodes */}
          {WORLD.nodes.map((node) => {
            const pos = layout.nodes[node.id]
            const set = NODE_ASSETS[node.marker] || NODE_ASSETS.book
            return (
              <div
                key={node.id}
                className={`editor__node ${node.type === 'boss' ? 'is-boss' : ''}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onPointerDown={drag((p) => setNode(node.id, p))}
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

          {/* Kiko */}
          <div
            className="editor__kiko"
            style={{ left: `${layout.kiko.x}%`, top: `${layout.kiko.y}%` }}
            onPointerDown={drag(setKiko)}
          >
            <KikoCharacter state="idle" size={84} shadow={false} />
            <span className="editor__tag">fox · {layout.kiko.x},{layout.kiko.y}</span>
          </div>
        </div>
      </div>

      <div className="editor__bar editor__bar--bottom">
        <button className="editor__btn" onClick={addWaypoint}>＋ Vertex</button>
        <button className="editor__btn" onClick={() => removeWaypoint(layout.path.length - 1)}>－ Vertex</button>
        <button className="editor__btn" onClick={reset}>Reset</button>
        <button className="editor__btn editor__btn--primary" onClick={() => setShowExport(true)}>Export</button>
      </div>

      {showExport && (
        <div className="editor__export" onClick={() => setShowExport(false)}>
          <div className="editor__export-card" onClick={(e) => e.stopPropagation()}>
            <h3>Copy this & paste it back to me</h3>
            <textarea className="editor__export-text" readOnly value={exportText} onFocus={(e) => e.target.select()} />
            <div className="editor__export-actions">
              <button className="editor__btn" onClick={() => setShowExport(false)}>Close</button>
              <button className="editor__btn editor__btn--primary" onClick={copy}>{copied ? 'Copied ✓' : 'Copy'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
