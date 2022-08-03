/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    './.eslintrc-auto-import.json'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // 允许any
    '@typescript-eslint/no-non-null-assertion': ['off'] // 允许非空断言
  }
}
