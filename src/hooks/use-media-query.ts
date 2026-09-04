import { useCallback, useSyncExternalStore } from "react";

// Reports `false` on the server and for the hydrating render, so a prerendered
// page always ships its no-JS layout and upgrades afterwards.
// `useSyncExternalStore` is what makes that safe: React hydrates against the
// server snapshot and re-renders if the client one differs, rather than
// treating the difference as a mismatch.
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => {
        media.removeEventListener("change", onChange);
      };
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
