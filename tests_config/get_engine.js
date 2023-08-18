import url from "url";
import { createRequire } from "module";
import prettierModule from "prettier";
import prettierStandalone from "prettier/standalone";
import * as prettierPluginPhp from "../src/index.js";

const require = createRequire(import.meta.url);

export const prettier = global.STANDALONE ? prettierStandalone : prettierModule;
export const plugin = global.STANDALONE
  ? require(url.fileURLToPath(new URL("../standalone.js", import.meta.url)))
  : prettierPluginPhp;
