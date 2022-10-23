module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.ts?(x)"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
      env: {
        "cypress/globals": true,
      },
      plugins: ["cypress"],
      extends: [
        "eslint:recommended",
        "plugin:import/warnings",
        "plugin:import/errors",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "airbnb-typescript/base",
      ],
      rules: {
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/quotes": "off",
        "cypress/assertion-before-screenshot": "error",
        "cypress/no-assigning-return-values": "error",
        "cypress/no-async-tests": "error",
        "cypress/no-force": "error",
        "cypress/no-pause": "error",
        "cypress/no-unnecessary-waiting": "error",
        "cypress/require-data-selectors": "error",
        "import/namespace": "off",
        "import/no-extraneous-dependencies": "off",
        "no-void": "off",
      },
    },
  ],
};
