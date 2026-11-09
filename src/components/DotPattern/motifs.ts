/**
 * The motifs behind <DotPattern>. Pure geometry: given a cell of the dot grid, return how
 * big its dot is (0–1) and whether it belongs to the accented band. No randomness and no
 * time — a pattern is drawn once and always comes out the same.
 */

export type PatternMotif = "grid" | "fade" | "rings" | "orb" | "wave" | "diagonal";

export type PatternAnchor =
  | "top-left"
  | "top"
  | "top-right"
  | "left"
  | "center"
  | "right"
  | "bottom-left"
  | "bottom"
  | "bottom-right";

export interface PatternParams {
  motif: PatternMotif;
  cols: number;
  rows: number;
  /** Corner, edge or centre the motif grows from. */
  origin: PatternAnchor;
  /** Cells between rings / crests / diagonals / major dots. */
  period: number;
  /** How fast the dots shrink away from the origin (0 = uniform). */
  falloff: number;
  /** Band (counted from the origin) drawn with the accent colour; `null` for none. */
  highlight: number | null;
}

/** Per-motif defaults for `period` and `falloff`. */
export const MOTIF_DEFAULTS: Record<PatternMotif, { period: number; falloff: number }> = {
  grid: { period: 4, falloff: 0.9 },
  fade: { period: 4, falloff: 0.6 },
  rings: { period: 6, falloff: 0.85 },
  orb: { period: 4, falloff: 0.5 },
  wave: { period: 7, falloff: 0.9 },
  diagonal: { period: 4, falloff: 1 },
};

const WAVE_COS = Math.cos(0.61);
const WAVE_SIN = Math.sin(0.61);

interface Frame {
  ox: number;
  oy: number;
  /** Distance to the farthest edge on each axis. */
  ex: number;
  ey: number;
  /** Whether the origin sits in the middle of that axis. */
  midX: boolean;
  midY: boolean;
}

function frameOf(origin: PatternAnchor, cols: number, rows: number): Frame {
  const left = origin.endsWith("left");
  const right = origin.endsWith("right");
  const top = origin.startsWith("top");
  const bottom = origin.startsWith("bottom");
  // Corners and edges sit half a cell outside the grid, so arcs are true quarter circles.
  const ox = left ? -0.5 : right ? cols - 0.5 : (cols - 1) / 2;
  const oy = top ? -0.5 : bottom ? rows - 0.5 : (rows - 1) / 2;
  return {
    ox,
    oy,
    ex: left || right ? cols : cols / 2,
    ey: top || bottom ? rows : rows / 2,
    midX: !left && !right,
    midY: !top && !bottom,
  };
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

function sample(p: PatternParams, f: Frame, col: number, row: number, out: [number, boolean]) {
  const dx = col - f.ox;
  const dy = row - f.oy;
  const d = Math.hypot(dx, dy);
  const t = d / Math.max(f.ex, f.ey);
  const fade = clamp01(1 - p.falloff * t);
  const hl = p.highlight;
  let size = 0;
  let hi = false;

  switch (p.motif) {
    case "grid": {
      const major = col % p.period === 0 && row % p.period === 0;
      size = (major ? 1 : 0.45) * fade;
      hi = major && Math.round(Math.max(Math.abs(dx), Math.abs(dy)) / p.period) === hl;
      break;
    }
    case "fade": {
      const lin =
        f.midX && f.midY
          ? t
          : (f.midX ? 0 : Math.abs(dx) / f.ex) + (f.midY ? 0 : Math.abs(dy) / f.ey);
      size = clamp01(1 - lin * (0.6 + p.falloff)) ** 1.2;
      break;
    }
    case "rings": {
      const w = 0.5 + 0.5 * Math.cos((2 * Math.PI * d) / p.period);
      size = t > 1 ? 0 : w ** 1.6 * fade;
      hi = w > 0.55 && Math.round(d / p.period) === hl;
      break;
    }
    case "orb": {
      size = t >= 1 ? 0 : (1 - t * t) ** (0.5 + p.falloff);
      hi = hl != null && d < hl * p.period;
      break;
    }
    case "wave": {
      const across = dx * WAVE_COS + dy * WAVE_SIN;
      const along = dy * WAVE_COS - dx * WAVE_SIN;
      const phase = (across + p.period * 0.6 * Math.sin(along / (p.period * 1.6))) / p.period;
      const w = 0.5 + 0.5 * Math.cos(2 * Math.PI * phase);
      size = w * w * fade;
      hi = w > 0.6 && Math.abs(Math.round(phase)) === hl;
      break;
    }
    case "diagonal": {
      const i = Math.round(Math.abs(dx) + Math.abs(dy));
      const on = i % p.period === 0;
      size = (on ? 1 : 0.32) * fade;
      hi = on && i / p.period === hl;
      break;
    }
  }
  out[0] = size;
  out[1] = hi;
}

export interface PatternPaths {
  /** One path per size level, smallest first: `M x y h.01` per dot, drawn with round caps. */
  base: string[];
  accent: string[];
}

/**
 * Rasterises a motif into SVG path data. Sizes are quantised into `levels` steps, so a
 * whole pattern is at most `2 × levels` DOM nodes however many dots it has.
 */
export function patternPaths(p: PatternParams, gap: number, levels = 5): PatternPaths {
  const base: string[][] = Array.from({ length: levels }, () => []);
  const accent: string[][] = Array.from({ length: levels }, () => []);
  const frame = frameOf(p.origin, p.cols, p.rows);
  const out: [number, boolean] = [0, false];
  for (let row = 0; row < p.rows; row++) {
    const y = (row + 0.5) * gap;
    for (let col = 0; col < p.cols; col++) {
      sample(p, frame, col, row, out);
      const level = Math.min(levels, Math.round(out[0] * levels));
      if (level <= 0) continue;
      (out[1] ? accent : base)[level - 1]?.push(`M${(col + 0.5) * gap} ${y}h.01`);
    }
  }
  return { base: base.map((l) => l.join("")), accent: accent.map((l) => l.join("")) };
}
