import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Stack } from "../Stack/Stack";
import { Switch } from "./Switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: { layout: "padded" },
  args: {
    label: "Notificarme al terminar",
    description: "Te escribimos cuando la simulación acabe.",
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
        label="Simulación en directo"
        description="Recalcula al cambiar cualquier supuesto."
        checked={live}
        onChange={(e) => setLive(e.target.checked)}
      />
      <Switch
        label="Compartir con el equipo"
        checked={share}
        onChange={(e) => setShare(e.target.checked)}
      />
      <Switch label="Modo compacto" size="sm" defaultChecked />
      <Switch
        label="Exportar a contabilidad"
        description="Disponible en el plan Empresa."
        disabled
      />
    </Stack>
  );
}

/** A settings list: controlled, uncontrolled, small and disabled. */
export const States: Story = { render: () => <Settings /> };
