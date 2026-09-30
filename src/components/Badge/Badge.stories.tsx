import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: { layout: "padded" },
  args: { children: "Simulado", tone: "neutral", dot: false },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["neutral", "accent", "positive", "negative", "glass"],
    },
    dot: { control: "inline-radio", options: [false, true, "pulse"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge>Borrador</Badge>
      <Badge tone="accent" dot>
        Escenario B
      </Badge>
      <Badge tone="positive" dot>
        +12,4 %
      </Badge>
      <Badge tone="negative" dot>
        −3,1 %
      </Badge>
      <Badge tone="accent" dot="pulse">
        Simulando
      </Badge>
    </div>
  ),
};
