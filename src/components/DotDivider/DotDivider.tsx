import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../cx";
import "./DotDivider.css";

export interface DotDividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  /** `subtle` for lists · `strong` between sections · `aurora` dots take the gradient. */
  tone?: "subtle" | "strong" | "aurora";
  /** Text (or a `<Sparkle />`) centred on the line. Horizontal only. */
  label?: ReactNode;
}

/** A separator drawn as a row of dots on the 8px grid: Dot never draws solid rules. */
export function DotDivider({
  orientation = "horizontal",
  tone = "subtle",
  label,
  className,
  ...rest
}: DotDividerProps) {
  const labelled = label != null && orientation === "horizontal";
  return (
    // biome-ignore lint/a11y/useSemanticElements: <hr> can't hold the label or the dotted line parts
    <div
      role="separator"
      aria-orientation={orientation}
      className={cx(
        "pt-dotdivider",
        `pt-dotdivider--${orientation}`,
        `pt-dotdivider--${tone}`,
        labelled && "pt-dotdivider--labelled",
        className,
      )}
      {...rest}
    >
      <span className="pt-dotdivider__line" />
      {labelled && (
        <>
          <span className="pt-dotdivider__label">{label}</span>
          <span className="pt-dotdivider__line" />
        </>
      )}
    </div>
  );
}
