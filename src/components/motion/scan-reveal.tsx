"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { shouldSkipEntrance } from "./entrance";
import { cn } from "@/lib/utils";

/**
 * Imagery is "scanned" into view: a thin line sweeps top to bottom and the
 * image is revealed behind it, like a model reading the picture. Runs once.
 * The observed wrapper is never clipped, so the observer always fires.
 */
export function ScanReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [skip] = useState(shouldSkipEntrance);
  const transition = { duration: 1.15, delay, ease: [0.65, 0, 0.35, 1] as const };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        initial={skip ? false : { clipPath: "inset(0% 0% 100% 0%)" }}
        animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={transition}
      >
        {children}
      </motion.div>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--forest) 20%, var(--mint) 80%, transparent)",
          boxShadow: "0 0 18px 2px rgb(140 203 174 / 0.8)",
        }}
        initial={{ top: "0%", opacity: 0 }}
        animate={inView && !skip ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } : undefined}
        transition={{ ...transition, opacity: { duration: 1.15, delay, times: [0, 0.08, 0.85, 1] } }}
      />
    </div>
  );
}
