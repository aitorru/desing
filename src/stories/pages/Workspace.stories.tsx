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
  { who: "Lucía Ortega", what: "desplegó checkout v2.31.0", when: "hace 4 min", tag: "verde" },
  {
    who: "Mateo Ibarra",
    what: "silenció la alerta de disco en batch-02",
    when: "hace 1 h",
    tag: null,
  },
  { who: "Noa Villanueva", what: "cerró el post-mortem de INC-212", when: "ayer", tag: null },
];

function WorkspaceScreen({ hero }: { hero: ReturnType<typeof heroPalette> }) {
  const [pager, setPager] = useState(true);
  const [digest, setDigest] = useState(false);
  const [tip, setTip] = useState(true);
  return (
    <div className="pg-app pt-dot-paper">
      <Stack as="header" direction="row" gap={6} className="pg-nav">
        <div className="pg-nav__brand">
          <span className="pg-nav__mark">
            <Petals tone="bloom" />
          </span>
          plataforma
        </div>
        <nav className="pg-nav__links" aria-label="Principal">
          <a href="#guardia" aria-current="page">
            Guardia
          </a>
          <a href="#servicios">Servicios</a>
          <a href="#ajustes">Ajustes</a>
        </nav>
        <AvatarGroup people={TEAM} max={4} size="sm" label="Equipo de plataforma" />
        <Button variant="ghost" size="sm">
          Runbooks
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
              eyebrow="Guardia · semana 45"
              title="Buenos días, Noa"
              description="Te toca guardia hasta el lunes. De momento, nada que hacer salvo mirar esta página."
              actions={
                <>
                  <Button variant="aurora" icon={<Sparkle size={14} />}>
                    Abrir incidente
                  </Button>
                  <Button variant="ghost">Ver el informe semanal</Button>
                </>
              }
            />
          </GlassCard>
        </div>
      </DotField>

      <main className="pg-results" id="guardia">
        <div className="pg-ws__stats">
          <GlassCard tone="solid">
            <Stat
              label="Disponibilidad · 30 d"
              value="99,95 %"
              delta="+0,02 pp"
              trend="positive"
              note="SLO 99,9 %"
            />
          </GlassCard>
          <GlassCard tone="solid">
            <Stat
              label="Alertas esta semana"
              value="7"
              delta="−5"
              trend="positive"
              chart={<DotBars values={[7, 6, 6, 5, 5, 4, 4, 3]} rows={5} label="Alertas por día" />}
            />
          </GlassCard>
          <GlassCard tone="solid">
            <Stat
              label="Error budget"
              value="64 %"
              delta="−18 pp"
              trend="negative"
              chart={<DotProgress value={64} count={20} label="Error budget restante" />}
            />
          </GlassCard>
          <GlassCard tone="bloom">
            <Stat
              label="Siguiente guardia"
              value="Iker"
              delta="lunes 09:00"
              trend="neutral"
              note="Pásale el busca con cariño"
            />
          </GlassCard>
        </div>

        <div className="pg-ws__cols">
          <Stack gap={5}>
            <SectionHeader
              size="sm"
              eyebrow="Actividad"
              title="Lo último en producción"
              actions={
                <Badge dot="pulse" tone="accent">
                  En directo
                </Badge>
              }
            />
            {tip && (
              <Callout tone="accent" title="Datos de ejemplo" onDismiss={() => setTip(false)}>
                Las cifras son inventadas. Los incidentes, por desgracia, suenan a reales.
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
            <SectionHeader size="sm" eyebrow="Ajustes" title="Tu guardia" />
            <GlassCard tone="solid">
              <Stack gap={4}>
                <Switch
                  label="Avisos al móvil"
                  description="Solo SEV-1 y SEV-2. El resto puede esperar al café."
                  checked={pager}
                  onChange={(e) => setPager(e.target.checked)}
                />
                <DotDivider />
                <Switch
                  label="Resumen semanal"
                  description="Los lunes, en #plataforma."
                  checked={digest}
                  onChange={(e) => setDigest(e.target.checked)}
                />
                <DotDivider />
                <Switch
                  label="Desplegar los viernes"
                  description="Desactivado por tu propio bien."
                  disabled
                />
              </Stack>
            </GlassCard>
            <Callout tone="negative" title="notificaciones sigue inestable" icon={null}>
              Tres reinicios en la última hora. Si vuelve a caer, el runbook de colas está aquí al
              lado.
            </Callout>
          </Stack>
        </div>
      </main>
    </div>
  );
}

/**
 * An on-call dashboard built almost only from the cross-cutting components: Stack, SectionHeader,
 * Stat, Callout, Switch, Avatar and DotDivider. Switch the palette in the toolbar.
 */
export const Dashboard: StoryObj = {
  render: (_, { globals }) => <WorkspaceScreen hero={heroPalette(globals)} />,
};
