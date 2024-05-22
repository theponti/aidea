import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/vitest.setup.ts",
    clearMocks: true,
    coverage: {
      provider: "v8",
      clean: true,
      enabled: true,
      exclude: [
        "build/**",
        "src/services/constants",
        "src/styles",
        "src/testUtils",
        "src/main.tsx",
        "src/**/*.spec.{ts,tsx}",
        "src/**/*.test.{ts,tsx}",
        "test/**",
        "*.config.{js,cjs}",
      ],
      reporter: ["lcov"],
      reportsDirectory: "coverage",
    },
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "public"),
    },
  },
});
