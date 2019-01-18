"use strict";

const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const { AST_COMPARE, TEST_CRLF } = process.env;

const CURSOR_PLACEHOLDER = "<|>";
const RANGE_START_PLACEHOLDER = "<<<PRETTIER_RANGE_START>>>";
const RANGE_END_PLACEHOLDER = "<<<PRETTIER_RANGE_END>>>";

global.run_spec = function run_spec(dirname, parsers, options) {
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

  fs.readdirSync(dirname).forEach(basename => {
    const filename = path.join(dirname, basename);

    if (
      path.extname(basename) !== ".snap" &&
      fs.lstatSync(filename).isFile() &&
      filename[0] !== "." &&
      filename !== "jsfmt.spec.js"
    ) {
      const text = fs.readFileSync(filename, "utf8");

      let rangeStart;
      let rangeEnd;
      let cursorOffset;

      const source = (TEST_CRLF ? text.replace(/\n/g, "\r\n") : text)
        .replace(RANGE_START_PLACEHOLDER, (match, offset) => {
          rangeStart = offset;
          return "";
        })
        .replace(RANGE_END_PLACEHOLDER, (match, offset) => {
          rangeEnd = offset;
          return "";
        });

      const input = source.replace(CURSOR_PLACEHOLDER, (match, offset) => {
        cursorOffset = offset;
        return "";
      });

      const baseOptions = Object.assign({ printWidth: 80 }, options, {
        rangeStart,
        rangeEnd,
        cursorOffset
      });
      const mainOptions = Object.assign({}, baseOptions, {
        parser: parsers[0]
      });

      const output = format(input, filename, mainOptions);

      test(basename, () => {
        expect(raw(`${source}\n${output}`)).toMatchSnapshot();
      });

      parsers.slice(1).forEach(parser => {
        const verifyOptions = Object.assign({}, baseOptions, { parser });
        test(`${basename} - ${parser}-verify`, () => {
          const verifyOutput = format(input, filename, verifyOptions);
          expect(output).toEqual(verifyOutput);
        });
      });

      // this will only work for php tests (since we're in the php repo)
      if (AST_COMPARE && parsers[0] === "php") {
        const compareOptions = Object.assign({}, mainOptions);

        const astMassaged = parse(source, compareOptions);

        let ppastMassaged = undefined;

        expect(() => {
          ppastMassaged = parse(
            format(input, path, compareOptions),
            compareOptions
          );
        }).not.toThrow();

        expect(ppastMassaged).toBeDefined();
        test(`${filename} parse`, () => {
          if (!astMassaged.errors || astMassaged.errors.length === 0) {
            expect(astMassaged).toEqual(ppastMassaged);
          }
        });
      }
    }
  });
};

function parse(string, opts) {
  return prettier.__debug.parse(string, opts, /* massage */ true).ast;
}

function format(source, filename, options) {
  const result = prettier.formatWithCursor(
    source,
    Object.assign({ filepath: filename }, options)
  );

  return options.cursorOffset >= 0
    ? result.formatted.slice(0, result.cursorOffset) +
        CURSOR_PLACEHOLDER +
        result.formatted.slice(result.cursorOffset)
    : result.formatted;
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
