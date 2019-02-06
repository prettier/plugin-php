import { resolve } from "path";
import deepmerge from "deepmerge";

import { config, SRC_DIR } from "./common-config";

export default deepmerge(config, {
  input: resolve(SRC_DIR, "module.js"),
  output: {
    file: "standalone.esm.js",
    format: "esm",
    exports: "default",
    paths: {
      prettier: "prettier/standalone"
    }
  }
});
