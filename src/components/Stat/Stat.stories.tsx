import type { Meta, StoryObj } from "@storybook/react-vite";
import { DotBars } from "../DotBars/DotBars";
import { DotProgress } from "../DotProgress/DotProgress";
import { GlassCard } from "../GlassCard/GlassCard";
import { Stat } from "./Stat";

const meta = {
  title: "Components/Stat",
  component: Stat,
  parameters: { layout: "padded" },
  args: {
    label: "Ingresos p50",
    value: "1,8 M€",
    delta: "+12,4 %",
    trend: "positive",
    note: "A 12 meses · riesgo medio",
    size: "md",
  },
  argTypes: {
    trend: { control: "inline-radio", options: ["positive", "negative", "neutral"] },
    size: { control: "inline-radio", options: ["md", "lg"] },
  },
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <GlassCard tone="solid" style={{ maxWidth: 320 }}>
      <Stat {...args} />
    </GlassCard>
  ),
};

const SERIES = [5, 6, 5, 7, 7, 8, 8, 9, 10, 11];

/** A KPI row: bare, with dot bars, with progress, and on a tinted card. */
export const Row: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 20,
        maxWidth: 1080,
      }}
    >
      <GlassCard tone="solid">
        <Stat
          label="Clientes activos"
          value="12 480"
          delta="+3,2 %"
          trend="positive"
          note="Últimos 30 días"
        />
      </GlassCard>
      <GlassCard tone="solid">
        <Stat
          label="Abandono"
          value="2,1 %"
          delta="−0,4 pp"
          trend="positive"
          note="Bajar es bueno"
          chart={<DotBars values={[7, 6, 6, 5, 5, 4, 4, 3]} rows={6} label="Abandono mensual" />}
        />
      </GlassCard>
      <GlassCard tone="solid">
        <Stat
          label="Objetivo Q3"
          value="64 %"
          delta="−6 %"
          trend="negative"
          note="Por debajo del plan"
          chart={<DotProgress value={64} count={20} label="Objetivo Q3" />}
        />
      </GlassCard>
      <GlassCard tone="bloom">
        <Stat
          label="Subir precio 8 %"
          value="1,8 M€"
          delta="+12,4 %"
          trend="positive"
          note="Escenario elegido"
          chart={
            <DotBars values={SERIES} rows={6} highlight={SERIES.length - 1} label="Evolución" />
          }
        />
      </GlassCard>
    </div>
  ),
};
