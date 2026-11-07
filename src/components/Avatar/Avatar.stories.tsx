import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "../Stack/Stack";
import { Avatar, AvatarGroup } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: { layout: "padded" },
  args: { name: "Lucía Ortega", size: "md" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    status: { control: "select", options: [undefined, "online", "busy", "away"] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const TEAM = [
  { name: "Lucía Ortega" },
  { name: "Mateo Ibarra" },
  { name: "Noa Villanueva" },
  { name: "Iker Salaberria" },
  { name: "Carmen Ruiz" },
  { name: "Jon Etxeberria" },
  { name: "Aitana Gil" },
];

/** Each name keeps its colour (a slot of the active palette's spectrum). */
export const People: Story = {
  render: () => (
    <Stack gap={6}>
      <Stack direction="row" gap={3} wrap>
        {TEAM.map((p) => (
          <Avatar key={p.name} name={p.name} />
        ))}
      </Stack>
      <Stack direction="row" gap={4}>
        <Avatar name="Lucía Ortega" size="sm" status="online" />
        <Avatar name="Mateo Ibarra" status="busy" />
        <Avatar name="Noa Villanueva" size="lg" status="away" />
      </Stack>
      <Stack direction="row" gap={6}>
        <AvatarGroup people={TEAM} label="Participantes" />
        <AvatarGroup people={TEAM} max={3} size="sm" label="Revisores" />
      </Stack>
    </Stack>
  ),
};
