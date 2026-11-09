import type { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    {
      // MDX 3 doesn't parse GFM (tables, strikethrough…) on its own.
      name: "@storybook/addon-docs",
      options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } },
    },
    "@storybook/addon-a11y",
  ],
  framework: "@storybook/react-vite",
  core: { disableTelemetry: true },
  viteFinal: (config) => ({
    ...config,
    // Storybook's own manager/docs chunks are big; ours are small.
    build: { ...config.build, chunkSizeWarningLimit: 1600 },
  }),
};

export default config;
