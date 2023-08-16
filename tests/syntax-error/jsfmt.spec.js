import { prettier, plugin } from "../../tests_config/get_engine.js";
import stripAnsi from "strip-ansi";

async function raiseSyntaxError() {
  await prettier.format(`<?php _`, {
    plugins: [plugin],
    parser: "php",
  });
}

test("Prettier throws SyntaxErrors", async () => {
  await expect(raiseSyntaxError).rejects.toThrow(SyntaxError);
});

test("Syntax errors have the expected structure", async () => {
  try {
    await raiseSyntaxError();
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
