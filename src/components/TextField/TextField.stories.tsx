import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sparkle } from "../Sparkle/Sparkle";
import { TextField } from "./TextField";

const meta = {
  title: "Components/TextField",
  component: TextField,
  parameters: { layout: "padded" },
  args: {
    label: "Imagen a desplegar",
    placeholder: "checkout:2.32.0",
    hint: "Repositorio y etiqueta. latest no cuenta.",
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 420 }}>
      <TextField {...args} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ maxWidth: 420, display: "grid", gap: 24 }}>
      <TextField label="Nombre del servicio" defaultValue="worker-colas" />
      <TextField
        label="Buscar en el registro"
        placeholder="level:error service:checkout"
        leading={<Sparkle size={14} />}
        hint="Con icono inicial."
      />
      <TextField
        label="Réplicas"
        defaultValue="-4"
        error="Debe ser un número positivo. Cero también vale, pero piénsalo."
      />
      <TextField label="Desactivado" defaultValue="Bloqueado" disabled />
    </div>
  ),
};
