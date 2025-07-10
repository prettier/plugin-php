import { getComposerPhpVer } from "../../src/options.mjs";
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

  test("returns default value when no composer.json is found", () => {
    // Create a directory with no composer.json
    const emptyDir = path.join(tempDir, "empty-dir");
    fs.mkdirSync(emptyDir, { recursive: true });

    process.chdir(emptyDir);

    const defaultVersion = "7.4";
    expect(getComposerPhpVer(defaultVersion)).toBe(defaultVersion);
  });

  test.each([
    [">=7.1.0", "7.1"],
    ["^8.0", "8.0"],
    ["~7.4", "7.4"],
    [">=5.6.0 <8.0.0", "5.6"],
    ["7.3.*", "7.3"]
  ])("extracts correct version from %s", (versionConstraint, expectedVersion) => {
    const composerContent = JSON.stringify(
      {
        require: {
          php: versionConstraint,
        },
      },
      null,
      2
    );

    fs.writeFileSync(tempComposerPath, composerContent);

    process.chdir(tempDir);

    // Call getComposerPhpVer to test version extraction
    const result = getComposerPhpVer("default");
    expect(result).toBe(expectedVersion);
  });

  test.each([
    [">=7.1.0", "7.1"],
    ["^8.0", "8.0"],
    ["~7.4", "7.4"],
    [">=5.6.0 <8.0.0", "5.6"],
    ["7.3.*", "7.3"]
  ])("extracts correct version from %s by changing cwd", (versionConstraint, expectedVersion) => {
    const composerContent = JSON.stringify(
      {
        require: {
          php: versionConstraint,
        },
      },
      null,
      2
    );

    fs.writeFileSync(tempComposerPath, composerContent);

    process.chdir(tempDir);

    const result = getComposerPhpVer("default");
    expect(result).toBe(expectedVersion);
  });

  test("returns default when composer.json has no PHP requirement", () => {
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

    const defaultVersion = "8.3";
    const result = getComposerPhpVer(defaultVersion);
    expect(result).toBe(defaultVersion);
  });

  test("returns default when composer.json has invalid PHP requirement", () => {
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

    const defaultVersion = "8.3";
    const result = getComposerPhpVer(defaultVersion);
    expect(result).toBe(defaultVersion);
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

    const result = getComposerPhpVer("default");
    expect(result).toBe("8.1");
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

    const result = getComposerPhpVer("default");
    expect(result).toBe("7.2");
  });
});
