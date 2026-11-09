import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../cx";
import "./SectionHeader.css";

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Folio before the eyebrow ("01"): orders the sections of a formal page. */
  index?: ReactNode;
  /** Small caps line above the title. */
  eyebrow?: ReactNode;
  /** The serif headline. */
  title: ReactNode;
  /** One or two lines of muted body copy under the title. */
  description?: ReactNode;
  /** Buttons, a `Segmented`… Aligned to the end on wide screens, below on narrow ones. */
  actions?: ReactNode;
  /** `sm` cards and panels · `md` page sections · `lg` page heroes. */
  size?: "sm" | "md" | "lg";
  align?: "start" | "center";
  /** Heading level, so the outline stays right whatever the visual size. */
  level?: 1 | 2 | 3 | 4;
}

/** Eyebrow + serif title + lead + actions: the opening of every Punto section. */
export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  actions,
  size = "md",
  align = "start",
  level = 2,
  className,
  ...rest
}: SectionHeaderProps) {
  const Heading = `h${level}` as const;
  return (
    <header
      className={cx(
        "pt-sectionheader",
        `pt-sectionheader--${size}`,
        `pt-sectionheader--${align}`,
        className,
      )}
      {...rest}
    >
      <div className="pt-sectionheader__text">
        {(index != null || eyebrow != null) && (
          <span className="pt-sectionheader__eyebrow">
            {index != null && <span className="pt-folio">{index}</span>}
            {eyebrow != null && <span className="pt-eyebrow">{eyebrow}</span>}
          </span>
        )}
        <Heading className="pt-display pt-sectionheader__title">{title}</Heading>
        {description != null && <p className="pt-body pt-sectionheader__lead">{description}</p>}
      </div>
      {actions != null && <div className="pt-sectionheader__actions">{actions}</div>}
    </header>
  );
}
