import type { Meta, StoryObj } from "@storybook/react-vite";
import { Petals } from "../Petals/Petals";
import { Sparkle } from "./Sparkle";

const meta = {
  title: "Components/Sparkle & Petals",
  component: Sparkle,
  parameters: { layout: "padded" },
  args: { size: 48, twinkle: true },
} satisfies Meta<typeof Sparkle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SparkleGlyph: Story = {
  name: "Sparkle",
  render: (args) => (
    <div style={{ display: "flex", gap: 24, alignItems: "center", color: "var(--pt-accent)" }}>
      <Sparkle {...args} size={16} />
      <Sparkle {...args} size={24} />
      <Sparkle {...args} />
      <Sparkle {...args} size={96} style={{ color: "var(--pt-violet)" }} />
    </div>
  ),
};

export const PetalsMark: Story = {
  name: "Petals",
  render: () => (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
      {(["bloom", "aurora", "mist", "ink"] as const).map((tone) => (
        <div key={tone} style={{ display: "grid", gap: 8, justifyItems: "center" }}>
          <div style={{ width: 160, height: 160 }}>
            <Petals tone={tone} animated />
          </div>
          <span className="pt-eyebrow">{tone}</span>
        </div>
      ))}
      <div style={{ display: "grid", gap: 8, justifyItems: "center" }}>
        <div style={{ width: 160, height: 160 }}>
          <Petals tone="bloom" gap={0.06} roundness={0.5} />
        </div>
        <span className="pt-eyebrow">gap 0.06 · round 0.5</span>
      </div>
    </div>
  ),
};
