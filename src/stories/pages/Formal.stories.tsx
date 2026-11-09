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
import "./formal.css";

const meta: Meta = {
  title: "Pages/Punto 2",
  // These pages are the v2 proposal: they render in v2 whatever the toolbar says.
  parameters: { layout: "fullscreen", ptVersion: "2" },
};
export default meta;

/** Ochre (the palette's lightest hue) for the accented band over an ink plate. */
const ON_PLATE = { "--pt-pattern-accent": "var(--pt-spectrum-6)" } as CSSProperties;

function Masthead({ current }: { current: string }) {
  return (
    <>
      <header className="fm-mast fm-gutter">
        <span className="fm-mast__brand">
          <DotMark size={18} />
          Otherwise
        </span>
        <nav className="fm-mast__links" aria-label="Principal">
          {["Resumen", "Escenarios", "Método", "Ajustes"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              aria-current={l === current ? "page" : undefined}
            >
              {l}
            </a>
          ))}
        </nav>
        <span className="pt-folio fm-mast__issue">Nº 02 · Otoño 2026</span>
        <Button variant="ghost" size="sm">
          Entrar
        </Button>
      </header>
      <hr className="pt-rule" />
    </>
  );
}

function Colophon() {
  return (
    <footer className="fm-foot fm-gutter">
      <div className="fm-foot__strip">
        <DotPattern motif="grid" falloff={0} intensity={0.34} highlight={0} origin="left" />
      </div>
      <div className="fm-foot__line">
        <span>Otherwise · Punto 2, edición formal</span>
        <span>Compuesto en Instrument Serif e Inter Tight</span>
      </div>
    </footer>
  );
}

const FIGURES = [
  { label: "Trayectorias por pregunta", value: "10 000", note: "Monte Carlo, semilla fija" },
  { label: "Ingresos p50", value: "1,8 M€", note: "A doce meses" },
  { label: "Riesgo de caída", value: "30 %", note: "Por debajo de 1 M€" },
  { label: "Tiempo de respuesta", value: "4 s", note: "De la pregunta al informe" },
];

const STEPS = [
  {
    n: "01",
    title: "Plantea",
    text: "Escribe la decisión como una pregunta y marca los supuestos que la mueven.",
    motif: "fade",
  },
  {
    n: "02",
    title: "Simula",
    text: "Cada supuesto se convierte en una distribución; el resto es aritmética paciente.",
    motif: "diagonal",
  },
  {
    n: "03",
    title: "Compara",
    text: "Tres escenarios en la misma escala, con su riesgo a la vista y sin adjetivos.",
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
          <span className="pt-folio">Informe anual · 2026</span>
          <h1 className="pt-display fm-cover__title">
            Probar la decisión <em>antes</em> de tomarla.
          </h1>
          <p className="pt-body fm-cover__lead">
            Simula resultados, compara escenarios y decide con más calma. Diez mil trayectorias por
            cada pregunta, resumidas en una sola página.
          </p>
          <Stack direction="row" gap={3} wrap>
            <Button variant="aurora" size="lg">
              Nueva simulación
            </Button>
            <Button variant="ghost" size="lg">
              Leer el método
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

      <section className="fm-section fm-gutter" id="método">
        <SectionHeader
          index="01"
          eyebrow="Método"
          title="Tres pasos, una página"
          description="El mismo orden en cada informe: lo que cambia es la pregunta, no la forma de leerla."
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
            <span className="pt-eyebrow">Lámina I · Principio</span>
            <blockquote className="pt-display fm-quote__text">
              No buscamos acertar el futuro; buscamos que no nos <em>sorprenda</em>.
            </blockquote>
            <figcaption className="fm-quote__by">Lucía Ortega, dirección de estrategia</figcaption>
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

const ACTIVITY = [
  { who: "Lucía Ortega", what: "simuló «Subir precio 8 %»", when: "hace 4 min", tag: "+12,4 %" },
  { who: "Mateo Ibarra", what: "comentó en «Nuevo mercado»", when: "hace 1 h", tag: null },
  { who: "Noa Villanueva", what: "compartió el informe de Q3", when: "ayer", tag: null },
];

function ReportPage() {
  const [live, setLive] = useState(true);
  const [digest, setDigest] = useState(false);
  return (
    <div className="fm-page">
      <Masthead current="Resumen" />

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
          index="Plan 2027"
          eyebrow="Resumen del espacio"
          title={
            <>
              Buenos días, <em>Lucía</em>
            </>
          }
          description="Tres escenarios listos para revisar y una simulación en curso."
        />
        <Stack direction="row" gap={3} wrap className="fm-head__actions">
          <Button variant="aurora">Nueva simulación</Button>
          <Button variant="ghost">Ver informe</Button>
          <AvatarGroup people={TEAM} max={4} size="sm" label="Equipo" />
        </Stack>
      </section>
      <hr className="pt-rule" />

      <main className="fm-main fm-gutter" id="resumen">
        <div className="fm-stats">
          <GlassCard>
            <Stat
              label="Ingresos p50"
              value="1,8 M€"
              delta="+12,4 %"
              trend="positive"
              note="A 12 meses"
            />
          </GlassCard>
          <GlassCard>
            <Stat
              label="Abandono"
              value="2,1 %"
              delta="−0,4 pp"
              trend="positive"
              chart={
                <DotBars values={[7, 6, 6, 5, 5, 4, 4, 3]} rows={5} label="Abandono mensual" />
              }
            />
          </GlassCard>
          <GlassCard>
            <Stat
              label="Objetivo Q3"
              value="64 %"
              delta="−6 %"
              trend="negative"
              chart={<DotProgress value={64} count={20} tone="current" label="Objetivo Q3" />}
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
            <Stat label="Escenario elegido" value="B" note="Subir precio 8 %" />
          </GlassCard>
        </div>

        <div className="fm-cols">
          <Stack gap={5}>
            <SectionHeader
              size="sm"
              index="01"
              eyebrow="Actividad"
              title="Lo último del equipo"
              actions={
                <Badge dot="pulse" tone="accent">
                  En directo
                </Badge>
              }
            />
            <GlassCard>
              <Stack gap={3}>
                {ACTIVITY.map((a, i) => (
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
            <Callout tone="accent" title="Resultado simulado">
              Las cifras salen de 10 000 trayectorias, no de datos reales.
            </Callout>
          </Stack>

          <Stack gap={5} id="ajustes">
            <SectionHeader size="sm" index="02" eyebrow="Ajustes" title="Este espacio" />
            <GlassCard>
              <Stack gap={4}>
                <Switch
                  label="Simulación en directo"
                  description="Recalcula al cambiar cualquier supuesto."
                  checked={live}
                  onChange={(e) => setLive(e.target.checked)}
                />
                <DotDivider />
                <Switch
                  label="Resumen semanal"
                  description="Los lunes, en tu correo."
                  checked={digest}
                  onChange={(e) => setDigest(e.target.checked)}
                />
                <DotDivider />
                <Switch label="Exportar a contabilidad" description="Plan Empresa." disabled />
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
            Otherwise
          </span>
          <span className="pt-folio">{ink ? "Lámina II" : "Lámina I"}</span>
        </div>
        <div className="fm-plate__copy">
          <h2 className="pt-display fm-plate__title">
            Test the decision <em>before</em> you make it
          </h2>
          <p className="fm-plate__sub">
            Simulate outcomes, compare scenarios, and move with more confidence
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

/** The cover of a report: rings from the corner, one of them sealed, and nothing moving. */
export const Portada: StoryObj = { render: () => <CoverPage /> };

/** The Workspace dashboard, re-set in v2: paper panels, hairlines, folios and one ink plate. */
export const Informe: StoryObj = { render: () => <ReportPage /> };

/** The original poster, formalised: a halftone sun instead of ribbons, on paper and on ink. */
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
