import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Stack } from "../Stack/Stack";
import { Switch } from "./Switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: { layout: "padded" },
  args: {
    label: "Avisarme al terminar",
    description: "Un mensaje en #despliegues cuando el rollout acabe, salga bien o no.",
    size: "md",
    disabled: false,
    defaultChecked: true,
  },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md"] } },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

function Settings() {
  const [live, setLive] = useState(true);
  const [share, setShare] = useState(false);
  return (
    <Stack gap={5} style={{ maxWidth: 420 }}>
      <Switch
        label="Registro en directo"
        description="Sigue las líneas nuevas según llegan."
        checked={live}
        onChange={(e) => setLive(e.target.checked)}
      />
      <Switch
        label="Despertar a la guardia"
        checked={share}
        onChange={(e) => setShare(e.target.checked)}
      />
      <Switch label="Modo compacto" size="sm" defaultChecked />
      <Switch
        label="Desplegar los viernes"
        description="Desactivado por tu propio bien."
        disabled
      />
    </Stack>
  );
}

/** A settings list: controlled, uncontrolled, small and disabled. */
export const States: Story = { render: () => <Settings /> };
