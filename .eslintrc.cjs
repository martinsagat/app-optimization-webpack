/* eslint-env node */
module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,  // Include Node.js specific globals (e.g., module, exports)
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  root: true,
  globals: {

  },
  overrides: [
    {
      files: ['*.js'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  ],
  ignorePatterns: [
    '/dist/**/*',
    '/webpack/**/*',
    '/postcss.config.js'
  ],
  rules: {
    'eol-last': ['error', 'always'], // Enforce newline at the end of files
  }
};