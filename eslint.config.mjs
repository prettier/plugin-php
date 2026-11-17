import eslintPluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginPrettierDoc from "eslint-plugin-prettier-doc";
import eslintPluginImport from "eslint-plugin-import";
import globals from "globals";

export default [
  eslintPluginJs.configs.recommended,
  eslintPluginPrettierDoc.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.builtin,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      eqeqeq: "error",
      curly: "error",
      "no-else-return": "error",
      "no-inner-declarations": "error",
      "no-useless-return": "error",
      "no-var": "error",
      "one-var": ["error", "never"],
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "prefer-destructuring": "error",
      "prefer-template": "error",
      strict: "error",
      "symbol-description": "error",
      yoda: [
        "error",
        "never",
        {
          exceptRange: true,
        },
      ],
      "import/extensions": ["error", "ignorePackages"],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "tests*/**",
            "scripts/**",
            "build/**",
            "eslint.config.mjs",
          ],
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
  {
    files: ["tests/**/*.mjs"],
    languageOptions: {
      globals: {
        run_spec: "readonly",
      },
    },
  },
  {
    ignores: ["standalone.js"],
  },
];
