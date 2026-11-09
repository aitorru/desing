import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { cx } from "../cx";
import { MOTIF_DEFAULTS, type PatternAnchor, type PatternMotif, patternPaths } from "./motifs";
import "./DotPattern.css";

const LEVELS = 5;

export interface DotPatternProps {
  /**
   * `grid` ruled paper with major dots · `fade` halftone that thins out · `rings` arcs
   * around the origin · `orb` a halftone disc · `wave` still bands · `diagonal` hatching.
   */
  motif?: PatternMotif;
  /** Size in dots. Omit both to fill the nearest positioned ancestor. */
  cols?: number;
  rows?: number;
  /** Distance between dot centres, in px. Keep it on the 4px grid. */
  gap?: number;
  /** Largest dot diameter as a fraction of `gap` (0–1). */
  dot?: number;
  /** Pins the pattern to a corner, edge or the centre of the nearest positioned ancestor. */
  anchor?: PatternAnchor;
  /** Where the motif grows from. Defaults to `anchor` (or `top-right`); an `orb` defaults to its centre. */
  origin?: PatternAnchor;
  /** Cells between rings, crests, diagonals or major dots. */
  period?: number;
  /** How fast the dots shrink away from the origin (0 = uniform). */
  falloff?: number;
  /** Band, counted from the origin, drawn in the accent colour: the one mark of colour. */
  highlight?: number | null;
  /** `ink` follows the text colour · `accent` the palette accent · `current` the parent's colour. */
  tone?: "ink" | "accent" | "current";
  /** Opacity of the dots (the accented band always stays solid). */
  intensity?: number;
  /** `breathe` slowly dims and returns; off with `prefers-reduced-motion`. */
  motion?: "still" | "breathe";
  className?: string;
  style?: CSSProperties;
}

/**
 * A composed ornament of dots: the formal counterpart of `DotField`. It is geometry, not
 * noise — static, deterministic, on the dot grid — and it reads the theme roles, so the
 * same pattern works in every palette, in Mist and in Ink. Decorative: hidden from
 * assistive tech.
 */
export function DotPattern({
  motif = "rings",
  cols,
  rows,
  gap = 8,
  dot = 0.62,
  anchor,
  origin,
  period,
  falloff,
  highlight = null,
  tone = "ink",
  intensity = 0.3,
  motion = "still",
  className,
  style,
}: DotPatternProps) {
  const ref = useRef<SVGSVGElement>(null);
  const fixed = cols != null && rows != null ? ([cols, rows] as const) : null;
  const fill = fixed == null;
  const [measured, setMeasured] = useState<readonly [number, number]>([0, 0]);

  useEffect(() => {
    const svg = ref.current;
    if (!fill || !svg) return;
    const measure = () => {
      const { width, height } = svg.getBoundingClientRect();
      const next = [Math.ceil(width / gap), Math.ceil(height / gap)] as const;
      setMeasured((prev) => (prev[0] === next[0] && prev[1] === next[1] ? prev : next));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(svg);
    measure();
    return () => ro.disconnect();
  }, [fill, gap]);

  const [c, r] = fixed ?? measured;
  const paths = useMemo(
    () =>
      patternPaths(
        {
          motif,
          cols: c,
          rows: r,
          // An orb is a whole disc unless an origin cuts it into a half or a quarter.
          origin: origin ?? (motif === "orb" ? "center" : (anchor ?? "top-right")),
          period: period ?? MOTIF_DEFAULTS[motif].period,
          falloff: falloff ?? MOTIF_DEFAULTS[motif].falloff,
          highlight,
        },
        gap,
        LEVELS,
      ),
    [motif, c, r, origin, anchor, period, falloff, highlight, gap],
  );

  const layer = (list: readonly string[], name: string) => (
    <g className={`pt-dotpattern__${name}`}>
      {list.map((d, i) =>
        d ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: the index is the size level
          <path key={i} d={d} strokeWidth={Math.max(0.9, (gap * dot * (i + 1)) / LEVELS)} />
        ) : null,
      )}
    </g>
  );

  return (
    <svg
      ref={ref}
      className={cx(
        "pt-dotpattern",
        `pt-dotpattern--${tone}`,
        fill && "pt-dotpattern--fill",
        anchor && !fill && `pt-dotpattern--anchored pt-dotpattern--at-${anchor}`,
        motion === "breathe" && "pt-dotpattern--breathe",
        className,
      )}
      width={fill ? undefined : c * gap}
      height={fill ? undefined : r * gap}
      style={{ "--pt-pattern-intensity": intensity, ...style } as CSSProperties}
      aria-hidden="true"
      focusable="false"
    >
      {layer(paths.base, "base")}
      {layer(paths.accent, "accent")}
    </svg>
  );
}
