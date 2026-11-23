import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { DotProgress } from "./DotProgress";

const meta = {
  title: "Dots/DotProgress",
  component: DotProgress,
  parameters: { layout: "padded" },
  args: { value: 62, count: 24, tone: "accent", label: "Desplegando réplicas" },
  argTypes: { value: { control: { type: "range", min: 0, max: 100 } } },
} satisfies Meta<typeof DotProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <DotProgress {...args} />
    </div>
  ),
};

export const Indeterminate: Story = {
  args: { value: undefined },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <DotProgress {...args} />
    </div>
  ),
};

function Running() {
  const [v, setV] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setV((x) => (x >= 100 ? 0 : x + 4)), 180);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ maxWidth: 360, display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
        <span>Subiendo la imagen al registro</span>
        <span style={{ fontVariantNumeric: "tabular-nums" }}>{v}%</span>
      </div>
      <DotProgress value={v} label="Subida de la imagen" />
      <DotProgress value={v} label="Subida de la imagen" tone="current" count={32} />
    </div>
  );
}

export const Live: Story = { render: () => <Running /> };
