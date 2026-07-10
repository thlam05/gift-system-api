import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  { 
    ignores: ["dist", "node_modules", "eslint.config.mjs", "coverage", "build"] 
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked, 
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "prefer-const": "error",
      "no-duplicate-imports": "error",
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],

      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error", 
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: false } 
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: "ThrowStatement > NewExpression[arguments.0.type='Literal']",
          message: "Không được dùng Magic String trực tiếp khi throw exception. Hãy định nghĩa một hằng số (constant) hoặc sử dụng mã lỗi (error code).",
        },
        {
          selector: "ThrowStatement > Literal",
          message: "Không được throw trực tiếp một chuỗi literal. Hãy throw một đối tượng Error kèm hằng số (constant).",
        }
      ],

      "@typescript-eslint/array-type": ["error", { default: "array" }],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    },
  },
  eslintPluginPrettierRecommended,
]);
