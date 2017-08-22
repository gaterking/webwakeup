module.exports = {
    verbose: false,
    rootDir: '../',
    testPathIgnorePatterns: ['/node_modules/', '/config/'],
    transform: {
    //  ".(ts|tsx)": '<rootDir>/node_modules/ts-jest/preprocessor.js'
    },
    //testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    moduleFileExtensions: [
      'ts',
      'tsx',
      'js'
    ],
    globals: {
      "ts-jest": {
        tsConfigFile: './config/tsconfig.json'
      }
    }
  };