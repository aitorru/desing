import { DocsContainer, type DocsContainerProps } from "@storybook/addon-docs/blocks";
import { type PropsWithChildren, useLayoutEffect, useState } from "react";
import { GLOBALS_UPDATED } from "storybook/internal/core-events";
import { create, type ThemeVars } from "storybook/theming";
import { puntoTheme } from "./theme";

type Globals = Record<string, unknown>;

/** The toolbar globals as the three attributes the tokens read. */
export function ptAttributes(globals: Globals, version?: unknown) {
  const theme = globals.theme === "dark" || globals.theme === "oled" ? globals.theme : "light";
  const palette = typeof globals.palette === "string" ? globals.palette : "siena";
  // String(): a global read from the URL (`globals=version:2`) arrives as a number.
  const v = String(version ?? globals.version) === "2" ? "2" : undefined;
  return { theme, palette, version: v };
}

function applyToRoot(globals: Globals) {
  const { theme, palette, version } = ptAttributes(globals);
  const root = document.documentElement;
  root.dataset.ptTheme = theme;
  root.dataset.ptPalette = palette;
  if (version) root.dataset.ptVersion = version;
  else delete root.dataset.ptVersion;
}

/**
 * A Storybook theme built from the tokens now in force on <html>, so the docs chrome
 * (text, tables, code) follows the toolbar. Only plain colours are passed on: Storybook
 * runs some of them through polished, which can't read `color-mix()`.
 */
function themeFromTokens(): ThemeVars {
  const css = getComputedStyle(document.documentElement);
  const color = (name: string) => {
    const value = css.getPropertyValue(name).trim();
    return /^(#|rgb)/.test(value) ? value : undefined;
  };
  const dark = document.documentElement.dataset.ptTheme !== "light";
  // Radii follow the tokens too (Mono squares them off).
  const radius = (name: string) => {
    const px = Number.parseFloat(css.getPropertyValue(name));
    return Number.isFinite(px) ? px : undefined;
  };
  const vars: Partial<ThemeVars> = {
    colorPrimary: color("--pt-accent"),
    colorSecondary: color("--pt-accent"),
    appBg: color("--pt-bg"),
    appContentBg: color("--pt-bg"),
    appPreviewBg: color("--pt-bg-raised"),
    textColor: color("--pt-fg"),
    textMutedColor: color("--pt-fg-muted"),
    barBg: color("--pt-bg-raised"),
    appBorderRadius: radius("--pt-radius-lg"),
    inputBorderRadius: radius("--pt-radius-md"),
  };
  const defined = Object.fromEntries(Object.entries(vars).filter(([, v]) => v !== undefined));
  return create({
    ...puntoTheme,
    base: dark ? "dark" : "light",
    ...(dark ? { appBorderColor: "rgba(255, 255, 255, 0.12)" } : {}),
    ...defined,
  });
}

function initialGlobals(context: DocsContainerProps["context"]): Globals {
  // `store` is protected on DocsContext but is the only way to read globals on first paint.
  const store = (context as unknown as { store?: { userGlobals?: { get(): Globals } } }).store;
  return store?.userGlobals?.get() ?? {};
}

/** Docs pages have no decorators, so the theme / palette / version globals land on <html>. */
export function ThemedDocsContainer({ context, children }: PropsWithChildren<DocsContainerProps>) {
  const [globals, setGlobals] = useState<Globals>(() => initialGlobals(context));
  const [theme, setTheme] = useState<ThemeVars>(puntoTheme);

  useLayoutEffect(() => {
    const onUpdate = ({ globals: next }: { globals: Globals }) => setGlobals(next);
    context.channel.on(GLOBALS_UPDATED, onUpdate);
    return () => context.channel.off(GLOBALS_UPDATED, onUpdate);
  }, [context.channel]);

  useLayoutEffect(() => {
    applyToRoot(globals);
    setTheme(themeFromTokens());
  }, [globals]);

  return (
    <DocsContainer context={context} theme={theme}>
      {children}
    </DocsContainer>
  );
}
