import { useCallback, useEffect, useSyncExternalStore } from "react";

import { applyTheme, storedTheme, systemTheme, THEME_STORAGE_KEY, type Theme } from "~/lib/theme";

type UseThemeResult = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
};

function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function clientSnapshot(): Theme {
  return storedTheme() ?? systemTheme();
}

// SSR and the first hydration render both use this; the head script has already
// put the real class on <html>, so a brief mismatch on the toggle icon only is
// acceptable and React reconciles it without a warning for useSyncExternalStore.
function serverSnapshot(): Theme {
  return "light";
}

function persist(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private-mode / disabled storage: the class still flips for this session.
  }
  // `storage` only fires in other tabs, so nudge this one's subscribers too.
  window.dispatchEvent(new StorageEvent("storage", { key: THEME_STORAGE_KEY }));
}

export function useTheme(): UseThemeResult {
  const theme = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);

  // Push React's current theme onto the document — the one thing an effect is
  // meant to do. No setState here, so no cascading renders.
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    persist(next);
  }, []);

  const toggle = useCallback(() => {
    persist(clientSnapshot() === "dark" ? "light" : "dark");
  }, []);

  return { theme, setTheme, toggle };
}
