import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fragment, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Callout,
  DotBars,
  DotDivider,
  DotField,
  DotProgress,
  GlassCard,
  Petals,
  SectionHeader,
  Sparkle,
  Stack,
  Stat,
  Switch,
} from "../../index";
import { heroPalette } from "../theme";
import "./pages.css";

const meta: Meta = {
  title: "Pages/Workspace",
  parameters: { layout: "fullscreen" },
};
export default meta;

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

function WorkspaceScreen({ hero }: { hero: ReturnType<typeof heroPalette> }) {
  const [live, setLive] = useState(true);
  const [digest, setDigest] = useState(false);
  const [tip, setTip] = useState(true);
  return (
    <div className="pg-app pt-dot-paper">
      <Stack as="header" direction="row" gap={6} className="pg-nav">
        <div className="pg-nav__brand">
          <span className="pg-nav__mark">
            <Petals tone="bloom" />
          </span>
          Otherwise
        </div>
        <nav className="pg-nav__links" aria-label="Principal">
          <a href="#resumen" aria-current="page">
            Resumen
          </a>
          <a href="#escenarios">Escenarios</a>
          <a href="#ajustes">Ajustes</a>
        </nav>
        <AvatarGroup people={TEAM} max={4} size="sm" label="Equipo" />
        <Button variant="ghost" size="sm">
          Invitar
        </Button>
      </Stack>

      <DotField
        palette={hero}
        motion="breathe"
        surface="theme"
        pixel={2}
        seed={5}
        className="pg-hero"
      >
        <div className="pg-hero__inner pg-ws__hero">
          <GlassCard padding="lg" className="pg-ws__intro">
            <SectionHeader
              size="lg"
              level={1}
              eyebrow="Espacio · Plan 2027"
              title="Buenos días, Lucía"
              description="Tres escenarios listos para revisar y una simulación en curso."
              actions={
                <>
                  <Button variant="aurora" icon={<Sparkle size={14} />}>
                    Nueva simulación
                  </Button>
                  <Button variant="ghost">Ver informe</Button>
                </>
              }
            />
          </GlassCard>
        </div>
      </DotField>

      <main className="pg-results" id="resumen">
        <div className="pg-ws__stats">
          <GlassCard tone="solid">
            <Stat
              label="Ingresos p50"
              value="1,8 M€"
              delta="+12,4 %"
              trend="positive"
              note="A 12 meses"
            />
          </GlassCard>
          <GlassCard tone="solid">
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
          <GlassCard tone="solid">
            <Stat
              label="Objetivo Q3"
              value="64 %"
              delta="−6 %"
              trend="negative"
              chart={<DotProgress value={64} count={20} label="Objetivo Q3" />}
            />
          </GlassCard>
          <GlassCard tone="bloom">
            <Stat
              label="Escenario elegido"
              value="B"
              delta="+12,4 %"
              trend="positive"
              note="Subir precio 8 %"
            />
          </GlassCard>
        </div>

        <div className="pg-ws__cols">
          <Stack gap={5}>
            <SectionHeader
              size="sm"
              eyebrow="Actividad"
              title="Lo último del equipo"
              actions={
                <Badge dot="pulse" tone="accent">
                  En directo
                </Badge>
              }
            />
            {tip && (
              <Callout tone="accent" title="Resultado simulado" onDismiss={() => setTip(false)}>
                Las cifras salen de 10 000 trayectorias, no de datos reales.
              </Callout>
            )}
            <GlassCard tone="solid">
              <Stack gap={3}>
                {ACTIVITY.map((a, i) => (
                  <Fragment key={a.what}>
                    {i > 0 && <DotDivider />}
                    <Stack direction="row" gap={3}>
                      <Avatar name={a.who} size="sm" status={i === 0 ? "online" : undefined} />
                      <span className="pg-ws__line">
                        <strong>{a.who}</strong> {a.what}
                      </span>
                      {a.tag && (
                        <Badge tone="positive" dot>
                          {a.tag}
                        </Badge>
                      )}
                      <span className="pg-ws__when">{a.when}</span>
                    </Stack>
                  </Fragment>
                ))}
              </Stack>
            </GlassCard>
          </Stack>

          <Stack gap={5} id="ajustes">
            <SectionHeader size="sm" eyebrow="Ajustes" title="Este espacio" />
            <GlassCard tone="solid">
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
            <Callout tone="negative" title="Riesgo alto en «Nuevo mercado»" icon={null}>
              En el 30 % de las trayectorias los ingresos caen por debajo de 1 M€.
            </Callout>
          </Stack>
        </div>
      </main>
    </div>
  );
}

/**
 * A team dashboard built almost only from the cross-cutting components: Stack, SectionHeader,
 * Stat, Callout, Switch, Avatar and DotDivider. Switch the palette in the toolbar.
 */
export const Dashboard: StoryObj = {
  render: (_, { globals }) => <WorkspaceScreen hero={heroPalette(globals)} />,
};
