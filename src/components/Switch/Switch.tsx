import { type InputHTMLAttributes, type ReactNode, useId, useState } from "react";
import { cx } from "../cx";
import "./Switch.css";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label: ReactNode;
  /** Muted line under the label. */
  description?: ReactNode;
  /** Visually hide the label (it stays for screen readers). */
  hideLabel?: boolean;
  size?: "sm" | "md";
}

/**
 * On/off setting. A native checkbox with `role="switch"`, so forms, keyboard and screen
 * readers work as usual; use `checked` + `onChange` or `defaultChecked`.
 */
export function Switch({
  label,
  description,
  hideLabel = false,
  size = "md",
  className,
  id,
  disabled,
  checked,
  defaultChecked,
  onChange,
  ...rest
}: SwitchProps) {
  const auto = useId();
  // Mirrors the uncontrolled state so `aria-checked` stays in sync with the box.
  const [inner, setInner] = useState(Boolean(defaultChecked));
  const on = checked ?? inner;
  const inputId = id ?? auto;
  const descId = `${inputId}-desc`;
  return (
    <div className={cx("pt-switch", `pt-switch--${size}`, disabled && "is-disabled", className)}>
      <span className="pt-switch__control">
        <input
          id={inputId}
          type="checkbox"
          role="switch"
          className="pt-switch__input"
          disabled={disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          aria-checked={on}
          onChange={(e) => {
            if (checked === undefined) setInner(e.target.checked);
            onChange?.(e);
          }}
          aria-describedby={description != null ? descId : undefined}
          {...rest}
        />
        <span className="pt-switch__track" aria-hidden="true">
          <span className="pt-switch__thumb" />
        </span>
      </span>
      <span className={cx("pt-switch__text", hideLabel && "pt-sr-only")}>
        <label htmlFor={inputId} className="pt-switch__label">
          {label}
        </label>
        {description != null && (
          <span id={descId} className="pt-switch__desc">
            {description}
          </span>
        )}
      </span>
    </div>
  );
}
