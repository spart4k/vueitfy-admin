module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'prettier',
    // "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  plugins: ['prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/valid-v-for': 'off',
    'no-unused-vars': 'off',
    'no-prototype-builtins': 'off',
    'no-control-regex': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        semi: false,
        singleQuote: true,
      },
    ],
  },
}
