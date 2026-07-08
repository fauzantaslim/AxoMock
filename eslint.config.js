import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['public/js/*.min.js', 'dist/**', 'coverage/**'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
    },
    ignores: ['node_modules/', 'public/', 'src/data/*.json'],
  },
];
