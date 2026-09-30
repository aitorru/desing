---
name: check
description: Reproduce en local los jobs de CI de desing (lint, build de Storybook, audit) y arregla lo que falle. Úsala antes de commitear o abrir un PR, o cuando pidan "verificar", "pasar el lint", "que pase CI".
---

# Verificar como CI

CI (`.github/workflows/ci.yml`) tiene tres jobs: `lint`, `storybook` y `audit`.

```bash
devenv shell -- bash -c 'lint && build'
devenv shell -- pnpm audit --audit-level moderate   # si tocaste dependencias
```

Si falla:

- **biome**: `devenv shell -- biome check --write .` y revisa el diff (aplica también fixes
  seguros del linter). Las reglas de a11y se arreglan en el código; un `biome-ignore` solo con
  el porqué (ver `DotField.tsx`, `Sparkle.tsx`).
- **noDescendingSpecificity** en CSS: reordena los bloques (el más específico después); no
  mezcles bloques al moverlos.
- **check-biome-version**: `@biomejs/biome` en `package.json` debe ser igual que el biome de
  nixpkgs (`echo $BIOME_NIX_VERSION` dentro del shell). Se suben juntos con `devenv update`.
- **build**: Storybook compila todas las stories; un error aquí suele ser un import roto.

El build no ejecuta las stories: para errores en tiempo de ejecución mira el Storybook
(skill `run-storybook`).
