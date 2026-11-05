"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { introDelay } from "@/components/motion/intro";
import { TransitionLink } from "@/components/motion/transition-link";
import { buttonClass } from "@/components/ui/button";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";
import { WorldSphere } from "./world-sphere";

const WORLDS = [
  {
    word: "AI",
    kicker: "World 01 · Intelligence",
    body: "Understand the intelligence now shaping banks, jobs and markets in India — and how to use it in your own work.",
    cta: "Explore AI",
    href: "/ai",
  },
  {
    word: "Web3",
    kicker: "World 02 · Ownership",
    body: "Learn what blockchains, wallets and the Digital Rupee really change — and how to stay safe while you do.",
    cta: "Explore Web3",
    href: "/web3",
  },
  {
    word: "Agents",
    kicker: "World 03 · Autonomy",
    body: "Software that plans and acts for you, within limits you set. Learn how agentic systems are built — on paper money first.",
    cta: "Explore agents",
    href: "/ai#agents",
  },
] as const;

const MANIFESTO =
  "We teach the new money — AI, Web3 and agents — in plain language. AI drafts, people check, and nothing here is ever a tip. Built for India.";

const AUTOPLAY_MS = 7000;

function ManifestoWord({
  word,
  i,
  total,
  progress,
}: {
  word: string;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = 0.56 + (i / total) * 0.3;
  const opacity = useTransform(progress, [start, start + 0.04], [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

/**
 * Home hero, after the "planet" reference: three worlds (AI · Web3 · Agents)
 * each with a giant title and a sphere rising from the bottom edge. Side
 * labels switch worlds (blur swap + sphere morph). Scrolling pins the stage
 * and zooms into the sphere until it fills the screen, then the manifesto
 * reads in word by word.
 */
export function HeroWorlds() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  const [world, setWorld] = useState<0 | 1 | 2>(0);
  const [interacted, setInteracted] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const zoom = useTransform(scrollYProgress, [0.04, 0.58], [0, 1], { clamp: true });
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textBlur = useTransform(scrollYProgress, [0, 0.2], [0, 12]);
  const textFilter = useMotionTemplate`blur(${textBlur}px)`;
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -60]);
  const chromeOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const manifestoOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const manifestoY = useTransform(scrollYProgress, [0.5, 0.62], [40, 0]);

  const go = useCallback((next: number, byUser = true) => {
    setWorld((((next % 3) + 3) % 3) as 0 | 1 | 2);
    if (byUser) setInteracted(true);
  }, []);

  // Autoplay through the worlds until the visitor takes over.
  useEffect(() => {
    if (reduce || interacted) return;
    // The first world also waits for the intro overlay (its progress bar is
    // paused by CSS while html[data-intro] is "cinema"/"play").
    const t = window.setTimeout(
      () => {
        if (scrollYProgress.get() < 0.02 && !document.hidden) go(world + 1, false);
      },
      AUTOPLAY_MS + introDelay() * 1000,
    );
    return () => window.clearTimeout(t);
  }, [world, interacted, reduce, go, scrollYProgress]);

  const W = WORLDS[world];
  const prev = WORLDS[(world + 2) % 3];
  const next = WORLDS[(world + 1) % 3];
  const staticMode = hydrated && reduce;

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
      className="relative h-[300vh] motion-reduce:h-auto"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(world + 1);
        if (e.key === "ArrowLeft") go(world - 1);
      }}
    >
      <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:min-h-[calc(100svh-4rem)] md:top-[4.5rem] md:h-[calc(100svh-4.5rem)]">
        {/* Atmosphere behind the planet */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(60%_70%_at_50%_100%,var(--linen),transparent_70%)]"
        />
        <WorldSphere world={world} zoom={zoom} className="absolute inset-0" />

        {/* Title block */}
        <motion.div
          style={staticMode ? undefined : { opacity: textOpacity, filter: textFilter, y: textY }}
          className="frame gutter relative z-10 flex flex-col items-center pt-[7vh] text-center md:pt-[9vh]"
        >
          <h1 id="hero-title" className="eyebrow text-ink">
            Prepare for the new financial system
          </h1>
          <div className="relative mt-4 min-h-[19rem] w-full md:min-h-[21rem]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={world}
                initial={{ opacity: 0, filter: "blur(14px)", y: 24 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(14px)", y: -24 }}
                transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col items-center"
              >
                <p className="text-ink-muted font-mono text-[0.7rem] tracking-[0.2em] uppercase">
                  {W.kicker}
                </p>
                <p className="display mt-2 text-[clamp(4.5rem,2rem+12vw,11rem)] leading-[0.9] tracking-[-0.03em] uppercase">
                  {W.word}
                </p>
                <span aria-hidden className="bg-mint mt-5 h-0.5 w-12" />
                <p className="text-ink-muted mt-5 max-w-md text-base md:text-lg">{W.body}</p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <TransitionLink href={W.href} data-magnetic="10" className={buttonClass("primary")}>
                    {W.cta}
                  </TransitionLink>
                  <TransitionLink href="/membership" data-magnetic="8" className={buttonClass("outline", "bg-paper")}>
                    Join the club
                  </TransitionLink>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Side labels (previous / next world) */}
        <motion.div
          style={staticMode ? undefined : { opacity: chromeOpacity }}
          className="absolute inset-x-0 top-[58%] z-10"
        >
          <div className="frame gutter flex items-center justify-between">
            {[
              { w: prev, dir: -1, label: "Previous world" },
              { w: next, dir: 1, label: "Next world" },
            ].map(({ w, dir, label }) => (
              <button
                key={label}
                type="button"
                aria-label={`${label}: ${w.word}`}
                onClick={() => go(world + dir)}
                className={cn(
                  "group text-ink-muted hover:text-ink flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase transition-colors",
                  dir === 1 && "flex-row-reverse",
                )}
              >
                <span
                  aria-hidden
                  className="border-line bg-paper group-hover:border-forest grid size-11 place-items-center rounded-xs border transition-[border-color,scale] duration-300 group-hover:scale-110"
                >
                  {dir === 1 ? "→" : "←"}
                </span>
                <span className="hidden sm:inline">{w.word}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Indicator + scroll cue */}
        <motion.div
          style={staticMode ? undefined : { opacity: chromeOpacity }}
          className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-4"
        >
          <div className="flex gap-2" role="tablist" aria-label="Worlds">
            {WORLDS.map((w, i) => (
              <button
                key={w.word}
                type="button"
                role="tab"
                aria-selected={i === world}
                aria-label={w.word}
                onClick={() => go(i)}
                className="bg-ink/15 relative h-0.5 w-10 overflow-hidden"
              >
                {i === world && (
                  <span
                    key={`${world}-${interacted}`}
                    className={cn("bg-forest absolute inset-0 origin-left", !interacted && "hero-progress")}
                    style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-5 font-mono text-[0.65rem] tracking-[0.2em] uppercase">
            <span className="text-ink-muted flex items-center gap-2">
              <span aria-hidden className="bg-ink-muted/60 block h-6 w-px animate-pulse" />
              Scroll to zoom in
            </span>
            <TransitionLink href="/intro" className="text-ink hover:text-forest flex items-center gap-2">
              <span aria-hidden className="border-ink/30 grid size-6 place-items-center rounded-xs border">
                ▶
              </span>
              Watch the 1-min intro
            </TransitionLink>
          </div>
        </motion.div>

        {/* Manifesto, read inside the sphere once it fills the screen */}
        <motion.div
          style={staticMode ? undefined : { opacity: manifestoOpacity, y: manifestoY }}
          className={cn(
            "pointer-events-none absolute inset-0 z-20 grid place-items-center",
            staticMode && "pointer-events-auto relative py-20",
          )}
        >
          <div className="gutter mx-auto max-w-4xl text-center">
            <p className="eyebrow mb-6">Our promise</p>
            <p className="display text-[clamp(1.9rem,1.2rem+2.6vw,3.5rem)] leading-[1.15]">
              {staticMode
                ? MANIFESTO
                : MANIFESTO.split(" ").map((word, i, all) => (
                    <ManifestoWord key={i} word={word} i={i} total={all.length} progress={scrollYProgress} />
                  ))}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
