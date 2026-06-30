// ──────────────────────────────────────────────────────────────────────────
//  StageDots — the 3-stage progress indicator that sits under a lesson node.
//
//  Three dots in a gentle downward arc (the middle dot rides a touch lower than
//  the outer two). Filled dots = stages completed (Learn → Use → Quiz).
//
//  This is a themed SVG PLACEHOLDER. Once the Higgsfield forest-dot art is
//  generated (4 variations: 0/3, 1/3, 2/3, 3/3), swap the <svg> for an <img>
//  picked by `done` — the slot, sizing, and placement here stay the same.
// ──────────────────────────────────────────────────────────────────────────
const POINTS = [
  { cx: 9, cy: 8 }, // left  — slightly higher
  { cx: 24, cy: 13 }, // middle — sits lower (the arc)
  { cx: 39, cy: 8 }, // right — slightly higher
]

export default function StageDots({ done = 0, total = 3, className = '' }) {
  return (
    <span className={`stage-dots ${className}`} aria-label={`${done} of ${total} stages complete`}>
      <svg viewBox="0 0 48 22" className="stage-dots__svg" aria-hidden="true">
        {POINTS.map((p, i) => (
          <circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r="5"
            className={`stage-dot ${i < done ? 'is-filled' : ''}`}
          />
        ))}
      </svg>
    </span>
  )
}
