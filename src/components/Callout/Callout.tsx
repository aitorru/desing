import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../cx";
import { Sparkle } from "../Sparkle/Sparkle";
import "./Callout.css";

export type CalloutTone = "neutral" | "accent" | "positive" | "negative";

export interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: CalloutTone;
  title?: ReactNode;
  /** Leading glyph. Defaults to the sparkle; pass `null` for none. */
  icon?: ReactNode;
  /** Buttons under the text. */
  actions?: ReactNode;
  /** Close button; called when it is pressed. */
  onDismiss?: () => void;
}

/**
 * An inline message (tip, warning, result) with a dotted edge. Static by default; pass
 * `role="status"` or `role="alert"` when it appears in response to something.
 */
export function Callout({
  tone = "neutral",
  title,
  icon,
  actions,
  onDismiss,
  className,
  children,
  ...rest
}: CalloutProps) {
  const glyph = icon === undefined ? <Sparkle size={16} /> : icon;
  return (
    <div className={cx("pt-callout", `pt-callout--${tone}`, className)} {...rest}>
      {glyph != null && <span className="pt-callout__icon">{glyph}</span>}
      <div className="pt-callout__body">
        {title != null && <p className="pt-callout__title">{title}</p>}
        {children != null && <div className="pt-callout__text">{children}</div>}
        {actions != null && <div className="pt-callout__actions">{actions}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          className="pt-callout__close pt-focusable"
          aria-label="Cerrar"
          onClick={onDismiss}
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
