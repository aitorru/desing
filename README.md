# Punto — lenguaje de diseño

Propuesta de lenguaje de diseño inspirada en el póster de _Otherwise_: superficies de puntos
por las que pasan cintas de color, paneles de vidrio esmerilado encima y una serif tranquila
para los titulares. Todo se documenta y se prueba en un Storybook.

- **Tokens** en CSS (`--pt-*`): color (mist, ink y acentos), gradientes, tipografía, espacio,
  radios y movimiento, con tema claro (_Mist_) y oscuro (_Ink_).
- **Familia de puntos**: `DotField` (la textura animada, en canvas), `DotPattern` (patrones
  compuestos y quietos, en SVG), `DotLoader`, `DotProgress` y `DotBars`.
- **Punto 2** (`data-pt-version="2"`): la edición formal. Siena de serie, un solo acento
  sólido, papel con filete en vez de vidrio, radios en la rejilla y patrones anclados en
  lugar de cintas. Ver [Punto 2](#punto-2).
- **Paletas**: `punto` (la original), `marea`, `siena` y `citrico`, intercambiables con
  `data-pt-palette` en el mismo elemento que `data-pt-theme`.
- **Componentes**: `Button`, `Badge`, `GlassCard`, `TextField`, `Segmented`, `Sparkle`,
  `Petals`, `DotMark`.
- **Transversales**: `Stack`, `SectionHeader`, `Stat`, `Callout`, `Switch`, `Avatar` /
  `AvatarGroup` y `DotDivider`.
- **Páginas**: el póster original reconstruido con el sistema, una pantalla de producto
  interactiva (pulsa «Simular») y un panel de equipo (`Workspace`).

La propuesta completa (principios, paletas y cuándo usar cada una) está en la página
**Punto › Introducción** del Storybook.

## Desarrollo

Requiere [devenv](https://devenv.sh) (Nix). Todo lo demás (Node 24, pnpm, Biome) lo trae el
entorno.

```bash
devenv shell -- dev       # Storybook en modo desarrollo
devenv shell -- lint      # tsc + biome + comprobación del pin de biome
devenv shell -- build     # Storybook estático en storybook-static/
devenv shell -- preview   # sirve storybook-static/
```

| URL                        | Qué                                   |
| -------------------------- | ------------------------------------- |
| `http://pi-home:36006`     | Storybook (`dev` o `devenv up`)       |
| `http://pi-home:36007`     | Build estático (`preview`)            |

Perfiles: `devenv --profile ide shell` activa el LSP de TypeScript.

## Paletas

```html
<html data-pt-theme="dark" data-pt-palette="marea">
```

Los componentes leen roles y el espectro (`--pt-spectrum-1…6`, `--pt-spectrum-accent`,
`--pt-spectrum-soft`), nunca un tono con nombre; cada paleta reasigna neutros y espectro.
`PALETTES` y `heroDotPalette()` (exportados) dan la lista y la textura de `DotField` que
corresponde a cada una.

## Punto 2

```html
<html data-pt-theme="light" data-pt-version="2">
```

`src/tokens/v2.css` solo reajusta tokens y recetas (radios, vidrio → papel, degradado →
sello, `bloom` → lámina de tinta), así que todos los componentes lo siguen sin reglas
propias. Sin `data-pt-palette`, un ámbito v2 usa Siena. La pieza nueva es `DotPattern`:

```tsx
<GlassCard backdrop={<DotPattern motif="rings" anchor="top-right" cols={22} rows={14} highlight={2} />}>
  …
</GlassCard>
```

| Prop        | Valores                                                           |
| ----------- | ----------------------------------------------------------------- |
| `motif`     | `grid` · `fade` · `rings` · `orb` · `wave` · `diagonal`           |
| `cols`, `rows` | tamaño en puntos; sin ellos rellena el contenedor posicionado  |
| `anchor`    | esquina, borde o centro al que se fija (`origin` cambia desde dónde crece el motivo) |
| `highlight` | banda (anillo, cresta, diagonal…) que lleva el acento             |
| `tone`, `intensity`, `period`, `falloff`, `motion` | tinta, opacidad, separación, caída y respiración |

Es geometría determinista sobre la rejilla, lee los roles del tema (sirve en cualquier
paleta, en Mist y en Ink) y pinta como mucho diez `<path>` por patrón. La propuesta completa
está en **Punto › Versión 2**; las páginas, en **Pages › Punto 2**.

## DotField

```tsx
<DotField palette="aurora" motion="flow" gap={8} pixel={3} seed={11} style={{ height: 480 }}>
  <GlassCard tone="bloom">…</GlassCard>
</DotField>
```

| Prop        | Valores                                                           |
| ----------- | ----------------------------------------------------------------- |
| `palette`   | `aurora` · `ember` · `dusk` · `graphite` · `night` · `paper` · `marea` · `siena` · `citrico` (o una propia) |
| `motion`    | `flow` (se desplaza) · `breathe` (pulsa en su sitio) · `still`    |
| `gap`       | distancia entre puntos en px                                      |
| `dotSize`   | diámetro como fracción de `gap`                                   |
| `pixel`     | agrupa puntos en bloques de N×N del mismo color (aspecto bitmap)  |
| `speed`, `intensity`, `seed`, `fps` | ritmo, opacidad, composición y tope de fotogramas |
| `surface`   | `palette` pinta el fondo de la paleta · `theme` deja el canvas transparente sobre el papel del tema (`--pt-bg`) |

Regla para las paletas sobrias: `graphite` sobre Mist y `night` sobre Ink.

El campo se calcula con un píxel por punto y el canvas lo escala y lo recorta con un patrón
de círculos: tres operaciones de dibujo por fotograma, sea cual sea el tamaño. Se pausa fuera
de pantalla o con la pestaña oculta, y con `prefers-reduced-motion` dibuja un único fotograma.

## Estructura

```
src/
  tokens/tokens.css        tokens y temas
  components/<Nombre>/     componente + CSS + stories
  stories/                 introducción (MDX), foundations y páginas
.storybook/                configuración, tema del manager y selector de tema
```
