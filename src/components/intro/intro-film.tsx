"use client";

import { useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
} from "react";
import { buttonClass } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";
import {
  SceneAnswer,
  SceneClub,
  SceneFinale,
  SceneNoise,
  SceneOpening,
  SceneProcess,
  ScenePromises,
  SceneShift,
  SceneWorlds,
} from "./scenes";

type Scene = { title: string; seconds: number; C: ComponentType };

/** Watches <html data-intro>, which the boot script sets before first paint. */
function subscribeIntro(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-intro"] });
  return () => mo.disconnect();
}
const isFilmMode = () => document.documentElement.dataset.intro === "film";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/**
 * The Nodal intro film. Full-screen and video-like: scenes cut with wipe
 * transitions, each one drifts in slowly like a camera move, film grain and a
 * vignette sit on top, and the player chrome hides itself while playing.
 *
 * - mode "gate": rendered on the Home page. Plays only on a visitor's very
 *   first visit (the boot script sets <html data-intro="film">), then lifts
 *   away into the Home page.
 * - mode "page": the /intro route. Plays every time, then goes to Home.
 */
export function IntroFilm({ mode = "gate" }: { mode?: "gate" | "page" }) {
  const router = useRouter();
  const filmMode = useSyncExternalStore(subscribeIntro, isFilmMode, () => false);
  const active = mode === "page" || filmMode;
  const [exiting, setExiting] = useState(false);
  const done = useRef(false);

  // If the visitor leaves the page mid-film (e.g. a finale link), release
  // the scroll lock and mark the film as seen.
  useEffect(
    () => () => {
      if (mode === "gate" && document.documentElement.dataset.intro === "film") {
        document.documentElement.dataset.intro = "seen";
      }
    },
    [mode],
  );

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    setExiting(true);
    window.setTimeout(() => {
      try {
        localStorage.setItem("nwc-film", "1");
      } catch {}
      if (mode === "page") {
        router.push("/");
      } else {
        document.documentElement.dataset.intro = "seen";
        setExiting(false);
        done.current = false;
      }
    }, 900);
  }, [mode, router]);

  return (
    <div
      className={cn("film", mode === "page" && "film-page", exiting && "film-exit")}
      role="dialog"
      aria-modal={active ? true : undefined}
      aria-label="Nodal Wealth Club intro film"
      aria-hidden={active ? undefined : true}
      data-lenis-prevent
    >
      {/* Shown before JavaScript is ready, and behind the player */}
      <div className="film-boot" aria-hidden>
        <LogoMark size={56} />
      </div>
      {active && <Player onDone={finish} mode={mode} />}
    </div>
  );
}

function Player({ onDone, mode }: { onDone: () => void; mode: "gate" | "page" }) {
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  const autoplay = !(hydrated && reduce);

  const scenes: Scene[] = useMemo(() => {
    const Finale = () => (
      <SceneFinale
        actions={
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" onClick={onDone} className={buttonClass("primary")}>
              Enter the site
            </button>
            <Link href="/membership" onClick={onDone} className={buttonClass("outline")}>
              See membership
            </Link>
          </div>
        }
      />
    );
    return [
      { title: "Nodal Wealth Club", seconds: 4.4, C: SceneOpening },
      { title: "Money keeps changing", seconds: 6.6, C: SceneShift },
      { title: "The noise", seconds: 5.8, C: SceneNoise },
      { title: "A calmer way", seconds: 4.8, C: SceneAnswer },
      { title: "Three worlds", seconds: 6.2, C: SceneWorlds },
      { title: "How we use AI", seconds: 6.4, C: SceneProcess },
      { title: "The club", seconds: 5.4, C: SceneClub },
      { title: "Our promises", seconds: 5.4, C: ScenePromises },
      { title: "Join us", seconds: 7, C: Finale },
    ];
  }, [onDone]);

  const LAST = scenes.length - 1;
  const total = scenes.reduce((s, x) => s + x.seconds, 0);
  const offsets = scenes.map((_, i) => scenes.slice(0, i).reduce((s, x) => s + x.seconds, 0));

  const [index, setIndex] = useState(0);
  const [run, setRun] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [wipe, setWipe] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [chrome, setChrome] = useState(true);

  const remaining = useRef(scenes[0].seconds * 1000);
  const startedAt = useRef(0);
  const swapTimer = useRef<number | undefined>(undefined);
  const idleTimer = useRef<number | undefined>(undefined);

  /** Cut to scene n behind a wipe; the swap happens at the wipe's midpoint. */
  const go = useCallback(
    (next: number) => {
      const n = Math.max(0, Math.min(LAST, next));
      if (n === index) return;
      setWipe((w) => w + 1);
      window.clearTimeout(swapTimer.current);
      swapTimer.current = window.setTimeout(() => {
        remaining.current = scenes[n].seconds * 1000;
        setElapsed(0);
        setIndex(n);
      }, 460);
    },
    [LAST, index, scenes],
  );

  const toggle = useCallback(() => {
    if (playing) remaining.current -= performance.now() - startedAt.current;
    setPlaying(!playing);
  }, [playing]);

  const replay = useCallback(() => {
    remaining.current = scenes[0].seconds * 1000;
    setElapsed(0);
    setIndex(0);
    setRun((r) => r + 1);
    setPlaying(true);
  }, [scenes]);

  // Scene timer — the last scene ends the film.
  useEffect(() => {
    if (!autoplay || !playing) return;
    startedAt.current = performance.now();
    const t = window.setTimeout(
      () => (index === LAST ? onDone() : go(index + 1)),
      Math.max(0, remaining.current),
    );
    return () => window.clearTimeout(t);
  }, [index, playing, run, autoplay, go, LAST, onDone]);

  // Clock for the time readout.
  useEffect(() => {
    if (!autoplay || !playing) return;
    const id = window.setInterval(() => {
      const spent =
        scenes[index].seconds * 1000 - remaining.current + (performance.now() - startedAt.current);
      setElapsed(Math.min(scenes[index].seconds, spent / 1000));
    }, 250);
    return () => window.clearInterval(id);
  }, [index, playing, autoplay, scenes]);

  // Player chrome hides itself while playing, like a video.
  const wake = useCallback(() => {
    setChrome(true);
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setChrome(false), 2600);
  }, []);
  useEffect(() => {
    // Chrome starts visible; hide it after the first idle period.
    idleTimer.current = window.setTimeout(() => setChrome(false), 2600);
    return () => window.clearTimeout(idleTimer.current);
  }, []);

  // Keyboard: Space/K pause · ←/→ scene · R replay · Esc skip.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      wake();
      if (e.key === " " || e.key === "k") {
        e.preventDefault();
        toggle();
      } else if (e.key === "ArrowRight") go(index + 1);
      else if (e.key === "ArrowLeft") go(index - 1);
      else if (e.key === "r" || e.key === "R") replay();
      else if (e.key === "Escape") onDone();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, replay, toggle, onDone, wake]);

  const paused = !playing || !autoplay;
  const Current = scenes[index].C;
  const showChrome = chrome || paused;

  return (
    <div className="film-player" onPointerMove={wake} onPointerDown={wake}>
      {/* Picture */}
      <div
        className={cn("sr-stage film-picture", paused && "sr-paused")}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a, button")) return;
          if (autoplay) toggle();
        }}
      >
        <div
          key={`${index}-${run}`}
          className="film-scene"
          style={{ animationDuration: `${scenes[index].seconds}s` }}
        >
          <Current />
        </div>

        {/* Cut transition: a sand panel with a mint leading edge sweeps across */}
        {wipe > 0 && (
          <div key={wipe} className={cn("film-wipe", wipe % 2 ? "film-wipe-x" : "film-wipe-y")} aria-hidden />
        )}

        <div className="film-vignette" aria-hidden />
        <div className="film-grain" aria-hidden />
      </div>

      {/* Top bar: title + skip (always reachable) */}
      <div className={cn("film-top", !showChrome && "film-chrome-hidden")}>
        <span className="flex items-center gap-2.5">
          <LogoMark size={20} />
          <span className="font-mono text-[0.65rem] tracking-[0.22em] uppercase">Nodal · Intro film</span>
        </span>
        <button type="button" onClick={onDone} className="film-skip">
          {mode === "page" ? "Exit to site" : "Skip intro"} <span aria-hidden>→</span>
        </button>
      </div>

      {/* Bottom bar: chapters as one continuous timeline, time, controls */}
      <div className={cn("film-bottom", !showChrome && "film-chrome-hidden", paused && "sr-paused")}>
        <div className="flex h-5 items-center gap-[2px]">
          {scenes.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Chapter ${i + 1}: ${s.title}`}
              aria-current={i === index ? "step" : undefined}
              onClick={() => go(i)}
              className="group bg-ink/15 relative h-[3px] overflow-hidden transition-[height] hover:h-[6px]"
              style={{ flexGrow: s.seconds }}
            >
              {i < index && <span className="bg-forest absolute inset-0" />}
              {i === index && (
                <span
                  key={`${index}-${run}`}
                  className="bg-forest absolute inset-0 origin-left"
                  style={autoplay ? { animation: `sr-grow-x ${s.seconds}s linear both` } : undefined}
                />
              )}
            </button>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {autoplay && (
              <button
                type="button"
                onClick={toggle}
                aria-label={playing ? "Pause" : "Play"}
                className="film-btn bg-forest text-paper border-forest"
              >
                {playing ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                    <rect x="2" y="1" width="3" height="10" fill="currentColor" />
                    <rect x="7" y="1" width="3" height="10" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                    <path d="M2 1l9 5-9 5z" fill="currentColor" />
                  </svg>
                )}
              </button>
            )}
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous chapter"
              className="film-btn"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next chapter"
              className="film-btn"
            >
              →
            </button>
            <button type="button" onClick={replay} aria-label="Replay" className="film-btn">
              ↺
            </button>
            <span className="text-ink-muted ml-2 font-mono text-[0.7rem] tabular-nums" aria-hidden>
              {fmt(offsets[index] + elapsed)} / {fmt(total)}
            </span>
          </div>
          <p className="font-mono text-[0.7rem]" aria-live="polite">
            <span className="text-ink-muted">Chapter {index + 1} ·</span> {scenes[index].title}
          </p>
        </div>
      </div>

      {/* Centre flash when pausing / resuming, like a video player */}
      <span key={`flash-${playing}`} className="film-flash" aria-hidden>
        {playing ? "▶" : "❚❚"}
      </span>
    </div>
  );
}
