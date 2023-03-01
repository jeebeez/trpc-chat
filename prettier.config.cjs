/** @type {import("prettier").Config} */
const config = {
  //plugins: [require.resolve("prettier-plugin-tailwindcss")],
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  arrowParens: 'always',
  bracketSpacing: true,
};

module.exports = config;
