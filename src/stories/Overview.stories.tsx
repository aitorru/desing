import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import {
  Badge,
  Button,
  DotField,
  DotLoader,
  DotMark,
  DotPattern,
  DotProgress,
  DotUptime,
  GlassCard,
  Pipeline,
  Status,
  type StatusTone,
  Switch,
} from "../index";
import { PALETTES } from "../tokens/palettes";
import { heroPalette, isNight } from "./theme";
import "./overview.css";

/**
 * The summary board: one tile per idea, built only with Dot pieces. It is also the image
 * at the top of the README (`docs/overview.png`, captured at 1920 × 1080).
 */
const meta: Meta = {
  title: "Dot/Resumen",
  parameters: { layout: "fullscreen", ptVersion: "2" },
};
export default meta;

/** Ochre over the ink plate, as on the formal pages. */
const ON_PLATE = { "--pt-pattern-accent": "var(--pt-spectrum-6)" } as CSSProperties;

function Tile({
  area,
  title,
  children,
  className,
}: {
  area: string;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`ov-tile ${className ?? ""}`} style={{ gridArea: area }}>
      {title && <h2 className="ov-tile__title">{title}</h2>}
      {children}
    </section>
  );
}

const UPTIME: StatusTone[] = Array.from({ length: 60 }, (_, i) =>
  i === 23 ? "warn" : i === 41 ? "error" : i === 42 ? "warn" : "ok",
);

function Board({ palette, night }: { palette: ReturnType<typeof heroPalette>; night: boolean }) {
  return (
    <div className="ov-board">
      <Tile area="themes" title="Mist · Ink · OLED">
        <div className="ov-themes">
          {(["light", "dark", "oled"] as const).map((t) => (
            <div key={t} data-pt-theme={t} className="ov-themes__panel">
              <span className="pt-display ov-themes__aa">Aa</span>
              <Switch label={t} hideLabel size="sm" defaultChecked={t !== "light"} />
            </div>
          ))}
        </div>
      </Tile>

      <Tile area="palettes" title="Cinco paletas">
        <div className="ov-palettes">
          {PALETTES.map((p) => (
            <div key={p.name} data-pt-palette={p.name} className="ov-palettes__chip">
              <span className="ov-palettes__dots" aria-hidden="true">
                <i style={{ background: "var(--pt-spectrum-2)" }} />
                <i style={{ background: "var(--pt-spectrum-accent)" }} />
                <i style={{ background: "var(--pt-spectrum-5)" }} />
              </span>
              {p.label}
            </div>
          ))}
        </div>
      </Tile>

      <Tile area="field" className="ov-tile--bleed">
        <DotField
          palette={palette}
          surface={night ? "theme" : "palette"}
          motion="still"
          seed={7}
          className="ov-fill"
        />
        <h2 className="ov-tile__title ov-tile__title--over">Textura viva</h2>
      </Tile>

      <Tile area="mark" title="La marca">
        <div className="ov-center">
          <DotMark size={104} />
        </div>
      </Tile>

      <Tile area="type" title="Tres voces">
        <div className="ov-type">
          <span className="pt-display ov-type__serif">
            Serif <em>tranquila</em>
          </span>
          <span className="ov-type__sans">Inter Tight para la interfaz</span>
          <span className="pt-mono ov-type__mono">IBM Plex Mono · p95 141 ms</span>
        </div>
      </Tile>

      <Tile area="comps" title="Componentes">
        <div className="ov-comps">
          <Button>Desplegar</Button>
          <Button variant="ghost">Revertir</Button>
          <Badge tone="positive" dot>
            SLO ok
          </Badge>
          <Switch label="Alertas" defaultChecked />
        </div>
      </Tile>

      <Tile area="hero" className="ov-tile--bleed ov-tile--plate">
        <GlassCard
          tone="bloom"
          padding="none"
          className="ov-fill"
          backdrop={
            <DotPattern
              motif="rings"
              anchor="top-right"
              cols={60}
              rows={44}
              period={6}
              highlight={3}
              intensity={0.5}
              style={ON_PLATE}
            />
          }
        >
          <div className="ov-hero">
            <h1 className="pt-display ov-hero__name">dot</h1>
          </div>
        </GlassCard>
      </Tile>

      <Tile area="status" title="Estado de servicios">
        <div className="ov-status">
          <div className="ov-status__list">
            <Status tone="ok">Correcto</Status>
            <Status tone="warn">Degradado</Status>
            <Status tone="error">Caído</Status>
            <Status tone="running" pulse>
              En curso
            </Status>
          </div>
          <DotUptime periods={UPTIME} label="Disponibilidad, 60 días" rows={3} size={10} />
        </div>
      </Tile>

      <Tile area="tokens" title="Tres atributos">
        <pre className="pt-mono ov-tokens">
          {`data-pt-theme="oled"
data-pt-palette="siena"
data-pt-version="2"`}
        </pre>
      </Tile>

      <Tile area="loaders" title="Mientras esperas">
        <div className="ov-loaders">
          <div className="ov-loaders__row">
            <DotLoader variant="wave" tone="accent" size="lg" label="Cargando" />
            <DotLoader variant="pulse" size="lg" label="Cargando" />
            <DotLoader variant="orbit" size="lg" label="Cargando" />
          </div>
          <DotProgress value={62} tone="accent" label="Réplicas listas" />
        </div>
      </Tile>

      <Tile area="pipe" title="Despliegues">
        <div className="ov-pipe">
          <Pipeline
            label="Despliegue"
            stages={[
              { id: "build", label: "Compilar", status: "ok", meta: "48 s" },
              { id: "test", label: "Probar", status: "ok", meta: "2 min" },
              { id: "deploy", label: "Desplegar", status: "running" },
              { id: "verify", label: "Verificar", status: "idle" },
            ]}
          />
        </div>
      </Tile>
    </div>
  );
}

export const Resumen: StoryObj = {
  render: (_, { globals }) => <Board palette={heroPalette(globals)} night={isNight(globals)} />,
};
