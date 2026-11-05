import { ViewTransition, type ReactNode } from "react";

const TYPES = {
  "page-forward": "page-forward",
  "page-back": "page-back",
  "page-up": "page-up",
  "page-down": "page-down",
  "page-open": "page-open",
  "page-close": "page-close",
  default: "none",
};

/**
 * Slideshow-style route transition. Rendered from app/template.tsx so every
 * navigation mounts a fresh instance; the enter/exit classes map to the
 * ::view-transition rules in globals.css. Browsers without the View
 * Transitions API simply swap pages instantly.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={TYPES} exit={TYPES} default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
