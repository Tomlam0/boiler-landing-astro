import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import onlyWarnPlugin from 'eslint-plugin-only-warn';

import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

import astroPlugin from 'eslint-plugin-astro';
import prettierPlugin from 'eslint-plugin-prettier';
import tailwindCanonicalClasses from 'eslint-plugin-tailwind-canonical-classes';

export default [
  {
    ignores: [
      'astro.config.mjs',
      'sanity.cli.ts',
      'node_modules/**',
      'coverage/**',
      '.astro/**',
      '.sanity/**',
      'dist/**',
      'build/**',
      '*.pem',
      '*.log',
      '.pnpm-debug.log*',
      '.env*',
      '*.tsbuildinfo',
    ],
  },
  ...astroPlugin.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],

    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
      'only-warn': onlyWarnPlugin,

      react: reactPlugin,
      'react-hooks': reactHooksPlugin,

      prettier: prettierPlugin,
      'tailwind-canonical-classes': tailwindCanonicalClasses,
    },

    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },

    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: true,
      },
      react: {
        version: 'detect',
      },
    },

    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,

      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-undef': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
      'react/button-has-type': 'off',

      'import/prefer-default-export': 'off',
      'import/no-unresolved': [
        'warn',
        { caseSensitive: false, ignore: ['astro:*', 'sanity:*'] },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],

      'no-unused-vars': 'off',
      'no-underscore-dangle': 'off',
      'no-console': 'off',

      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-use-before-define': [
        'warn',
        { functions: true, classes: true, variables: false },
      ],

      'tailwind-canonical-classes/tailwind-canonical-classes': [
        'warn',
        { cssPath: './src/styles/globals.css' },
      ],
    },
  },
];
