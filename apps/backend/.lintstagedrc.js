const baseConfig = require("../../.lintstagedrc.js");

/** @type { import('lint-staged').Config } */
module.exports = {
  ...baseConfig,
  "*.ts": (filenames) => [
    `eslint --fix ${filenames.join(" ")}`,
    `prettier --write ${filenames.join(" ")} --ignore-path ../../.prettierignore`,
    "tsc --pretty --noEmit",
  ],
};
