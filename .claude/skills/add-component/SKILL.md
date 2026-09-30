---
name: add-component
description: Añade un componente nuevo al lenguaje Punto (tsx + css + stories + export). Úsala para "crea un componente", "añade un Tooltip/Tabs/…", o al ampliar el sistema.
---

# Nuevo componente Punto

1. `src/components/<Nombre>/<Nombre>.tsx` — función con props tipadas y JSDoc corto en cada
   prop que no sea obvia. Clases `pt-<nombre>`, `pt-<nombre>--<variante>`,
   `pt-<nombre>__<parte>`; únelas con `cx()` (`src/components/cx.ts`).
2. `<Nombre>.css` importado desde el tsx. Lee **solo roles** (`--pt-bg`, `--pt-fg`,
   `--pt-accent`, `--pt-border`…) y recetas (`--pt-glass-*`, `--pt-gradient-*`), nunca hex
   ni hues crudos: así funciona en Mist, Ink y dentro de un `GlassCard` tintado.
3. Movimiento con `--pt-duration-*` / `--pt-ease*` y un bloque
   `@media (prefers-reduced-motion: reduce)`.
4. Si el componente comunica carga, progreso o datos, usa la familia de puntos
   (`DotLoader`, `DotProgress`, `DotBars`) en vez de spinners o barras lisas.
5. `<Nombre>.stories.tsx` con `title: "Components/<Nombre>"` (o `Dots/…`), una story
   `Playground` con controles y otra que enseñe variantes/estados.
6. Exporta en `src/index.ts` y añádelo a la lista de «Estructura» en
   `src/stories/Introduction.mdx` y al README.
7. Verifica con la skill `check` y míralo en claro y oscuro (skill `run-storybook`).
