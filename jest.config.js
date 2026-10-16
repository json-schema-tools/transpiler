module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: require('path').join(__dirname, 'coverage'),
  coverageReporters: ['text', 'lcov', 'json-summary'],
  coverageThreshold: { global: { branches: 84.54, functions: 95.65, lines: 94.36, statements: 94.25 } },
  resetMocks: true,
  restoreMocks: true,
  rootDir: './src',
  preset: 'ts-jest'
};
