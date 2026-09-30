# Punto — lenguaje de diseño

Propuesta de lenguaje de diseño inspirada en el póster de _Otherwise_: superficies de puntos
por las que pasan cintas de color, paneles de vidrio esmerilado encima y una serif tranquila
para los titulares. Todo se documenta y se prueba en un Storybook.

- **Tokens** en CSS (`--pt-*`): color (mist, ink y acentos), gradientes, tipografía, espacio,
  radios y movimiento, con tema claro (_Mist_) y oscuro (_Ink_).
- **Familia de puntos**: `DotField` (la textura animada, en canvas), `DotLoader`,
  `DotProgress` y `DotBars`.
- **Componentes**: `Button`, `Badge`, `GlassCard`, `TextField`, `Segmented`, `Sparkle`,
  `Petals`.
- **Páginas**: el póster original reconstruido con el sistema y una pantalla de producto
  interactiva (pulsa «Simular»).

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

## DotField

```tsx
<DotField palette="aurora" motion="flow" gap={8} pixel={3} seed={11} style={{ height: 480 }}>
  <GlassCard tone="bloom">…</GlassCard>
</DotField>
```

| Prop        | Valores                                                           |
| ----------- | ----------------------------------------------------------------- |
| `palette`   | `aurora` · `ember` · `dusk` · `graphite` · `night` · `paper` (o una propia) |
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
