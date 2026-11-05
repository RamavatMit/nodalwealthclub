"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * reducedMotion="user": for people with prefers-reduced-motion, Motion skips
 * transform animations and jumps to the end state. Components therefore keep
 * the same `initial` on server and client (no hydration mismatch).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
