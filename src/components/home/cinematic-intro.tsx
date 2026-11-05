"use client";

import { Fragment, useEffect, useState } from "react";
import { LogoArt } from "@/components/ui/logo";

/**
 * Home-page cinematic intro (first visit per session, ~6 s, skippable).
 *
 *   •  → "Everything evolved."  → highlight sweeps "evolved"
 *      → "Money didn't."        → a linen/mint bloom wipes the screen
 *      → "So we rebuilt how you learn it." (blur → focus)
 *      → the Nodal mark builds itself → the stage lifts into the hero
 *
 * The whole timeline is CSS (globals.css, `.cin-*`), so it plays and ends
 * even before JavaScript loads. JS only adds Skip and cleans up the flag.
 */

function Words({ text, base, highlight = false }: { text: string; base: number; highlight?: boolean }) {
  return (
    <>
      {text.split(" ").map((w, i) => {
        const italic = w.match(/^\*(.+)\*(.*)$/);
        return (
          <Fragment key={i}>
            {i > 0 && " "}
            <span className="cin-mask">
              <span className="cin-word" style={{ animationDelay: `${base + i * 0.08}s` }}>
                {italic ? (
                  <>
                    <span className="cin-accent-wrap">
                      {highlight && <span className="cin-highlight" />}
                      <em className="cin-accent">{italic[1]}</em>
                    </span>
                    {italic[2]}
                  </>
                ) : (
                  w
                )}
              </span>
            </span>
          </Fragment>
        );
      })}
    </>
  );
}

export function CinematicIntro() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const end = () => {
      if (document.documentElement.dataset.intro === "cinema") {
        document.documentElement.dataset.intro = "seen";
      }
    };
    const t = window.setTimeout(end, 6150);
    return () => window.clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div className="cin" aria-hidden="true">
      <div className="cin-stage">
        <span className="cin-dot" />

        <p className="cin-line cin-line-1">
          <Words text="Everything *evolved*." base={0.4} highlight />
        </p>

        <p className="cin-line cin-line-2">
          <Words text="Money *didn't*." base={1.95} />
        </p>

        <span className="cin-bloom" />

        <p className="cin-line cin-line-3">
          So we <em>rebuilt</em> how you learn it.
        </p>

        <div className="cin-mark">
          <LogoArt size={92} animated delay={4.4} />
          <span className="cin-wordmark">Nodal Wealth Club</span>
        </div>
      </div>

      <div className="cin-progress" />

      <button
        type="button"
        className="cin-skip"
        tabIndex={-1}
        onClick={() => {
          document.documentElement.dataset.intro = "seen";
          setGone(true);
        }}
      >
        Skip intro
      </button>
    </div>
  );
}
