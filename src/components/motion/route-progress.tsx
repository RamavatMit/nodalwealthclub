"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Thin progress line across the top that sweeps on every route change. */
export function RouteProgress() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.animate(
      [
        { transform: "scaleX(0)", opacity: 1, transformOrigin: "left" },
        { transform: "scaleX(1)", opacity: 1, transformOrigin: "left", offset: 0.7 },
        { transform: "scaleX(1)", opacity: 0, transformOrigin: "left" },
      ],
      { duration: 900, easing: "cubic-bezier(0.25, 1, 0.5, 1)" },
    );
  }, [pathname]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="bg-forest pointer-events-none fixed inset-x-0 top-0 z-[150] h-[2px] origin-left scale-x-0"
    />
  );
}
