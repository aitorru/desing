import type { Meta, StoryObj } from "@storybook/react-vite";
import { GlassCard } from "../GlassCard/GlassCard";
import { DotField } from "./DotField";
import { DOT_PALETTES, type DotPaletteName } from "./field";

const meta = {
  title: "Dots/DotField",
  component: DotField,
  parameters: { layout: "fullscreen" },
  args: {
    palette: "aurora",
    motion: "flow",
    gap: 8,
    dotSize: 0.62,
    pixel: 1,
    speed: 1,
    intensity: 1,
    seed: 7,
    fps: 30,
  },
  argTypes: {
    palette: { control: "select", options: Object.keys(DOT_PALETTES) },
    motion: { control: "inline-radio", options: ["flow", "breathe", "still"] },
    gap: { control: { type: "range", min: 4, max: 24, step: 1 } },
    dotSize: { control: { type: "range", min: 0.2, max: 1, step: 0.02 } },
    pixel: { control: { type: "range", min: 1, max: 6, step: 1 } },
    speed: { control: { type: "range", min: 0, max: 4, step: 0.1 } },
    intensity: { control: { type: "range", min: 0.1, max: 1.5, step: 0.05 } },
    seed: { control: { type: "number", min: 0, step: 1 } },
    fps: { control: { type: "range", min: 6, max: 60, step: 1 } },
  },
} satisfies Meta<typeof DotField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <DotField {...args} style={{ height: "100vh" }} />,
};

/** The bitmap look from the poster: 3×3 blocks of dots share one colour. */
export const Pixelated: Story = {
  args: { pixel: 3, gap: 7, seed: 11 },
  render: (args) => <DotField {...args} style={{ height: "100vh" }} />,
};

const ALL: DotPaletteName[] = ["aurora", "ember", "dusk", "graphite", "night", "paper"];
const NOTES: Record<DotPaletteName, string> = {
  aurora: "Completa · héroes y pósters",
  ember: "Cálida",
  dusk: "Fría",
  graphite: "Sobria · producto",
  night: "Sobria · oscuro",
  paper: "Casi invisible · fondo",
};

/** Every palette side by side. The last three are the sober ones for product UI. */
export const Palettes: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 16,
        padding: 24,
      }}
    >
      {ALL.map((p) => (
        <div key={p} style={{ display: "grid", gap: 8 }}>
          <DotField
            {...args}
            palette={p}
            style={{ height: 240, borderRadius: "var(--pt-radius-lg)" }}
          />
          <span style={{ fontSize: 13 }}>
            <strong>{p}</strong> · <span style={{ opacity: 0.7 }}>{NOTES[p]}</span>
          </span>
        </div>
      ))}
    </div>
  ),
};

/** `flow` drifts, `breathe` stays in place and pulses, `still` never repaints. */
export const Motion: Story = {
  render: (args) => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, padding: 24 }}>
      {(["flow", "breathe", "still"] as const).map((m) => (
        <div key={m} style={{ display: "grid", gap: 8 }}>
          <DotField
            {...args}
            motion={m}
            style={{ height: 320, borderRadius: "var(--pt-radius-lg)" }}
          />
          <strong style={{ fontSize: 13 }}>{m}</strong>
        </div>
      ))}
    </div>
  ),
};

/** Sober product header: graphite dots, slow breathing, glass on top. */
export const SoberHeader: Story = {
  args: { palette: "graphite", motion: "breathe", gap: 10, dotSize: 0.4 },
  render: (args) => (
    <DotField {...args} style={{ height: 280 }}>
      <div style={{ height: "100%", display: "grid", alignItems: "end", padding: 32 }}>
        <GlassCard padding="md" style={{ maxWidth: 420 }}>
          <span className="pt-eyebrow">Q3 · Plan de capacidad</span>
          <h2 className="pt-display" style={{ fontSize: 36, marginTop: 8 }}>
            Tres escenarios, una decisión
          </h2>
        </GlassCard>
      </div>
    </DotField>
  ),
};
