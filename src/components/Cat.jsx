// Babbi's cat, drawn in the same blue line style as the logo.
// variants:
//   peek – head and two paws, made to sit on top of an edge (card, footer, input)
//   hero – cat holding a fish overhead, like the logo
//   face – just the face, for small icons
const INK = '#16587B'
const ROCK = '#84B3CE'
const CREAM = '#F5EEDD'
const LINE = { stroke: INK, strokeLinecap: 'round', strokeLinejoin: 'round' }

function Face({ dy = 0 }) {
  return (
    <g transform={`translate(0 ${dy})`}>
      {/* ears */}
      <path d="M30 50 L33 18 L55 36 Z" fill={ROCK} strokeWidth="3" {...LINE} />
      <path d="M90 50 L87 18 L65 36 Z" fill={ROCK} strokeWidth="3" {...LINE} />
      {/* head */}
      <ellipse cx="60" cy="62" rx="35" ry="28" fill={CREAM} strokeWidth="3" {...LINE} />
      {/* watercolour patch, like the logo */}
      <ellipse cx="82" cy="52" rx="9" ry="7" fill={ROCK} opacity="0.55" />
      {/* eyes (they blink) */}
      <ellipse className="cat-eye" cx="47" cy="60" rx="2.8" ry="3.2" fill={INK} />
      <ellipse className="cat-eye" cx="73" cy="60" rx="2.8" ry="3.2" fill={INK} />
      {/* nose and smile */}
      <path d="M57 67 H63 L60 71 Z" fill={INK} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M60 71 Q56 76 52 73 M60 71 Q64 76 68 73" fill="none" strokeWidth="2" {...LINE} />
      {/* whiskers */}
      <path
        d="M40 68 L22 64 M40 72 L22 74 M80 68 L98 64 M80 72 L98 74"
        fill="none"
        stroke={INK}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </g>
  )
}

export default function Cat({ variant = 'peek', className = '', delay = 0 }) {
  const style = { '--d': `${delay}s` }

  if (variant === 'face') {
    return (
      <svg viewBox="18 12 84 82" className={className} style={style} aria-hidden="true">
        <Face />
      </svg>
    )
  }

  if (variant === 'hero') {
    return (
      <svg viewBox="0 0 120 150" className={`cat-bob ${className}`} style={style} aria-hidden="true">
        {/* arms */}
        <path d="M32 125 C18 105 18 75 28 46" fill="none" strokeWidth="3" {...LINE} />
        <path d="M88 125 C102 105 102 75 92 46" fill="none" strokeWidth="3" {...LINE} />
        {/* body */}
        <ellipse cx="60" cy="150" rx="36" ry="22" fill={CREAM} strokeWidth="3" {...LINE} />
        {/* fish */}
        <g className="fish-wiggle">
          <path d="M16 30 L2 14 L6 30 L2 46 Z" fill={ROCK} strokeWidth="2.5" {...LINE} />
          <path
            d="M16 30 Q40 8 80 12 Q104 16 112 30 Q104 44 80 46 Q40 50 16 30 Z"
            fill="#d6e6ef"
            strokeWidth="3"
            {...LINE}
          />
          <path d="M52 28 L66 24 L62 38 Z" fill={ROCK} strokeWidth="2" {...LINE} />
          <path d="M82 18 Q78 30 84 42" fill="none" strokeWidth="2" {...LINE} />
          <circle cx="96" cy="26" r="3.2" fill={CREAM} strokeWidth="2" {...LINE} />
          <circle cx="96" cy="26" r="1.2" fill={INK} />
        </g>
        {/* paws on the fish */}
        <circle cx="28" cy="44" r="5" fill={CREAM} strokeWidth="2.5" {...LINE} />
        <circle cx="92" cy="44" r="5" fill={CREAM} strokeWidth="2.5" {...LINE} />
        <Face dy={40} />
      </svg>
    )
  }

  // peek (default)
  return (
    <svg viewBox="0 0 120 100" className={className} style={style} aria-hidden="true">
      <g className="head-bob">
        <Face />
      </g>
      <g className="paw-wave">
        <ellipse cx="34" cy="94" rx="10" ry="8" fill={CREAM} strokeWidth="3" {...LINE} />
      </g>
      <ellipse cx="86" cy="94" rx="10" ry="8" fill={CREAM} strokeWidth="3" {...LINE} />
    </svg>
  )
}
