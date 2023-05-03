module.exports = {
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
      plugins: ["@typescript-eslint/eslint-plugin"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
      ],
      rules: {
        "no-empty-function": "off",
        "@typescript-eslint/no-empty-function": ["error"],
        "comma-dangle": "off",
        "@typescript-eslint/comma-dangle": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-console": ["warn", { allow: ["debug", "warn", "error", "info"] }],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["warn"],
        indent: "off",
        "@typescript-eslint/indent": ["off"],
        "import/no-named-as-default": 0,
      },
    },
  ],
};
