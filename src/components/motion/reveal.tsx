"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { shouldSkipEntrance } from "./entrance";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "clip" wipes the block open from the bottom; "fade" lifts it gently. */
  variant?: "clip" | "fade";
  as?: "div" | "li";
  id?: string;
};

const EASE = [0.25, 1, 0.5, 1] as const;

/** Scroll-triggered section reveal. Animates clip-path / transform / opacity only. */
export function Reveal({ children, className, delay = 0, variant = "fade", as = "div", id }: Props) {
  const Tag = motion[as];
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  // Observed on the outer element, which is never clipped: an element that
  // starts fully clipped never reports itself as visible.
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [skip] = useState(shouldSkipEntrance);

  if (variant === "clip") {
    return (
      <Tag ref={ref} id={id} className={className}>
        <motion.div
          initial={skip ? false : { clipPath: "inset(100% 0% 0% 0%)", y: 24 }}
          animate={inView ? { clipPath: "inset(0% 0% 0% 0%)", y: 0 } : undefined}
          transition={{ duration: 1.1, ease: EASE, delay }}
        >
          {children}
        </motion.div>
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      initial={skip ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}
