"use client";

import { useEffect } from "react";

/**
 * One delegated pointer listener for the whole site (cheap, no per-element
 * handlers, works inside server components):
 *
 * - [data-spotlight]: sets --mx / --my so CSS can draw a soft mint glow that
 *   follows the pointer across the card.
 * - [data-magnetic]: the element leans a few pixels towards the pointer and
 *   springs back on leave.
 * - [data-tilt]: the card tilts in 3D towards the pointer and a soft glare
 *   (--gx / --gy, drawn in CSS) follows it.
 *
 * Mouse/pen only, and off for prefers-reduced-motion.
 */
export function PointerEffects() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches) return;

    let magnet: HTMLElement | null = null;
    let tilted: HTMLElement | null = null;

    const untilt = (el: HTMLElement) => {
      el.style.transition = "transform 600ms cubic-bezier(0.25, 1, 0.5, 1)";
      el.style.transform = "";
      el.removeAttribute("data-tilting");
    };

    const release = (el: HTMLElement) => {
      el.style.transition = "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)";
      el.style.transform = "";
    };

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target) return;

      const spot = target.closest<HTMLElement>("[data-spotlight]");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      if (reduce.matches) return;

      const tilt = target.closest<HTMLElement>("[data-tilt]");
      if (tilted && tilted !== tilt) untilt(tilted);
      tilted = tilt;
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const max = Number(tilt.dataset.tilt) || 6;
        tilt.style.transition = "transform 120ms ease-out";
        tilt.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateZ(0)`;
        tilt.style.setProperty("--gx", `${px * 100}%`);
        tilt.style.setProperty("--gy", `${py * 100}%`);
        tilt.setAttribute("data-tilting", "");
      }

      const m = target.closest<HTMLElement>("[data-magnetic]");
      if (magnet && magnet !== m) release(magnet);
      magnet = m;
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        const strength = Number(m.dataset.magnetic) || 8;
        m.style.transition = "transform 150ms ease-out";
        m.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      }
    };

    const onLeaveWindow = () => {
      if (magnet) release(magnet);
      if (tilted) untilt(tilted);
      magnet = null;
      tilted = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, []);

  return null;
}
