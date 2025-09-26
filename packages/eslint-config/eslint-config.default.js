/** @type {import('eslint').Linter.Config} */
const config = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "turbo",
    "plugin:prettier/recommended",
    "plugin:perfectionist/recommended-natural-legacy",
  ],
  ignorePatterns: ["coverage/*"],
  rules: {
    "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-var-requires": "off",
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          orderImportKind: "asc",
        },
        distinctGroup: true,
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        pathGroups: [
          {
            group: "internal",
            pattern: "@/**",
            position: "after",
          },
          {
            group: "internal",
            pattern: "@smart-fleet-management/**",
          },
        ],
        warnOnUnassignedImports: true,
      },
    ],
    "no-shadow": "off",
    "perfectionist/sort-classes": ["error", { order: "asc" }],
    "perfectionist/sort-imports": "off",
    "prefer-const": "error",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "turbo/no-undeclared-env-vars": "error",
  },
  settings: {
    "import/internal-regex": "^@smart-fleet-management/",
  },
};

module.exports = config;
