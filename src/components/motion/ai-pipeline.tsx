"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

type Stage = {
  key: string;
  title: string;
  who: "AI" | "Human" | "Sources" | "You";
  body: string;
  log: string;
};

const STAGES: Stage[] = [
  {
    key: "sources",
    title: "Sources gathered",
    who: "Sources",
    body: "We start from primary sources: RBI, NPCI, SEBI, the Income-tax Act, official research.",
    log: "4 primary sources linked",
  },
  {
    key: "draft",
    title: "AI drafts",
    who: "AI",
    body: "AI turns dense documents into a plain-language first draft for Indian readers.",
    log: "draft v1 · plain English",
  },
  {
    key: "review",
    title: "A person checks",
    who: "Human",
    body: "An editor checks every claim against its source, rewrites what's unclear, removes anything that sounds like advice.",
    log: "every claim verified",
  },
  {
    key: "live",
    title: "Published, dated",
    who: "You",
    body: "It goes live with the reviewer's name and a last-reviewed date. Corrections are shown, not hidden.",
    log: "reviewed · dated · signed",
  },
];

function StageIcon({ k }: { k: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.4 };
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
      {k === "sources" && (
        <>
          <rect x="4" y="3" width="11" height="14" rx="1" {...common} />
          <path d="M7 7h5M7 10h5M7 13h3M17 7v12H8" {...common} />
        </>
      )}
      {k === "draft" && (
        <>
          <circle cx="11" cy="11" r="3" {...common} />
          <path
            d="M11 2v4M11 16v4M2 11h4M16 11h4M4.6 4.6l2.8 2.8M14.6 14.6l2.8 2.8M4.6 17.4l2.8-2.8M14.6 7.4l2.8-2.8"
            {...common}
          />
        </>
      )}
      {k === "review" && (
        <>
          <circle cx="11" cy="7.5" r="3.5" {...common} />
          <path d="M4 19c1-3.5 3.8-5 7-5s6 1.5 7 5" {...common} />
        </>
      )}
      {k === "live" && (
        <>
          <circle cx="11" cy="11" r="8" {...common} />
          <path d="m7.5 11.2 2.4 2.4 4.8-5" {...common} />
        </>
      )}
    </svg>
  );
}

/**
 * "How we use AI": a pinned, scroll-driven pipeline. As you scroll, a signal
 * travels from sources → AI draft → human review → published and each stage
 * switches on. It shows the honest process: AI assists, people decide.
 */
export function AiPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  // Progress 0..1 across the stages. Same initial value on server and client.
  const progress = useMotionValue(0);
  const [scrolledTo, setActive] = useState(-1);
  // Reduced motion: every stage on, no scroll choreography. Applied after
  // hydration so server and client HTML match.
  const hydrated = useHydrated();
  const active = hydrated && reduce ? STAGES.length - 1 : scrolledTo;

  useMotionValueEvent(smooth, "change", (v) => {
    if (reduce) return;
    const p = Math.min(1, Math.max(0, (v - 0.08) / 0.8));
    progress.set(p);
    setActive(p <= 0 ? -1 : Math.min(STAGES.length - 1, Math.floor(p * (STAGES.length - 1) + 0.02)));
  });

  useEffect(() => {
    if (!reduce) return;
    progress.set(1);
  }, [reduce, progress]);

  const fillX = useTransform(progress, (p) => `scaleX(${p})`);
  const fillY = useTransform(progress, (p) => `scaleY(${p})`);
  const packetLeft = useTransform(progress, (p) => `${p * 100}%`);
  const packetTop = useTransform(progress, (p) => `${p * 100}%`);

  return (
    <div ref={ref} className="relative h-[260vh] motion-reduce:h-auto">
      <div className="sticky top-16 flex min-h-[calc(100svh-4rem)] flex-col justify-center py-12 motion-reduce:static md:top-[4.5rem] md:min-h-[calc(100svh-4.5rem)]">
        {/* Desktop: horizontal track */}
        <div className="relative mb-10 hidden h-8 md:block" aria-hidden>
          <div className="bg-line absolute top-1/2 right-[12.5%] left-[12.5%] h-px" />
          <div className="absolute top-1/2 right-[12.5%] left-[12.5%] h-px">
            <motion.div className="bg-forest h-px w-full origin-left" style={{ transform: fillX }} />
            <motion.div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: packetLeft }}
            >
              <span className="bg-emerald block size-2.5 rounded-full shadow-[0_0_0_6px_rgb(36_160_107/0.18)]" />
            </motion.div>
          </div>
        </div>

        <ol className="relative grid gap-4 md:grid-cols-4">
          {/* Mobile: vertical track */}
          <div className="absolute top-6 bottom-6 left-[1.6rem] w-px md:hidden" aria-hidden>
            <div className="bg-line absolute inset-0" />
            <motion.div className="bg-forest absolute inset-0 origin-top" style={{ transform: fillY }} />
            <motion.span
              className="bg-emerald absolute left-1/2 block size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ top: packetTop }}
            />
          </div>

          {STAGES.map((s, i) => {
            const on = i <= active;
            const isAi = s.who === "AI";
            return (
              <li
                key={s.key}
                className={cn(
                  "bg-paper relative ml-12 rounded-xs border p-5 transition-[border-color,box-shadow,transform] duration-500 md:ml-0 md:p-6",
                  on ? "border-forest/60 shadow-[0_18px_40px_-28px_rgb(27_122_82/0.5)]" : "border-line",
                )}
                aria-current={i === active ? "step" : undefined}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "grid size-10 place-items-center rounded-xs border transition-colors duration-500",
                      on
                        ? isAi
                          ? "border-mint bg-linen text-ink"
                          : "border-forest bg-forest text-paper"
                        : "border-line text-ink-muted",
                    )}
                  >
                    <StageIcon k={s.key} />
                  </span>
                  <span
                    className={cn(
                      "rounded-xs px-2 py-1 font-mono text-[0.65rem] tracking-wider uppercase transition-colors duration-500",
                      on ? (isAi ? "bg-linen text-ink" : "bg-sand text-forest") : "text-ink-muted",
                    )}
                  >
                    {s.who}
                  </span>
                </div>
                <p className="text-ink-muted mt-5 font-mono text-xs">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="display mt-1 text-2xl">{s.title}</h3>
                <p className="text-ink-muted mt-2 text-[0.95rem]">{s.body}</p>
                <p
                  className={cn(
                    "mt-4 flex items-center gap-2 font-mono text-[0.7rem] transition-colors duration-500",
                    on ? "text-jade" : "text-ink-muted/60",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn("size-1.5 rounded-full", on ? "bg-jade" : "bg-line animate-pulse")}
                  />
                  {on ? s.log : "waiting…"}
                </p>
              </li>
            );
          })}
        </ol>
        <p className="text-ink-muted mt-8 text-center font-mono text-xs">
          AI assists. People decide. Every page shows who reviewed it.
        </p>
      </div>
    </div>
  );
}
