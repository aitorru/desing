import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeBlock } from "./CodeBlock";

const YAML = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-gateway
spec:
  replicas: 6
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 0
`;

const meta = {
  title: "DevOps/CodeBlock",
  component: CodeBlock,
  parameters: { layout: "padded" },
  args: {
    code: YAML,
    title: "deployment.yaml",
    language: "yaml",
    lineNumbers: true,
    highlight: [9, 10],
    copyable: true,
    wrap: false,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 640 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** A one-liner: no numbers, no header beyond the copy button. */
export const Command: Story = {
  args: {
    code: "kubectl rollout status deployment/api-gateway -n prod --timeout=120s",
    title: undefined,
    language: "sh",
    lineNumbers: false,
    highlight: undefined,
  },
};
