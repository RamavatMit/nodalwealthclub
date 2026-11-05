/**
 * When a detail page closes back into its card, the destination page must
 * already show its cards — otherwise the page would shrink into an empty slot
 * while the grid is still fading in. A "close" navigation opens a short
 * window during which entrance animations (Reveal, ScanReveal) mount in
 * their final state.
 *
 * Client-only module state: the server never sets it, so hydration of a
 * fresh page load is unaffected.
 */
let skipUntil = 0;

export function skipEntranceAnimations(ms = 1500) {
  skipUntil = performance.now() + ms;
}

export function shouldSkipEntrance() {
  return typeof performance !== "undefined" && performance.now() < skipUntil;
}
