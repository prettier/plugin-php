import { getComposerPhpVersion } from "../../src/options.mjs";
import fs from "fs";
import path from "path";
import os from "os";

describe("getComposerPhpVer", () => {
  // Create a unique temporary directory for our tests
  const tempDir = path.join(os.tmpdir(), `composer-version-test-${Date.now()}`);
  const tempComposerPath = path.join(tempDir, "composer.json");
  const originalCwd = process.cwd();

  beforeEach(() => {
    // Create temp directory if it doesn't exist
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
  });

  afterEach(() => {
    process.chdir(originalCwd);

    // Clean up temp files and directories
    if (fs.existsSync(tempComposerPath)) {
      fs.unlinkSync(tempComposerPath);
    }

    // Remove any nested directories we created
    if (fs.existsSync(tempDir)) {
      const deleteFolderRecursive = function(dirPath) {
        if (fs.existsSync(dirPath)) {
          fs.readdirSync(dirPath).forEach((file) => {
            const curPath = path.join(dirPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
              deleteFolderRecursive(curPath);
            } else {
              fs.unlinkSync(curPath);
            }
          });
          fs.rmdirSync(dirPath);
        }
      };

      deleteFolderRecursive(tempDir);
    }
  });

  test("returns null when no composer.json is found", () => {
    // Create a directory with no composer.json
    const emptyDir = path.join(tempDir, "empty-dir");
    fs.mkdirSync(emptyDir, { recursive: true });

    process.chdir(emptyDir);

    expect(getComposerPhpVersion()).toBe(null);
  });

  test.each([
    {ver:">=7.1.0",expected: "7.1"},
    {ver:"^8.0",expected: "8.0"},
    {ver:"~7.4",expected: "7.4"},
    {ver:">=5.6.0 <8.0.0",expected: "5.6"},
    {ver:"7.3.*",expected: "7.3"},
    {ver:"7.* || 8.*",expected: "7.0"}
  ])("extracts correct version from $ver ba changing cwd", ({ver, expected}) => {
    const composerContent = JSON.stringify(
      {
        require: {
          php: ver,
        },
      },
      null,
      2
    );

    process.chdir(tempDir);
    fs.writeFileSync(tempComposerPath, composerContent);


    expect(getComposerPhpVersion()).toBe(expected);
  });

  test("returns null when composer.json has no PHP requirement", () => {
    const composerContent = JSON.stringify(
      {
        require: {
          // No PHP requirement
          "some/package": "^1.0"
        },
      },
      null,
      2
    );

    fs.writeFileSync(tempComposerPath, composerContent);

    process.chdir(tempDir);

    expect(getComposerPhpVersion()).toBe(null);
  });

  test("returns null when composer.json has invalid PHP requirement", () => {
    const composerContent = JSON.stringify(
      {
        require: {
          php: "invalid-version"
        },
      },
      null,
      2
    );

    fs.writeFileSync(tempComposerPath, composerContent);

    process.chdir(tempDir);

    expect(getComposerPhpVersion()).toBe(null);
  });

  test("finds composer.json in parent directory when in nested child folder", () => {
    // Create a nested directory structure
    const nestedDir1 = path.join(tempDir, "level1");
    const nestedDir2 = path.join(nestedDir1, "level2");
    const nestedDir3 = path.join(nestedDir2, "level3");

    fs.mkdirSync(nestedDir1, { recursive: true });
    fs.mkdirSync(nestedDir2, { recursive: true });
    fs.mkdirSync(nestedDir3, { recursive: true });

    // Create composer.json in the root temp directory
    const composerContent = JSON.stringify(
      {
        require: {
          php: "^8.1"
        },
      },
      null,
      2
    );

    fs.writeFileSync(tempComposerPath, composerContent);

    process.chdir(nestedDir3);

    expect(getComposerPhpVersion()).toBe("8.1");
  });

  test("finds composer.json in intermediate parent directory", () => {
    // Create a nested directory structure
    const nestedDir1 = path.join(tempDir, "folder1");
    const nestedDir2 = path.join(nestedDir1, "folder2");
    const nestedDir3 = path.join(nestedDir2, "folder3");

    fs.mkdirSync(nestedDir1, { recursive: true });
    fs.mkdirSync(nestedDir2, { recursive: true });
    fs.mkdirSync(nestedDir3, { recursive: true });

    // Create composer.json in the middle level directory
    const intermediateComposerPath = path.join(nestedDir2, "composer.json");
    const composerContent = JSON.stringify(
      {
        require: {
          php: "~7.2"
        },
      },
      null,
      2
    );

    fs.writeFileSync(intermediateComposerPath, composerContent);

    process.chdir(nestedDir3);

    expect(getComposerPhpVersion()).toBe("7.2");
  });

  test("returns null when composer.json is malformed", () => {
    // Create a malformed JSON file (invalid syntax)
    const malformedContent = `{
      "name": "test/package",
      "require": {
        "php": "^7.4"
      }, // Invalid trailing comma
      "extra": {
        "key": "value"
      }
    }`;

    fs.writeFileSync(tempComposerPath, malformedContent);

    process.chdir(tempDir);

    expect(getComposerPhpVersion()).toBe(null);
  });
});
