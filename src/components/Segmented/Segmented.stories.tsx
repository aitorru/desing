import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Segmented } from "./Segmented";

const meta = {
  title: "Components/Segmented",
  component: Segmented,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Segmented>;

export default meta;

const OPTIONS = [
  { value: "a", label: "1 h" },
  { value: "b", label: "24 h" },
  { value: "c", label: "7 d" },
] as const;

function Demo({ size }: { size?: "sm" | "md" }) {
  const [v, setV] = useState<"a" | "b" | "c">("b");
  return <Segmented options={OPTIONS} value={v} onChange={setV} label="Ventana" size={size} />;
}

export const Default: StoryObj = {
  render: () => (
    <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
      <Demo />
      <Demo size="sm" />
    </div>
  ),
};
