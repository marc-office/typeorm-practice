module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['standard', 'plugin:@typescript-eslint/eslint-recommended'],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    strictPropertyInitialization: 'off'
  }
}
