import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { resolveTheme, type ThemePreference, useTheme } from "../../theme/theme";
import { GlassCard } from "../GlassCard/GlassCard";
import { Stack } from "../Stack/Stack";
import { Stat } from "../Stat/Stat";
import { ThemeSwitch } from "./ThemeSwitch";

const meta = {
  title: "Components/ThemeSwitch",
  component: ThemeSwitch,
  parameters: { layout: "padded" },
  args: { value: "system", variant: "labels", size: "md", onChange: () => {} },
  argTypes: {
    variant: { control: "inline-radio", options: ["labels", "icons"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
} satisfies Meta<typeof ThemeSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Controlled: here the choice re-themes only the panel below. */
export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState<ThemePreference>("oled");
    return (
      <Stack gap={5} align="start">
        <ThemeSwitch {...args} value={value} onChange={setValue} />
        <div
          data-pt-theme={resolveTheme(value, "oled")}
          style={{ padding: 32, borderRadius: 16, border: "1px solid var(--pt-border-strong)" }}
        >
          <GlassCard style={{ width: 280 }}>
            <Stat label="Disponibilidad" value="99,98 %" note="Últimos 30 días" />
          </GlassCard>
        </div>
      </Stack>
    );
  },
};

/** For toolbars: glyphs only, and a shorter list when the app has no OLED theme. */
export const Compact: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [a, setA] = useState<ThemePreference>("dark");
    const [b, setB] = useState<ThemePreference>("light");
    return (
      <Stack direction="row" gap={5} wrap>
        <ThemeSwitch value={a} onChange={setA} variant="icons" size="sm" />
        <ThemeSwitch value={b} onChange={setB} options={["light", "dark"]} size="sm" />
      </Stack>
    );
  },
};

/**
 * The real thing: `useTheme()` stores the choice in `localStorage` and applies it to a
 * target element (here this panel; by default `<html>`). Pick one and reload the page.
 */
export const Remembered: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [panel, setPanel] = useState<HTMLDivElement | null>(null);
    const { preference, theme, setPreference } = useTheme({
      storageKey: "pt-theme-story",
      night: "oled",
      // Until the panel mounts, apply nothing rather than theming <html>.
      target: panel,
    });
    return (
      <Stack gap={5} align="start">
        <ThemeSwitch value={preference} onChange={setPreference} />
        <div
          ref={setPanel}
          data-testid="panel"
          style={{ padding: 32, borderRadius: 16, border: "1px solid var(--pt-border-strong)" }}
        >
          <GlassCard style={{ width: 280 }}>
            <Stat label="Tema aplicado" value={theme} note={`Preferencia: ${preference}`} />
          </GlassCard>
        </div>
      </Stack>
    );
  },
};
