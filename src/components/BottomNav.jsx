import { motion } from 'framer-motion'
import Icon from './Icon'

const TABS = [
  { id: 'map', icon: 'map', label: 'Map' },
  { id: 'learn', icon: 'learn', label: 'Learn' },
  { id: 'practice', icon: 'practice', label: 'Practice' },
  { id: 'progress', icon: 'progress', label: 'Progress' },
  { id: 'settings', icon: 'settings', label: 'Settings' },
]

// ──────────────────────────────────────────────────────────────────────────
//  BottomNav — persistent tab bar across the main screens.
// ──────────────────────────────────────────────────────────────────────────
export default function BottomNav({ active, onChange }) {
  return (
    <nav className="bottomnav">
      {TABS.map((t) => {
        const on = active === t.id
        return (
          <button
            key={t.id}
            className={`bottomnav__tab ${on ? 'is-active' : ''}`}
            onClick={() => onChange(t.id)}
          >
            <motion.span
              className="bottomnav__icon"
              animate={on ? { y: -3, scale: 1.12 } : { y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            >
              <Icon name={t.icon} size={48} />
            </motion.span>
            <span className="bottomnav__label">{t.label}</span>
            {on && <motion.span layoutId="navdot" className="bottomnav__dot" />}
          </button>
        )
      })}
    </nav>
  )
}
