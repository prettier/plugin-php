import deepmerge from "deepmerge";

import config from "./rollup-esm.config";

export default deepmerge(config, {
  output: {
    file: "standalone.cjs.js",
    format: "cjs"
  }
});
