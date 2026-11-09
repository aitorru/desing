import type { SVGProps } from "react";
import { cx } from "../cx";
import "./DotMark.css";

export interface DotMarkProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  size?: number;
  /** Which of the nine dots (0–8, row by row) carries the seal. `null` for none. */
  seal?: number | null;
  /** Accessible name. Without it the mark is decorative. */
  title?: string;
}

const CELLS = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

/** The Punto 2 mark: nine dots on the grid, one of them sealed with the accent. */
export function DotMark({ size = 20, seal = 2, title, className, ...rest }: DotMarkProps) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: decorative unless `title` is given (then it renders one)
    <svg
      className={cx("pt-dotmark", className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title && <title>{title}</title>}
      {CELLS.map((i) => (
        <circle
          key={i}
          className={i === seal ? "pt-dotmark__seal" : undefined}
          cx={4 + (i % 3) * 8}
          cy={4 + Math.floor(i / 3) * 8}
          r={2.6}
        />
      ))}
    </svg>
  );
}
