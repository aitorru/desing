import type { Meta, StoryObj } from "@storybook/react-vite";
import { type CSSProperties, useState } from "react";
import {
  Badge,
  Button,
  DotBars,
  DotField,
  DotPattern,
  GlassCard,
  SectionHeader,
  Segmented,
  Stack,
  Stat,
  TextField,
  type ThemeName,
} from "../../index";
import "./Foundations.css";

const meta: Meta = {
  title: "Foundations/Versions",
  // The story sets the version itself, panel by panel.
  parameters: { layout: "fullscreen", ptVersion: "1" },
};
export default meta;

const RANGES = [
  { value: "1h", label: "1 h" },
  { value: "24h", label: "24 h" },
  { value: "7d", label: "7 d" },
] as const;

/** The same screen fragment, set in one version of the language. */
function Sample({ version, theme }: { version: "1" | "2"; theme: ThemeName }) {
  const [range, setRange] = useState<(typeof RANGES)[number]["value"]>("24h");
  const v2 = version === "2";
  const intro = (
    <GlassCard padding="md" className="fd-ver__intro">
      <SectionHeader
        size="sm"
        index={v2 ? "01" : undefined}
        eyebrow="Producción"
        title="Estado de la plataforma"
        description="Un servicio degradado y un despliegue en canario."
      />
    </GlassCard>
  );
  return (
    <section
      data-pt-theme={theme}
      data-pt-palette={v2 ? undefined : "punto"}
      data-pt-version={v2 ? "2" : undefined}
      className="fd-ver"
    >
      <Stack gap={1} className="fd-ver__label">
        <span className="pt-folio">{v2 ? "Dot 2" : "Dot 1"}</span>
        <span className="fd-ver__desc">
          {v2
            ? "Siena · patrón compuesto · papel y filete · un sello"
            : "Punto · cintas en movimiento · vidrio · degradado aurora"}
        </span>
      </Stack>

      {v2 ? (
        <div className="fd-ver__hero fd-ver__hero--paper">
          <DotPattern
            motif="rings"
            anchor="top-right"
            cols={60}
            rows={34}
            highlight={4}
            intensity={0.36}
          />
          {intro}
        </div>
      ) : (
        <DotField
          palette="aurora"
          motion="still"
          pixel={2}
          seed={11}
          surface={theme === "light" ? "palette" : "theme"}
          className="fd-ver__hero"
        >
          {intro}
        </DotField>
      )}

      <Stack direction="row" gap={3} wrap>
        <Button variant="aurora">Nuevo despliegue</Button>
        <Button>Revertir</Button>
        <Button variant="ghost">Cancelar</Button>
        <Segmented label="Ventana" options={RANGES} value={range} onChange={setRange} />
      </Stack>

      <div className="fd-ver__grid">
        <GlassCard tone="solid">
          <Stat
            label="Latencia p95"
            value="182 ms"
            delta="+12 ms"
            trend="negative"
            chart={<DotBars values={[3, 4, 4, 5, 6, 6, 7, 8]} rows={5} label="p95 por hora" />}
          />
        </GlassCard>
        <GlassCard
          tone="bloom"
          backdrop={
            v2 ? (
              <DotPattern
                motif="orb"
                anchor="bottom-right"
                origin="bottom-right"
                cols={22}
                rows={22}
                highlight={2}
                intensity={0.5}
                style={{ "--pt-pattern-accent": "var(--pt-spectrum-6)" } as CSSProperties}
              />
            ) : undefined
          }
        >
          <Stat label="Incidentes abiertos" value="1" note="notificaciones · hace 6 min" />
        </GlassCard>
      </div>

      <Stack direction="row" gap={3} align="end" wrap>
        <TextField label="Imagen" placeholder="checkout:2.32.0" />
        <Badge tone="accent" dot>
          canario
        </Badge>
        <Badge tone="positive" dot>
          SLO ok
        </Badge>
      </Stack>
    </section>
  );
}

/** Dot 1 next to Dot 2: same components, same content, only the tokens differ. */
export const BeforeAfter: StoryObj = {
  name: "Antes y después",
  render: (_, { globals }) => {
    const theme: ThemeName =
      globals.theme === "dark" || globals.theme === "oled" ? globals.theme : "light";
    return (
      <div className="fd-ver__pair">
        <Sample version="1" theme={theme} />
        <Sample version="2" theme={theme} />
      </div>
    );
  },
};
