module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  <%_ if (eslintFormat === 'prettier') { _%>
  plugins: ["prettier"],
  <%_ } _%>
  extends: [
    "plugin:vue/essential",
    <%_ if (eslintFormat === 'standard') { _%>
    "standard",
    <%_ } else if (eslintFormat === 'airbnb') { _%>
    "airbnb-base",
    <%_ } _%>
  ],
  rules: {
    'prefer-const': 'off',
    <%_ if (eslintFormat === 'prettier') { _%>
    'prettier/prettier': 'error'
    <%_ } _%>
  }
}