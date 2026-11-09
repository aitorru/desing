import type { HTMLAttributes } from "react";
import { cx } from "../cx";
import "./Status.css";

/** `ok` healthy · `warn` degraded · `error` down · `running` in progress · `idle` not started / unknown. */
export type StatusTone = "ok" | "warn" | "error" | "running" | "idle";

export interface StatusProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTone;
  /** Breathing halo. On by default for `running`. */
  pulse?: boolean;
  /** Only the dot; the children become its accessible name. */
  dotOnly?: boolean;
}

/**
 * A state as a dot plus a word: service health, job results, rollout steps. The word is
 * part of the component on purpose — colour alone never carries a status.
 */
export function Status({
  tone = "idle",
  pulse = tone === "running",
  dotOnly = false,
  className,
  children,
  ...rest
}: StatusProps) {
  return (
    <span className={cx("pt-status", `pt-status--${tone}`, className)} {...rest}>
      <span className={cx("pt-status__dot", pulse && "pt-status__dot--pulse")} aria-hidden="true" />
      <span className={dotOnly ? "pt-sr-only" : "pt-status__label"}>{children}</span>
    </span>
  );
}
