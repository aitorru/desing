import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import "./Foundations.css";

const meta: Meta = {
  title: "Foundations/Color",
  parameters: { layout: "padded" },
};
export default meta;

function Swatch({ name, token, note }: { name: string; token: string; note?: string }) {
  return (
    <div className="fd-swatch">
      <div className="fd-swatch__chip" style={{ background: `var(${token})` }} />
      <strong>{name}</strong>
      <code>{token}</code>
      {note && <span>{note}</span>}
    </div>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ display: "grid", gap: 16 }}>
      <span className="pt-eyebrow">{title}</span>
      <div className="fd-grid">{children}</div>
    </section>
  );
}

export const Palette: StoryObj = {
  render: () => (
    <div className="fd-section">
      <h1 className="pt-display" style={{ fontSize: "var(--pt-display-md)" }}>
        Color
      </h1>
      <p className="pt-body" style={{ maxWidth: 560 }}>
        Dos neutros (mist e ink) para la interfaz y un espectro de seis tonos que solo aparece
        junto, en gradiente, sobre superficies grandes. Los acentos con nombre (violeta, magenta…)
        son la paleta Punto; los componentes leen el espectro, así que cambiar de paleta (selector
        «Paleta») no toca ningún componente.
      </p>
      <Group title="Mist · superficies claras">
        {[50, 100, 200, 300, 400].map((s) => (
          <Swatch key={s} name={`Mist ${s}`} token={`--pt-mist-${s}`} />
        ))}
      </Group>
      <Group title="Ink · texto y superficies oscuras">
        {[500, 600, 700, 800, 900].map((s) => (
          <Swatch key={s} name={`Ink ${s}`} token={`--pt-ink-${s}`} />
        ))}
      </Group>
      <Group title="Acentos">
        {["indigo", "violet", "orchid", "magenta", "rose", "coral", "peach", "blush"].map((c) => (
          <Swatch key={c} name={c[0]?.toUpperCase() + c.slice(1)} token={`--pt-${c}`} />
        ))}
      </Group>
      <Group title="Espectro · lo que leen los componentes (cambia con «Paleta»)">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Swatch key={n} name={`Espectro ${n}`} token={`--pt-spectrum-${n}`} />
        ))}
        <Swatch name="Acento" token="--pt-spectrum-accent" note="Legible sobre Mist" />
        <Swatch name="Suave" token="--pt-spectrum-soft" note="Acento sobre Ink" />
      </Group>
      <Group title="Gradientes">
        <Swatch name="Aurora" token="--pt-gradient-aurora" note="Héroes, un botón por pantalla" />
        <Swatch name="Ember" token="--pt-gradient-ember" note="Cálido" />
        <Swatch name="Dusk" token="--pt-gradient-dusk" note="Frío" />
        <Swatch name="Bloom" token="--pt-gradient-bloom" note="La tarjeta destacada" />
      </Group>
    </div>
  ),
};

export const SemanticRoles: StoryObj = {
  name: "Roles semánticos",
  render: () => (
    <div className="fd-section">
      <p className="pt-body" style={{ maxWidth: 560 }}>
        Los componentes solo leen roles. Cambia el tema en la barra superior: los valores se
        reasignan y nada más cambia.
      </p>
      <Group title="Roles">
        <Swatch name="Fondo" token="--pt-bg" />
        <Swatch name="Elevado" token="--pt-bg-raised" />
        <Swatch name="Hundido" token="--pt-bg-sunken" />
        <Swatch name="Texto" token="--pt-fg" />
        <Swatch name="Texto secundario" token="--pt-fg-muted" />
        <Swatch name="Texto sutil" token="--pt-fg-subtle" />
        <Swatch name="Acento" token="--pt-accent" />
        <Swatch name="Foco" token="--pt-focus" />
        <Swatch name="Positivo" token="--pt-positive" />
        <Swatch name="Negativo" token="--pt-negative" />
      </Group>
    </div>
  ),
};
