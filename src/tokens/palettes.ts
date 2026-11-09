import type { DotPaletteName } from "../components/DotField/field";

/** Colour palettes: set one with `data-pt-palette` next to `data-pt-theme`. */
export type PaletteName = "punto" | "marea" | "siena" | "citrico" | "mono";

export interface PaletteInfo {
  name: PaletteName;
  label: string;
  /** One line on mood and when to pick it. */
  description: string;
  /** The DotField palette that matches its spectrum, for heroes and posters. */
  hero: DotPaletteName;
}

export const PALETTES: readonly PaletteInfo[] = [
  {
    name: "punto",
    label: "Punto",
    description: "Lavanda y tinta; violeta → magenta → coral. El original, expresivo.",
    hero: "aurora",
  },
  {
    name: "marea",
    label: "Marea",
    description: "Niebla marina y azul marino; azur → turquesa → verde mar. Sereno, técnico.",
    hero: "marea",
  },
  {
    name: "siena",
    label: "Siena",
    description: "Papel hueso y tinta café; vino → terracota → ocre. Cálido, editorial.",
    hero: "siena",
  },
  {
    name: "citrico",
    label: "Cítrico",
    description: "Piedra y negro oliva; esmeralda → lima → oro. Fresco, enérgico.",
    hero: "citrico",
  },
  {
    name: "mono",
    label: "Mono",
    description: "Blanco y negro, esquinas rectas, trazo de 2 px y sombra dura. Brutalista.",
    hero: "mono",
  },
];

/** The DotField palette that goes with a colour palette (`aurora` for Punto). */
export function heroDotPalette(palette: PaletteName | undefined): DotPaletteName {
  return PALETTES.find((p) => p.name === palette)?.hero ?? "aurora";
}
