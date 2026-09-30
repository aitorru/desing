import type { Meta, StoryObj } from "@storybook/react-vite";
import { DotField, GlassCard, Petals } from "../../index";
import "./pages.css";

interface PosterArgs {
  brand: string;
  title: string;
  subtitle: string;
  pixel: number;
  seed: number;
}

const meta: Meta<PosterArgs> = {
  title: "Pages/Poster",
  parameters: { layout: "fullscreen" },
  args: {
    brand: "Otherwise",
    title: "Test the decision before you make it",
    subtitle: "Simulate outcomes, compare scenarios, and move with more confidence",
    pixel: 3,
    seed: 11,
  },
  argTypes: {
    pixel: { control: { type: "range", min: 1, max: 6, step: 1 } },
    seed: { control: { type: "number", step: 1 } },
  },
};
export default meta;

/** The reference poster, rebuilt only with Punto pieces. */
export const Original: StoryObj<PosterArgs> = {
  render: ({ brand, title, subtitle, pixel, seed }) => (
    <DotField palette="aurora" pixel={pixel} gap={7} seed={seed} className="pg-poster">
      <div className="pg-poster__stage">
        <GlassCard
          tone="bloom"
          padding="none"
          backdrop={<Petals tone="bloom" animated />}
          className="pg-poster__card"
        >
          <div className="pg-poster__inner">
            <span className="pg-poster__brand">{brand}</span>
            <div className="pg-poster__copy">
              <h1 className="pt-display pg-poster__title">{title}</h1>
              <p className="pg-poster__subtitle">{subtitle}</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </DotField>
  ),
};

/** Same layout, sober: graphite dots and a clear glass card. */
export const Sober: StoryObj<PosterArgs> = {
  args: { pixel: 1 },
  render: ({ brand, title, subtitle, pixel, seed }) => (
    <DotField
      palette="graphite"
      motion="breathe"
      pixel={pixel}
      gap={9}
      dotSize={0.45}
      seed={seed}
      className="pg-poster"
    >
      <div className="pg-poster__stage">
        <GlassCard
          tone="clear"
          padding="none"
          backdrop={<Petals tone="mist" />}
          className="pg-poster__card"
        >
          <div className="pg-poster__inner">
            <span className="pg-poster__brand">{brand}</span>
            <div className="pg-poster__copy">
              <h1 className="pt-display pg-poster__title">{title}</h1>
              <p className="pg-poster__subtitle">{subtitle}</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </DotField>
  ),
};
