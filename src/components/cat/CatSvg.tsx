// The QA lead, drawn once. Pupils accept an offset so the eyes can track.
// Reused by QALeadCat, KonamiCats and the terminal's `summon cat`.

export function CatSvg({
  className,
  pupil = { x: 0, y: 0 },
  blink = false,
  glow = true,
}: {
  className?: string;
  pupil?: { x: number; y: number };
  blink?: boolean;
  glow?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 124"
      className={className}
      role="img"
      aria-label="a black cat, the QA lead"
      style={glow ? { filter: "drop-shadow(0 0 10px rgba(251,111,146,0.35))" } : undefined}
    >
      <g fill="#08080a" stroke="#fb6f92" strokeWidth="1" strokeOpacity="0.55">
        {/* tail curling around the right side */}
        <path d="M70 112 C98 108 96 66 76 66 C90 74 84 100 66 102 Z" />
        {/* sitting body */}
        <path d="M28 118 C22 84 30 60 50 60 C70 60 78 84 72 118 Z" />
        {/* paws */}
        <ellipse cx="40" cy="116" rx="8" ry="5" />
        <ellipse cx="60" cy="116" rx="8" ry="5" />
        {/* ears */}
        <path d="M31 36 L26 8 L48 27 Z" />
        <path d="M69 36 L74 8 L52 27 Z" />
        {/* head */}
        <circle cx="50" cy="46" r="23" />
      </g>

      {/* inner ears */}
      <path d="M33 30 L31 16 L42 26 Z" fill="#fb6f92" fillOpacity="0.4" />
      <path d="M67 30 L69 16 L58 26 Z" fill="#fb6f92" fillOpacity="0.4" />

      {/* eyes — glowing rose */}
      <g>
        <ellipse cx="41" cy="45" rx="6.5" ry={blink ? 0.8 : 8.5} fill="#ffafcc" />
        <ellipse cx="59" cy="45" rx="6.5" ry={blink ? 0.8 : 8.5} fill="#ffafcc" />
        {!blink && (
          <g
            fill="#08080a"
            style={{
              transform: `translate(${pupil.x}px, ${pupil.y}px)`,
              transition: "transform 0.12s ease-out",
            }}
          >
            <ellipse cx="41" cy="45" rx="2.4" ry="6" />
            <ellipse cx="59" cy="45" rx="2.4" ry="6" />
          </g>
        )}
      </g>

      {/* nose + whiskers */}
      <path d="M47 55 L53 55 L50 59 Z" fill="#fb6f92" />
      <g stroke="#f5f0f0" strokeOpacity="0.35" strokeWidth="0.7">
        <line x1="30" y1="54" x2="14" y2="51" />
        <line x1="30" y1="57" x2="15" y2="59" />
        <line x1="70" y1="54" x2="86" y2="51" />
        <line x1="70" y1="57" x2="85" y2="59" />
      </g>
    </svg>
  );
}
