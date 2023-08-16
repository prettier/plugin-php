import path from "path";
import url from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// TODO: Use ESM version
export const prettier = require(global.STANDALONE
  ? "prettier/standalone"
  : "prettier");
export const plugin = require(global.STANDALONE
  ? path.join(__dirname, "../standalone.js")
  : path.join(__dirname, ".."));
