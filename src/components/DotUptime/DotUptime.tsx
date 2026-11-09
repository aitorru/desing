import type { CSSProperties } from "react";
import { cx } from "../cx";
import type { StatusTone } from "../Status/Status";
import "./DotUptime.css";

export interface DotUptimeProps {
  /** One status per period (hour, day, deploy…), oldest first. */
  periods: readonly StatusTone[];
  /** What it measures; the count of clean periods is appended for screen readers. */
  label: string;
  /** Rows to fold the periods into (they fill column by column, like a calendar heatmap). */
  rows?: number;
  /** Dot diameter in px. */
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * History as a strip of dots: uptime per day, the last runs of a job. Clean periods stay
 * in quiet ink and only the trouble takes colour, so a glance finds the incidents.
 */
export function DotUptime({
  periods,
  label,
  rows = 1,
  size = 8,
  className,
  style,
}: DotUptimeProps) {
  const clean = periods.filter((p) => p === "ok").length;
  return (
    <div
      role="img"
      aria-label={`${label}: ${clean} de ${periods.length} sin incidencias`}
      className={cx("pt-uptime", className)}
      style={{ "--rows": rows, "--dot": `${size}px`, ...style } as CSSProperties}
    >
      {periods.map((p, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: periods are positional
        <span key={i} className={`pt-uptime__dot pt-uptime__dot--${p}`} />
      ))}
    </div>
  );
}
