// .eslintrc.cjs
const globals = require("globals");
const tseslint = require("@typescript-eslint/eslint-plugin");
const pluginReact = require("eslint-plugin-react");

module.exports = {
  env: {
    browser: true,
    es2021: true,
    "react-native/react-native": true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint", "react-native"],
  rules: {
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "warn"
  },
  // Defina as extensões de arquivos para serem lidas pelo ESLint
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]
    }
  ]
};
