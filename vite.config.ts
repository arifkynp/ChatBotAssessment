/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import path from 'path/win32';
import devtools from 'solid-devtools/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import solidSvg from 'vite-plugin-solid-svg';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    tsconfigPaths(),
    // Why: solid-devtools and solid-refresh both inject HMR-time imports that
    // resolve only inside the Vite dev server. Vitest reuses this config but
    // doesn't run a dev server — the injected `file:///@solid-refresh` import
    // throws `TypeError: argument 'filename' must be a file URL` and every
    // *.test.tsx suite imports 0 tests. Scope these to non-test mode.
    ...(mode === 'test'
      ? []
      : [
          devtools({
            autoname: true,
            locator: { targetIDE: 'vscode', componentLocation: true, jsxLocation: true },
          }),
        ]),
    solidPlugin({ hot: mode !== 'test' }),
    tailwindcss(),
    solidSvg(),
  ],
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
}));
