import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "tp-theme";

export type TpTheme = "light" | "dark";

function readTheme(): TpTheme {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* ignore */
  }
  return "dark";
}

export function useTpTheme() {
  const [theme, setThemeState] = useState<TpTheme>(readTheme);

  const apply = useCallback((next: TpTheme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    try {
      (window.dataLayer = window.dataLayer || []).push({ event: "theme_change", theme: next });
    } catch {
      /* ignore */
    }
    setThemeState(next);
  }, []);

  useEffect(() => {
    apply(readTheme());
  }, [apply]);

  const toggle = useCallback(() => {
    apply(theme === "light" ? "dark" : "light");
  }, [apply, theme]);

  return { theme, setTheme: apply, toggle };
}