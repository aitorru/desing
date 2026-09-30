{ pkgs, lib, config, ... }:

{
  name = "desing";

  packages = [
    pkgs.git
    pkgs.jq
    pkgs.biome
  ];

  languages.javascript = {
    enable = true;
    lsp.enable = lib.mkDefault false;
    package = pkgs.nodejs_24;
    pnpm = {
      enable = true;
      install.enable = true;
    };
  };

  env = {
    # The npm biome binary is dynamically linked and won't run on NixOS; the npm
    # package (pinned to the same version) only provides the JS API / schema.
    BIOME_BINARY = "${pkgs.biome}/bin/biome";
    BIOME_NIX_VERSION = pkgs.biome.version;
    STORYBOOK_DISABLE_TELEMETRY = "1";
    # Dev port (30000–39999 is open on LAN + tailnet).
    DESING_STORYBOOK_PORT = "36006";
    DESING_PREVIEW_PORT = "36007";
  };

  scripts = {
    check-biome-version.exec = ''
      set -euo pipefail
      npm_version=$(jq -r '.devDependencies["@biomejs/biome"]' "$DEVENV_ROOT/package.json")
      if [ "$npm_version" != "$BIOME_NIX_VERSION" ]; then
        echo "@biomejs/biome ($npm_version) != nixpkgs biome ($BIOME_NIX_VERSION)" >&2
        exit 1
      fi
    '';
    lint.exec = ''
      set -euo pipefail
      cd "$DEVENV_ROOT"
      pnpm run typecheck
      biome ci .
      check-biome-version
    '';
    build.exec = ''
      set -euo pipefail
      cd "$DEVENV_ROOT"
      pnpm exec storybook build --quiet -o storybook-static
    '';
    dev.exec = ''
      set -euo pipefail
      cd "$DEVENV_ROOT"
      [ -d node_modules ] || pnpm install --frozen-lockfile
      pnpm exec storybook dev --host 0.0.0.0 -p "$DESING_STORYBOOK_PORT" --exact-port --no-open "$@"
    '';
    # Serves the static build (what CI publishes) instead of the dev server.
    preview.exec = ''
      set -euo pipefail
      cd "$DEVENV_ROOT"
      [ -d storybook-static ] || build
      pnpm exec vite preview --outDir storybook-static --host 0.0.0.0 --port "$DESING_PREVIEW_PORT" --strictPort
    '';
  };

  processes.storybook.exec = "dev";

  git-hooks.hooks.biome = {
    enable = true;
    entry = lib.mkForce "${pkgs.biome}/bin/biome check --write --no-errors-on-unmatched";
  };

  profiles.ide.module.languages.javascript.lsp.enable = true;

  enterShell = ''
    echo "desing dev shell · node $(node --version) · biome ${pkgs.biome.version}"
    echo "  dev (o devenv up) → storybook http://pi-home:$DESING_STORYBOOK_PORT"
    echo "  lint | build (storybook-static) | preview → http://pi-home:$DESING_PREVIEW_PORT"
  '';

  enterTest = ''
    lint
  '';
}
