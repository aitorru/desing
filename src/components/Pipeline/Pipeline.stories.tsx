import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pipeline, type PipelineStage } from "./Pipeline";

const STAGES: PipelineStage[] = [
  { id: "build", label: "Compilar", status: "ok", meta: "1 min 12 s" },
  { id: "test", label: "Pruebas", status: "ok", meta: "4 min 03 s" },
  { id: "scan", label: "Análisis", status: "warn", meta: "2 avisos" },
  { id: "staging", label: "Preproducción", status: "ok", meta: "48 s" },
  { id: "canary", label: "Canario 10 %", status: "running", meta: "6 min" },
  { id: "prod", label: "Producción", status: "idle" },
];

const meta = {
  title: "DevOps/Pipeline",
  component: Pipeline,
  parameters: { layout: "padded" },
  args: { stages: STAGES, label: "Despliegue #482", orientation: "horizontal" },
  argTypes: { orientation: { control: "inline-radio", options: ["horizontal", "vertical"] } },
} satisfies Meta<typeof Pipeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Vertical: Story = { args: { orientation: "vertical" } };

/** A failed run stops where it broke; what follows stays hollow. */
export const Failed: Story = {
  args: {
    stages: [
      { id: "build", label: "Compilar", status: "ok", meta: "1 min 09 s" },
      { id: "test", label: "Pruebas", status: "error", meta: "3 de 412 fallan" },
      { id: "staging", label: "Preproducción", status: "idle" },
      { id: "prod", label: "Producción", status: "idle" },
    ],
  },
};
