import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../cx";
import "./LogView.css";

export type LogLevel = "debug" | "info" | "ok" | "warn" | "error";

export interface LogEntry {
  /** Stable id; falls back to the position. */
  id?: string;
  /** Already formatted (`12:04:31`). */
  time?: string;
  level?: LogLevel;
  /** Where it comes from: service, pod, job step. */
  source?: string;
  message: ReactNode;
}

export interface LogViewProps extends HTMLAttributes<HTMLDivElement> {
  entries: readonly LogEntry[];
  /** Accessible name of the log. */
  label: string;
  /** CSS max-height; the log scrolls inside it. */
  maxHeight?: number | string;
  /** Wrap long messages instead of scrolling sideways. */
  wrap?: boolean;
}

const LEVEL_TEXT: Record<LogLevel, string> = {
  debug: "DBG",
  info: "INF",
  ok: "OK",
  warn: "WRN",
  error: "ERR",
};

/**
 * Log lines in the mono face: time, a level dot with its three-letter code, source and
 * message. A live region (`role="log"`), so appended lines are announced.
 */
export function LogView({
  entries,
  label,
  maxHeight,
  wrap = false,
  className,
  style,
  ...rest
}: LogViewProps) {
  return (
    <div
      role="log"
      aria-label={label}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable region must be reachable by keyboard
      tabIndex={0}
      className={cx("pt-log", wrap && "pt-log--wrap", className)}
      style={{ maxHeight, ...style }}
      {...rest}
    >
      {entries.map((e, i) => {
        const level = e.level ?? "info";
        return (
          <div key={e.id ?? i} className={cx("pt-log__line", `pt-log__line--${level}`)}>
            {e.time && <time className="pt-log__time">{e.time}</time>}
            <span className="pt-log__level">
              <span className="pt-log__dot" aria-hidden="true" />
              {LEVEL_TEXT[level]}
            </span>
            {e.source && <span className="pt-log__source">{e.source}</span>}
            <span className="pt-log__msg">{e.message}</span>
          </div>
        );
      })}
    </div>
  );
}
