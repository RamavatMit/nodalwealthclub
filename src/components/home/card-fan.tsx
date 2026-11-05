"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { LogoMark } from "@/components/ui/logo";

const CARDS = [
  { plan: "Monthly", note: "Cancel any time", bg: "var(--mint)", fg: "var(--ink)", x: -1 },
  { plan: "Yearly", note: "Best value", bg: "var(--forest)", fg: "var(--paper)", x: 0 },
  { plan: "Free product", note: "Included with either", bg: "var(--paper)", fg: "var(--ink)", x: 1 },
] as const;

function FanCard({ card, progress }: { card: (typeof CARDS)[number]; progress: MotionValue<number> }) {
  const x = useTransform(progress, [0, 1], ["0%", `${card.x * 62}%`]);
  const rotate = useTransform(progress, [0, 1], [card.x * 3, card.x * 12]);
  const y = useTransform(progress, [0, 1], [card.x === 0 ? 0 : 14, card.x === 0 ? -18 : 22]);

  return (
    <motion.div
      style={{ x, rotate, y, zIndex: card.x === 0 ? 3 : 2 - Math.abs(card.x) }}
      className="absolute inset-0"
    >
      <div
        data-tilt="10"
        className="border-ink/10 flex h-full flex-col justify-between rounded-md border p-5 shadow-[0_30px_60px_-30px_rgb(31_36_33/0.45)] md:p-6"
        style={{ background: card.bg, color: card.fg }}
      >
        <div className="flex items-start justify-between">
          <span className="flex items-center gap-2">
            <LogoMark size={22} />
            <span className="font-mono text-[0.62rem] tracking-[0.2em] uppercase">Nodal Wealth Club</span>
          </span>
          {/* Card "chip": nodal motif, no card numbers — this is not a payment card. */}
          <svg width="34" height="26" viewBox="0 0 34 26" aria-hidden className="opacity-70">
            <rect x="1" y="1" width="32" height="24" rx="3" fill="none" stroke="currentColor" />
            <path d="M8 13h18M17 4v18M8 6l18 14M26 6 8 20" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>
        <div>
          <p className="display text-3xl md:text-4xl">{card.plan}</p>
          <p className="mt-1 font-mono text-[0.68rem] tracking-[0.14em] uppercase opacity-75">{card.note}</p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Membership cards that fan out of a stack as the section scrolls into view
 * (after the floating-cards reference). Each card tilts with the pointer.
 */
export function CardFan() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "center 45%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 22, mass: 0.5 });

  return (
    <div ref={ref} className="relative mx-auto aspect-[1.6] w-[min(78vw,22rem)] md:w-[24rem]" aria-hidden>
      {CARDS.map((c) => (
        <FanCard key={c.plan} card={c} progress={progress} />
      ))}
    </div>
  );
}
