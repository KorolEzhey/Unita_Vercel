import js from "@eslint/js";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import prettierPlugin from "eslint-plugin-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
    {
        ignores: [
            "node_modules",
            ".next",
            "dist",
            "build",
            "coverage",
            "*.config.js",
            "*.config.mjs",
        ],
    },
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: { jsx: true },
                project: "./tsconfig.json",
            },
            globals: {
                ...globals.browser,
                React: "readonly",
                JSX: "readonly",
                NodeJS: "readonly",
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
            "@next/next": nextPlugin,
            prettier: prettierPlugin,
            "jsx-a11y": jsxA11y,
            import: importPlugin,
            "simple-import-sort": simpleImportSort,
        },
        settings: {
            react: { version: "detect" },
            "import/resolver": {
                typescript: true,
                node: true,
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,

            // Правила Next.js
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,

            // React правила
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react/jsx-curly-brace-presence": ["error", "never"],
            "react/self-closing-comp": "error",

            // React Hooks
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",

            // TypeScript
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    varsIgnorePattern: "^_",
                    argsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/consistent-type-imports": [
                "error",
                { prefer: "type-imports" },
            ],

            // Импорты
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "import/first": "error",
            "import/newline-after-import": "error",
            "import/no-duplicates": "error",

            // Доступность
            // Prettier
            "prettier/prettier": ["error", {
                endOfLine: "auto",
                semi: true,
                singleQuote: true,
                tabWidth: 2,
                trailingComma: "es5",
                printWidth: 80,
                bracketSpacing: true,
                arrowParens: "always"
            }],
            "jsx-a11y/alt-text": "warn",
            "jsx-a11y/aria-props": "warn",
            "jsx-a11y/aria-proptypes": "warn",
            "jsx-a11y/role-has-required-aria-props": "warn",

            // Общие правила
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "no-debugger": "warn",
            "no-unused-expressions": "warn",
            "prefer-const": "error",
            "spaced-comment": ["error", "always"],
            "no-duplicate-imports": "error",
            "sort-imports": "off",

            // Правило Prettier должно быть последним!
            "prettier/prettier": ["error", {
                endOfLine: "auto",
                semi: true,
                singleQuote: true,
                tabWidth: 2,
                trailingComma: "es5"
            }],
        },
    },
];
