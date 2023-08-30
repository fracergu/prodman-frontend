const { pathsToModuleNameMapper } = require('ts-jest')
const tsconfig = require('./tsconfig')

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  roots: ['<rootDir>/src/'],
  testEnvironment: 'jsdom',
  testMatch: ['**/*.spec.ts'],
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '.model.ts',
    '.type.ts',
    '.api.ts',
    '.mock.ts',
    '.module.ts',
    '.js',
    '.html',
  ],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
}
