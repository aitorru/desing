import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { GlassCard } from "../GlassCard/GlassCard";
import { DotPattern } from "./DotPattern";
import type { PatternAnchor, PatternMotif } from "./motifs";

const MOTIFS: PatternMotif[] = ["grid", "fade", "rings", "orb", "wave", "diagonal"];
const ANCHORS: PatternAnchor[] = [
  "top-left",
  "top",
  "top-right",
  "left",
  "center",
  "right",
  "bottom-left",
  "bottom",
  "bottom-right",
];

const meta = {
  title: "Dots/DotPattern",
  component: DotPattern,
  parameters: { layout: "padded" },
  args: {
    motif: "rings",
    cols: 64,
    rows: 48,
    gap: 8,
    dot: 0.62,
    origin: "top-right",
    highlight: 4,
    tone: "ink",
    intensity: 0.3,
    motion: "still",
  },
  argTypes: {
    motif: { control: "select", options: MOTIFS },
    origin: { control: "select", options: ANCHORS },
    anchor: { control: "select", options: [undefined, ...ANCHORS] },
    cols: { control: { type: "range", min: 4, max: 120, step: 1 } },
    rows: { control: { type: "range", min: 4, max: 90, step: 1 } },
    gap: { control: { type: "range", min: 4, max: 16, step: 4 } },
    dot: { control: { type: "range", min: 0.2, max: 1, step: 0.02 } },
    period: { control: { type: "range", min: 2, max: 16, step: 1 } },
    falloff: { control: { type: "range", min: 0, max: 1.5, step: 0.05 } },
    highlight: { control: { type: "number", min: 0, step: 1 } },
    tone: { control: "inline-radio", options: ["ink", "accent", "current"] },
    intensity: { control: { type: "range", min: 0.05, max: 1, step: 0.05 } },
    motion: { control: "inline-radio", options: ["still", "breathe"] },
  },
} satisfies Meta<typeof DotPattern>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const NOTES: Record<PatternMotif, string> = {
  grid: "Papel pautado: un punto mayor cada cuatro. Tiras, pies de página, fondos.",
  fade: "Semitono que se apaga desde una esquina o un borde. Tarjetas y cabeceras.",
  rings: "Arcos alrededor del origen, uno de ellos sellado. Portadas.",
  orb: "Un disco de semitono: el sol de las láminas. Con núcleo en el acento.",
  wave: "La memoria de las cintas de v1, quieta y en una sola tinta. Cabeceras anchas.",
  diagonal: "Rayado a 45°. Estados vacíos, zonas en construcción, fondos de cifra.",
};

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 24,
};

/** The six motifs, all growing from the top-right corner with their defaults. */
export const Motifs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={grid}>
      {MOTIFS.map((m) => (
        <GlassCard
          key={m}
          padding="none"
          backdrop={
            <DotPattern
              motif={m}
              anchor={m === "orb" ? "right" : "top-right"}
              cols={m === "orb" ? 26 : 40}
              rows={26}
              highlight={m === "fade" ? null : 2}
              intensity={0.4}
              style={m === "orb" ? { right: 24 } : undefined}
            />
          }
        >
          <div style={{ display: "grid", gap: 8, padding: "224px 24px 24px" }}>
            <span className="pt-folio">{m}</span>
            <p className="pt-body" style={{ fontSize: 14 }}>
              {NOTES[m]}
            </p>
          </div>
        </GlassCard>
      ))}
    </div>
  ),
};

/** `anchor` pins a pattern to a corner or an edge; the motif grows from there. */
export const Anchors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ ...grid, gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
      {ANCHORS.map((a) => (
        <GlassCard
          key={a}
          padding="none"
          backdrop={<DotPattern motif="rings" anchor={a} cols={20} rows={14} highlight={2} />}
        >
          <div style={{ height: 160, display: "grid", placeItems: "center" }}>
            <span className="pt-eyebrow">{a}</span>
          </div>
        </GlassCard>
      ))}
    </div>
  ),
};

/** Without `cols` / `rows` a pattern fills its positioned parent, and keeps to the grid. */
export const Fill: Story = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ position: "relative", height: "100vh", background: "var(--pt-bg)" }}>
      <DotPattern motif="wave" origin="bottom-left" period={9} highlight={3} motion="breathe" />
    </div>
  ),
};
