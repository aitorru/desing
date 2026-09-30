import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { DotBars } from "./DotBars";

const meta = {
  title: "Dots/DotBars",
  component: DotBars,
  parameters: { layout: "padded" },
  args: {
    values: [3, 5, 4, 7, 6, 9, 8, 11, 10, 12],
    rows: 8,
    highlight: 9,
    animated: true,
    label: "Ingresos por mes, en tendencia ascendente",
  },
} satisfies Meta<typeof DotBars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 40, alignItems: "end" }}>
      <DotBars {...args} rows={5} style={{ "--dot": "3px" } as CSSProperties} />
      <DotBars {...args} />
      <DotBars {...args} rows={12} style={{ "--dot": "7px" } as CSSProperties} />
    </div>
  ),
};
