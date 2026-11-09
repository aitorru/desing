import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import { Sparkle } from "../Sparkle/Sparkle";
import { Stack } from "../Stack/Stack";
import { SectionHeader } from "./SectionHeader";

const meta = {
  title: "Components/SectionHeader",
  component: SectionHeader,
  parameters: { layout: "padded" },
  args: {
    eyebrow: "Servicios",
    title: "Lo que está corriendo",
    description:
      "Seis servicios en eu-west-1. Pulsa uno para ver sus réplicas y su último despliegue.",
    size: "md",
    align: "start",
    level: 2,
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    align: { control: "inline-radio", options: ["start", "center"] },
    level: { control: "inline-radio", options: [1, 2, 3, 4] },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <SectionHeader
      {...args}
      actions={
        <>
          <Button variant="ghost" size="sm">
            Exportar
          </Button>
          <Button size="sm" icon={<Sparkle size={12} />}>
            Nuevo despliegue
          </Button>
        </>
      }
    />
  ),
};

/** The three sizes; `lg` centred is the landing-page hero. */
export const Sizes: Story = {
  render: () => (
    <Stack gap={8} style={{ maxWidth: 960 }}>
      <SectionHeader
        size="lg"
        align="center"
        level={1}
        eyebrow="Dot"
        title="Todo verde, por ahora"
        description="Estado, despliegues e incidentes en una sola página. No arregla nada, pero se lee bien."
        actions={
          <Button variant="aurora" size="lg" icon={<Sparkle size={14} />}>
            Empezar
          </Button>
        }
      />
      <SectionHeader
        eyebrow="Semana 45 · Capacidad"
        title="Tres regiones, un error budget"
        actions={<Button size="sm">Compartir</Button>}
      />
      <SectionHeader
        size="sm"
        level={3}
        eyebrow="Guardia"
        title="Quién respondió"
        description="Las personas que tocaron el incidente."
      />
    </Stack>
  ),
};
