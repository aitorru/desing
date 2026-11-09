import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../cx";
import "./KeyValue.css";

export interface KeyValueItem {
  label: ReactNode;
  value: ReactNode;
  /** Sets the value in the mono face: hashes, versions, hosts. */
  mono?: boolean;
}

export interface KeyValueProps extends HTMLAttributes<HTMLDListElement> {
  items: readonly KeyValueItem[];
  /** `leaders` joins label and value with a dotted line · `stacked` puts the value below. */
  layout?: "leaders" | "stacked";
  /** Columns for `stacked`. */
  columns?: 1 | 2 | 3 | 4;
}

/** Metadata as a definition list: commit, region, image, owner… with dotted leaders. */
export function KeyValue({
  items,
  layout = "leaders",
  columns = 2,
  className,
  style,
  ...rest
}: KeyValueProps) {
  return (
    <dl
      className={cx("pt-kv", `pt-kv--${layout}`, className)}
      style={
        layout === "stacked"
          ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, ...style }
          : style
      }
      {...rest}
    >
      {items.map((item, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: a static list; labels may repeat
        <div key={i} className="pt-kv__row">
          <dt className="pt-kv__label">{item.label}</dt>
          {layout === "leaders" && <span className="pt-kv__leader" aria-hidden="true" />}
          <dd className={cx("pt-kv__value", item.mono && "pt-mono")}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
