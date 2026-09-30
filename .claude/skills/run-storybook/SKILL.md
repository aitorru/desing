---
name: run-storybook
description: Arranca el Storybook de desing y comprueba visualmente stories concretas. Úsala para "arranca", "enséñame", "haz una captura" o para validar un cambio visual.
---

# Arrancar y mirar el Storybook

```bash
ss -ltn | grep 36006 || (cd /data/aitor/src/desing && devenv shell -- dev > /data/aitor/tmp-desing-dev.log 2>&1 &)
```

Escucha en `0.0.0.0:36006` (`http://pi-home:36006` desde el tailnet). Tarda ~20 s la primera
vez (optimización de dependencias de Vite).

- Story aislada: `/iframe.html?id=<id>&viewMode=story` (p. ej. `pages-poster--original`,
  `pages-product--scenarios`, `dots-dotfield--palettes`).
- Página MDX: `/iframe.html?id=punto-introducción--docs&viewMode=docs`.
- Lista de ids: `/index.json`.
- Tema oscuro: añade `&globals=theme:dark`.

Una story rota pone `sb-show-errordisplay` en el `<body>` del iframe y el mensaje en
`#error-message`.

No mates el servidor con `pkill -f "storybook dev"`: el patrón coincide con la propia shell.
Busca el PID con `ss -ltnp | grep 36006`.
