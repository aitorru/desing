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
    title: "Datos de ejemplo",
    children: "Estas cifras son inventadas. Los incidentes, por desgracia, suenan a reales.",
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
      title="Nueva versión del runbook"
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
      Ahora explica cómo vaciar la cola sin perder mensajes. Léelo antes de la guardia.
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
        Pulsa una fila para ver el último despliegue del servicio.
      </Callout>
      <Callout tone="accent" title="Mantenimiento programado">
        postgres pasa de la 15 a la 17 el jueves, de 02:00 a 03:00.
      </Callout>
      <Callout tone="positive" title="Despliegue completado" role="status">
        checkout v2.31.0 está al 100 % en las tres regiones.
      </Callout>
      <Callout tone="negative" title="notificaciones caído" role="alert">
        CrashLoopBackOff desde las 12:04. La guardia ya está avisada.
      </Callout>
      <Dismissible />
    </Stack>
  ),
};
