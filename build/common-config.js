import { resolve } from "path";

import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import alias from "rollup-plugin-alias";
import inject from "rollup-plugin-inject";
import replace from "rollup-plugin-replace";

export const PROJECT_DIR = resolve(__dirname, "..");
export const SRC_DIR = resolve(PROJECT_DIR, "src");
export const BUILD_DIR = resolve(PROJECT_DIR, "build");

export const config = {
  output: {
    file: "standalone.js",
    format: "umd",
    name: "prettierPlugins.php",
    exports: "named",
    globals: {
      prettier: "prettier"
    }
  },
  external: ["prettier"],
  plugins: [
    nodeResolve(),
    commonjs(),
    alias({
      assert: resolve(BUILD_DIR, "shims/assert.js")
    }),
    inject({
      Buffer: resolve(BUILD_DIR, "shims/buffer.js")
    }),
    replace({
      "process.arch": JSON.stringify("x32")
    })
  ]
};
