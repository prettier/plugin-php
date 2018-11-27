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
      displayName: "test",
      setupFiles: ["<rootDir>/tests_config/run_spec.js"],
      testRegex: "jsfmt\\.spec\\.js$|__tests__/.*\\.js$",
      snapshotSerializers: ["<rootDir>/tests_config/raw-serializer.js"],
      testEnvironment: "node"
    },
    {
      runner: "jest-runner-eslint",
      displayName: "lint",
      testMatch: ["<rootDir>/**/*.js"],
      testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/coverage/"]
    }
  ]
};
