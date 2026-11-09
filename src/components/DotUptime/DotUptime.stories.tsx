import type { Meta, StoryObj } from "@storybook/react-vite";
import type { StatusTone } from "../Status/Status";
import { DotUptime } from "./DotUptime";

const days = (n: number, bad: Record<number, StatusTone>): StatusTone[] =>
  Array.from({ length: n }, (_, i) => bad[i] ?? "ok");

const meta = {
  title: "Dots/DotUptime",
  component: DotUptime,
  parameters: { layout: "padded" },
  args: {
    periods: days(30, { 11: "warn", 29: "error" }),
    label: "Disponibilidad diaria",
    rows: 1,
    size: 8,
  },
  argTypes: {
    rows: { control: { type: "range", min: 1, max: 7, step: 1 } },
    size: { control: { type: "range", min: 4, max: 16, step: 2 } },
  },
} satisfies Meta<typeof DotUptime>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Ninety days folded into seven rows, like a calendar. */
export const Quarter: Story = {
  args: {
    periods: days(91, { 17: "warn", 18: "warn", 40: "error", 77: "warn", 90: "running" }),
    rows: 7,
    size: 10,
  },
};
