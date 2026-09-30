import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sparkle } from "../Sparkle/Sparkle";
import { TextField } from "./TextField";

const meta = {
  title: "Components/TextField",
  component: TextField,
  parameters: { layout: "padded" },
  args: {
    label: "¿Qué decisión quieres probar?",
    placeholder: "Subir el precio un 8 % en enero",
    hint: "Descríbela en una frase; la convertimos en variables.",
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
      <TextField label="Nombre del escenario" defaultValue="Expansión Lisboa" />
      <TextField
        label="Pregunta"
        placeholder="¿Y si…?"
        leading={<Sparkle size={14} />}
        hint="Con icono inicial."
      />
      <TextField label="Horizonte (meses)" defaultValue="-4" error="Debe ser un número positivo." />
      <TextField label="Desactivado" defaultValue="Bloqueado" disabled />
    </div>
  ),
};
