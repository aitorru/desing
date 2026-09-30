import type { Meta, StoryObj } from "@storybook/react-vite";
import { DotField } from "../DotField/DotField";
import { Sparkle } from "../Sparkle/Sparkle";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "padded" },
  args: { children: "Simular escenario", variant: "primary", size: "md", loading: false },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "aurora", "glass", "ghost"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 24 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button {...args} size={size} variant="primary">
            Primary
          </Button>
          <Button {...args} size={size} variant="aurora" icon={<Sparkle size={14} />}>
            Aurora
          </Button>
          <Button {...args} size={size} variant="ghost">
            Ghost
          </Button>
          <Button {...args} size={size} variant="primary" loading>
            Simulando
          </Button>
          <Button {...args} size={size} variant="ghost" disabled>
            Disabled
          </Button>
        </div>
      ))}
    </div>
  ),
};

/** Glass buttons belong on imagery: over a DotField or a gradient card. */
export const OnDots: Story = {
  parameters: { layout: "fullscreen" },
  render: (args) => (
    <DotField palette="aurora" seed={5} style={{ height: 320 }}>
      <div
        style={{
          height: "100%",
          display: "flex",
          gap: 12,
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <Button {...args} variant="glass">
          Comparar
        </Button>
        <Button {...args} variant="primary">
          Empezar
        </Button>
      </div>
    </DotField>
  ),
};
