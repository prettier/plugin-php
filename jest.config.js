const RUN_STANDALONE_TESTS = Boolean(process.env.RUN_STANDALONE_TESTS);
// Can't work on `jest-light-runner`
// const ENABLE_COVERAGE =
//   !RUN_STANDALONE_TESTS && Boolean(process.env.ENABLE_COVERAGE);

export default {
  // collectCoverage: ENABLE_COVERAGE,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.js",
    "!<rootDir>/node_modules/",
    "!<rootDir>/tests_config/",
  ],
  runner: "jest-light-runner",
  transform: {},
  setupFiles: ["<rootDir>/tests_config/run_spec.js"],
  testRegex: "jsfmt\\.spec\\.js$|__tests__/.*\\.js$",
  snapshotSerializers: ["jest-snapshot-serializer-raw"],
  globals: {
    STANDALONE: RUN_STANDALONE_TESTS,
  },
  ...(RUN_STANDALONE_TESTS
    ? { displayName: "test-standalone", testEnvironment: "jsdom" }
    : { displayName: "test-node", testEnvironment: "node" }),
};
