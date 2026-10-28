import js from '@eslint/js'
import react from 'eslint-plugin-react'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        window: 'readonly', document: 'readonly', localStorage: 'readonly',
        sessionStorage: 'readonly', requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly', IntersectionObserver: 'readonly',
        ResizeObserver: 'readonly', matchMedia: 'readonly', console: 'readonly',
        setTimeout: 'readonly', clearTimeout: 'readonly', parseFloat: 'readonly',
      },
    },
    plugins: { react },
    settings: { react: { version: 'detect' } },
    rules: {
      ...js.configs.recommended.rules,
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
]
