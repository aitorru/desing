import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../cx";
import { Status, type StatusTone } from "../Status/Status";
import "./Diagram.css";

export interface DiagramNode {
  id: string;
  label: string;
  /** Second line in the mono face: image, region, port, replica count. */
  sub?: ReactNode;
  /** Position on the diagram's own grid, from 0. */
  col: number;
  row: number;
  /** `service` a box · `store` a capsule (databases, caches, buckets) · `queue` dashed · `external` outside your system. */
  kind?: "service" | "store" | "queue" | "external";
  status?: StatusTone;
  /** Accessible word for the status dot (“degradado”). */
  statusLabel?: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: ReactNode;
  /** `accent` the path being discussed · `negative` a failing dependency. */
  tone?: "muted" | "accent" | "negative";
  /** The dots travel from source to target: live traffic, a running job. */
  flow?: boolean;
}

export interface DiagramProps extends HTMLAttributes<HTMLElement> {
  nodes: readonly DiagramNode[];
  edges: readonly DiagramEdge[];
  /** What the diagram shows, for screen readers. */
  label: string;
  /** Distance between node origins, in px. Keep them on the 8px grid. */
  cellWidth?: number;
  cellHeight?: number;
  nodeWidth?: number;
  nodeHeight?: number;
  /** Faint dot grid behind the diagram. */
  grid?: boolean;
}

const STATUS_WORD: Record<StatusTone, string> = {
  ok: "correcto",
  warn: "degradado",
  error: "caído",
  running: "en curso",
  idle: "sin datos",
};

interface Routed {
  d: string;
  end: readonly [number, number];
  mid: readonly [number, number];
}

/** Orthogonal route between two boxes: out of one side, one rounded elbow, into the other. */
function route(
  a: DiagramNode,
  b: DiagramNode,
  cw: number,
  ch: number,
  nw: number,
  nh: number,
): Routed {
  const ax = a.col * cw;
  const ay = a.row * ch;
  const bx = b.col * cw;
  const by = b.row * ch;
  if (a.col === b.col) {
    const down = b.row > a.row;
    const x = ax + nw / 2;
    const sy = down ? ay + nh : ay;
    const ty = down ? by : by + nh;
    return { d: `M${x} ${sy}V${ty}`, end: [x, ty], mid: [x, (sy + ty) / 2] };
  }
  const dir = b.col > a.col ? 1 : -1;
  const sx = dir > 0 ? ax + nw : ax;
  const tx = dir > 0 ? bx : bx + nw;
  const sy = ay + nh / 2;
  const ty = by + nh / 2;
  if (sy === ty) return { d: `M${sx} ${sy}H${tx}`, end: [tx, ty], mid: [(sx + tx) / 2, sy] };
  const vs = ty > sy ? 1 : -1;
  // Branches going up and down turn one dot apart, so two tones never share a trunk.
  const mx = (sx + tx) / 2 + vs * 8;
  const r = Math.min(12, Math.abs(ty - sy) / 2, Math.abs(mx - sx));
  return {
    d: `M${sx} ${sy}H${mx - r * dir}Q${mx} ${sy} ${mx} ${sy + r * vs}V${ty - r * vs}Q${mx} ${ty} ${mx + r * dir} ${ty}H${tx}`,
    end: [tx, ty],
    mid: [(mx + tx) / 2, ty],
  };
}

/**
 * A box-and-line diagram drawn in dots: services, stores and queues placed on a grid and
 * joined by dotted connectors that end in a larger dot at the target. For architecture,
 * request paths and dependency maps. Nodes are real text; the connections are also listed
 * for screen readers.
 */
export function Diagram({
  nodes,
  edges,
  label,
  cellWidth = 208,
  cellHeight = 104,
  nodeWidth = 160,
  nodeHeight = 64,
  grid = false,
  className,
  ...rest
}: DiagramProps) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const cols = Math.max(0, ...nodes.map((n) => n.col));
  const rows = Math.max(0, ...nodes.map((n) => n.row));
  const width = cols * cellWidth + nodeWidth;
  const height = rows * cellHeight + nodeHeight;

  const routed = edges.flatMap((e) => {
    const a = byId.get(e.from);
    const b = byId.get(e.to);
    return a && b
      ? [{ e, a, b, ...route(a, b, cellWidth, cellHeight, nodeWidth, nodeHeight) }]
      : [];
  });

  return (
    <figure className={cx("pt-diagram", grid && "pt-diagram--grid", className)} {...rest}>
      {/* biome-ignore lint/a11y/useSemanticElements: a figure cannot carry a name without a visible caption */}
      <div className="pt-diagram__canvas" role="group" aria-label={label} style={{ width, height }}>
        <svg className="pt-diagram__edges" width={width} height={height} aria-hidden="true">
          {routed.map(({ e, d, end }) => (
            <g
              key={`${e.from}>${e.to}`}
              className={cx(
                "pt-diagram__edge",
                `pt-diagram__edge--${e.tone ?? "muted"}`,
                e.flow && "pt-diagram__edge--flow",
              )}
            >
              <path d={d} />
              <circle cx={end[0]} cy={end[1]} r={3.5} />
            </g>
          ))}
        </svg>
        {routed.map(({ e, mid }) =>
          e.label != null ? (
            <span
              key={`${e.from}>${e.to}`}
              className={cx("pt-diagram__edgelabel", `pt-diagram__edgelabel--${e.tone ?? "muted"}`)}
              style={{ left: mid[0], top: mid[1] }}
              aria-hidden="true"
            >
              {e.label}
            </span>
          ) : null,
        )}
        {nodes.map((n) => (
          <div
            key={n.id}
            className={cx("pt-diagram__node", `pt-diagram__node--${n.kind ?? "service"}`)}
            style={{
              left: n.col * cellWidth,
              top: n.row * cellHeight,
              width: nodeWidth,
              height: nodeHeight,
            }}
          >
            <span className="pt-diagram__label">{n.label}</span>
            {n.sub != null && <span className="pt-diagram__sub pt-mono">{n.sub}</span>}
            {n.status && (
              <Status tone={n.status} dotOnly className="pt-diagram__status">
                {n.statusLabel ?? STATUS_WORD[n.status]}
              </Status>
            )}
          </div>
        ))}
        <ul className="pt-sr-only">
          {routed.map(({ e, a, b }) => (
            <li key={`${e.from}>${e.to}`}>
              {a.label} → {b.label}
              {e.label != null && <> ({e.label})</>}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
