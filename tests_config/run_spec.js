"use strict";

const fs = require("fs");
const { extname } = require("path");
const prettier = require("prettier");

const { AST_COMPARE } = process.env;

function run_spec(dirname, parsers, options) {
  options = Object.assign(
    {
      plugins: ["."]
    },
    options
  );

  /* instabul ignore if */
  if (!parsers || !parsers.length) {
    throw new Error(`No parsers were specified for ${dirname}`);
  }

  fs.readdirSync(dirname).forEach(filename => {
    const path = `${dirname}/${filename}`;
    if (
      extname(filename) !== ".snap" &&
      fs.lstatSync(path).isFile() &&
      filename[0] !== "." &&
      filename !== "jsfmt.spec.js"
    ) {
      const source = read(path).replace(/\r\n/g, "\n");

      const mergedOptions = Object.assign(mergeDefaultOptions(options || {}), {
        parser: parsers[0]
      });
      const output = prettyprint(source, path, mergedOptions);
      test(`${filename} - ${mergedOptions.parser}-verify`, () => {
        expect(raw(`${source + "~".repeat(80)}\n${output}`)).toMatchSnapshot(
          filename
        );
      });

      parsers.slice(1).forEach(parserName => {
        test(`${filename} - ${parserName}-verify`, () => {
          const verifyOptions = Object.assign(mergedOptions, {
            parser: parserName
          });
          const verifyOutput = prettyprint(source, path, verifyOptions);
          expect(output).toEqual(verifyOutput);
        });
      });

      // this will only work for php tests (since we're in the php repo)
      if (AST_COMPARE && parsers[0] === "php") {
        const compareOptions = Object.assign(
          {
            filepath: filename
          },
          mergedOptions
        );

        const originalAST = cleanForComparison(
          prettier.__debug.parse(source, compareOptions, true)
        );
        const output = prettier.format(source, compareOptions);

        let outputAST;
        let reoutput;
        let secondPassErr = null;
        try {
          outputAST = cleanForComparison(
            prettier.__debug.parse(output, compareOptions, true)
          );
          reoutput = prettier.format(output, compareOptions);
        } catch (e) {
          secondPassErr = e.stack;
        }

        test(`${path} parse`, () => {
          expect(secondPassErr).toBe(null);
          expect(outputAST).toBeDefined();
          if (!originalAST.errors || originalAST.errors.length === 0) {
            expect(outputAST.ast.children).toEqual(originalAST.ast.children);
            expect(output).toEqual(reoutput);
          }
        });
      }
    }
  });
}
global.run_spec = run_spec;

function cleanForComparison(ast) {
  if (Array.isArray(ast)) {
    return ast.map(e => cleanForComparison(e));
  }
  if (typeof ast === "object") {
    const newObj = {};
    // prevent indentation changes in multiline comment blocks from causing AST changes
    if (ast && ast.kind === "commentblock") {
      ast.value = ast.value.replace(/^ +/gm, "");
    }
    for (const key in ast) {
      if (
        key === "loc" ||
        key === "range" ||
        key === "raw" ||
        key === "comments" ||
        key === "parent" ||
        key === "prev" ||
        key === "start" ||
        key === "end"
      ) {
        continue;
      }
      newObj[key] = cleanForComparison(ast[key]);
    }
    return newObj;
  }
  return ast;
}

function prettyprint(src, filename, options) {
  return prettier.format(
    src,
    Object.assign(
      {
        filepath: filename
      },
      options
    )
  );
}

function read(filename) {
  return fs.readFileSync(filename, "utf8");
}

/**
 * Wraps a string in a marker object that is used by `./raw-serializer.js` to
 * directly print that string in a snapshot without escaping all double quotes.
 * Backticks will still be escaped.
 */
function raw(string) {
  if (typeof string !== "string") {
    throw new Error("Raw snapshots have to be strings.");
  }
  return { [Symbol.for("raw")]: string };
}

function mergeDefaultOptions(parserConfig) {
  return Object.assign(
    {
      printWidth: 80
    },
    parserConfig
  );
}
