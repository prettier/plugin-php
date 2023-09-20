import url from "url";

import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import inject from "@rollup/plugin-inject";
import replace from "@rollup/plugin-replace";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

const getPath = (file) => url.fileURLToPath(new URL(file, import.meta.url));

export default {
  input: getPath("../src/index.mjs"),
  output: {
    file: "standalone.js",
    format: "umd",
    name: "prettierPlugins.php",
    exports: "named",
    globals: {
      prettier: "prettier",
    },
    paths: {
      prettier: "prettier/standalone",
    },
  },
  external: ["prettier"],
  plugins: [
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs(),
    alias({
      entries: [{ find: "assert", replacement: getPath("./shims/assert.mjs") }],
    }),
    inject({
      Buffer: getPath("./shims/buffer.mjs"),
    }),
    replace({
      preventAssignment: true,
      "process.arch": JSON.stringify("x32"),
    }),
    json(),
    babel({
      babelHelpers: "bundled",
      configFile: false,
      babelrc: false,
      plugins: [],
      compact: false,
      presets: [
        [
          "@babel/preset-env",
          {
            targets: { browsers: [">0.25%", "not ie 11", "not op_mini all"] },
            modules: false,
          },
        ],
      ],
    }),
    terser(),
  ],
};
