import js from '@eslint/js'
import pluginVitest from '@vitest/eslint-plugin'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue,js,jsx,cjs,mjs,cts}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/*.min.js', '**/*.bundle.js', 'dist/*'],
  },

  js.configs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },

  {
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single', { 'avoidEscape': true }],
      'comma-dangle': ['error', 'always-multiline'],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'operator-linebreak': ['error', 'before'],
      'space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      }],
      'eol-last': ['error', 'always'],
      curly: ['error', 'all'],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'block-spacing': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'no-trailing-spaces': ['error'],
      'indent': ['error', 2, { SwitchCase: 1 }],
    },
  },
]
