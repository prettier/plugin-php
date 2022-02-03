const { prettier, plugin } = require("../../tests_config/get_engine");
const stripAnsi = require("strip-ansi");

function raiseSyntaxError() {
  prettier.format(`<?php _`, {
    plugins: [plugin],
    parser: "php",
  });
}

test("Prettier throws SyntaxErrors", () => {
  expect(raiseSyntaxError).toThrow(SyntaxError);
});

test("Syntax errors have the expected structure", () => {
  try {
    raiseSyntaxError();
  } catch (err) {
    // Convert error to plain object since additional properties are not snapshotted otherwise
    const errObject = Object.assign({}, err, {
      // Strip ANSI from code frame since not all test environments may support it
      codeFrame: stripAnsi(err.codeFrame),
    });

    // eslint-disable-next-line jest/no-conditional-expect
    expect(errObject).toMatchSnapshot();
  }
});
