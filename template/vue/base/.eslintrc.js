module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "plugin:vue/essential",
  ],
  rules: {
    'prefer-const': 'off'
  }
}