"use strict";

const ENABLE_COVERAGE = !!process.env.CI;

module.exports = {
  collectCoverage: ENABLE_COVERAGE,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.js",
    "!<rootDir>/node_modules/",
    "!<rootDir>/tests_config/"
  ],
  projects: [
    {
      displayName: "test-node",
      setupFiles: ["<rootDir>/tests_config/run_spec.js"],
      testRegex: "jsfmt\\.spec\\.js$|__tests__/.*\\.js$",
      snapshotSerializers: ["jest-snapshot-serializer-raw"],
      testEnvironment: "node",
      globals: {
        STANDALONE: false
      }
    },
    ...(process.env.SKIP_STANDALONE_TESTS === "true"
      ? []
      : [
          {
            displayName: "test-standalone",
            setupFiles: ["<rootDir>/tests_config/run_spec.js"],
            testRegex: "jsfmt\\.spec\\.js$|__tests__/.*\\.js$",
            snapshotSerializers: ["jest-snapshot-serializer-raw"],
            testEnvironment: "jsdom",
            globals: {
              STANDALONE: true
            }
          }
        ]),
    {
      runner: "jest-runner-eslint",
      displayName: "lint",
      testMatch: ["<rootDir>/**/*.js"],
      testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/coverage/"]
    }
  ]
};
