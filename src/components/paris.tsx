import type { SVGProps } from "react";

/* ------------------------------------------------------------------ */
/* Haussmann rooftops                                                  */
/* ------------------------------------------------------------------ */

type Building = {
  /** left edge */
  x: number;
  /** width of the facade */
  w: number;
  /** height of the stone facade, measured up from the baseline */
  h: number;
  /** height of the zinc mansard roof sitting on top */
  roof: number;
  /** chimney stack offsets from the left edge of the facade */
  chimneys: number[];
};

const BASELINE = 210;

const BUILDINGS: Building[] = [
  { x: -20, w: 118, h: 96, roof: 30, chimneys: [22, 74] },
  { x: 98, w: 92, h: 128, roof: 26, chimneys: [30] },
  { x: 190, w: 134, h: 82, roof: 34, chimneys: [26, 82, 110] },
  { x: 324, w: 104, h: 116, roof: 24, chimneys: [40, 76] },
  { x: 428, w: 88, h: 70, roof: 30, chimneys: [24] },
  { x: 516, w: 126, h: 104, roof: 32, chimneys: [30, 90] },
  { x: 642, w: 96, h: 138, roof: 22, chimneys: [34, 66] },
  { x: 738, w: 112, h: 88, roof: 34, chimneys: [28, 84] },
  { x: 850, w: 130, h: 112, roof: 26, chimneys: [36, 96] },
  { x: 980, w: 90, h: 74, roof: 30, chimneys: [30] },
  { x: 1070, w: 120, h: 124, roof: 28, chimneys: [26, 68, 100] },
  { x: 1190, w: 100, h: 90, roof: 32, chimneys: [34] },
  { x: 1290, w: 116, h: 116, roof: 24, chimneys: [30, 86] },
  { x: 1406, w: 110, h: 84, roof: 32, chimneys: [28, 80] },
];

function Facade({ b }: { b: Building }) {
  const bodyTop = BASELINE - b.h;
  const roofTop = bodyTop - b.roof;
  const inset = Math.min(10, b.w * 0.09);

  // Two rows of windows on the stone facade.
  const windows: { x: number; y: number }[] = [];
  const cols = Math.max(2, Math.round(b.w / 26));
  const gap = b.w / (cols + 1);
  for (let row = 0; row < Math.min(3, Math.floor(b.h / 34)); row++) {
    for (let c = 1; c <= cols; c++) {
      windows.push({ x: b.x + gap * c - 3, y: bodyTop + 18 + row * 30 });
    }
  }

  return (
    <g>
      {/* zinc mansard */}
      <path
        d={`M${b.x} ${bodyTop} L${b.x + inset} ${roofTop} L${b.x + b.w - inset} ${roofTop} L${b.x + b.w} ${bodyTop} Z`}
        fill="currentColor"
        opacity="0.85"
      />
      {/* stone facade */}
      <rect x={b.x} y={bodyTop} width={b.w} height={b.h} fill="currentColor" opacity="0.6" />
      {/* cornice */}
      <rect x={b.x - 2} y={bodyTop - 2} width={b.w + 4} height="3" fill="currentColor" opacity="0.95" />
      {/* chimney stacks with pots */}
      {b.chimneys.map((c, i) => (
        <g key={i}>
          <rect x={b.x + c} y={roofTop - 22} width="13" height="24" fill="currentColor" opacity="0.9" />
          <rect x={b.x + c - 1} y={roofTop - 27} width="6" height="6" fill="currentColor" />
          <rect x={b.x + c + 7} y={roofTop - 27} width="6" height="6" fill="currentColor" />
        </g>
      ))}
      {/* dormer window in the roof */}
      <rect x={b.x + b.w / 2 - 5} y={roofTop + 6} width="10" height="12" fill="var(--window-glow, #edeae4)" opacity="0.5" />
      {windows.map((w, i) => (
        <rect key={i} x={w.x} y={w.y} width="6" height="14" rx="3" fill="var(--window-glow, #edeae4)" opacity="0.35" />
      ))}
    </g>
  );
}

/** Eiffel tower silhouette — deliberately small and set back, not a postcard. */
export function EiffelTower({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 200" className={className} aria-hidden="true" {...props}>
      <g fill="currentColor">
        <path d="M0 200C14 132 28 92 34 42L37 0h6l3 42c6 50 20 90 34 158H63C55 150 47 110 44 70h-8c-3 40-11 80-19 130Z" />
        <rect x="7" y="126" width="66" height="6" />
        <rect x="21" y="66" width="38" height="5" />
        <rect x="31" y="26" width="18" height="4" />
      </g>
    </svg>
  );
}

export function ParisSkyline({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1440 210"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <EiffelTower x="1096" y="2" width="84" height="208" opacity="0.55" />
      {BUILDINGS.map((b, i) => (
        <Facade key={i} b={b} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Ornaments                                                           */
/* ------------------------------------------------------------------ */

/** Wrought-iron balcony fret, repeated horizontally. */
export function Ferronnerie({ className = "" }: { className?: string }) {
  return <div className={`rule-ferronnerie ${className}`} aria-hidden="true" />;
}

/** Guimard-style Métro arch, used to frame section numbers. */
export function MetroArch({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 72" className={className} aria-hidden="true" {...props}>
      <path
        d="M32 4c14 0 24 10 24 24v40H44V30c0-7-5-12-12-12s-12 5-12 12v38H8V28C8 14 18 4 32 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path d="M20 62h24" stroke="currentColor" strokeWidth="2.5" fill="none" />
    </svg>
  );
}

/** Paris street-name plaque. */
export function Plaque({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`plaque inline-block rounded-[3px] px-3 py-1 text-[11px] font-semibold uppercase ${className}`}
    >
      {children}
    </span>
  );
}
