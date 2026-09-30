import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: "@storybook/react-vite",
  core: { disableTelemetry: true },
  viteFinal: (config) => ({
    ...config,
    // Storybook's own manager/docs chunks are big; ours are small.
    build: { ...config.build, chunkSizeWarningLimit: 1600 },
  }),
};

export default config;
