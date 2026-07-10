import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  { 
    ignores: ["dist", "node_modules", "eslint.config.mjs", "coverage", "build", "**/*.test.ts", "**/*.spec.ts", "**/__tests__/**"] 
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
        },
        {
          selector: "ThrowStatement > NewExpression[callee.name='Error']",
          message: "Không được throw đối tượng 'Error' gốc. Hãy sử dụng các HttpException của NestJS (ví dụ: BadRequestException, NotFoundException, ConflictException).",
        },
      ],

      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "^src(/.*)?$",
              message: "Không được import trực tiếp từ thư mục 'src/...'. Hãy sử dụng relative path (./, ../) hoặc cấu hình Path Alias (ví dụ: @/...) trong tsconfig."
            }
          ]
        }
      ],

      "@typescript-eslint/no-useless-constructor": "error",

      "@typescript-eslint/array-type": ["error", { default: "array" }],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    },
  },
  eslintPluginPrettierRecommended,
]);
