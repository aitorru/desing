import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Stack } from "../Stack/Stack";
import { Callout } from "./Callout";

const meta = {
  title: "Components/Callout",
  component: Callout,
  parameters: { layout: "padded" },
  args: {
    tone: "accent",
    title: "Resultado simulado",
    children: "Estas cifras salen de 10 000 trayectorias, no de datos reales.",
  },
  argTypes: {
    tone: { control: "inline-radio", options: ["neutral", "accent", "positive", "negative"] },
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 560 }}>
      <Callout {...args} />
    </div>
  ),
};

function Dismissible() {
  const [open, setOpen] = useState(true);
  return open ? (
    <Callout
      title="Nueva versión del modelo"
      onDismiss={() => setOpen(false)}
      actions={
        <>
          <Button size="sm">Ver cambios</Button>
          <Button size="sm" variant="ghost">
            Más tarde
          </Button>
        </>
      }
    >
      Ahora tiene en cuenta la estacionalidad. Vuelve a simular para comparar.
    </Callout>
  ) : (
    <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
      Mostrar de nuevo
    </Button>
  );
}

/** The four tones, one with actions and a close button. */
export const Tones: Story = {
  render: () => (
    <Stack gap={4} style={{ maxWidth: 560 }}>
      <Callout tone="neutral" title="Consejo">
        Pulsa una tarjeta para elegir el escenario.
      </Callout>
      <Callout tone="accent" title="Resultado simulado">
        Estas cifras salen de 10 000 trayectorias, no de datos reales.
      </Callout>
      <Callout tone="positive" title="Por encima del plan" role="status">
        El escenario B supera el objetivo de Q3 en un 12 %.
      </Callout>
      <Callout tone="negative" title="Riesgo alto" role="alert">
        En el 30 % de las trayectorias los ingresos caen por debajo de 1 M€.
      </Callout>
      <Dismissible />
    </Stack>
  ),
};
