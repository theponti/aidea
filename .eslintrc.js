module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  plugins: ["react", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  env: {
    node: true,
    browser: true,
    es2021: true,
    jest: true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules"],
      },
      alias: {
        map: [["src", "./src/"]],
      },
    },
  },
  rules: {
    "require-jsdoc": 0,
    "react/react-in-jsx-scope": 0,
    "prettier/prettier": "error",
  },
};
