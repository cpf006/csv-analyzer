/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
};

module.exports = config;
