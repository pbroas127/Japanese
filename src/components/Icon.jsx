// ──────────────────────────────────────────────────────────────────────────
//  Icon — a single inline-SVG icon set (no emojis, transparent, inherits
//  currentColor). Line icons by default; a few are solid-filled.
// ──────────────────────────────────────────────────────────────────────────
const SOLID = new Set(['flame', 'petal', 'star', 'sparkle', 'tree', 'play', 'fox', 'settings', 'heart'])

const BODY = {
  map: (
    <>
      <path d="M9 4 3 7v13l6-3 6 3 6-3V4l-6 3-6-3Z" />
      <path d="M9 4v13M15 7v13" />
    </>
  ),
  learn: <path d="M12 6C9.5 4.3 6 4.3 3.5 5.2V19c2.5-.9 6-.9 8.5.8 2.5-1.7 6-1.7 8.5-.8V5.2C18 4.3 14.5 4.3 12 6Zm0 0v13" />,
  practice: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  progress: (
    <>
      <path d="M4 4v16h16" />
      <path d="M7 15l4-4 3 2 4-5" />
    </>
  ),
  settings: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0 0 13.6 2h-4c-.25 0-.45.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1a.5.5 0 0 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.04.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.07-1.65zM11.6 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"
    />
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21v-1a6 6 0 0 1 12 0v1" />
    </>
  ),
  flame: <path d="M12 2c.5 3-1.8 4.6-3.2 6.3C7.2 10 6 11.7 6 14a6 6 0 0 0 12 0c0-2.4-1.2-4-2.4-5.6.4 1.8-.6 2.8-1.6 2.9 1-2.6-.6-6.6-2-9.3Z" />,
  petal: (
    <g fill="currentColor" stroke="none">
      <ellipse cx="12" cy="5.5" rx="2.4" ry="3.6" />
      <ellipse cx="12" cy="5.5" rx="2.4" ry="3.6" transform="rotate(72 12 12)" />
      <ellipse cx="12" cy="5.5" rx="2.4" ry="3.6" transform="rotate(144 12 12)" />
      <ellipse cx="12" cy="5.5" rx="2.4" ry="3.6" transform="rotate(216 12 12)" />
      <ellipse cx="12" cy="5.5" rx="2.4" ry="3.6" transform="rotate(288 12 12)" />
      <circle cx="12" cy="12" r="1.7" fill="#fff" />
    </g>
  ),
  freeze: (
    <>
      <path d="M12 2v20M3.5 7l17 10M20.5 7l-17 10" />
      <path d="M12 6l-2-2m2 2 2-2M12 18l-2 2m2-2 2 2M6.5 9 4 8.7M6.5 9 6 11.5M17.5 9l2.5-.3M17.5 9l.5 2.5M6.5 15 4 15.3M6.5 15 6 12.5M17.5 15l2.5.3M17.5 15l.5-2.5" />
    </>
  ),
  check: <path d="M5 12.5 10 17.5 19.5 7" strokeWidth="2.6" />,
  star: <path d="M12 3l2.6 5.5 6 .7-4.4 4.1 1.2 5.9L12 16.9 6.6 19.2l1.2-5.9L3.4 9.2l6-.7L12 3Z" />,
  sparkle: <path d="M12 2c.4 4.6 4.4 8.6 9 9-4.6.4-8.6 4.4-9 9-.4-4.6-4.4-8.6-9-9 4.6-.4 8.6-4.4 9-9Z" />,
  book: <path d="M12 6C9.5 4.3 6 4.3 3.5 5.2V19c2.5-.9 6-.9 8.5.8 2.5-1.7 6-1.7 8.5-.8V5.2C18 4.3 14.5 4.3 12 6Zm0 0v13" />,
  scroll: (
    <>
      <path d="M7 4h9a2 2 0 0 1 2 2v12a2 2 0 0 0 2 2H9a2 2 0 0 1-2-2V4Z" />
      <path d="M7 4a2 2 0 0 0-2 2v1.5h2M11 9h4M11 13h4" />
    </>
  ),
  lantern: (
    <>
      <path d="M9.5 3h5M11 3v2M13 3v2" />
      <path d="M8 5.5h8L15 16H9L8 5.5Z" />
      <path d="M10 18h4M11.5 18v2M12.5 18v2M10.5 9.5h3" />
    </>
  ),
  torii: (
    <>
      <path d="M3 7.5h18M4.5 10h15" />
      <path d="M3.5 7.5 4.5 4.5h15l1 3" />
      <path d="M6.5 10v10M17.5 10v10" />
    </>
  ),
  study: (
    <>
      <path d="M9.5 20h5M10.5 22h3" />
      <path d="M12 2a6.5 6.5 0 0 0-4 11.6c.8.7 1 1.5 1 2.4h6c0-.9.2-1.7 1-2.4A6.5 6.5 0 0 0 12 2Z" />
    </>
  ),
  sword: (
    <>
      <path d="M14.5 14.5 21 4l-1 5-6.5 6.5" />
      <path d="M3 21l4-4M5.5 18.5 14.5 9.5" />
      <path d="M13 17l4 4M15 15l4 4" />
    </>
  ),
  tree: <path d="M12 2 7 9h3l-4 6h4v5h4v-5h4l-4-6h3L12 2Z" />,
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  play: <path d="M7 4l13 8-13 8V4Z" />,
  fox: (
    <g fill="currentColor" stroke="none">
      <path d="M4 5l4 3c2.4-1 5.6-1 8 0l4-3-1 6c.7 1.3 1 2.6 1 4 0 3.6-3.1 6-8 6s-8-2.4-8-6c0-1.4.3-2.7 1-4L4 5Z" />
      <circle cx="9.5" cy="12" r="1.1" fill="#2c2016" />
      <circle cx="14.5" cy="12" r="1.1" fill="#2c2016" />
    </g>
  ),
  heart: <path d="M12 20.5S3.5 15.3 3.5 9.3A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.5 3.1c0 6-8.5 11.2-8.5 11.2Z" />,
  plus: <path d="M12 5v14M5 12h14" strokeWidth="3" />,
}

export default function Icon({ name, size = 24, className = '', strokeWidth }) {
  const solid = SOLID.has(name)
  const body = BODY[name] || BODY.star
  return (
    <svg
      className={`icon icon--${name} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={solid ? 'currentColor' : 'none'}
      stroke={solid ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {body}
    </svg>
  )
}
