import type { CSSProperties, HTMLAttributes } from "react";
import { cx } from "../cx";
import "./Stack.css";

/** Steps of the 4px grid (`--pt-space-1` … `--pt-space-8`), or 0. */
export type SpaceStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface StackProps extends HTMLAttributes<HTMLElement> {
  /** `column` stacks, `row` lines things up (a "cluster"). */
  direction?: "column" | "row";
  /** Gap as a step of the space scale: 3 = 12px, 5 = 24px, 7 = 48px. */
  gap?: SpaceStep;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between";
  /** Rows wrap onto the next line when they run out of room. */
  wrap?: boolean;
  /** Rendered element; defaults to `div`. */
  as?:
    | "div"
    | "section"
    | "header"
    | "footer"
    | "nav"
    | "main"
    | "article"
    | "aside"
    | "ul"
    | "ol"
    | "form";
}

const JUSTIFY = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
};
const ALIGN = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};

/**
 * The layout primitive: one flex box whose gaps snap to the 4px grid. Replaces the
 * ad-hoc `display: grid; gap: 18px` wrappers that otherwise end up in every screen.
 */
export function Stack({
  direction = "column",
  gap = 4,
  align,
  justify,
  wrap = false,
  as: Tag = "div",
  className,
  style,
  children,
  ...rest
}: StackProps) {
  return (
    <Tag
      className={cx("pt-stack", `pt-stack--${direction}`, wrap && "pt-stack--wrap", className)}
      style={
        {
          "--gap": gap === 0 ? "0px" : `var(--pt-space-${gap})`,
          alignItems: align && ALIGN[align],
          justifyContent: justify && JUSTIFY[justify],
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
