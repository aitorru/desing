import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Badge,
  Button,
  DotBars,
  DotField,
  DotProgress,
  GlassCard,
  PALETTES,
  type PaletteInfo,
  Sparkle,
  Stack,
  Stat,
  Switch,
} from "../../index";
import "./Foundations.css";

const meta: Meta = {
  title: "Foundations/Palettes",
  parameters: { layout: "fullscreen" },
};
export default meta;

const SERIES = [4, 5, 5, 6, 7, 6, 8, 9, 10, 11];

function Dots({ tokens }: { tokens: string[] }) {
  return (
    <div className="fd-pal__dots">
      {tokens.map((t) => (
        <span key={t} title={t} style={{ background: `var(${t})` }} />
      ))}
    </div>
  );
}

/** One palette in one theme: hero, swatches and a handful of components. */
function Sample({ p, theme }: { p: PaletteInfo; theme: "light" | "dark" }) {
  return (
    <section data-pt-theme={theme} data-pt-palette={p.name} className="fd-pal pt-dot-paper">
      <DotField
        palette={p.hero}
        surface={theme === "dark" ? "theme" : "palette"}
        motion="still"
        pixel={2}
        seed={11}
        className="fd-pal__hero"
      >
        <div className="fd-pal__stage">
          <GlassCard tone="bloom" padding="sm" className="fd-pal__card">
            <span className="fd-pal__brand">
              <Sparkle size={12} /> {p.label}
            </span>
            <p className="pt-display fd-pal__title">Prueba la decisión</p>
          </GlassCard>
        </div>
      </DotField>
      <Stack gap={3} className="fd-pal__body">
        <Stack gap={1}>
          <span className="pt-eyebrow">{theme === "light" ? "Mist" : "Ink"}</span>
          <p className="fd-pal__desc">{p.description}</p>
        </Stack>
        <Dots
          tokens={[
            "--pt-mist-50",
            "--pt-mist-100",
            "--pt-mist-200",
            "--pt-mist-300",
            "--pt-mist-400",
          ]}
        />
        <Dots
          tokens={["--pt-ink-500", "--pt-ink-600", "--pt-ink-700", "--pt-ink-800", "--pt-ink-900"]}
        />
        <Dots
          tokens={[
            "--pt-spectrum-1",
            "--pt-spectrum-2",
            "--pt-spectrum-3",
            "--pt-spectrum-4",
            "--pt-spectrum-5",
            "--pt-spectrum-6",
          ]}
        />
        <div className="fd-pal__gradient" />
        <Stack direction="row" gap={2} wrap>
          <Button variant="aurora" size="sm" icon={<Sparkle size={12} />}>
            Simular
          </Button>
          <Button size="sm">Guardar</Button>
          <Button variant="ghost" size="sm">
            Cancelar
          </Button>
        </Stack>
        <Stack direction="row" gap={2} wrap>
          <Badge tone="accent" dot="pulse">
            En directo
          </Badge>
          <Badge tone="positive" dot>
            +12 %
          </Badge>
          <Badge tone="negative" dot>
            −6 %
          </Badge>
        </Stack>
        <GlassCard tone="solid" padding="sm">
          <Stat
            label="Ingresos p50"
            value="1,8 M€"
            delta="+12,4 %"
            trend="positive"
            chart={
              <DotBars values={SERIES} rows={5} highlight={SERIES.length - 1} label="Ingresos" />
            }
          />
        </GlassCard>
        <Switch label="Simulación en directo" size="sm" defaultChecked />
        <DotProgress value={64} count={28} label="Progreso" />
      </Stack>
    </section>
  );
}

/**
 * The four palettes side by side, in Mist (top) and Ink (bottom). Each column is a scope
 * with `data-pt-palette`: the components are the same, only the tokens change.
 */
export const Comparison: StoryObj = {
  name: "Comparativa",
  render: () => (
    <div className="fd-pals">
      {(["light", "dark"] as const).map((t) =>
        PALETTES.map((p) => <Sample key={`${t}-${p.name}`} p={p} theme={t} />),
      )}
    </div>
  ),
};

/** Only the palette picked in the toolbar («Paleta»), in the toolbar's theme. */
export const Current: StoryObj = {
  name: "Paleta activa",
  render: (_, { globals }) => {
    const p = PALETTES.find((x) => x.name === globals.palette) ?? PALETTES[0];
    return (
      <div style={{ maxWidth: 420, padding: 32 }}>
        {p && <Sample p={p} theme={globals.theme === "dark" ? "dark" : "light"} />}
      </div>
    );
  },
};
