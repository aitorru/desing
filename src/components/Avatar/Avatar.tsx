import { type CSSProperties, type HTMLAttributes, useState } from "react";
import { cx } from "../cx";
import "./Avatar.css";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Full name: gives the initials, the accessible name and the colour. */
  name: string;
  /** Photo URL. Falls back to the initials if it fails to load. */
  src?: string;
  size?: "sm" | "md" | "lg";
  /** Presence dot in the corner. */
  status?: "online" | "busy" | "away";
}

const STATUS = { online: "En línea", busy: "Ocupado", away: "Ausente" };

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "?";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

/** Stable spectrum slot (1–6) per name, so a person keeps their colour everywhere. */
function slot(name: string): number {
  let h = 0;
  for (const ch of name) h = (h * 31 + (ch.codePointAt(0) ?? 0)) >>> 0;
  return (h % 6) + 1;
}

/** A person: photo or initials on a dotted chip tinted with a slot of the spectrum. */
export function Avatar({ name, src, size = "md", status, className, style, ...rest }: AvatarProps) {
  // Remembers which URL failed, so a new `src` gets its own chance to load.
  const [failedSrc, setFailedSrc] = useState<string>();
  const label = status ? `${name} · ${STATUS[status]}` : name;
  return (
    <span
      role="img"
      aria-label={label}
      title={name}
      className={cx("pt-avatar", `pt-avatar--${size}`, className)}
      style={{ "--c": `var(--pt-spectrum-${slot(name)})`, ...style } as CSSProperties}
      {...rest}
    >
      {src && src !== failedSrc ? (
        <img className="pt-avatar__img" src={src} alt="" onError={() => setFailedSrc(src)} />
      ) : (
        <span className="pt-avatar__initials" aria-hidden="true">
          {initials(name)}
        </span>
      )}
      {status && <span className={cx("pt-avatar__status", `pt-avatar__status--${status}`)} />}
    </span>
  );
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLUListElement> {
  people: readonly { name: string; src?: string }[];
  /** How many to show before collapsing the rest into “+n”. */
  max?: number;
  size?: AvatarProps["size"];
  /** Accessible name of the group, e.g. “Participantes”. */
  label: string;
}

/** Overlapping avatars with a “+n” chip: who is in this room / document / team. */
export function AvatarGroup({
  people,
  max = 4,
  size = "md",
  label,
  className,
  ...rest
}: AvatarGroupProps) {
  const shown = people.slice(0, max);
  const hidden = people.length - shown.length;
  return (
    <ul
      aria-label={label}
      className={cx("pt-avatargroup", `pt-avatargroup--${size}`, className)}
      {...rest}
    >
      {shown.map((p) => (
        <li key={p.name}>
          <Avatar name={p.name} src={p.src} size={size} />
        </li>
      ))}
      {hidden > 0 && (
        <li>
          <span
            className={cx("pt-avatar", `pt-avatar--${size}`, "pt-avatar--more")}
            title={people
              .slice(max)
              .map((p) => p.name)
              .join(", ")}
          >
            <span aria-hidden="true">+{hidden}</span>
            <span className="pt-sr-only">y {hidden} más</span>
          </span>
        </li>
      )}
    </ul>
  );
}
