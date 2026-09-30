import type { Meta, StoryObj } from "@storybook/react-vite";
import { DotLoader } from "./DotLoader";

const meta = {
  title: "Dots/DotLoader",
  component: DotLoader,
  parameters: { layout: "padded" },
  args: { variant: "wave", size: "md", tone: "current" },
} satisfies Meta<typeof DotLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 120px)", gap: 32 }}>
      {(["wave", "pulse", "orbit"] as const).map((v) => (
        <div key={v} style={{ display: "grid", gap: 16, justifyItems: "start" }}>
          <span className="pt-eyebrow">{v}</span>
          <DotLoader variant={v} size="sm" />
          <DotLoader variant={v} size="md" />
          <DotLoader variant={v} size="lg" />
          <DotLoader variant={v} size="lg" tone="accent" />
        </div>
      ))}
    </div>
  ),
};
