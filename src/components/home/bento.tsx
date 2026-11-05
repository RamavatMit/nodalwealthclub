"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { CheckDraw } from "@/components/motion/check-draw";
import { Counter } from "@/components/motion/counter";
import { ScanReveal } from "@/components/motion/scan-reveal";
import { MotionVisual } from "@/components/ui/motion-visual";
import { cn } from "@/lib/utils";

const EASE = [0.25, 1, 0.5, 1] as const;

/** One bento cell: wipes open (clip) when it enters, then tilts on hover. */
function Cell({
  children,
  className,
  delay = 0,
  label,
  title,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  label: string;
  title: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <li ref={ref} className={cn("relative", className)}>
      <motion.div
        data-tilt="5"
        className="bg-paper border-line flex h-full flex-col overflow-hidden rounded-xs border p-6 md:p-7"
        initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0.4 }}
        animate={inView ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 } : undefined}
        transition={{ duration: 0.9, delay, ease: [0.65, 0, 0.35, 1] }}
      >
        <p className="eyebrow">{label}</p>
        <h3 className="display mt-2 text-2xl md:text-3xl">{title}</h3>
        <div className="mt-6 flex-1">{children}</div>
      </motion.div>
    </li>
  );
}

function LessonList() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.5 });
  const lessons = [
    "What money is becoming",
    "How an LLM reads a question",
    "Wallets: keys, not coins",
    "Agents with limits",
  ];
  return (
    <div ref={ref} className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-ink-muted">Foundations path</span>
        <span className="font-mono text-xs">3 / 4</span>
      </div>
      <div className="bg-line h-1 overflow-hidden rounded-xs">
        <motion.div
          className="bg-forest h-full origin-left"
          initial={{ scaleX: 0 }}
          animate={on ? { scaleX: 0.75 } : undefined}
          transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
        />
      </div>
      <ul className="divide-line border-line mt-4 divide-y border-y">
        {lessons.map((l, i) => (
          <motion.li
            key={l}
            className="flex items-center gap-3 py-3 text-sm"
            initial={{ opacity: 0, x: -12 }}
            animate={on ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.12, ease: EASE }}
          >
            {i < 3 ? (
              <CheckDraw size={20} delay={0.8 + i * 0.25} />
            ) : (
              <span className="border-line grid size-5 place-items-center rounded-xs border font-mono text-[0.6rem]">
                4
              </span>
            )}
            <span className={i < 3 ? "" : "text-ink-muted"}>{l}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function PaperChart() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.5 });
  // Synthetic series — illustrative only, never market data.
  const pts = [38, 42, 40, 47, 45, 52, 49, 56, 54, 61, 58, 66, 63, 70];
  const d = pts.map((y, i) => `${i === 0 ? "M" : "L"} ${(i / (pts.length - 1)) * 300} ${90 - y}`).join(" ");
  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-3xl md:text-4xl">
          <Counter to={1000000} prefix="₹" />
        </span>
        <span className="border-line text-ink-muted rounded-xs border px-2 py-0.5 font-mono text-[0.65rem] uppercase">
          Virtual money
        </span>
      </div>
      <svg viewBox="0 0 300 70" className="mt-4 h-24 w-full overflow-visible" aria-hidden>
        <motion.path
          d={d}
          fill="none"
          stroke="var(--jade)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={on ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
        />
        <motion.path
          d={`${d} L 300 70 L 0 70 Z`}
          fill="var(--linen)"
          initial={{ opacity: 0 }}
          animate={on ? { opacity: 0.7 } : undefined}
          transition={{ duration: 0.8, delay: 1.6 }}
        />
      </svg>
      <p className="text-ink-muted mt-2 text-xs">Synthetic data. The leaderboard ranks skill, not wealth.</p>
    </div>
  );
}

function Rooms() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref} className="flex flex-wrap gap-2">
      {["# general", "# ai", "# web3", "# agents", "# help"].map((r, i) => (
        <motion.span
          key={r}
          className="border-line bg-ivory rounded-xs border px-3 py-1.5 font-mono text-xs"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={on ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 0.45, delay: 0.4 + i * 0.09, ease: EASE }}
        >
          {r}
        </motion.span>
      ))}
    </div>
  );
}

function Chat() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.5 });
  const msgs = [
    { who: "Member", text: "Is this coin a good buy right now?", mine: false },
    { who: "Moderator", text: "We never give tips — but here's how to judge the risk yourself.", mine: true },
    { who: "Member", text: "That checklist helped. Thanks!", mine: false },
  ];
  return (
    <div ref={ref} className="space-y-2.5">
      {msgs.map((m, i) => (
        <motion.div
          key={m.text}
          className={cn("flex", m.mine ? "justify-end" : "justify-start")}
          initial={{ opacity: 0, y: 14 }}
          animate={on ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.45, delay: 0.5 + i * 0.7, ease: EASE }}
        >
          <div
            className={cn(
              "max-w-[85%] rounded-xs px-3.5 py-2.5 text-sm",
              m.mine ? "bg-forest text-paper" : "bg-linen text-ink",
            )}
          >
            <p className="mb-0.5 font-mono text-[0.6rem] tracking-wider uppercase opacity-70">{m.who}</p>
            {m.text}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * "Everything in one club" — a bento grid (after the Spend / Earn grid
 * reference). Each cell wipes open, plays a small live UI, and tilts.
 */
export function Bento() {
  return (
    <ul className="grid gap-3 md:grid-cols-4">
      <Cell className="md:col-span-2 md:row-span-2" label="Learn" title="Paths that build on each other">
        <LessonList />
      </Cell>
      <Cell className="md:col-span-2" delay={0.1} label="Practise" title="A ₹10 lakh paper-trading arena">
        <PaperChart />
      </Cell>
      <Cell delay={0.2} label="Belong" title="Rooms for every topic">
        <Rooms />
      </Cell>
      <Cell delay={0.3} label="Verify" title="Reviewed by people">
        <ul className="space-y-3 text-sm">
          {["Sources linked", "Claims checked", "Date shown"].map((t, i) => (
            <li key={t} className="flex items-center gap-3">
              <CheckDraw size={22} delay={0.5 + i * 0.25} />
              {t}
            </li>
          ))}
        </ul>
      </Cell>
      <Cell className="md:col-span-2" delay={0.15} label="Ask" title="A community that won't sell you tips">
        <Chat />
      </Cell>
      <Cell className="md:col-span-2" delay={0.25} label="Build" title="One product, free with membership">
        <ScanReveal className="overflow-hidden rounded-xs" delay={0.4}>
          <MotionVisual tone="sand" seed={4} className="aspect-[16/7]" />
        </ScanReveal>
      </Cell>
    </ul>
  );
}
