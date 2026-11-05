import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * false while React hydrates server HTML, true afterwards. Lets a component
 * render exactly what the server rendered first, then switch to client-only
 * values (pathname changed mid-hydration, reduced-motion preference, …)
 * in a normal re-render instead of a hydration mismatch.
 */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
