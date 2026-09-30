import type { Meta, StoryObj } from "@storybook/react-vite";
import "./Foundations.css";

const meta: Meta = {
  title: "Foundations/Shape & Motion",
  parameters: { layout: "padded" },
};
export default meta;

export const Radius: StoryObj = {
  render: () => (
    <div className="fd-section">
      <p className="pt-body">
        Radios generosos: el póster es un rectángulo muy redondeado. Los botones son siempre
        píldoras.
      </p>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {["sm", "md", "lg", "xl", "pill"].map((r) => (
          <div key={r} className="fd-swatch">
            <div className="fd-radius" style={{ borderRadius: `var(--pt-radius-${r})` }} />
            <code>--pt-radius-{r}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};

const MOTION = [
  ["fast · 140ms", "--pt-duration-fast", "--pt-ease"],
  ["base · 240ms", "--pt-duration-base", "--pt-ease"],
  ["slow · 600ms", "--pt-duration-slow", "--pt-ease"],
  ["breath · 2.4s", "--pt-duration-breath", "--pt-ease-in-out"],
] as const;

export const Motion: StoryObj = {
  render: () => (
    <div className="fd-section">
      <p className="pt-body" style={{ maxWidth: 560 }}>
        Interacción rápida y suave (<code>--pt-ease</code>); ambiente lento y simétrico (
        <code>--pt-ease-in-out</code>). Con <code>prefers-reduced-motion</code> las duraciones de
        interacción pasan a 0 y los campos de puntos se congelan.
      </p>
      {MOTION.map(([label, d, e]) => (
        <div className="fd-motion" key={d}>
          <code>{label}</code>
          <div className="fd-motion__track">
            <span
              className="fd-motion__dot"
              style={{
                animationDuration: `calc(var(${d}) * 4)`,
                animationTimingFunction: `var(${e})`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  ),
};
