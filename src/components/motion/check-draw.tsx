"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

/**
 * A check mark that draws itself inside a square when it scrolls into view —
 * the visual language of a verification pass. pathLength animation; Motion's
 * reduced-motion setting still lets it fade in.
 */
export function CheckDraw({ delay = 0, size = 28 }: { delay?: number; size?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 1 });
  return (
    <svg ref={ref} width={size} height={size} viewBox="0 0 28 28" aria-hidden className="text-jade shrink-0">
      <motion.rect
        x="1"
        y="1"
        width="26"
        height="26"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.7, delay, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.path
        d="M8 14.5l4 4 8-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.45, delay: delay + 0.55, ease: [0.25, 1, 0.5, 1] }}
      />
    </svg>
  );
}
