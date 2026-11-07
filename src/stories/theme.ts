import type { DotPaletteName } from "../components/DotField";
import { heroDotPalette, type PaletteName } from "../tokens/palettes";

/** The sober DotField palette for the active Storybook theme: graphite on Mist, night on Ink. */
export function soberPalette(globals: Record<string, unknown>): DotPaletteName {
  return globals.theme === "dark" ? "night" : "graphite";
}

/** The hero DotField palette for the colour palette picked in the toolbar. */
export function heroPalette(globals: Record<string, unknown>): DotPaletteName {
  return heroDotPalette(globals.palette as PaletteName | undefined);
}
