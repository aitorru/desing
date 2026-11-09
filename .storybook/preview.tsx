import type { Decorator, Preview } from "@storybook/react-vite";
import { ptAttributes, ThemedDocsContainer } from "./docs";
import "../src/index";
import { PALETTES } from "../src/tokens/palettes";
import "./preview.css";

const withTheme: Decorator = (Story, context) => {
  // A story can pin its version (`parameters.ptVersion`): the v2 pages, the v1/v2 comparison.
  const { theme, palette, version } = ptAttributes(context.globals, context.parameters.ptVersion);
  const fullscreen = context.parameters.layout === "fullscreen";
  return (
    <div
      data-pt-theme={theme}
      data-pt-palette={palette}
      data-pt-version={version}
      className={fullscreen ? "sb-pt-full" : "sb-pt-pad pt-dot-paper"}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Punto theme",
      toolbar: {
        title: "Tema",
        icon: "contrast",
        items: [
          { value: "light", title: "Mist (claro)", icon: "sun" },
          { value: "dark", title: "Ink (oscuro)", icon: "moon" },
          { value: "oled", title: "OLED (negro puro)", icon: "circle" },
        ],
        dynamicTitle: true,
      },
    },
    palette: {
      description: "Punto colour palette",
      toolbar: {
        title: "Paleta",
        icon: "paintbrush",
        items: PALETTES.map((p) => ({ value: p.name, title: p.label })),
        dynamicTitle: true,
      },
    },
    version: {
      description: "Punto version",
      toolbar: {
        title: "Versión",
        icon: "bookmarkhollow",
        items: [
          { value: "1", title: "Punto 1 (original)" },
          { value: "2", title: "Punto 2 (formal)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light", palette: "siena", version: "2" },
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    controls: { expanded: true, matchers: { color: /(background|color)$/i } },
    docs: { container: ThemedDocsContainer },
    options: {
      storySort: {
        order: [
          "Punto",
          ["Introducción", "*"],
          "Foundations",
          "Dots",
          "Components",
          "DevOps",
          "Pages",
        ],
      },
    },
    a11y: { test: "todo" },
  },
};

export default preview;
