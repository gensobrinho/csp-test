module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/features/**/__tests__/**/*.spec.[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['@swc/jest', {
      jsc: {
        parser: { syntax: 'typescript', tsx: true },
        transform: { react: { runtime: 'automatic' } },
        target: 'es2020',
      },
      module: { type: 'commonjs' },
    }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^(\\.{1,2}/.*)\\.ts$': '$1',
  },
  clearMocks: true,
};