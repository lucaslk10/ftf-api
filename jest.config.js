export default {
  setupFiles: ['<rootDir>/test/setEnvVars.js'],
  testTimeout: 30000,
  bail: true,
  clearMocks: true,
  coverageProvider: 'v8',
  roots: ['<rootDir>'],
  testMatch: ['***/src/**/*.js?(x)', '**/?(*.)(test|spec).js?(x)'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/infra/**/*.js',
    '!<rootDir>/src/adapters/**/*.js',
    '!<rootDir>/src/container.js',
    '!<rootDir>/src/**/helper.js',
    '!<rootDir>/src/**/index.js'
  ],
  coveragePathIgnorePatterns: [
    '-factory.*.js'
  ],

  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: false,
  transform: {}
}
