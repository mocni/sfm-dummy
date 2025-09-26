/** @type {import("prettier").Config} */
const config = {
    endOfLine: "lf",
    printWidth: 120,
    singleQuote: false,
    trailingComma: "all",
    tabWidth: 2,
    singleAttributePerLine: true,
    overrides: [
      {
        files: "*.ts",
        options: { parser: "typescript" },
      },
      {
        files: "*.tsx",
        options: {
          parser: "typescript",
          plugins: ["prettier-plugin-tailwindcss"],
        },
      },
      {
        files: "*.yml",
        options: { parser: "yaml" },
      },
      {
        files: "*.json",
        options: { parser: "json" },
      },
    ],
  };
  
  module.exports = config;