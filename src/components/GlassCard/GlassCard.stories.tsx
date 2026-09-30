import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../Badge/Badge";
import { DotBars } from "../DotBars/DotBars";
import { DotField } from "../DotField/DotField";
import { Petals } from "../Petals/Petals";
import { GlassCard } from "./GlassCard";

const meta = {
  title: "Components/GlassCard",
  component: GlassCard,
  parameters: { layout: "fullscreen" },
  args: { tone: "clear", padding: "md", interactive: false },
  argTypes: {
    tone: { control: "inline-radio", options: ["clear", "bloom", "aurora", "solid"] },
    padding: { control: "inline-radio", options: ["none", "sm", "md", "lg"] },
  },
} satisfies Meta<typeof GlassCard>;

export default meta;
type Story = StoryObj<typeof meta>;

function Content() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="pt-eyebrow">Escenario B</span>
        <Badge tone="positive" dot>
          +12,4 %
        </Badge>
      </div>
      <p className="pt-display" style={{ fontSize: 44 }}>
        1,8 M€
      </p>
      <p className="pt-body" style={{ fontSize: 14 }}>
        Ingresos esperados a 12 meses (p50).
      </p>
      <DotBars values={[3, 4, 4, 6, 5, 7, 8, 9]} highlight={7} label="Tendencia al alza" />
    </div>
  );
}

export const Playground: Story = {
  render: (args) => (
    <DotField palette="aurora" seed={4} style={{ height: "100vh" }}>
      <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
        <GlassCard {...args} style={{ width: 320 }}>
          <Content />
        </GlassCard>
      </div>
    </DotField>
  ),
};

export const Tones: Story = {
  render: () => (
    <DotField palette="graphite" motion="breathe" style={{ minHeight: "100vh" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 24,
          padding: 40,
        }}
      >
        {(["clear", "bloom", "aurora", "solid"] as const).map((tone) => (
          <GlassCard key={tone} tone={tone}>
            <span className="pt-eyebrow">{tone}</span>
            <p className="pt-display" style={{ fontSize: 32, marginTop: 8 }}>
              Compare scenarios
            </p>
          </GlassCard>
        ))}
      </div>
    </DotField>
  ),
};

/** The poster card: bloom glass with the Petals mark as its backdrop. */
export const WithPetals: Story = {
  render: () => (
    <DotField palette="aurora" pixel={3} gap={7} seed={11} style={{ height: "100vh" }}>
      <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
        <GlassCard
          tone="bloom"
          padding="lg"
          backdrop={<Petals tone="bloom" animated />}
          style={{ width: 340, aspectRatio: "3 / 4" }}
        >
          <div
            style={{ height: "100%", display: "grid", alignContent: "end", textAlign: "center" }}
          >
            <p className="pt-display" style={{ fontSize: 40 }}>
              Before you make it
            </p>
          </div>
        </GlassCard>
      </div>
    </DotField>
  ),
};
