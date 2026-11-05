"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { useHydrated } from "@/lib/use-hydrated";

const EASE = [0.25, 1, 0.5, 1] as const;

function Highlight({ children }: { children: string }) {
  return (
    <span className="relative inline-block">
      <motion.span
        aria-hidden
        className="bg-mint/70 absolute inset-x-[-0.06em] top-[0.18em] bottom-[0.04em] origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.45, ease: [0.65, 0, 0.35, 1] }}
      />
      <em className="relative">{children}</em>
    </span>
  );
}

/** Letters that won't sit still — "noise". */
function Jitter({ children }: { children: string }) {
  return (
    <em className="inline-block">
      {children.split("").map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{ y: [0, -6, 4, -2, 0], rotate: [0, -6, 5, -3, 0], opacity: [1, 0.55, 1, 0.7, 1] }}
          transition={{ duration: 0.9, delay: 0.3 + i * 0.05, repeat: Infinity, repeatDelay: 0.8 + i * 0.15 }}
        >
          {c}
        </motion.span>
      ))}
    </em>
  );
}

function Struck({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="text-ink-muted relative inline-block">
      {children}
      <motion.span
        aria-hidden
        className="bg-forest absolute inset-x-0 top-[55%] h-[0.08em] origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.45, delay, ease: [0.65, 0, 0.35, 1] }}
      />
    </span>
  );
}

function Calm({ children }: { children: string }) {
  return (
    <span className="relative inline-block">
      <em>{children}</em>
      <motion.svg
        aria-hidden
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="text-mint absolute inset-x-0 -bottom-[0.12em] h-[0.22em] w-full"
      >
        <motion.path
          d="M2 8 C 50 2, 100 12, 198 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
        />
      </motion.svg>
    </span>
  );
}

const STATEMENTS = [
  {
    plain: "Money is getting intelligent.",
    node: (
      <>
        Money is getting <Highlight>intelligent</Highlight>.
      </>
    ),
  },
  {
    plain: "So is the noise.",
    node: (
      <>
        So is the <Jitter>noise</Jitter>.
      </>
    ),
  },
  {
    plain: "Hot tips. Hype. Guaranteed returns.",
    node: (
      <>
        <Struck delay={0.45}>Hot tips.</Struck> <Struck delay={0.75}>Hype.</Struck>{" "}
        <Struck delay={1.05}>Guaranteed returns.</Struck>
      </>
    ),
  },
  {
    plain: "We built a calmer way to learn.",
    node: (
      <>
        We built a <Calm>calmer</Calm> way to learn.
      </>
    ),
  },
];

/**
 * Pinned, scroll-driven statements (after the "electrified / complexity /
 * outdated tools" reference): one line at a time, each with its own motion —
 * a highlight sweep, jittering "noise", phrases struck through, then calm.
 */
export function KineticStatements() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(STATEMENTS.length - 1, Math.max(0, Math.floor(p * STATEMENTS.length * 0.999))));
  });

  if (hydrated && reduce) {
    return (
      <section aria-label="Why Nodal" className="border-line border-t">
        <ul className="frame gutter space-y-6 py-20">
          {STATEMENTS.map((s) => (
            <li key={s.plain} className="display text-section">
              {s.node}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label="Why Nodal" className="border-line relative h-[360vh] border-t">
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center overflow-hidden md:top-[4.5rem] md:h-[calc(100svh-4.5rem)]">
        <div className="frame gutter grid w-full gap-10 md:grid-cols-[auto_1fr] md:items-center">
          {/* Progress rail */}
          <div className="flex items-center gap-4 md:flex-col md:items-start" aria-hidden>
            <span className="text-ink-muted font-mono text-xs">
              {String(active + 1).padStart(2, "0")} / {String(STATEMENTS.length).padStart(2, "0")}
            </span>
            <div className="bg-line relative h-px w-28 md:hidden">
              <motion.div
                className="bg-forest absolute inset-0 origin-left"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
            <div className="bg-line relative hidden h-40 w-px md:block">
              <motion.div
                className="bg-forest absolute inset-0 origin-top"
                style={{ scaleY: scrollYProgress }}
              />
            </div>
          </div>

          <div className="relative min-h-[40vh] md:min-h-[30vh]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                className="display text-[clamp(2.4rem,1.2rem+4.6vw,5.5rem)] leading-[1.05] tracking-[-0.02em]"
                initial={{ opacity: 0, filter: "blur(16px)", y: 40, letterSpacing: "0.04em" }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0, letterSpacing: "-0.02em" }}
                exit={{ opacity: 0, filter: "blur(12px)", y: -40 }}
                transition={{ duration: 0.6, ease: EASE }}
                aria-label={STATEMENTS[active].plain}
              >
                {STATEMENTS[active].node}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
