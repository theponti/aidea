import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
    clearMocks: true,
    coverage: {
      clean: true,
      enabled: true,
      exclude: [],
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
