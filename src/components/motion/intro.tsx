"use client";

import { useEffect, useState } from "react";
import { LogoArt } from "@/components/ui/logo";

/**
 * Inline, nonce'd script run before paint. Decides which intro, if any:
 * - very first visit in this browser, landing on Home → the full intro film
 *   ("film", components/intro/intro-film.tsx), then the Home page
 * - first visit of a later session, landing on Home → the 5.7 s cinematic
 *   intro ("cinema")
 * - first visit of a session, landing anywhere else → the short logo intro
 *   ("play")
 * - reduced motion, /intro itself, or already seen this session → none
 */
export const INTRO_BOOT_SCRIPT = `try{var d=document.documentElement,p=location.pathname,s=sessionStorage,l=localStorage;if(matchMedia('(prefers-reduced-motion: reduce)').matches||p==='/intro'){d.dataset.intro='seen'}else if(p==='/'&&!l.getItem('nwc-film')){d.dataset.intro='film';l.setItem('nwc-film','1');s.setItem('nwc-intro','1')}else if(s.getItem('nwc-intro')){d.dataset.intro='seen'}else{d.dataset.intro=p==='/'?'cinema':'play';s.setItem('nwc-intro','1')}}catch(e){document.documentElement.dataset.intro='seen'}`;

/** Seconds each intro covers the page; content animations wait this long. */
const INTRO_SECONDS = { play: 1.4, cinema: 6.05 } as const;

/** How long page entrance animations should wait for an intro (client only). */
export function introDelay(): number {
  if (typeof document === "undefined") return 0;
  const mode = document.documentElement.dataset.intro as keyof typeof INTRO_SECONDS | undefined;
  return (mode && INTRO_SECONDS[mode]) || 0;
}

/** Whether an intro overlay is playing right now (client only). */
export function introIsPlaying() {
  return introDelay() > 0;
}

/**
 * First-load intro (≤1.85 s): the Nodal mark builds itself node by node, then
 * ivory shutter panels lift away. The whole sequence is CSS, so it finishes
 * even before JavaScript loads; JS only powers the Skip button.
 */
export function SiteIntro({ skipLabel }: { skipLabel: string }) {
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    const done = () => {
      if (document.documentElement.dataset.intro === "play") {
        document.documentElement.dataset.intro = "seen";
      }
    };
    const t = window.setTimeout(done, 1950);
    return () => window.clearTimeout(t);
  }, []);

  if (skipped) return null;

  return (
    <div className="site-intro" aria-hidden="true" data-site-intro>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="site-intro-panel" style={{ ["--i" as string]: i }} />
      ))}
      <div className="site-intro-mark">
        <LogoArt size={96} animated delay={0.05} />
        <span className="site-intro-word">Nodal Wealth Club</span>
      </div>
      <button
        type="button"
        className="site-intro-skip"
        tabIndex={-1}
        onClick={() => {
          document.documentElement.dataset.intro = "seen";
          setSkipped(true);
        }}
      >
        {skipLabel}
      </button>
    </div>
  );
}
