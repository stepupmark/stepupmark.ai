// The app has one global light/dark preference. It exists mainly for the
// marketing surface, which is designed dark-first with a visible toggle; the
// authenticated area and auth flow already carry dark tokens and follow along.
//
// A visitor who never touches the toggle gets their OS setting. The choice is
// only persisted once it is made explicitly, so `localStorage` staying empty is
// the normal case, not a bug.

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "stepupmark-theme";

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function systemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function storedTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(raw) ? raw : null;
  } catch {
    // Private-mode / disabled storage: fall back to the system preference.
    return null;
  }
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

// Runs before first paint, inlined into <head>, so a reload never flashes the
// wrong theme. The storage key is a literal, not interpolated from
// THEME_STORAGE_KEY: building this script from a value trips CodeQL's
// js/bad-code-sanitization. theme.test.ts keeps the two in sync.
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem("stepupmark-theme");var m=window.matchMedia("(prefers-color-scheme: dark)").matches;var d=s==="dark"||(s!=="light"&&m);if(d){document.documentElement.classList.add("dark");}document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){}})();`;
