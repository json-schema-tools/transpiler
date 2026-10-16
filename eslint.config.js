// Flat config for ESLint 9. Replaces .eslintrc.js.
const js = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');

module.exports = [
  js.configs.recommended,
  tseslint.configs['flat/eslint-recommended'],
  ...tseslint.configs['flat/recommended'],
  {
    // Generated code fixtures produced by the codegen, not hand-written source.
    ignores: [
      'src/integration-tests/expecteds/**',
      'build/**',
      'docs/**',
      'coverage/**',
    ],
  },
  {
    // Root CJS config files: require() is the module system available to them.
    files: ['eslint.config.js', 'jest.config.js'],
    languageOptions: {
      globals: {
        require: 'readonly',
        module: 'writable',
        exports: 'writable',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];
