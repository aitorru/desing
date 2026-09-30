import type { Decorator, Preview } from "@storybook/react-vite";
import { puntoTheme } from "./theme";
import "../src/index";
import "./preview.css";

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme === "dark" ? "dark" : "light";
  const fullscreen = context.parameters.layout === "fullscreen";
  return (
    <div data-pt-theme={theme} className={fullscreen ? "sb-pt-full" : "sb-pt-pad pt-dot-paper"}>
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
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    controls: { expanded: true, matchers: { color: /(background|color)$/i } },
    docs: { theme: puntoTheme },
    options: {
      storySort: {
        order: ["Punto", ["Introducción", "*"], "Foundations", "Dots", "Components", "Pages"],
      },
    },
    a11y: { test: "todo" },
  },
};

export default preview;
