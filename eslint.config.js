import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";

const ignores = ["build/**/*", "node_modules/**/*", "coverage/**/*", "docs/**/*", ".claude/**/*", ".claude-flow/**/*"];

const stylisticConfig = {
  rules: {
    "lines-around-comment": ["error", { beforeBlockComment: false }],
    quotes: [
      "error",
      "double",
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },
    ],
  },
};

const config = tsEslint.config(
  {
    ignores,
  },
  eslint.configs.recommended,
  stylisticConfig,
  {
    files: ["**/*.ts"],
    extends: tsEslint.configs.strict,
    languageOptions: {
      parserOptions: {
        project: "tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-empty-object-type": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-wrapper-object-types": "error",
      "@typescript-eslint/prefer-literal-enum-member": "off",
      "@typescript-eslint/return-await": "error",
      "no-return-await": "off",
      useUnknownInCatchVariables: "off",
    },
  }
);

export default config;
