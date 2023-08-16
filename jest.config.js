const ENABLE_COVERAGE = !!process.env.CI;
const RUN_STANDALONE_TESTS = Boolean(process.env.RUN_STANDALONE_TESTS);

export default {
  collectCoverage: ENABLE_COVERAGE,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.js",
    "!<rootDir>/node_modules/",
    "!<rootDir>/tests_config/",
  ],
  projects: [
    RUN_STANDALONE_TESTS
      ? {
          displayName: "test-standalone",
          setupFiles: ["<rootDir>/tests_config/run_spec.js"],
          testRegex: "jsfmt\\.spec\\.js$|__tests__/.*\\.js$",
          snapshotSerializers: ["jest-snapshot-serializer-raw"],
          testEnvironment: "jsdom",
          globals: {
            STANDALONE: true,
          },
          runner: "jest-light-runner",
          transform: {},
        }
      : {
          displayName: "test-node",
          setupFiles: ["<rootDir>/tests_config/run_spec.js"],
          testRegex: "jsfmt\\.spec\\.js$|__tests__/.*\\.js$",
          snapshotSerializers: ["jest-snapshot-serializer-raw"],
          testEnvironment: "node",
          globals: {
            STANDALONE: false,
          },
          runner: "jest-light-runner",
          transform: {},
        },
    {
      runner: "jest-runner-eslint",
      displayName: "lint",
      testMatch: ["<rootDir>/**/*.js"],
      testPathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/coverage/",
      ],
    },
  ],
};
