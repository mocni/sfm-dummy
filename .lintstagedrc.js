const path = require("node:path");

function buildPrettierCommandWithIgnoreFile(filenames) {
  return [`prettier --write ${filenames.join(" ")} --ignore-path ${path.join(process.cwd(), ".prettierignore")}`];
}

/** @type { import('lint-staged').Config } */
module.exports = {
  "package.json": (filenames) => `syncpack format ${filenames.map((filename) => `--source '${filename}'`).join(" ")}`,
  "*.js": buildPrettierCommandWithIgnoreFile,
  "*.yml": buildPrettierCommandWithIgnoreFile,
  "*.yaml": buildPrettierCommandWithIgnoreFile,
  "*.md": buildPrettierCommandWithIgnoreFile,
  "*.{html,css}": buildPrettierCommandWithIgnoreFile,
};
