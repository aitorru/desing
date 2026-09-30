import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  DotBars,
  DotField,
  DotLoader,
  DotProgress,
  GlassCard,
  Petals,
  Segmented,
  Sparkle,
  TextField,
} from "../../index";
import "./pages.css";

const meta: Meta = {
  title: "Pages/Product",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Key = "a" | "b" | "c";

interface Scenario {
  key: Key;
  name: string;
  value: string;
  delta: string;
  positive: boolean;
  risk: string;
  series: number[];
}

const SCENARIOS: Scenario[] = [
  {
    key: "a",
    name: "Mantener",
    value: "1,6 M€",
    delta: "+2,1 %",
    positive: true,
    risk: "Bajo",
    series: [5, 5, 6, 5, 6, 6, 6, 7, 6, 7],
  },
  {
    key: "b",
    name: "Subir precio 8 %",
    value: "1,8 M€",
    delta: "+12,4 %",
    positive: true,
    risk: "Medio",
    series: [5, 6, 5, 7, 7, 8, 8, 9, 10, 11],
  },
  {
    key: "c",
    name: "Nuevo mercado",
    value: "1,4 M€",
    delta: "−6,8 %",
    positive: false,
    risk: "Alto",
    series: [5, 4, 3, 3, 4, 5, 6, 8, 9, 12],
  },
];

type Phase = "idle" | "running" | "done";

function ProductScreen() {
  const [question, setQuestion] = useState("¿Qué pasa si subimos el precio un 8 % en enero?");
  const [phase, setPhase] = useState<Phase>("done");
  const [progress, setProgress] = useState(100);
  const [chosen, setChosen] = useState<Key>("b");
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => () => clearInterval(timer.current), []);

  const simulate = () => {
    clearInterval(timer.current);
    setPhase("running");
    setProgress(0);
    timer.current = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + 3 + Math.random() * 6);
        if (next >= 100) {
          clearInterval(timer.current);
          setPhase("done");
        }
        return next;
      });
    }, 90);
  };

  return (
    <div className="pg-app pt-dot-paper">
      <header className="pg-nav">
        <div className="pg-nav__brand">
          <span className="pg-nav__mark">
            <Petals tone="bloom" />
          </span>
          Otherwise
        </div>
        <nav className="pg-nav__links" aria-label="Principal">
          <a href="#decisiones" aria-current="page">
            Decisiones
          </a>
          <a href="#modelos">Modelos</a>
          <a href="#equipo">Equipo</a>
        </nav>
        <Button variant="ghost" size="sm">
          Invitar
        </Button>
      </header>

      <DotField
        palette="aurora"
        motion={phase === "running" ? "flow" : "breathe"}
        speed={phase === "running" ? 2.4 : 1}
        seed={21}
        pixel={2}
        surface="theme"
        className="pg-hero"
      >
        <div className="pg-hero__inner">
          <GlassCard tone="clear" padding="lg" className="pg-ask">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                simulate();
              }}
              className="pg-ask__form"
            >
              <span className="pt-eyebrow">Nueva simulación</span>
              <h1 className="pt-display pg-ask__title">Test the decision before you make it</h1>
              <TextField
                label="Decisión"
                hideLabel
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                leading={<Sparkle size={14} />}
              />
              <div className="pg-ask__actions">
                <Button
                  type="submit"
                  variant="aurora"
                  size="lg"
                  loading={phase === "running"}
                  icon={<Sparkle size={14} />}
                >
                  {phase === "running" ? "Simulando" : "Simular"}
                </Button>
                <span className="pg-ask__meta">10 000 trayectorias · 12 meses</span>
              </div>
              {phase === "running" && (
                <DotProgress value={progress} count={32} label="Progreso de la simulación" />
              )}
            </form>
          </GlassCard>
        </div>
      </DotField>

      <main className="pg-results" id="decisiones">
        <div className="pg-results__head">
          <div>
            <span className="pt-eyebrow">Resultados</span>
            <h2 className="pt-display pg-results__title">Compare scenarios</h2>
          </div>
          <Segmented
            options={SCENARIOS.map((s) => ({ value: s.key, label: s.name }))}
            value={chosen}
            onChange={setChosen}
            label="Escenario elegido"
            size="sm"
          />
        </div>

        <div className="pg-results__grid" aria-busy={phase === "running"}>
          {SCENARIOS.map((s) => (
            <GlassCard
              key={s.key}
              tone={s.key === chosen ? "bloom" : "solid"}
              interactive
              onClick={() => setChosen(s.key)}
              className="pg-scenario"
            >
              {phase === "running" ? (
                <div className="pg-scenario__loading">
                  <DotLoader variant="wave" size="lg" label={`Calculando ${s.name}`} />
                </div>
              ) : (
                <div className="pg-scenario__body">
                  <div className="pg-scenario__top">
                    <span className="pt-eyebrow">{s.name}</span>
                    <Badge
                      tone={s.key === chosen ? "glass" : s.positive ? "positive" : "negative"}
                      dot
                    >
                      {s.delta}
                    </Badge>
                  </div>
                  <p className="pt-display pg-scenario__value">{s.value}</p>
                  <p className="pg-scenario__note">Ingresos p50 a 12 meses · riesgo {s.risk}</p>
                  <DotBars
                    values={s.series}
                    rows={7}
                    highlight={s.key === chosen ? s.series.length - 1 : undefined}
                    label={`Evolución mensual de ${s.name}`}
                  />
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </main>
    </div>
  );
}

/** A full product screen. Press «Simular» to see every dot component work together. */
export const Scenarios: StoryObj = { render: () => <ProductScreen /> };
