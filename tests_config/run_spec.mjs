import fs from "fs";
import path from "path";
import url from "url";
import { wrap as raw } from "jest-snapshot-serializer-raw";
import { prettier, plugin } from "./get_engine.mjs";

const { AST_COMPARE, TEST_CRLF } = process.env;

const CURSOR_PLACEHOLDER = "<|>";
const RANGE_START_PLACEHOLDER = "<<<PRETTIER_RANGE_START>>>";
const RANGE_END_PLACEHOLDER = "<<<PRETTIER_RANGE_END>>>";

global.run_spec = (importMeta, parsers, options) => {
  const dirname = path.dirname(url.fileURLToPath(importMeta.url));

  options = Object.assign({}, options, {
    plugins: [plugin, ...((options && options.plugins) || [])],
  });

  // istanbul ignore next
  if (!parsers || !parsers.length) {
    throw new Error(`No parsers were specified for ${dirname}`);
  }

  fs.readdirSync(dirname).forEach((basename) => {
    const filename = path.join(dirname, basename);

    if (
      path.extname(basename) === ".snap" ||
      !fs.lstatSync(filename).isFile() ||
      basename[0] === "." ||
      basename === "jsfmt.spec.mjs"
    ) {
      return;
    }

    let rangeStart;
    let rangeEnd;
    let cursorOffset;

    const text = fs.readFileSync(filename, "utf8");

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
      cursorOffset,
    });
    const mainOptions = Object.assign({}, baseOptions, {
      parser: parsers[0],
    });

    const hasEndOfLine = "endOfLine" in mainOptions;

    let output;
    let visualizedOutput;
    beforeAll(async () => {
      output = await format(input, filename, mainOptions);
      visualizedOutput = visualizeEndOfLine(output);
    });

    // eslint-disable-next-line jest/valid-title
    test(basename, async () => {
      expect(visualizedOutput).toEqual(
        visualizeEndOfLine(consistentEndOfLine(output))
      );
      expect(
        raw(
          createSnapshot(
            hasEndOfLine
              ? visualizeEndOfLine(
                  text
                    .replace(RANGE_START_PLACEHOLDER, "")
                    .replace(RANGE_END_PLACEHOLDER, "")
                )
              : source,
            hasEndOfLine ? visualizedOutput : output,
            Object.assign({}, baseOptions, { parsers })
          )
        )
      ).toMatchSnapshot();
    });

    for (const parser of parsers.slice(1)) {
      const verifyOptions = Object.assign({}, baseOptions, { parser });
      test(`${basename} - ${parser}-verify`, () => {
        const verifyOutput = format(input, filename, verifyOptions);
        expect(visualizedOutput).toEqual(visualizeEndOfLine(verifyOutput));
      });
    }

    // this will only work for php tests (since we're in the php repo)
    if (AST_COMPARE && parsers[0] === "php") {
      test(`${filename} parse`, async () => {
        const parseOptions = { ...mainOptions, cursorOffset: undefined };

        const originalAst = await parse(input, parseOptions);
        const formattedAst = await parse(
          output.replace(CURSOR_PLACEHOLDER, ""),
          parseOptions
        );

        expect(originalAst).toBeDefined();
        expect(formattedAst).toEqual(originalAst);
      });
    }
  });
};

async function parse(source, options) {
  const { ast } = await prettier.__debug.parse(source, options, {
    massage: true,
  });
  return ast;
}

async function format(source, filename, options) {
  const result = await prettier.formatWithCursor(
    source,
    Object.assign({ filepath: filename }, options)
  );

  return options.cursorOffset >= 0
    ? result.formatted.slice(0, result.cursorOffset) +
        CURSOR_PLACEHOLDER +
        result.formatted.slice(result.cursorOffset)
    : result.formatted;
}

function consistentEndOfLine(text) {
  let firstEndOfLine;
  return text.replace(/\r\n?|\n/g, (endOfLine) => {
    if (!firstEndOfLine) {
      firstEndOfLine = endOfLine;
    }
    return firstEndOfLine;
  });
}

function visualizeEndOfLine(text) {
  return text.replace(/\r\n?|\n/g, (endOfLine) => {
    switch (endOfLine) {
      case "\n":
        return "<LF>\n";
      case "\r\n":
        return "<CRLF>\n";
      case "\r":
        return "<CR>\n";
      default:
        throw new Error(`Unexpected end of line ${JSON.stringify(endOfLine)}`);
    }
  });
}

function createSnapshot(input, output, options) {
  const separatorWidth = 80;
  const printWidthIndicator =
    options.printWidth > 0 && Number.isFinite(options.printWidth)
      ? `${" ".repeat(options.printWidth)}| printWidth`
      : [];
  return []
    .concat(
      printSeparator(separatorWidth, "options"),
      printOptions(
        omit(
          options,
          (k) => k === "rangeStart" || k === "rangeEnd" || k === "cursorOffset"
        )
      ),
      printWidthIndicator,
      printSeparator(separatorWidth, "input"),
      input,
      printSeparator(separatorWidth, "output"),
      output,
      printSeparator(separatorWidth)
    )
    .join("\n");
}

function printSeparator(width, description) {
  description = description || "";
  const leftLength = Math.floor((width - description.length) / 2);
  const rightLength = width - leftLength - description.length;
  return "=".repeat(leftLength) + description + "=".repeat(rightLength);
}

function printOptions(options) {
  const keys = Object.keys(options).sort();
  return keys.map((key) => `${key}: ${stringify(options[key])}`).join("\n");
  function stringify(value) {
    return value === Infinity
      ? "Infinity"
      : Array.isArray(value)
      ? `[${value.map((v) => JSON.stringify(v)).join(", ")}]`
      : JSON.stringify(value);
  }
}

function omit(obj, fn) {
  return Object.keys(obj).reduce((reduced, key) => {
    if (key === "plugins") {
      return reduced;
    }
    const value = obj[key];
    if (!fn(key, value)) {
      reduced[key] = value;
    }
    return reduced;
  }, {});
}
