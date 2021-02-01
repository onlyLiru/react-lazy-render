module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "eslint-config-ali/react",
    "eslint-config-ali/typescript",
    "eslint-config-ali/typescript/react",
    "eslint-config-ali/jsx-a11y",
    "prettier/@typescript-eslint",
  ],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6,
    sourceType: "module",
    allowImportExportEverywhere: false,
    codeFrame: true,
  },
  plugins: ["react"],
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  rules: {},
};
