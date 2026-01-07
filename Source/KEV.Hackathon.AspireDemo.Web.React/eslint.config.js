import js from "@eslint/js";

import eslintPluginImport from "eslint-plugin-import";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

import globals from "globals";

export default [
  // Global ignores
  {
    ignores: [
      "dist/**",
      "build/**",
      "coverage/**",
      "node_modules/**",
      "*.config.js",
      "*.config.ts",
      "public/**",
      ".vite/**",
    ],
  },

  {
    files: ["**/*.{js,jsx}"],

    ...js.configs.recommended,

    ...eslintPluginReact.configs.flat.recommended,
    ...eslintPluginReact.configs.flat['jsx-runtime'],

    ...eslintPluginImport.flatConfigs.recommended,

    languageOptions: {
      ...eslintPluginReact.configs.flat.recommended.languageOptions,

      ecmaVersion: 'latest',
      sourceType: "module",

      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "react-refresh": eslintPluginReactRefresh,
      import: eslintPluginImport,
    },

    settings: {
      react: {
        version: "detect",
      },

      "import/resolver": {
        node: {
          extensions: [".js", ".jsx"],
        },
      },
    },

    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.recommended.rules,

      // React 17+ JSX Transform - React not needed in scope
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      'no-unused-vars': 'warn',
      'import/no-dynamic-require': 'warn',
      'import/no-nodejs-modules': 'off',
    },
  },

  eslintPluginPrettier
];
