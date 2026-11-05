"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useMotionTemplate,
} from "motion/react";
import { useRef, ViewTransition, type ReactNode } from "react";
import { MotionVisual } from "@/components/ui/motion-visual";
import { CARD_MORPH_SHARE } from "@/lib/vt-name";

type Tone = "mint" | "sand" | "emerald" | "linen";

/**
 * Full-width product "video" that shrinks into a framed player as you scroll.
 * Until real videos arrive (Phase 5, streamed from Bunny/Mux with signed URLs)
 * a motion-blur visual stands in. Values start at their resting state on both
 * server and client and only change on scroll, so hydration is stable.
 */
export function ProductHero({
  tone,
  seed,
  morphName,
  children,
}: {
  tone: Tone;
  seed: number;
  /** Shared-element name: the clicked product card image grows into this. */
  morphName: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const scale = useMotionValue(1);
  const radius = useMotionValue(0);
  const inset = useMotionValue(0);
  const fade = useMotionValue(1);
  const clipPath = useMotionTemplate`inset(${inset}% ${inset}% ${inset}% ${inset}% round ${radius}px)`;

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduce) return;
    const t = Math.min(1, p * 1.6);
    scale.set(1 - t * 0.04);
    inset.set(t * 6);
    radius.set(t * 4);
    fade.set(1 - Math.min(1, p * 2.2));
  });

  return (
    <ViewTransition name={morphName} share={CARD_MORPH_SHARE} default="none">
      <div ref={ref} className="relative h-[78svh] min-h-[30rem] md:h-[86svh]">
        <motion.div style={{ scale, clipPath }} className="absolute inset-0 will-change-transform">
          <MotionVisual tone={tone} seed={seed} className="absolute inset-0 rounded-none" />
          <div className="from-ink/55 via-ink/10 absolute inset-0 bg-gradient-to-t to-transparent" />
          <div
            aria-hidden
            className="border-paper/70 text-paper absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border backdrop-blur-[2px] md:size-24"
          >
            <svg width="22" height="22" viewBox="0 0 22 22">
              <path d="M7 4.5v13l11-6.5z" fill="currentColor" />
            </svg>
          </div>
          <p className="bg-paper/90 text-ink absolute top-4 right-4 rounded-xs px-2 py-1 font-mono text-[0.68rem] tracking-wider uppercase">
            Product video coming soon
          </p>
        </motion.div>
        <motion.div
          style={{ opacity: fade }}
          className="frame gutter text-paper absolute inset-x-0 bottom-0 pb-10 md:pb-16"
        >
          {children}
        </motion.div>
      </div>
    </ViewTransition>
  );
}
