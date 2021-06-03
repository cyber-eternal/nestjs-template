module.exports = {
  collectCoverageFrom: [
    "**/*.ts",
    "!**/*.entity.ts",
  ],
  coverageDirectory: "../coverage",
  moduleFileExtensions: [
    "js",
    "json",
    "ts",
  ],
  rootDir: "src",
  testEnvironment: "node",
  testRegex: ".spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
};
