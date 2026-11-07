import type { HTMLAttributes, ReactNode } from "react";
import { Badge } from "../Badge/Badge";
import { cx } from "../cx";
import "./Stat.css";

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  /** What is measured, in small caps. */
  label: ReactNode;
  /** The figure, set in the display serif. */
  value: ReactNode;
  /** Change against the previous period, e.g. `+12,4 %`. */
  delta?: ReactNode;
  /** Whether the delta is good news (not whether it goes up: a lower churn is positive). */
  trend?: "positive" | "negative" | "neutral";
  /** Context under the value: period, unit, confidence… */
  note?: ReactNode;
  /** A `DotBars` or `DotProgress` under the figure. */
  chart?: ReactNode;
  size?: "md" | "lg";
}

/**
 * A KPI: label, big serif figure, delta badge, note and an optional dot chart. Bare by
 * design: drop it in a `GlassCard`, a grid cell or a hero.
 */
export function Stat({
  label,
  value,
  delta,
  trend = "neutral",
  note,
  chart,
  size = "md",
  className,
  ...rest
}: StatProps) {
  return (
    <div className={cx("pt-stat", `pt-stat--${size}`, className)} {...rest}>
      <div className="pt-stat__top">
        <span className="pt-eyebrow">{label}</span>
        {delta != null && (
          <Badge tone={trend} dot>
            {delta}
          </Badge>
        )}
      </div>
      <p className="pt-display pt-stat__value">{value}</p>
      {note != null && <p className="pt-stat__note">{note}</p>}
      {chart != null && <div className="pt-stat__chart">{chart}</div>}
    </div>
  );
}
