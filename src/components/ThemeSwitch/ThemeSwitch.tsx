import { type CSSProperties, useId } from "react";
import type { ThemePreference } from "../../theme/theme";
import { cx } from "../cx";
import "./ThemeSwitch.css";

export interface ThemeSwitchProps {
  value: ThemePreference;
  onChange: (value: ThemePreference) => void;
  /** Which choices to offer, in order. */
  options?: readonly ThemePreference[];
  /** Text for each choice; override to translate or rename (`Mist`, `Ink`…). */
  labels?: Partial<Record<ThemePreference, string>>;
  /** `icons` shows only the dot glyphs (names stay for screen readers and as tooltips). */
  variant?: "labels" | "icons";
  size?: "sm" | "md";
  /** Accessible name of the group. */
  label?: string;
  className?: string;
}

const DEFAULT_OPTIONS: readonly ThemePreference[] = ["system", "light", "dark", "oled"];

const DEFAULT_LABELS: Record<ThemePreference, string> = {
  system: "Sistema",
  light: "Claro",
  dark: "Oscuro",
  oled: "OLED",
};

/** One dot per theme: split for system, hollow for light, solid for dark, ringed for OLED. */
function Glyph({ theme }: { theme: ThemePreference }) {
  return <span className={`pt-themeswitch__glyph pt-themeswitch__glyph--${theme}`} aria-hidden />;
}

/**
 * The night-mode selector: system, light, dark and OLED. Controlled; `useTheme()` gives
 * the value and the setter, remembers the choice and applies `data-pt-theme`.
 */
export function ThemeSwitch({
  value,
  onChange,
  options = DEFAULT_OPTIONS,
  labels,
  variant = "labels",
  size = "md",
  label = "Tema",
  className,
}: ThemeSwitchProps) {
  const name = useId();
  const index = Math.max(0, options.indexOf(value));
  return (
    <fieldset
      className={cx(
        "pt-themeswitch",
        `pt-themeswitch--${size}`,
        `pt-themeswitch--${variant}`,
        className,
      )}
      style={{ "--n": options.length, "--i": index } as CSSProperties}
    >
      <legend className="pt-sr-only">{label}</legend>
      <span className="pt-themeswitch__thumb" aria-hidden="true" />
      {options.map((option) => {
        const text = labels?.[option] ?? DEFAULT_LABELS[option];
        return (
          <label
            key={option}
            className={cx("pt-themeswitch__item", option === value && "is-active")}
            title={variant === "icons" ? text : undefined}
          >
            <input
              type="radio"
              className="pt-themeswitch__input"
              name={name}
              value={option}
              checked={option === value}
              onChange={() => onChange(option)}
            />
            <Glyph theme={option} />
            <span className={variant === "icons" ? "pt-sr-only" : undefined}>{text}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
