/**
 * Marks for the three Chamber pillars.
 *
 * Drawn rather than pulled from an icon set, so Connect / Collaborate / Grow
 * read as one family: a 48-unit grid, 2px navy strokes, and a single gold
 * element carrying the idea. Each mark is legible at rest and resolves on
 * hover — the parent cell supplies the `group` class, so the motion is pure
 * CSS with no JS behind it.
 *
 * To swap in the Chamber's own artwork, replace the body of each function with
 * the supplied SVG and keep the `className` passthrough.
 */
type IconProps = { className?: string };

const BASE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const GOLD = {
  fill: "none",
  stroke: "var(--color-gold)",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const EASE = "ease-[var(--ease-out-quint)]";

/** Two markets, one route between them — the route draws in gold on hover. */
export function ConnectIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={`overflow-visible ${className ?? ""}`}>
      {/* the route at rest */}
      <path d="M14 33 C 20 21, 28 14, 34 15" {...BASE} className="opacity-20" />
      {/* the same route, drawn on hover */}
      <path
        d="M14 33 C 20 21, 28 14, 34 15"
        {...GOLD}
        strokeDasharray="30"
        className={`[stroke-dashoffset:30] transition-[stroke-dashoffset] duration-700 ${EASE} group-hover:[stroke-dashoffset:0]`}
      />
      {/* the two markets */}
      <g {...BASE}>
        <circle
          cx="12"
          cy="35"
          r="6"
          className={`origin-[12px_35px] transition-transform duration-500 ${EASE} group-hover:scale-110`}
        />
        <circle
          cx="36"
          cy="13"
          r="6"
          className={`origin-[36px_13px] transition-transform duration-500 ${EASE} group-hover:scale-110`}
        />
      </g>
      <circle cx="12" cy="35" r="2" fill="currentColor" />
      <circle
        cx="36"
        cy="13"
        r="2"
        fill="var(--color-gold)"
        className={`origin-[36px_13px] transition-transform duration-500 ${EASE} group-hover:scale-150`}
      />
    </svg>
  );
}

/** Two parties, overlapping — the common ground fills in on hover. */
export function CollaborateIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={`overflow-visible ${className ?? ""}`}>
      <g {...BASE}>
        <circle
          cx="18"
          cy="24"
          r="11"
          className={`transition-transform duration-600 ${EASE} group-hover:translate-x-[3px]`}
        />
        <circle
          cx="30"
          cy="24"
          r="11"
          className={`transition-transform duration-600 ${EASE} group-hover:-translate-x-[3px]`}
        />
      </g>
      {/* the agreement */}
      <circle
        cx="24"
        cy="24"
        r="4"
        fill="var(--color-gold)"
        className={`origin-center scale-0 transition-transform duration-600 ${EASE} group-hover:scale-100`}
      />
    </svg>
  );
}

/** A market climbing — the bars step up and the trajectory lifts on hover. */
export function GrowIcon({ className }: IconProps) {
  const bars = [
    { x: 8, y: 29, h: 10, delay: "0ms" },
    { x: 19, y: 23, h: 16, delay: "70ms" },
    { x: 30, y: 17, h: 22, delay: "140ms" },
  ];
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={`overflow-visible ${className ?? ""}`}>
      <g {...BASE}>
        <path d="M5 39 H 43" className="opacity-25" />
        {bars.map((bar) => (
          <rect
            key={bar.x}
            x={bar.x}
            y={bar.y}
            width="7"
            height={bar.h}
            rx="1.5"
            className={`transition-transform duration-500 ${EASE} group-hover:scale-y-[1.16]`}
            style={{ transformOrigin: `${bar.x + 3.5}px 39px`, transitionDelay: bar.delay }}
          />
        ))}
      </g>
      <g
        {...GOLD}
        className={`transition-transform duration-600 ${EASE} group-hover:-translate-y-[3px]`}
      >
        <path d="M10 24 L 21 17.5 L 32 11 L 40 7.5" />
        <path d="M33.5 7 L 41 7 L 41 14.5" />
      </g>
    </svg>
  );
}

export const GLANCE_ICONS = {
  connect: ConnectIcon,
  collaborate: CollaborateIcon,
  grow: GrowIcon,
} as const;
