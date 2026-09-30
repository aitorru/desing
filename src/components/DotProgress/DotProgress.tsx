import type { CSSProperties } from "react";
import { cx } from "../cx";
import "./DotProgress.css";

export interface DotProgressProps {
  /** 0–100. Omit for an indeterminate bar (a highlight travels along the dots). */
  value?: number;
  /** Number of dots. */
  count?: number;
  tone?: "accent" | "current";
  label: string;
  className?: string;
  style?: CSSProperties;
}

/** A progress bar made of dots; filled dots take their slice of the aurora gradient. */
export function DotProgress({
  value,
  count = 24,
  tone = "accent",
  label,
  className,
  style,
}: DotProgressProps) {
  const indeterminate = value == null;
  const clamped = Math.max(0, Math.min(100, value ?? 0));
  const filled = Math.round((clamped / 100) * count);
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={indeterminate ? undefined : Math.round(clamped)}
      className={cx(
        "pt-dotprogress",
        `pt-dotprogress--${tone}`,
        indeterminate && "pt-dotprogress--indeterminate",
        className,
      )}
      style={{ ...style, "--n": count } as CSSProperties}
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: dots are positional
          key={i}
          className={cx("pt-dotprogress__dot", !indeterminate && i < filled && "is-on")}
          style={{ "--i": i } as CSSProperties}
        />
      ))}
    </div>
  );
}
