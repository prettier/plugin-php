"use strict";

const ENABLE_COVERAGE = !!process.env.CI;

module.exports = {
  displayName: "test",
  setupFiles: ["<rootDir>/tests_config/run_spec.js"],
  testRegex: "jsfmt\\.spec\\.js$|__tests__/.*\\.js$",
  snapshotSerializers: ["<rootDir>/tests_config/raw-serializer.js"],
  collectCoverage: ENABLE_COVERAGE,
  collectCoverageFrom: ["src/**/*.js", "!<rootDir>/node_modules/"],
  testEnvironment: "node"
};
