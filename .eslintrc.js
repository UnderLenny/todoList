module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  rules: {
    "no-console": 0,
    "import/prefer-default-export": 0,
    "prefer-template": 0,
    "no-unused-vars": ["error", { args: "none" }],
  },
  plugins: ["@typescript-eslint"],
};
