module.exports = {
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
      plugins: ["@typescript-eslint", "react-hooks", "prettier"],
      rules: {
        "no-empty-function": "off",
        "@typescript-eslint/no-empty-function": ["error"],
        "@typescript-eslint/no-explicit-any": "off",
        "no-console": ["warn", { allow: ["debug", "warn", "error"] }],
        "comma-dangle": "off",
        "@typescript-eslint/comma-dangle": "off",
        "react/prop-types": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["warn"],
        indent: "off",
        "@typescript-eslint/indent": ["off"],
        "import/no-named-as-default": 0,
      },
    },
  ],
};
