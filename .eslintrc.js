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
    "standard"
  ],
  rules: {
    'prefer-const': 'off'
  }
}