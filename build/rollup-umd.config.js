import { resolve } from "path";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import deepmerge from "deepmerge";

import { config, SRC_DIR } from "./common-config";

export default deepmerge(config, {
  input: resolve(SRC_DIR, "index.js"),
  output: {
    file: "standalone.js",
    format: "umd",
    name: "prettierPlugins.php",
    exports: "named",
    globals: {
      prettier: "prettier"
    }
  },
  plugins: [
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
});
