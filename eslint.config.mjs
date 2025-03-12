import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = {
  extends: [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:storybook/recommended",
    "prettier"
  ],
  ignorePatterns: ["dist", ".eslintrc.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "eslint-plugin-import-helpers",
    "testing-library"
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "newline-before-return": 2,
    "import-helpers/order-imports": 0,
    "@typescript-eslint/no-unused-vars": [2, { "argsIgnorePattern": "^_" }],
    "no-console": [2, { "allow": ["warn", "error"] }],
    "indent": ["error", 2, { "SwitchCase": 1, "ignoredNodes": ["PropertyDefinition"] }],
    "quotes": ["error", "single"]
  }
};

export default eslintConfig;