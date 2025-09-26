const baseConfig = require("../../.lintstagedrc.js");

/** @type { import('lint-staged').Config } */
module.exports = {
  ...baseConfig,
  "*.ts": (filenames) => [
    `next lint --fix ${filenames.map((filename) => `--file ${filename}`).join(" ")}`,
    `prettier --write ${filenames.join(" ")} --ignore-path ../../.prettierignore`,
    "tsc --pretty --noEmit",
  ],
};
