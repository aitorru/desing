import type { Meta, StoryObj } from "@storybook/react-vite";
import { DotMark } from "./DotMark";

const meta = {
  title: "Components/DotMark",
  component: DotMark,
  parameters: { layout: "padded" },
  args: { size: 48, seal: 2 },
  argTypes: {
    size: { control: { type: "range", min: 12, max: 160, step: 4 } },
    seal: { control: { type: "number", min: 0, max: 8, step: 1 } },
  },
} satisfies Meta<typeof DotMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** As a wordmark, at the sizes it is used: masthead, plate and favicon. */
export const Wordmark: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gap: 32, justifyItems: "start" }}>
      {[48, 24, 16].map((size) => (
        <span
          key={size}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: size * 0.5,
            fontSize: size * 0.95,
            fontWeight: 560,
            letterSpacing: "-0.02em",
          }}
        >
          <DotMark size={size} /> Otherwise
        </span>
      ))}
    </div>
  ),
};
