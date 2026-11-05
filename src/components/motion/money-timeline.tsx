"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useRef } from "react";

export type MoneyStage = { era: string; title: string; body: string; glyph: string };

/**
 * About page: the history of money as a scroll timeline. A thin line draws
 * down the page as you scroll and each stage's node lights up when reached.
 */
export function MoneyTimeline({ stages }: { stages: MoneyStage[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const spring = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  // Starts at 0 on server and client alike; reduced motion shows the full
  // line right after hydration instead of drawing it.
  const scaleY = useMotionValue(0);
  useMotionValueEvent(spring, "change", (v) => {
    if (!reduce) scaleY.set(v);
  });
  useEffect(() => {
    if (reduce) scaleY.set(1);
  }, [reduce, scaleY]);

  return (
    <ol ref={ref} className="relative ml-3 md:ml-0">
      <div aria-hidden className="bg-line absolute top-0 bottom-0 left-0 w-px md:left-1/2" />
      <motion.div
        aria-hidden
        className="bg-forest absolute top-0 bottom-0 left-0 w-px origin-top md:left-1/2"
        style={{ scaleY }}
      />
      {stages.map((stage, i) => {
        const right = i % 2 === 1;
        return (
          <li key={stage.title} className="relative grid py-8 md:grid-cols-2 md:py-12">
            <motion.span
              aria-hidden
              className="border-line bg-paper text-forest absolute top-10 left-0 grid size-9 -translate-x-1/2 place-items-center rounded-full border font-mono text-xs md:top-14 md:left-1/2"
              initial={{ scale: 0.6, borderColor: "var(--line)" }}
              whileInView={{ scale: 1, borderColor: "var(--forest)" }}
              viewport={{ once: true, margin: "0px 0px -40% 0px" }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            >
              {stage.glyph}
            </motion.span>
            <motion.div
              className={
                right
                  ? "pl-10 md:col-start-2 md:pl-16"
                  : "pl-10 md:col-start-1 md:pr-16 md:pl-0 md:text-right"
              }
              initial={{ opacity: 0, x: right ? 24 : -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -30% 0px" }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              <p className="eyebrow">{stage.era}</p>
              <h3 className="display mt-2 text-3xl md:text-4xl">{stage.title}</h3>
              <p className={`text-ink-muted mt-3 max-w-md ${right ? "" : "md:ml-auto"}`}>{stage.body}</p>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
