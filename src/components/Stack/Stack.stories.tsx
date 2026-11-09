import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { Stack } from "./Stack";

const meta = {
  title: "Components/Stack",
  component: Stack,
  parameters: { layout: "padded" },
  args: { direction: "row", gap: 3, wrap: true },
  argTypes: {
    direction: { control: "inline-radio", options: ["column", "row"] },
    gap: { control: { type: "range", min: 0, max: 8, step: 1 } },
    align: {
      control: "select",
      options: [undefined, "start", "center", "end", "stretch", "baseline"],
    },
    justify: { control: "select", options: [undefined, "start", "center", "end", "between"] },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ w = 72 }: { w?: number }) => (
  <div
    style={{
      width: w,
      height: 40,
      borderRadius: "var(--pt-radius-sm)",
      background: "var(--pt-glass-bg)",
      border: "1px solid var(--pt-border-strong)",
    }}
  />
);

export const Playground: Story = {
  render: (args) => (
    <Stack {...args}>
      <Box />
      <Box w={120} />
      <Box w={48} />
      <Box w={96} />
    </Stack>
  ),
};

/** Every gap of the scale. Steps, not pixels: the grid stays honest. */
export const Gaps: Story = {
  render: () => (
    <Stack gap={5}>
      {([1, 2, 3, 4, 5, 6, 7, 8] as const).map((g) => (
        <Stack key={g} direction="row" gap={4}>
          <code style={{ width: 120, fontSize: 12 }}>
            gap={g} · {[4, 8, 12, 16, 24, 32, 48, 64][g - 1]}px
          </code>
          <Stack direction="row" gap={g}>
            <Box w={32} />
            <Box w={32} />
            <Box w={32} />
          </Stack>
        </Stack>
      ))}
    </Stack>
  ),
};

/** A typical toolbar: row, `between`, and a nested cluster. */
export const Toolbar: Story = {
  render: () => (
    <Stack direction="row" justify="between" wrap gap={3} style={{ maxWidth: 640 }}>
      <Stack direction="row" gap={2}>
        <Badge tone="accent" dot="pulse">
          En directo
        </Badge>
        <Badge>12 servicios</Badge>
      </Stack>
      <Stack direction="row" gap={2}>
        <Button variant="ghost" size="sm">
          Exportar
        </Button>
        <Button size="sm">Compartir</Button>
      </Stack>
    </Stack>
  ),
};
