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
    eyebrow: "Resultados",
    title: "Compara escenarios",
    description: "Diez mil trayectorias por escenario. Elige uno para ver el detalle.",
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
            Nueva simulación
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
        eyebrow="Punto"
        title="Prueba la decisión antes de tomarla"
        description="Simula resultados, compara escenarios y avanza con más confianza."
        actions={
          <Button variant="aurora" size="lg" icon={<Sparkle size={14} />}>
            Empezar
          </Button>
        }
      />
      <SectionHeader
        eyebrow="Q3 · Capacidad"
        title="Tres escenarios, una decisión"
        actions={<Button size="sm">Compartir</Button>}
      />
      <SectionHeader
        size="sm"
        level={3}
        eyebrow="Equipo"
        title="Quién ha participado"
        description="Las personas con acceso a este espacio."
      />
    </Stack>
  ),
};
