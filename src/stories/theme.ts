import type { DotPaletteName } from "../components/DotField";

/** The sober DotField palette for the active Storybook theme: graphite on Mist, night on Ink. */
export function soberPalette(globals: Record<string, unknown>): DotPaletteName {
  return globals.theme === "dark" ? "night" : "graphite";
}
