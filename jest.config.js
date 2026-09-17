module.exports = {
  clearMocks: true,
  moduleFileExtensions: ["js", "ts"],
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  testRunner: "jest-circus/runner",
  transform: {
    "^.+\\.(ts|js)$": ["ts-jest", { tsconfig: { allowJs: true }, diagnostics: false }],
  },
  moduleNameMapper: {
    '^undici$': '<rootDir>/__mocks__/undici.js',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@octokit|universal-user-agent|before-after-hook|content-type|before-after-hook|@ungap/structured-clone))",
  ],
  verbose: true,
};

const processStdoutWrite = process.stdout.write.bind(process.stdout);

process.stdout.write = (str, encoding, cb) => {
  if (!String(str).startsWith("::")) {
    return processStdoutWrite(str, encoding, cb);
  }
};
