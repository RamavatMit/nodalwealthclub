"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MotionVisual } from "@/components/ui/motion-visual";

type Step = { title: string; body: string };
type Tone = "mint" | "sand" | "emerald" | "linen";

function StepItem({ step, index, onActive }: { step: Step; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  // Active when the step crosses the middle band of the viewport.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li
      ref={ref}
      className="border-line flex min-h-[22rem] flex-col justify-center border-t py-10 lg:min-h-[60vh]"
    >
      <span className="text-ink-muted font-mono text-xs">Step {String(index + 1).padStart(2, "0")}</span>
      <h3 className="display mt-3 text-3xl md:text-4xl">{step.title}</h3>
      <p className="text-ink-muted mt-3 max-w-md text-lg">{step.body}</p>
    </li>
  );
}

/**
 * "How it works": on large screens a framed panel stays pinned while the
 * steps scroll past, updating to the current step.
 */
export function StickySteps({ steps, tone }: { steps: Step[]; tone: Tone }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="hidden lg:block">
        <div className="border-line bg-paper sticky top-28 overflow-hidden rounded-xs border">
          <div className="relative aspect-[4/3]">
            <MotionVisual tone={tone} seed={active + 11} className="absolute inset-0 rounded-none" />
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                initial={{ y: "40%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-40%", opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                className="display text-forest absolute bottom-4 left-6 text-[8rem] leading-none"
              >
                {String(active + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="flex gap-1.5 p-4" aria-hidden>
            {steps.map((s, i) => (
              <span
                key={s.title}
                className={`h-0.5 flex-1 transition-colors duration-500 ${i <= active ? "bg-forest" : "bg-line"}`}
              />
            ))}
          </div>
        </div>
      </div>
      <ol>
        {steps.map((s, i) => (
          <StepItem key={s.title} step={s} index={i} onActive={setActive} />
        ))}
      </ol>
    </div>
  );
}
