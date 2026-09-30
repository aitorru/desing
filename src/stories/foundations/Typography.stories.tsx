import type { Meta, StoryObj } from "@storybook/react-vite";
import "./Foundations.css";

const meta: Meta = {
  title: "Foundations/Typography",
  parameters: { layout: "padded" },
};
export default meta;

const DISPLAY = [
  ["Display XL", "--pt-display-xl", "Test the decision"],
  ["Display L", "--pt-display-lg", "before you make it"],
  ["Display M", "--pt-display-md", "Compare scenarios"],
  ["Display S", "--pt-display-sm", "Move with more confidence"],
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
              Simulate outcomes, compare scenarios, and move with more confidence.
            </p>
          </div>
        ))}
        <div className="fd-type-row">
          <code>Eyebrow</code>
          <span className="pt-eyebrow">Escenario B · 12 variables</span>
        </div>
      </div>
    </div>
  ),
};

export const Pairing: StoryObj = {
  name: "Combinación",
  render: () => (
    <div style={{ maxWidth: 560, display: "grid", gap: 16 }}>
      <span className="pt-eyebrow">Simulación</span>
      <h2 className="pt-display" style={{ fontSize: "var(--pt-display-lg)" }}>
        Test the decision <em>before</em> you make it
      </h2>
      <p className="pt-body" style={{ fontSize: "var(--pt-text-lg)" }}>
        Simulate outcomes, compare scenarios, and move with more confidence.
      </p>
    </div>
  ),
};
