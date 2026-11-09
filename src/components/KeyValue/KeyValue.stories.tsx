import type { Meta, StoryObj } from "@storybook/react-vite";
import { KeyValue } from "./KeyValue";

const ITEMS = [
  { label: "Commit", value: "9f3c2e1", mono: true },
  { label: "Rama", value: "main", mono: true },
  { label: "Autora", value: "Lucía Ortega" },
  { label: "Imagen", value: "worker-colas:1.10.0", mono: true },
  { label: "Región", value: "eu-west-1", mono: true },
];

const meta = {
  title: "DevOps/KeyValue",
  component: KeyValue,
  parameters: { layout: "padded" },
  args: { items: ITEMS, layout: "leaders", columns: 3 },
  argTypes: { layout: { control: "inline-radio", options: ["leaders", "stacked"] } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 520 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof KeyValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Leaders: Story = {};

export const Stacked: Story = { args: { layout: "stacked" } };
