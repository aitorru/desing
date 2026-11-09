import type { Meta, StoryObj } from "@storybook/react-vite";
import { type CSSProperties, Fragment, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Callout,
  DotBars,
  DotDivider,
  DotMark,
  DotPattern,
  DotProgress,
  GlassCard,
  SectionHeader,
  Stack,
  Stat,
  Switch,
} from "../../index";
import { Colophon, Masthead } from "./formalParts";
import { OpsPage } from "./OpsPage";
import "./formal.css";

const meta: Meta = {
  title: "Pages/Dot 2",
  // These pages are the v2 proposal: they render in v2 whatever the toolbar says.
  parameters: { layout: "fullscreen", ptVersion: "2" },
};
export default meta;

/** Ochre (the palette's lightest hue) for the accented band over an ink plate. */
const ON_PLATE = { "--pt-pattern-accent": "var(--pt-spectrum-6)" } as CSSProperties;

const FIGURES = [
  { label: "Disponibilidad", value: "99,95 %", note: "SLO 99,9 % · cumplido" },
  { label: "Despliegues", value: "61", note: "4 revertidos, ninguno en viernes" },
  { label: "MTTR", value: "23 min", note: "Mediana de dos incidentes" },
  { label: "Error budget", value: "64 %", note: "Lo que queda del mes" },
];

const STEPS = [
  {
    n: "01",
    title: "Lo que se rompió",
    text: "notificaciones perdió la conexión con colas el martes de madrugada: 41 minutos sin avisos.",
    motif: "fade",
  },
  {
    n: "02",
    title: "Lo que mejoró",
    text: "El p95 de checkout bajó de 180 a 141 ms al mover la caché de sesiones a redis.",
    motif: "diagonal",
  },
  {
    n: "03",
    title: "Lo que viene",
    text: "postgres pasa de la 15 a la 17 el jueves, de 02:00 a 03:00. Habrá café.",
    motif: "grid",
  },
] as const;

function CoverPage() {
  return (
    <div className="fm-page">
      <Masthead current="Resumen" />

      <section className="fm-cover fm-gutter">
        <DotPattern
          motif="rings"
          anchor="top-right"
          cols={88}
          rows={72}
          period={7}
          highlight={5}
          intensity={0.36}
        />
        <div className="fm-cover__text">
          <span className="pt-folio">Informe semanal de plataforma</span>
          <h1 className="pt-display fm-cover__title">
            Una semana <em>casi</em> tranquila.
          </h1>
          <p className="pt-body fm-cover__lead">
            Dos incidentes, 61 despliegues y un error budget que aguanta. Lo de siempre, resumido en
            una página para quien no estuvo de guardia.
          </p>
          <Stack direction="row" gap={3} wrap>
            <Button variant="aurora" size="lg">
              Abrir el panel
            </Button>
            <Button variant="ghost" size="lg">
              Leer el post-mortem
            </Button>
          </Stack>
        </div>
      </section>

      <section className="fm-gutter" aria-label="Cifras">
        <hr className="pt-rule" />
        <div className="fm-figures">
          {FIGURES.map((f) => (
            <Stat key={f.label} className="fm-figure" {...f} />
          ))}
        </div>
        <hr className="pt-rule" />
      </section>

      <section className="fm-section fm-gutter" id="incidentes">
        <SectionHeader
          index="01"
          eyebrow="La semana"
          title="Tres cosas que contar"
          description="El mismo orden cada lunes: qué se rompió, qué mejoró y qué toca. Sin adjetivos."
        />
        <div className="fm-steps">
          {STEPS.map((s) => (
            <GlassCard
              key={s.n}
              padding="md"
              backdrop={
                <DotPattern
                  motif={s.motif}
                  anchor="top-right"
                  cols={22}
                  rows={14}
                  highlight={s.motif === "diagonal" ? 2 : null}
                />
              }
            >
              <div className="fm-step">
                <span className="pt-folio">{s.n}</span>
                <h3 className="pt-display fm-step__title">{s.title}</h3>
                <p className="pt-body">{s.text}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="fm-gutter">
        <GlassCard
          tone="bloom"
          padding="none"
          backdrop={
            <DotPattern
              motif="orb"
              anchor="right"
              cols={52}
              rows={52}
              highlight={2}
              intensity={0.5}
              style={{ ...ON_PLATE, right: -40 }}
            />
          }
        >
          <figure className="fm-quote">
            <span className="pt-eyebrow">Nota de la guardia</span>
            <blockquote className="pt-display fm-quote__text">
              Ninguna alerta a las cuatro de la mañana. Lo apuntamos por si no se <em>repite</em>.
            </blockquote>
            <figcaption className="fm-quote__by">Guardia de plataforma, semana 45</figcaption>
          </figure>
        </GlassCard>
      </section>

      <Colophon />
    </div>
  );
}

const TEAM = [
  { name: "Lucía Ortega" },
  { name: "Mateo Ibarra" },
  { name: "Noa Villanueva" },
  { name: "Iker Salaberria" },
  { name: "Carmen Ruiz" },
  { name: "Jon Etxeberria" },
];

const TIMELINE = [
  {
    who: "Noa Villanueva",
    what: "reconoció la alerta ColaSinConsumidores",
    when: "03:16",
    tag: null,
  },
  {
    who: "Iker Salaberria",
    what: "reinició el broker y drenó la cola",
    when: "03:41",
    tag: "mitigado",
  },
  { who: "Mateo Ibarra", what: "cerró el incidente y abrió PLAT-318", when: "03:53", tag: null },
];

function ReportPage() {
  const [queueAlert, setQueueAlert] = useState(true);
  const [autoRestart, setAutoRestart] = useState(false);
  return (
    <div className="fm-page">
      <Masthead current="Incidentes" />

      <section className="fm-head fm-gutter">
        <DotPattern
          motif="wave"
          anchor="top-right"
          cols={84}
          rows={34}
          period={8}
          highlight={3}
          intensity={0.32}
        />
        <SectionHeader
          size="lg"
          level={1}
          index="INC-212"
          eyebrow="Post-mortem · notificaciones"
          title={
            <>
              Cuarenta y un minutos sin <em>avisos</em>
            </>
          }
          description="El martes a las 03:12 notificaciones dejó de hablar con colas. Esto es lo que pasó y lo que vamos a cambiar."
        />
        <Stack direction="row" gap={3} wrap className="fm-head__actions">
          <Button variant="aurora">Ver la cronología</Button>
          <Button variant="ghost">Abrir PLAT-318</Button>
          <AvatarGroup people={TEAM} max={4} size="sm" label="Respondieron" />
        </Stack>
      </section>
      <hr className="pt-rule" />

      <main className="fm-main fm-gutter" id="incidentes">
        <div className="fm-stats">
          <GlassCard>
            <Stat
              label="Duración"
              value="41 min"
              delta="detectado en 4"
              trend="neutral"
              note="De 03:12 a 03:53"
            />
          </GlassCard>
          <GlassCard>
            <Stat
              label="Mensajes retrasados"
              value="12 400"
              delta="0 perdidos"
              trend="positive"
              chart={
                <DotBars
                  values={[1, 3, 5, 7, 7, 6, 3, 1]}
                  rows={5}
                  label="Cola por cada cinco minutos"
                />
              }
            />
          </GlassCard>
          <GlassCard>
            <Stat
              label="Error budget"
              value="64 %"
              delta="−18 pp"
              trend="negative"
              chart={
                <DotProgress value={64} count={20} tone="current" label="Error budget restante" />
              }
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
            <Stat label="Severidad" value="SEV-2" note="Sin pérdida de datos" />
          </GlassCard>
        </div>

        <div className="fm-cols">
          <Stack gap={5}>
            <SectionHeader
              size="sm"
              index="01"
              eyebrow="Cronología"
              title="Quién hizo qué"
              actions={<Badge tone="positive">Resuelto</Badge>}
            />
            <GlassCard>
              <Stack gap={3}>
                {TIMELINE.map((a, i) => (
                  <Fragment key={a.what}>
                    {i > 0 && <DotDivider />}
                    <Stack direction="row" gap={3}>
                      <Avatar name={a.who} size="sm" status={i === 0 ? "online" : undefined} />
                      <span className="fm-line">
                        <strong>{a.who}</strong> {a.what}
                      </span>
                      {a.tag && (
                        <Badge tone="positive" dot>
                          {a.tag}
                        </Badge>
                      )}
                      <span className="fm-when">{a.when}</span>
                    </Stack>
                  </Fragment>
                ))}
              </Stack>
            </GlassCard>
            <Callout tone="accent" title="Sin culpables">
              Este post-mortem describe sistemas, no personas. La alerta tardó; nadie se durmió.
            </Callout>
          </Stack>

          <Stack gap={5} id="guardias">
            <SectionHeader size="sm" index="02" eyebrow="Acciones" title="Para que no vuelva" />
            <GlassCard>
              <Stack gap={4}>
                <Switch
                  label="Alerta por cola llena"
                  description="Avisa si colas pasa de 5 000 mensajes sin consumir."
                  checked={queueAlert}
                  onChange={(e) => setQueueAlert(e.target.checked)}
                />
                <DotDivider />
                <Switch
                  label="Reinicio automático del broker"
                  description="Una vez por hora como mucho. Más es tapar el problema."
                  checked={autoRestart}
                  onChange={(e) => setAutoRestart(e.target.checked)}
                />
                <DotDivider />
                <Switch
                  label="Autoescalado de colas"
                  description="Pendiente de PLAT-318."
                  disabled
                />
              </Stack>
            </GlassCard>
          </Stack>
        </div>
      </main>

      <Colophon />
    </div>
  );
}

function Plate({ ink }: { ink?: boolean }) {
  return (
    <GlassCard
      tone={ink ? "bloom" : "clear"}
      padding="none"
      className="fm-plate"
      backdrop={
        <DotPattern
          motif="orb"
          anchor="top"
          cols={42}
          rows={42}
          falloff={0.3}
          tone={ink ? "ink" : "accent"}
          intensity={ink ? 0.55 : 0.9}
          highlight={ink ? 2 : null}
          style={{ ...ON_PLATE, top: 80 }}
        />
      }
    >
      <div className="fm-plate__inner">
        <div className="fm-plate__top">
          <span className="fm-mast__brand">
            <DotMark size={16} />
            plataforma
          </span>
          <span className="pt-folio">{ink ? "De noche" : "De día"}</span>
        </div>
        <div className="fm-plate__copy">
          <h2 className="pt-display fm-plate__title">
            Todo verde, <em>por ahora</em>
          </h2>
          <p className="fm-plate__sub">
            Estado de servicios, despliegues e incidentes. Sin sorpresas, salvo las de producción
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

/** The cover of a weekly platform report: rings from the corner, one of them sealed, and nothing moving. */
export const Portada: StoryObj = { render: () => <CoverPage /> };

/** A post-mortem in v2: paper panels, hairlines, folios and one ink plate for the severity. */
export const Informe: StoryObj = { render: () => <ReportPage /> };

/**
 * A platform console built from the DevOps pieces: `Diagram`, `DataTable`, `Pipeline`,
 * `KeyValue`, `CodeBlock`, `LogView`, `DotUptime` and `Status`. The selector in the header
 * is a working `ThemeSwitch` + `useTheme`: try OLED.
 */
export const Operaciones: StoryObj = {
  render: (_, { globals }) => (
    <OpsPage
      key={String(globals.theme)}
      initialTheme={globals.theme === "dark" || globals.theme === "oled" ? globals.theme : "light"}
    />
  ),
};

/** A status poster for the office screen: a halftone sun instead of ribbons, on paper and on ink. */
export const Lamina: StoryObj = {
  name: "Lámina",
  render: () => (
    <div className="fm-page fm-stage">
      <DotPattern motif="grid" origin="center" falloff={1.2} intensity={0.22} />
      <Plate />
      <Plate ink />
    </div>
  ),
};
