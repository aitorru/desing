import type { Meta, StoryObj } from "@storybook/react-vite";
import { GlassCard } from "../GlassCard/GlassCard";
import { Diagram, type DiagramEdge, type DiagramNode } from "./Diagram";

const NODES: DiagramNode[] = [
  { id: "cdn", label: "CDN", sub: "14 PoP", col: 0, row: 1, kind: "external" },
  { id: "gw", label: "api-gateway", sub: ":443 · 6 réplicas", col: 1, row: 1, status: "ok" },
  { id: "web", label: "web", sub: "3 réplicas", col: 2, row: 0, status: "ok" },
  { id: "sim", label: "búsqueda", sub: "3/4 réplicas", col: 2, row: 1, status: "warn" },
  { id: "notif", label: "notificaciones", sub: "0/2 réplicas", col: 2, row: 2, status: "error" },
  { id: "pg", label: "postgres", sub: "primario + 2", col: 3, row: 0, kind: "store", status: "ok" },
  { id: "redis", label: "redis", sub: "caché", col: 3, row: 1, kind: "store", status: "ok" },
  { id: "mq", label: "colas", sub: "1 204 mensajes", col: 3, row: 2, kind: "queue" },
  { id: "worker", label: "worker-colas", sub: "2/5 réplicas", col: 4, row: 2, status: "running" },
];

const EDGES: DiagramEdge[] = [
  { from: "cdn", to: "gw", label: "https", flow: true },
  { from: "gw", to: "web" },
  { from: "gw", to: "sim", label: "grpc", tone: "accent", flow: true },
  { from: "gw", to: "notif", tone: "negative" },
  { from: "web", to: "pg" },
  { from: "sim", to: "redis" },
  { from: "notif", to: "mq", label: "amqp", tone: "negative" },
  { from: "mq", to: "worker", flow: true },
];

const meta = {
  title: "DevOps/Diagram",
  component: Diagram,
  parameters: { layout: "padded" },
  args: { nodes: NODES, edges: EDGES, label: "Arquitectura de producción", grid: false },
} satisfies Meta<typeof Diagram>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Services, stores (capsules), a queue (dashed) and an external system, with live paths. */
export const Architecture: Story = {
  render: (args) => (
    <GlassCard padding="lg">
      <Diagram {...args} />
    </GlassCard>
  ),
};

/** A vertical flow: same column, top to bottom. */
export const Vertical: Story = {
  args: {
    label: "Camino de un cambio",
    nodes: [
      { id: "pr", label: "Pull request", sub: "#482", col: 0, row: 0, kind: "external" },
      { id: "ci", label: "CI", sub: "build + test", col: 0, row: 1, status: "ok" },
      { id: "reg", label: "registro", sub: "worker-colas:1.10.0", col: 0, row: 2, kind: "store" },
      { id: "prod", label: "producción", sub: "canario 10 %", col: 0, row: 3, status: "running" },
    ],
    edges: [
      { from: "pr", to: "ci" },
      { from: "ci", to: "reg" },
      { from: "reg", to: "prod", tone: "accent", flow: true },
    ],
    nodeWidth: 208,
    grid: true,
  },
};
