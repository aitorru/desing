import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sparkle } from "../Sparkle/Sparkle";
import { Stack } from "../Stack/Stack";
import { DotDivider } from "./DotDivider";

const meta = {
  title: "Components/DotDivider",
  component: DotDivider,
  parameters: { layout: "padded" },
  args: { tone: "subtle", orientation: "horizontal" },
  argTypes: {
    tone: { control: "inline-radio", options: ["subtle", "strong", "aurora"] },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    label: { control: "text" },
  },
} satisfies Meta<typeof DotDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 560 }}>
      <DotDivider {...args} />
    </div>
  ),
};

/** Tones, a labelled break and a vertical divider inside a row. */
export const Variants: Story = {
  render: () => (
    <Stack gap={6} style={{ maxWidth: 560 }}>
      <DotDivider tone="subtle" />
      <DotDivider tone="strong" />
      <DotDivider tone="aurora" />
      <DotDivider label="o continúa con" />
      <DotDivider
        tone="aurora"
        label={
          <>
            <Sparkle size={12} /> Datos de ejemplo
          </>
        }
      />
      <Stack direction="row" gap={4} style={{ height: 40 }}>
        <span>Servicios</span>
        <DotDivider orientation="vertical" />
        <span>Despliegues</span>
        <DotDivider orientation="vertical" tone="aurora" />
        <span>Guardias</span>
      </Stack>
    </Stack>
  ),
};
