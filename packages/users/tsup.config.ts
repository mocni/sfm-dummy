import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => {
  const isProduction = options.env?.NODE_ENV === "production";
  let entry: Options["entry"] = ["src/index.ts"];
  if (isProduction) {
    // see: https://tsup.egoist.dev/#multiple-entrypoints
    entry = { index: "src/index.production.ts" };
  }
  return {
    clean: true,
    dts: true,
    entry,
    minify: isProduction,
    sourcemap: true,
    splitting: false,
  };
});
