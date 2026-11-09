import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "../Stack/Stack";
import { Status } from "./Status";

const meta = {
  title: "DevOps/Status",
  component: Status,
  parameters: { layout: "padded" },
  args: { tone: "ok", children: "Correcto" },
  argTypes: {
    tone: { control: "inline-radio", options: ["ok", "warn", "error", "running", "idle"] },
  },
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Colour and shape together: hollow for idle, half for degraded, haloed for down. */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack direction="row" gap={6} wrap>
      <Status tone="ok">Correcto</Status>
      <Status tone="warn">Degradado</Status>
      <Status tone="error">Caído</Status>
      <Status tone="running">Desplegando</Status>
      <Status tone="idle">Sin datos</Status>
    </Stack>
  ),
};
