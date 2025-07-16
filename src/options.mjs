import fs from "fs";
import path from "path";

const CATEGORY_PHP = "PHP";

// prettier-ignore
const SUPPORTED_PHP_VERSIONS = [
  5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6,
  7.0, 7.1, 7.2, 7.3, 7.4,
  8.0, 8.1, 8.2, 8.3, 8.4,
];

export const LATEST_SUPPORTED_PHP_VERSION = Math.max(...SUPPORTED_PHP_VERSIONS);

let getComposerError = "";

/**
 * Detect the minimum PHP version from the composer.json file
 * @return {number|null} The PHP version to use in the composer.json file, null when not found
 */
function getComposerPhpVersion() {
  // Try to find composer.json
  const currentDir = process.cwd();
  let composerPath = null;

  const directComposerPath = path.join(currentDir, "composer.json");
  if (fs.existsSync(directComposerPath)) {
    composerPath = directComposerPath;
  }

  if (!composerPath) {
    let searchDir = path.dirname(currentDir);
    while (searchDir !== path.parse(searchDir).root) {
      const potentialComposerPath = path.join(searchDir, "composer.json");
      if (fs.existsSync(potentialComposerPath)) {
        composerPath = potentialComposerPath;
        break;
      }
      searchDir = path.dirname(searchDir);
    }
  }

  if (composerPath) {
    try {
      const fileContent = fs.readFileSync(composerPath, "utf8");
      const composerJson = JSON.parse(fileContent);

      if (composerJson.require && composerJson.require.php) {
        // Check for a wildcard pattern like "7.*"
        const wildcardMatch = composerJson.require.php.match(
          /^(?:[^0-9]*)?([0-9]+)\.\*/
        );
        if (wildcardMatch) {
          return parseFloat(`${wildcardMatch[1]}.0`);
        }

        // Extract version from composer semver format
        const versionMatch = composerJson.require.php.match(
          /^(?:[^0-9]*)?([0-9]+)\.([0-9]+)/
        );

        if (versionMatch) {
          return parseFloat(`${versionMatch[1]}.${versionMatch[2]}`);
        } else {
          getComposerError = `Could not decode PHP version (${composerJson.require.php}})`;
          return null;
        }
      }
    } catch (e) {
      getComposerError = `Error reading composer.json: ${e.message}`;
    }
  } else {
    getComposerError = "Could not find composer.json";
  }

  return null;
}

export { getComposerPhpVersion };

/**
 * Resolve the PHP version to a number based on the provided options.
 *
 */
export function resolvePhpVersion(options) {
  if (!options) {
    return;
  }
  if (options.phpVersion === "auto") {
    options.phpVersion =
      getComposerPhpVersion() ?? LATEST_SUPPORTED_PHP_VERSION;
  } else if (options.phpVersion === "composer") {
    const v = getComposerPhpVersion();
    if (v === null) {
      throw new Error(
        `Could not determine PHP version from composer; ${getComposerError}`
      );
    }
    options.phpVersion = v;
  } else {
    options.phpVersion = parseFloat(options.phpVersion);
  }
}

export default {
  phpVersion: {
    since: "0.13.0",
    category: CATEGORY_PHP,
    type: "choice",
    default: "auto",
    description: "Minimum target PHP version.",
    choices: [
      ...SUPPORTED_PHP_VERSIONS.map((v) => ({ value: v.toFixed(1) })),
      {
        value: "composer",
        description: "Use the PHP version defined in composer.json",
      },
      {
        value: "auto",
        description: `Try composer.json, else latest PHP Version (${LATEST_SUPPORTED_PHP_VERSION})`,
      },
    ],
  },
  trailingCommaPHP: {
    since: "0.0.0",
    category: CATEGORY_PHP,
    type: "boolean",
    default: true,
    description: "Print trailing commas wherever possible when multi-line.",
  },
  braceStyle: {
    since: "0.10.0",
    category: CATEGORY_PHP,
    type: "choice",
    default: "per-cs",
    description:
      "Print one space or newline for code blocks (classes and functions).",
    choices: [
      { value: "psr-2", description: "(deprecated) Use per-cs" },
      { value: "per-cs", description: "Use the PER Coding Style brace style." },
      { value: "1tbs", description: "Use 1tbs brace style." },
    ],
  },
  singleQuote: {
    since: "0.0.0",
    category: CATEGORY_PHP,
    type: "boolean",
    default: false,
    description: "Use single quotes instead of double quotes.",
  },
};
