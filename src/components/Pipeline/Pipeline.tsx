import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../cx";
import type { StatusTone } from "../Status/Status";
import "./Pipeline.css";

export interface PipelineStage {
  id: string;
  label: ReactNode;
  status: StatusTone;
  /** Duration, count, who approved… Replaces the status word under the label. */
  meta?: ReactNode;
}

export interface PipelineProps extends Omit<HTMLAttributes<HTMLOListElement>, "children"> {
  stages: readonly PipelineStage[];
  orientation?: "horizontal" | "vertical";
  /** Accessible name, e.g. “Despliegue #482”. */
  label: string;
  /** Words for each status (shown under the label when a stage has no `meta`). */
  statusText?: Partial<Record<StatusTone, string>>;
}

const STATUS_TEXT: Record<StatusTone, string> = {
  ok: "Correcto",
  warn: "Con avisos",
  error: "Fallido",
  running: "En curso",
  idle: "Pendiente",
};

/**
 * A run as a line of dots: build → test → deploy. Each stage is a dot in its status, joined
 * by a dotted link that fills in as the run advances. For CI pipelines, rollouts, migrations.
 */
export function Pipeline({
  stages,
  orientation = "horizontal",
  label,
  statusText,
  className,
  ...rest
}: PipelineProps) {
  return (
    <ol
      className={cx("pt-pipeline", `pt-pipeline--${orientation}`, className)}
      aria-label={label}
      {...rest}
    >
      {stages.map((s, i) => {
        const word = statusText?.[s.status] ?? STATUS_TEXT[s.status];
        return (
          <li
            key={s.id}
            className={cx("pt-pipeline__stage", `pt-pipeline__stage--${s.status}`)}
            aria-current={s.status === "running" ? "step" : undefined}
          >
            <span className="pt-pipeline__track" aria-hidden="true">
              <span className="pt-pipeline__node" />
              {i < stages.length - 1 && <span className="pt-pipeline__link" />}
            </span>
            <span className="pt-pipeline__text">
              <span className="pt-pipeline__label">{s.label}</span>
              <span className="pt-pipeline__meta">
                {s.meta ?? word}
                {s.meta != null && <span className="pt-sr-only"> · {word}</span>}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
