import type { DotPaletteName } from "../components/DotField";
import { heroDotPalette, type PaletteName } from "../tokens/palettes";

/** Whether the Storybook theme is one of the night themes (Ink or OLED). */
export function isNight(globals: Record<string, unknown>): boolean {
  return globals.theme === "dark" || globals.theme === "oled";
}

/** The sober DotField palette for the active Storybook theme: graphite on Mist, night on Ink. */
export function soberPalette(globals: Record<string, unknown>): DotPaletteName {
  return isNight(globals) ? "night" : "graphite";
}

/** The hero DotField palette for the colour palette picked in the toolbar. */
export function heroPalette(globals: Record<string, unknown>): DotPaletteName {
  // Mono's ink dots would vanish on a night page: it is the one palette with a night field.
  if (globals.palette === "mono" && isNight(globals)) return "monoNight";
  return heroDotPalette(globals.palette as PaletteName | undefined);
}
