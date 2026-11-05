"use client";

import { useId, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/*
 * The Nodal mark: three connected grey nodes forming an arch, with a green
 * node beneath. Drawn in SVG to match the supplied artwork, including its
 * soft 3D edge (a darker band on the lower-right of every shape).
 *
 * Geometry (viewBox units): node centres (678,343) (457,631) (897,631),
 * r 150; concave waists between the nodes; arch opening 150 wide with a
 * 75 radius top at y 493; green node (678,928) r 127.
 */

const VIEWBOX = "296 186 760 880";
const RATIO = 760 / 880;

const GREY_LIGHT = "#D9D9D9";
const GREY_DARK = "#A6A6A6";
const GREEN_LIGHT = "#24A06B";
const GREEN_DARK = "#1B7A52";

const NODES = [
  { cx: 678, cy: 343, part: "logo-n1" },
  { cx: 457, cy: 631, part: "logo-n2" },
  { cx: 897, cy: 631, part: "logo-n3" },
];
/** The web: the triangle between node centres, plus thick links from the
 *  top node down to each lower node (no thick bottom edge, so the arch
 *  widens below the nodes as in the artwork). */
const WEB_FILL = "M678 343 L457 631 L897 631 Z";
const WEB_LINKS = "M457 631 L678 343 L897 631";
/** The arch opening, cut out of the grey shape (open to the bottom). */
const ARCH = "M603 568 A75 75 0 0 1 753 568 L753 900 L603 900 Z";
/**
 * Concave "waists" on the outer edges between the nodes: circles tangent to
 * both neighbouring nodes, sized so the waist is ~80 units from the centre
 * line (measured from the supplied artwork).
 */
const WAISTS = [
  { cx: 411.7, cy: 367.3 },
  { cx: 944.3, cy: 367.3 },
];
const WAIST_R = 117.5;
const WEB_WIDTH = 260;

function GreyShape({ fill }: { fill: string }) {
  return (
    <g fill={fill}>
      <g className="logo-web">
        <path d={WEB_FILL} />
        <path d={WEB_LINKS} fill="none" stroke={fill} strokeWidth={WEB_WIDTH} strokeLinejoin="round" />
      </g>
      {NODES.map((n) => (
        <circle key={n.part} className={n.part} cx={n.cx} cy={n.cy} r="150" />
      ))}
    </g>
  );
}

/**
 * The mark itself. `animated` builds it piece by piece (see globals.css,
 * `.logo-animate`): top node, left node, right node pop in, the web fills,
 * then the green node drops in. `delay` (seconds) offsets the whole build.
 */
export function LogoArt({
  size = 28,
  className,
  animated = false,
  delay = 0,
  title,
}: {
  /** Height in px; width follows the artwork's proportions. */
  size?: number;
  className?: string;
  animated?: boolean;
  delay?: number;
  title?: string;
}) {
  // Unique ids per instance; strip characters that break url(#…).
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const ids = { arch: `${uid}-arch`, clip: `${uid}-clip`, dot: `${uid}-dot`, blur: `${uid}-blur` };

  return (
    <svg
      viewBox={VIEWBOX}
      width={Math.round(size * RATIO)}
      height={size}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn("shrink-0 overflow-visible", animated && "logo-animate", className)}
      style={animated ? ({ "--logo-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      <defs>
        <mask id={ids.arch} maskUnits="userSpaceOnUse" x="250" y="150" width="860" height="950">
          <rect x="250" y="150" width="860" height="950" fill="white" />
          <path d={ARCH} fill="black" />
          {WAISTS.map((w) => (
            <circle key={w.cx} cx={w.cx} cy={w.cy} r={WAIST_R} fill="black" />
          ))}
        </mask>
        {/* A mask, not a clipPath: clip paths ignore the web's stroke width. */}
        <mask id={ids.clip} maskUnits="userSpaceOnUse" x="250" y="150" width="860" height="950">
          <g fill="white">
            <path d={WEB_FILL} />
            <path d={WEB_LINKS} fill="none" stroke="white" strokeWidth={WEB_WIDTH} strokeLinejoin="round" />
            {NODES.map((n) => (
              <circle key={n.part} cx={n.cx} cy={n.cy} r="150" />
            ))}
          </g>
        </mask>
        <clipPath id={ids.dot}>
          <circle cx="678" cy="928" r="127" />
        </clipPath>
        <filter id={ids.blur} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* Grey nodes: dark base, then the lit face shifted up-left and softened,
          clipped to the shape — leaving a shaded edge on the lower right. */}
      <g mask={`url(#${ids.arch})`}>
        <GreyShape fill={GREY_DARK} />
        <g mask={`url(#${ids.clip})`}>
          <g transform="translate(-22 -10)" filter={`url(#${ids.blur})`}>
            <GreyShape fill={GREY_LIGHT} />
          </g>
        </g>
      </g>

      {/* Green node */}
      <g className="logo-dot">
        <circle cx="678" cy="928" r="127" fill={GREEN_DARK} />
        <g clipPath={`url(#${ids.dot})`}>
          <circle cx="664" cy="922" r="127" fill={GREEN_LIGHT} filter={`url(#${ids.blur})`} />
        </g>
      </g>
    </svg>
  );
}

/** Small static mark for chrome (header, footer, cards). */
export function LogoMark({ className, size = 30 }: { className?: string; size?: number }) {
  return <LogoArt size={size} className={className} />;
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark size={44} />
      <span className="flex flex-col leading-none">
        <span className="display text-ink text-[1.75rem]">Nodal</span>
        <span className="text-forest mt-0.5 font-mono text-[0.68rem] font-medium tracking-[0.22em] uppercase">
          Wealth Club
        </span>
      </span>
    </span>
  );
}
