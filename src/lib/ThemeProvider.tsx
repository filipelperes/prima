import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

/* ───────── Types ───────── */

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

/* ───────── Constants ───────── */

const STORAGE_KEY = 'theme';
const ThemeContext = createContext<ThemeContextValue | null>(null);

/* ───────── Helpers ───────── */

function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // localStorage unavailable (SSR, privacy mode, etc.)
  }
  return 'dark';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

/* ───────── Provider ───────── */

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    applyTheme(theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {
      if (import.meta.env.DEV) console.warn('ThemeProvider: localStorage unavailable');
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ───────── Hook ───────── */

/**
 * useTheme — reads theme state from ThemeProvider context.
 *
 * Falls back to local state if called outside of a ThemeProvider
 * (e.g. in tests or standalone usage), ensuring backward compatibility.
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);

  /* ── Hooks are always called unconditionally for rule-of-hooks compliance ── */
  const [localTheme, setLocalTheme] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    if (ctx) return; /* Provider handles persistence */
    applyTheme(localTheme);
    try { localStorage.setItem(STORAGE_KEY, localTheme); } catch {
      if (import.meta.env.DEV) console.warn('useTheme: localStorage unavailable');
    }
  }, [localTheme, ctx]);

  const toggle = useCallback(() => {
    if (ctx) {
      ctx.toggle();
    } else {
      setLocalTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }
  }, [ctx]);

  /* ── Return shared state when provider is present ── */
  if (ctx) return ctx;

  /* ── Fallback for standalone usage (tests, edge cases) ── */
  return { theme: localTheme, toggle } as const;
}
