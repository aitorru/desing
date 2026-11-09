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
    label: "Disponibilidad · 30 d",
    value: "99,95 %",
    delta: "+0,02 pp",
    trend: "positive",
    note: "SLO 99,9 % · cumplido",
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
          label="Peticiones / s"
          value="12 480"
          delta="+3,2 %"
          trend="positive"
          note="Pico de las 12:00"
        />
      </GlassCard>
      <GlassCard tone="solid">
        <Stat
          label="Tasa de error"
          value="0,21 %"
          delta="−0,04 pp"
          trend="positive"
          note="Bajar es bueno"
          chart={<DotBars values={[7, 6, 6, 5, 5, 4, 4, 3]} rows={6} label="Errores por hora" />}
        />
      </GlassCard>
      <GlassCard tone="solid">
        <Stat
          label="Error budget"
          value="64 %"
          delta="−18 pp"
          trend="negative"
          note="Quedan 16 días de mes"
          chart={<DotProgress value={64} count={20} label="Error budget restante" />}
        />
      </GlassCard>
      <GlassCard tone="bloom">
        <Stat
          label="Coste de nube"
          value="18,4 k€"
          delta="−6,1 %"
          trend="positive"
          note="Octubre · tras apagar staging de noche"
          chart={
            <DotBars values={SERIES} rows={6} highlight={SERIES.length - 1} label="Coste mensual" />
          }
        />
      </GlassCard>
    </div>
  ),
};
