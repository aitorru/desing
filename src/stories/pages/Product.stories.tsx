import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  DotBars,
  DotField,
  DotLoader,
  type DotPaletteName,
  DotProgress,
  GlassCard,
  Petals,
  Segmented,
  Sparkle,
  TextField,
} from "../../index";
import { heroPalette } from "../theme";
import "./pages.css";

const meta: Meta = {
  title: "Pages/Product",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Key = "a" | "b" | "c";

interface Region {
  key: Key;
  name: string;
  value: string;
  delta: string;
  positive: boolean;
  budget: string;
  series: number[];
}

const REGIONS: Region[] = [
  {
    key: "a",
    name: "eu-west-1",
    value: "141 ms",
    delta: "−22 ms",
    positive: true,
    budget: "82 %",
    series: [5, 5, 6, 5, 6, 6, 6, 7, 6, 7],
  },
  {
    key: "b",
    name: "eu-central-1",
    value: "156 ms",
    delta: "−9 ms",
    positive: true,
    budget: "64 %",
    series: [5, 6, 5, 7, 7, 8, 8, 9, 10, 11],
  },
  {
    key: "c",
    name: "us-east-1",
    value: "238 ms",
    delta: "+41 ms",
    positive: false,
    budget: "21 %",
    series: [5, 4, 3, 3, 4, 5, 6, 8, 9, 12],
  },
];

type Phase = "idle" | "running" | "done";

function ProductScreen({ hero }: { hero: DotPaletteName }) {
  const [question, setQuestion] = useState("checkout:2.32.0");
  const [phase, setPhase] = useState<Phase>("done");
  const [progress, setProgress] = useState(100);
  const [chosen, setChosen] = useState<Key>("b");
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => () => clearInterval(timer.current), []);

  const deploy = () => {
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
          plataforma
        </div>
        <nav className="pg-nav__links" aria-label="Principal">
          <a href="#despliegues" aria-current="page">
            Despliegues
          </a>
          <a href="#servicios">Servicios</a>
          <a href="#guardias">Guardias</a>
        </nav>
        <Button variant="ghost" size="sm">
          Runbooks
        </Button>
      </header>

      <DotField
        palette={hero}
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
                deploy();
              }}
              className="pg-ask__form"
            >
              <span className="pt-eyebrow">Nuevo despliegue</span>
              <h1 className="pt-display pg-ask__title">Desplegar sin contener la respiración</h1>
              <TextField
                label="Imagen"
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
                  {phase === "running" ? "Desplegando" : "Desplegar"}
                </Button>
                <span className="pg-ask__meta">canario 10 → 50 → 100 · 3 regiones</span>
              </div>
              {phase === "running" && (
                <DotProgress value={progress} count={32} label="Progreso del despliegue" />
              )}
            </form>
          </GlassCard>
        </div>
      </DotField>

      <main className="pg-results" id="despliegues">
        <div className="pg-results__head">
          <div>
            <span className="pt-eyebrow">Después del despliegue</span>
            <h2 className="pt-display pg-results__title">Por región</h2>
          </div>
          <Segmented
            options={REGIONS.map((s) => ({ value: s.key, label: s.name }))}
            value={chosen}
            onChange={setChosen}
            label="Región"
            size="sm"
          />
        </div>

        <div className="pg-results__grid" aria-busy={phase === "running"}>
          {REGIONS.map((s) => (
            <GlassCard
              key={s.key}
              tone={s.key === chosen ? "bloom" : "solid"}
              interactive
              onClick={() => setChosen(s.key)}
              className="pg-scenario"
            >
              {phase === "running" ? (
                <div className="pg-scenario__loading">
                  <DotLoader variant="wave" size="lg" label={`Desplegando en ${s.name}`} />
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
                  <p className="pg-scenario__note">Latencia p95 · error budget {s.budget}</p>
                  <DotBars
                    values={s.series}
                    rows={7}
                    highlight={s.key === chosen ? s.series.length - 1 : undefined}
                    label={`p95 por hora en ${s.name}`}
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

/** A full deploy screen. Press «Desplegar» to see every dot component work together. */
export const Despliegue: StoryObj = {
  render: (_, { globals }) => <ProductScreen hero={heroPalette(globals)} />,
};
