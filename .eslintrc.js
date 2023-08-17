module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    // "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  plugins : ["prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": 'off',
<<<<<<< HEAD
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ]
=======
    "vue/no-use-v-if-with-v-for": 'off'
>>>>>>> 165f58bb7f0446a9fb7d8428839cc9ed833e0242
  },
};
