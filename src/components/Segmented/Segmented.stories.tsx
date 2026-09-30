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
  { value: "a", label: "Escenario A" },
  { value: "b", label: "Escenario B" },
  { value: "c", label: "Escenario C" },
] as const;

function Demo({ size }: { size?: "sm" | "md" }) {
  const [v, setV] = useState<"a" | "b" | "c">("b");
  return <Segmented options={OPTIONS} value={v} onChange={setV} label="Escenario" size={size} />;
}

export const Default: StoryObj = {
  render: () => (
    <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
      <Demo />
      <Demo size="sm" />
    </div>
  ),
};
