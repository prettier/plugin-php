import { resolve } from "path";

import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import alias from "rollup-plugin-alias";
import inject from "rollup-plugin-inject";
import replace from "rollup-plugin-replace";
import babel from "rollup-plugin-babel";
import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";

const SRC_DIR = resolve(__dirname, "..", "src");
const BUILD_DIR = resolve(__dirname, "..", "build");

export default {
  input: resolve(SRC_DIR, "index.js"),
  output: {
    file: "standalone.js",
    format: "umd",
    name: "prettierPlugins.php",
    exports: "named",
    globals: {
      prettier: "prettier"
    },
    paths: {
      prettier: "prettier/standalone"
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
    }),
    json(),
    babel({
      babelrc: false,
      plugins: [],
      compact: false,
      presets: [
        [
          require.resolve("@babel/preset-env"),
          {
            targets: { browsers: [">0.25%", "not ie 11", "not op_mini all"] },
            modules: false
          }
        ]
      ]
    }),
    terser()
  ]
};
