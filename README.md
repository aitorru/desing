# Dot

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/overview-dark.png">
  <img alt="Resumen de Dot: temas Mist, Ink y OLED, cinco paletas, la textura DotField, la marca, tipografía, componentes, estado de servicios, cargadores de puntos y un despliegue alrededor de una lámina de tinta con el nombre." src="docs/overview-light.png">
</picture>

Dot es un lenguaje de diseño hecho de puntos: tokens CSS, unos treinta componentes React y un
Storybook para verlos. No te va a cambiar la vida. Pero si tienes que montar un panel de estado,
el informe semanal de plataforma o un post-mortem para mañana, trae casi todo lo que vas a
necesitar y queda bien sin pelearte con el CSS.

## Lo que viene en la caja

Para operaciones (grupo **DevOps** del Storybook; todos juntos en **Pages › Dot 2 › Operaciones**):

| Componente | Para qué |
| ---------- | -------- |
| `Status` | estado como punto + palabra (`ok` · `warn` · `error` · `running` · `idle`); la forma del punto acompaña al color |
| `DataTable` | la tabla de servicios: orden por columna, cifras en mono, densidad y fila seleccionada |
| `Diagram` | el camino de una petición: nodos en rejilla (`service` · `store` · `queue` · `external`) y conectores de puntos |
| `Pipeline` | compilar → probar → desplegar, en horizontal o en vertical |
| `KeyValue` | commit, rama, imagen, región: metadatos con guía de puntos o en columnas |
| `CodeBlock` | el YAML del rollout, con números de línea, líneas marcadas y copiar |
| `LogView` | registro con hora, nivel y origen (`role="log"`) |
| `DotUptime` | disponibilidad por día como tira de puntos; solo los días malos llevan color |
| `Stat` | el KPI de siempre (p95, error budget, MTTR) con su gráfico de puntos |
| `DotProgress` · `DotBars` · `DotLoader` | progreso del rollout, peticiones por hora y «estoy en ello» sin spinners |
| `Callout` | «mantenimiento el jueves», «notificaciones caído», «datos de ejemplo» |

Usan `--pt-font-mono` (IBM Plex Mono) y un rol propio para avisos, `--pt-warning`.

El resto, para lo que rodea al dato:

- **Tokens** en CSS (`--pt-*`): color, gradientes, tipografía, espacio, radios y movimiento.
  Tres temas: _Mist_ (claro), _Ink_ (oscuro) y _OLED_ (para la guardia de noche).
- **Paletas**: `punto` (la original), `marea`, `siena`, `citrico` y `mono`, intercambiables con
  `data-pt-palette`. `mono` es blanco y negro, esquinas rectas y sombra dura: ideal para un
  informe que alguien va a imprimir o pegar en un ticket.
- **Dot 2** (`data-pt-version="2"`): la versión sobria. Papel en vez de vidrio, un solo acento y
  patrones quietos. Es la que quieres para informes. Ver [Dot 2](#dot-2).
- **Básicos**: `Button`, `Badge`, `GlassCard`, `TextField`, `Segmented`, `Switch`, `Stack`,
  `SectionHeader`, `Avatar` / `AvatarGroup`, `DotDivider`, y la marca (`DotMark`, `Petals`,
  `Sparkle`).
- **Textura**: `DotField` (puntos animados en canvas) y `DotPattern` (patrones quietos en SVG).
  Opcionales; tu dashboard no necesita fuegos artificiales.

## Empezar

```html
<html data-pt-theme="light" data-pt-version="2">
```

```tsx
import { DotUptime, Pipeline, Stat, Status } from "desing";

<Status tone="warn">búsqueda degradado</Status>
<Stat label="Latencia p95" value="182 ms" delta="+12 ms" trend="negative" />
<DotUptime periods={dias} label="Disponibilidad, 30 días" />
<Pipeline
  label="Despliegue #482"
  stages={[
    { id: "build", label: "Compilar", status: "ok", meta: "1 min 12 s" },
    { id: "canary", label: "Canario 10 %", status: "running" },
    { id: "prod", label: "Producción", status: "idle" },
  ]}
/>
```

Importar el paquete trae los tokens, los tres temas y las fuentes. Para ver ejemplos completos:
**Pages › Dot 2** tiene un informe semanal (_Portada_), un post-mortem (_Informe_), una consola de
plataforma (_Operaciones_) y un póster de estado para la pantalla de la oficina (_Lámina_).
**Pages › Product** es una pantalla de despliegue (pulsa «Desplegar») y **Pages › Workspace**, el
panel de quien está de guardia.

> Antes se llamaba **Punto**. El nombre cambia; la API no: los tokens, las clases y los
> atributos siguen con el prefijo `pt-` (`--pt-*`, `.pt-folio`, `data-pt-theme`), y la paleta
> original sigue siendo `punto`.

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

La imagen de arriba es la story **Dot › Resumen**, capturada a 1920 × 1080 con el
Storybook estático en marcha (`preview`):

```bash
for t in light dark; do
  nix shell nixpkgs#chromium -c chromium --headless --hide-scrollbars \
    --window-size=1920,1080 --virtual-time-budget=6000 --screenshot="docs/overview-$t.png" \
    "http://localhost:36007/iframe.html?id=dot-resumen--resumen&viewMode=story&globals=theme:$t;palette:siena"
done
```

## Paletas

```html
<html data-pt-theme="dark" data-pt-palette="marea">
```

Los componentes leen roles y el espectro (`--pt-spectrum-1…6`, `--pt-spectrum-accent`,
`--pt-spectrum-soft`), nunca un tono con nombre; cada paleta reasigna neutros y espectro.
`PALETTES` y `heroDotPalette()` (exportados) dan la lista y la textura de `DotField` que
corresponde a cada una.

## Dot 2

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
paleta, en Mist y en Ink) y pinta como mucho diez `<path>` por patrón. Más detalle en
**Dot › Versión 2**; las páginas, en **Pages › Dot 2**.

## Temas y modo noche

`data-pt-theme` admite `light` (Mist), `dark` (Ink) y `oled` (Ink sobre negro puro).

```tsx
import { ThemeSwitch, themeInitScript, useTheme } from "desing";

const { preference, theme, setPreference } = useTheme({ night: "oled" });
<ThemeSwitch value={preference} onChange={setPreference} />;
```

- `useTheme()` guarda la preferencia (`system` · `light` · `dark` · `oled`) en `localStorage`,
  sigue a `prefers-color-scheme` mientras sea `system` (`night` decide si eso es `dark` u
  `oled`) y pone `data-pt-theme` en `<html>` (o en `target`; con `target: null` no toca nada).
- `themeInitScript()` devuelve el script en línea para el `<head>` que aplica el tema antes
  del primer pintado.
- `ThemeSwitch` es controlado; `variant="icons"` para barras, `options` para acortar la lista.

## DotField

```tsx
<DotField palette="aurora" motion="flow" gap={8} pixel={3} seed={11} style={{ height: 480 }}>
  <GlassCard tone="bloom">…</GlassCard>
</DotField>
```

| Prop        | Valores                                                           |
| ----------- | ----------------------------------------------------------------- |
| `palette`   | `aurora` · `ember` · `dusk` · `graphite` · `night` · `paper` · `marea` · `siena` · `citrico` · `mono` · `monoNight` (o una propia) |
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
