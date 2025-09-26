/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@smart-fleet-management/eslint-config/eslint-config.default.js'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    typescript: true,
    node: true,
  },
  overrides: [
    {
      files: ['**/*.controller.ts'],
      rules: {
        'perfectionist/sort-classes': 'off',
      },
    },
  ],
  rules: {
    'import/no-unresolved': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
