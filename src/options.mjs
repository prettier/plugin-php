import fs from "fs";
import path from "path";

const CATEGORY_PHP = "PHP";

/**
 * Detect the minimum PHP version from the composer.json file
 * @return {string|null} The PHP version to use in the composer.json file, null when not found
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
        // Check for wildcard pattern like "7.*"
        const wildcardMatch = composerJson.require.php.match(
          /^(?:[^0-9]*)?([0-9]+)\.\*/
        );
        if (wildcardMatch) {
          return `${wildcardMatch[1]}.0`;
        }

        // Extract version from composer semver format
        const versionMatch = composerJson.require.php.match(
          /^(?:[^0-9]*)?([0-9]+)\.([0-9]+)/
        );

        if (versionMatch) {
          return `${versionMatch[1]}.${versionMatch[2]}`;
        }
      }
    } catch (e) {
      // Ignore JSON parsing errors
    }
  }

  return null;
}

export { getComposerPhpVersion };

export default {
  phpVersion: {
    since: "0.13.0",
    category: CATEGORY_PHP,
    type: "choice",
    default: getComposerPhpVersion() ?? "8.3",
    description: "Minimum target PHP version.",
    choices: [
      { value: "5.0" },
      { value: "5.1" },
      { value: "5.2" },
      { value: "5.3" },
      { value: "5.4" },
      { value: "5.5" },
      { value: "5.6" },
      { value: "7.0" },
      { value: "7.1" },
      { value: "7.2" },
      { value: "7.3" },
      { value: "7.4" },
      { value: "8.0" },
      { value: "8.1" },
      { value: "8.2" },
      { value: "8.3" },
      { value: "8.4" },
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
