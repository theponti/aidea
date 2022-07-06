import react from "@vitejs/plugin-react";
import * as path from "path";
import analyze from "rollup-plugin-analyzer";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [
        analyze({
          summaryOnly: true,
        }),
      ],
    },
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
  },
});
