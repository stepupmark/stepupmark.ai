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

// Runs before first paint, inlined into the document head, so there is no flash
// of the wrong theme on a reload. Kept dependency-free and side-effect-narrow on
// purpose — it only ever adds the `dark` class, never removes app defaults.
export const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(
  THEME_STORAGE_KEY,
)};var s=localStorage.getItem(k);var m=window.matchMedia("(prefers-color-scheme: dark)").matches;var d=s==="dark"||(s!=="light"&&m);if(d){document.documentElement.classList.add("dark");}document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){}})();`;
