import type { CSSProperties } from "react";
import {
  CodeBlock,
  DataTable,
  type DataTableColumn,
  Diagram,
  type DiagramEdge,
  type DiagramNode,
  DotBars,
  DotPattern,
  DotUptime,
  GlassCard,
  KeyValue,
  type LogEntry,
  LogView,
  Pipeline,
  type PipelineStage,
  SectionHeader,
  Stack,
  Stat,
  Status,
  type StatusTone,
  type ThemeName,
  ThemeSwitch,
  useTheme,
} from "../../index";
import { Colophon, Masthead } from "./formalParts";

const ON_PLATE = { "--pt-pattern-accent": "var(--pt-spectrum-6)" } as CSSProperties;

interface Service {
  name: string;
  status: StatusTone;
  state: string;
  version: string;
  replicas: string;
  cpu: number;
  p95: number | null;
  deployed: string;
}

const SERVICES: Service[] = [
  {
    name: "api-gateway",
    status: "ok",
    state: "Correcto",
    version: "v4.12.1",
    replicas: "6/6",
    cpu: 38,
    p95: 84,
    deployed: "hace 2 h",
  },
  {
    name: "checkout",
    status: "ok",
    state: "Correcto",
    version: "v2.31.0",
    replicas: "4/4",
    cpu: 52,
    p95: 141,
    deployed: "ayer",
  },
  {
    name: "búsqueda",
    status: "warn",
    state: "Degradado",
    version: "v1.9.3",
    replicas: "3/4",
    cpu: 87,
    p95: 412,
    deployed: "hace 18 min",
  },
  {
    name: "web",
    status: "ok",
    state: "Correcto",
    version: "v8.2.0",
    replicas: "3/3",
    cpu: 21,
    p95: 62,
    deployed: "hace 3 d",
  },
  {
    name: "worker-colas",
    status: "running",
    state: "Desplegando",
    version: "v1.10.0",
    replicas: "2/5",
    cpu: 44,
    p95: null,
    deployed: "ahora",
  },
  {
    name: "notificaciones",
    status: "error",
    state: "Caído",
    version: "v0.8.7",
    replicas: "0/2",
    cpu: 0,
    p95: null,
    deployed: "hace 6 min",
  },
];

const COLUMNS: DataTableColumn<Service>[] = [
  { key: "name", header: "Servicio", mono: true, sortable: true },
  {
    key: "status",
    header: "Estado",
    cell: (s) => <Status tone={s.status}>{s.state}</Status>,
  },
  { key: "version", header: "Versión", mono: true },
  { key: "replicas", header: "Réplicas", numeric: true },
  { key: "cpu", header: "CPU", numeric: true, sortable: true, cell: (s) => `${s.cpu} %` },
  {
    key: "p95",
    header: "p95",
    numeric: true,
    sortable: true,
    sortValue: (s) => s.p95 ?? -1,
    cell: (s) => (s.p95 == null ? "—" : `${s.p95} ms`),
  },
  { key: "deployed", header: "Último despliegue", align: "end" },
];

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

const STAGES: PipelineStage[] = [
  { id: "build", label: "Compilar", status: "ok", meta: "1 min 12 s" },
  { id: "test", label: "Pruebas", status: "ok", meta: "4 min 03 s" },
  { id: "scan", label: "Análisis", status: "warn", meta: "2 avisos" },
  { id: "staging", label: "Preproducción", status: "ok", meta: "48 s" },
  { id: "canary", label: "Canario 10 %", status: "running", meta: "6 min" },
  { id: "prod", label: "Producción", status: "idle" },
];

const ROLLOUT = `apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: worker-colas
spec:
  replicas: 5
  strategy:
    canary:
      steps:
        - setWeight: 10
        - pause: { duration: 10m }
        - setWeight: 50
        - pause: { duration: 10m }
`;

const LOGS: LogEntry[] = [
  {
    time: "12:04:31",
    level: "info",
    source: "api-gateway   ",
    message: "GET /v1/carrito 200 · 84 ms",
  },
  {
    time: "12:04:33",
    level: "ok",
    source: "despliegue    ",
    message: "worker-colas:1.10.0 canario al 10 %",
  },
  {
    time: "12:04:38",
    level: "warn",
    source: "búsqueda      ",
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
    source: "worker-colas  ",
    message: "escalando de 2 a 5 réplicas",
  },
  {
    time: "12:05:02",
    level: "info",
    source: "api-gateway   ",
    message: "POST /v1/pedidos 202 · 141 ms",
  },
];

const UPTIME: StatusTone[] = Array.from({ length: 30 }, (_, i) =>
  i === 11 ? "warn" : i === 29 ? "error" : "ok",
);

export function OpsPage({ initialTheme }: { initialTheme: ThemeName }) {
  // The page owns its theme scope, so the selector works inside Storybook without
  // touching <html> or localStorage. In an app, call useTheme() with its defaults.
  const { preference, theme, setPreference } = useTheme({
    storageKey: null,
    target: null,
    defaultPreference: initialTheme,
    night: "oled",
  });

  return (
    <div className="fm-page" data-pt-theme={theme}>
      <Masthead
        current="Servicios"
        links={["Resumen", "Servicios", "Despliegues", "Registro"]}
        issue="eu-west-1 · producción"
        end={<ThemeSwitch value={preference} onChange={setPreference} variant="icons" size="sm" />}
      />

      <section className="fm-head fm-gutter">
        <DotPattern
          motif="diagonal"
          anchor="top-right"
          cols={72}
          rows={34}
          period={6}
          highlight={4}
          intensity={0.3}
        />
        <SectionHeader
          size="lg"
          level={1}
          index="Producción"
          eyebrow="6 servicios · despliegue #482"
          title={
            <>
              Estado de la <em>plataforma</em>
            </>
          }
          description="Un servicio caído y otro degradado. El despliegue de worker-colas está en canario."
        />
        <Stack direction="row" gap={5} wrap className="fm-head__actions">
          <Status tone="ok">3 correctos</Status>
          <Status tone="warn">1 degradado</Status>
          <Status tone="error">1 caído</Status>
          <Status tone="running">1 desplegando</Status>
        </Stack>
      </section>
      <hr className="pt-rule" />

      <main className="fm-main fm-gutter">
        <div className="fm-stats">
          <GlassCard>
            <Stat
              label="Disponibilidad · 30 d"
              value="99,98 %"
              chart={<DotUptime periods={UPTIME} label="Disponibilidad diaria" rows={3} />}
            />
          </GlassCard>
          <GlassCard>
            <Stat
              label="Latencia p95"
              value="182 ms"
              delta="+12 ms"
              trend="negative"
              chart={<DotBars values={[3, 3, 4, 3, 4, 5, 5, 7]} rows={5} label="p95 por hora" />}
            />
          </GlassCard>
          <GlassCard>
            <Stat
              label="Despliegues hoy"
              value="14"
              delta="2 revertidos"
              trend="neutral"
              note="Mediana: 9 min"
            />
          </GlassCard>
          <GlassCard
            tone="bloom"
            backdrop={
              <DotPattern
                motif="orb"
                anchor="bottom-right"
                origin="bottom-right"
                cols={24}
                rows={24}
                highlight={2}
                intensity={0.5}
                style={ON_PLATE}
              />
            }
          >
            <Stat label="Incidentes abiertos" value="1" note="notificaciones · hace 6 min" />
          </GlassCard>
        </div>

        <Stack gap={5} as="section">
          <SectionHeader
            size="sm"
            index="01"
            eyebrow="Arquitectura"
            title="Camino de una petición"
            actions={
              <ThemeSwitch value={preference} onChange={setPreference} size="sm" label="Tema" />
            }
          />
          <GlassCard padding="lg">
            <Diagram nodes={NODES} edges={EDGES} label="Arquitectura de producción" />
          </GlassCard>
        </Stack>

        <Stack gap={5} as="section">
          <SectionHeader size="sm" index="02" eyebrow="Servicios" title="Lo que está corriendo" />
          <DataTable
            caption="Servicios en producción"
            hideCaption
            columns={COLUMNS}
            rows={SERVICES}
            rowKey={(s) => s.name}
            defaultSort={{ key: "cpu", direction: "desc" }}
            selectedKey="notificaciones"
          />
        </Stack>

        <Stack gap={5} as="section">
          <SectionHeader
            size="sm"
            index="03"
            eyebrow="Despliegue #482"
            title="worker-colas, en canario"
          />
          <GlassCard>
            <Pipeline stages={STAGES} label="Despliegue #482" />
          </GlassCard>
          <div className="fm-cols fm-cols--even">
            <GlassCard>
              <KeyValue
                items={[
                  { label: "Commit", value: "9f3c2e1", mono: true },
                  { label: "Rama", value: "main", mono: true },
                  { label: "Autora", value: "Lucía Ortega" },
                  { label: "Imagen", value: "worker-colas:1.10.0", mono: true },
                  { label: "Región", value: "eu-west-1", mono: true },
                  { label: "Estrategia", value: "canario 10 → 50 → 100" },
                  { label: "Aprobado por", value: "Mateo Ibarra" },
                ]}
              />
            </GlassCard>
            <CodeBlock
              title="rollout.yaml"
              language="yaml"
              code={ROLLOUT}
              lineNumbers
              highlight={[10, 11]}
            />
          </div>
        </Stack>

        <Stack gap={5} as="section">
          <SectionHeader
            size="sm"
            index="04"
            eyebrow="Registro"
            title="Últimos eventos"
            actions={<Status tone="running">En directo</Status>}
          />
          <LogView entries={LOGS} label="Registro de producción" />
        </Stack>
      </main>

      <Colophon />
    </div>
  );
}
