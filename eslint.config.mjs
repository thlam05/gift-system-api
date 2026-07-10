import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  { ignores: ["dist", "node_modules", "eslint.config.mjs"] },
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "prefer-const": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      '@typescript-eslint/no-floating-promises': "error",
      '@typescript-eslint/no-unsafe-argument': "warn",
      '@typescript-eslint/no-unsafe-call': "error",
      '@typescript-eslint/no-unsafe-member-access': "warn"
    },
  },
  eslintPluginPrettierRecommended,
]);
