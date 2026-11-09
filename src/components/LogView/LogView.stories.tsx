import type { Meta, StoryObj } from "@storybook/react-vite";
import { type LogEntry, LogView } from "./LogView";

const ENTRIES: LogEntry[] = [
  {
    time: "12:04:31",
    level: "info",
    source: "api-gateway",
    message: "GET /v1/escenarios 200 · 84 ms",
  },
  {
    time: "12:04:33",
    level: "ok",
    source: "despliegue",
    message: "worker-colas:1.10.0 canario al 10 %",
  },
  {
    time: "12:04:38",
    level: "warn",
    source: "simulador",
    message: "p95 412 ms supera el umbral de 300 ms",
  },
  {
    time: "12:04:41",
    level: "error",
    source: "notificaciones",
    message: "CrashLoopBackOff: sin conexión con colas:5672",
  },
  {
    time: "12:04:41",
    level: "debug",
    source: "notificaciones",
    message: "reintento 4 de 5 en 30 s",
  },
  {
    time: "12:04:52",
    level: "info",
    source: "worker-colas",
    message: "escalando de 2 a 5 réplicas",
  },
];

const meta = {
  title: "DevOps/LogView",
  component: LogView,
  parameters: { layout: "padded" },
  args: { entries: ENTRIES, label: "Registro de producción", wrap: false },
} satisfies Meta<typeof LogView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** With `maxHeight` the log scrolls inside its box. */
export const Scrolling: Story = { args: { maxHeight: 120 } };
