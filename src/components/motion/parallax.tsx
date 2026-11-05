"use client";

import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Pixels of travel across the element's pass through the viewport. */
  distance?: number;
};

/**
 * Light parallax drift for imagery. Starts at 0 on server and client (no
 * hydration mismatch) and only moves once scrolling begins.
 */
export function Parallax({ children, className, distance = 60 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const y = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!reduce) y.set((0.5 - p) * distance);
  });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
