/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts'],
  displayName: 'Tests Typescript Application - Job',
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
};

// displayName: 'Tests Typescript Application - Job',
// moduleDirectories: ['node_modules', 'src'],
// testMatch: ['**/?(*.)+(spec|test).ts'],
// preset: 'ts-jest',
// testEnvironment: 'node',
