import type { Meta, StoryObj } from "@storybook/react-vite";
import "./Foundations.css";

const meta: Meta = {
  title: "Foundations/Typography",
  parameters: { layout: "padded" },
};
export default meta;

const DISPLAY = [
  ["Display XL", "--pt-display-xl", "99,95 %"],
  ["Display L", "--pt-display-lg", "Todo verde, por ahora"],
  ["Display M", "--pt-display-md", "Estado de la plataforma"],
  ["Display S", "--pt-display-sm", "Post-mortem de INC-212"],
] as const;

const TEXT = [
  ["Text L", "--pt-text-lg"],
  ["Text M", "--pt-text-md"],
  ["Text S", "--pt-text-sm"],
  ["Text XS", "--pt-text-xs"],
] as const;

export const Scale: StoryObj = {
  render: () => (
    <div className="fd-section">
      <p className="pt-body" style={{ maxWidth: 600 }}>
        <strong>Instrument Serif</strong> para titulares y cifras (interlineado 0.98, tracking −2.5
        %). <strong>Inter Tight</strong> para interfaz y texto. Nunca serif por debajo de 24 px.
      </p>
      <div>
        {DISPLAY.map(([name, token, sample]) => (
          <div className="fd-type-row" key={token}>
            <code>
              {name}
              <br />
              {token}
            </code>
            <p className="pt-display" style={{ fontSize: `var(${token})` }}>
              {sample}
            </p>
          </div>
        ))}
        {TEXT.map(([name, token]) => (
          <div className="fd-type-row" key={token}>
            <code>
              {name}
              <br />
              {token}
            </code>
            <p style={{ margin: 0, fontSize: `var(${token})` }}>
              El despliegue de checkout terminó en 9 min, sin reintentos ni sustos.
            </p>
          </div>
        ))}
        <div className="fd-type-row">
          <code>Eyebrow</code>
          <span className="pt-eyebrow">eu-west-1 · 6 servicios</span>
        </div>
      </div>
    </div>
  ),
};

export const Pairing: StoryObj = {
  name: "Combinación",
  render: () => (
    <div style={{ maxWidth: 560, display: "grid", gap: 16 }}>
      <span className="pt-eyebrow">Informe semanal</span>
      <h2 className="pt-display" style={{ fontSize: "var(--pt-display-lg)" }}>
        Una semana <em>casi</em> tranquila
      </h2>
      <p className="pt-body" style={{ fontSize: "var(--pt-text-lg)" }}>
        Dos incidentes, 61 despliegues y un error budget que aguanta. Lo de siempre, en una página.
      </p>
    </div>
  ),
};
