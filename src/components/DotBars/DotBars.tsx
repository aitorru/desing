import type { CSSProperties } from "react";
import { cx } from "../cx";
import "./DotBars.css";

export interface DotBarsProps {
  values: readonly number[];
  /** Value that fills a whole column. Defaults to the largest value. */
  max?: number;
  /** Dots per column. */
  rows?: number;
  /** Index drawn with the accent colour (e.g. the chosen scenario). */
  highlight?: number;
  /** Columns rise in, one after another, when mounted. */
  animated?: boolean;
  /** Describe what the chart shows; it's exposed as a single image. */
  label: string;
  className?: string;
  style?: CSSProperties;
}

/** A tiny bar chart drawn in dots, for cards and tables. */
export function DotBars({
  values,
  max,
  rows = 8,
  highlight,
  animated = true,
  label,
  className,
  style,
}: DotBarsProps) {
  const top = max ?? Math.max(1, ...values);
  return (
    <div
      role="img"
      aria-label={label}
      className={cx("pt-dotbars", animated && "pt-dotbars--animated", className)}
      style={{ ...style, "--rows": rows } as CSSProperties}
    >
      {values.map((v, col) => {
        const lit = Math.round((Math.max(0, Math.min(v, top)) / top) * rows);
        return (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: columns are positional
            key={col}
            className={cx("pt-dotbars__col", col === highlight && "is-highlight")}
            style={{ "--c": col } as CSSProperties}
          >
            {Array.from({ length: rows }, (_, r) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: dots are positional
                key={r}
                className={cx("pt-dotbars__dot", rows - r <= lit && "is-on")}
                style={{ "--r": rows - r } as CSSProperties}
              />
            ))}
          </span>
        );
      })}
    </div>
  );
}
