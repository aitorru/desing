import { useCallback, useEffect, useState } from "react";

/** A Dot theme: `light` is Mist, `dark` is Ink, `oled` is Ink on true black. */
export type ThemeName = "light" | "dark" | "oled";

/** What a person picks: a theme, or `system` to follow the device. */
export type ThemePreference = ThemeName | "system";

export const THEMES: readonly ThemeName[] = ["light", "dark", "oled"];

export const THEME_STORAGE_KEY = "pt-theme";

const isPreference = (v: unknown): v is ThemePreference =>
  v === "system" || v === "light" || v === "dark" || v === "oled";

const systemIsDark = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;

/**
 * Turns a preference into the theme to paint. `night` is the theme `system` resolves to
 * when the device is in dark mode: `dark` by default, `oled` for apps used on phones.
 */
export function resolveTheme(
  preference: ThemePreference,
  night: "dark" | "oled" = "dark",
  dark: boolean = systemIsDark(),
): ThemeName {
  if (preference !== "system") return preference;
  return dark ? night : "light";
}

export interface UseThemeOptions {
  /** localStorage key; `null` keeps the choice in memory only. */
  storageKey?: string | null;
  /** Preference before the person has chosen. */
  defaultPreference?: ThemePreference;
  /** The theme `system` means at night. */
  night?: "dark" | "oled";
  /**
   * Element that gets `data-pt-theme`. Defaults to `<html>`; pass `null` to apply nothing
   * and put `theme` on your own element.
   */
  target?: HTMLElement | null;
}

function read(key: string | null, fallback: ThemePreference): ThemePreference {
  if (!key || typeof window === "undefined") return fallback;
  try {
    const stored = window.localStorage.getItem(key);
    return isPreference(stored) ? stored : fallback;
  } catch {
    return fallback;
  }
}

/**
 * The night-mode helper: remembers the preference, follows the device while it is
 * `system`, and keeps `data-pt-theme` in sync. Pair it with `<ThemeSwitch>`.
 *
 * ```tsx
 * const { preference, setPreference } = useTheme({ night: "oled" });
 * <ThemeSwitch value={preference} onChange={setPreference} />
 * ```
 */
export function useTheme({
  storageKey = THEME_STORAGE_KEY,
  defaultPreference = "system",
  night = "dark",
  target,
}: UseThemeOptions = {}) {
  const [preference, setPref] = useState<ThemePreference>(() =>
    read(storageKey, defaultPreference),
  );
  const [dark, setDark] = useState(systemIsDark);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setDark(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Another tab changed it: follow.
  useEffect(() => {
    if (!storageKey) return;
    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey) setPref(isPreference(e.newValue) ? e.newValue : defaultPreference);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storageKey, defaultPreference]);

  const theme = resolveTheme(preference, night, dark);

  useEffect(() => {
    if (target === null) return;
    (target ?? document.documentElement).setAttribute("data-pt-theme", theme);
  }, [theme, target]);

  const setPreference = useCallback(
    (next: ThemePreference) => {
      setPref(next);
      if (!storageKey) return;
      try {
        window.localStorage.setItem(storageKey, next);
      } catch {
        // Private mode or storage disabled: the choice lasts for this page only.
      }
    },
    [storageKey],
  );

  return { preference, theme, setPreference };
}

/**
 * Inline script for `<head>`: sets `data-pt-theme` before the first paint, so a stored
 * night theme never flashes white. Keep its arguments equal to the ones given to `useTheme`.
 */
export function themeInitScript(
  storageKey: string = THEME_STORAGE_KEY,
  night: "dark" | "oled" = "dark",
): string {
  // Storage is read in its own try: if it is blocked, the device preference still applies.
  return `(function(){var p;try{p=localStorage.getItem(${JSON.stringify(storageKey)})}catch(e){}try{var t=p==="light"||p==="dark"||p==="oled"?p:matchMedia("(prefers-color-scheme: dark)").matches?${JSON.stringify(night)}:"light";document.documentElement.setAttribute("data-pt-theme",t)}catch(e){}})()`;
}
