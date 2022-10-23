import { defineConfig } from "cypress";

export default defineConfig({
  fileServerFolder: "build",
  fixturesFolder: false,
  e2e: {
    // eslint-disable-next-line
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // e2e: {
  //   // We've imported your old cypress plugins here.
  //   // You may want to clean this up later by importing these.
  //   setupNodeEvents(on, config) {
  //     return pluginConfig(on, config) as Cypress.PluginConfigOptions;
  //   },
  //   baseUrl: "http://localhost:4173/",
  //   specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
  // },
  projectId: "vy8idg",
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
