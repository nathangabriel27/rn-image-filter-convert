import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import tsParser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.Config} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: [
      ".yarn/",       // Ignore .yarn
      "node_modules/", // Ignora node_modules
      "dist/"         // Ignore build (dist)
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parser: tsParser
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: pluginReact,
    },
    rules: {
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "off"
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];
