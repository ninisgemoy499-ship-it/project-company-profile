export default [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['src/**/*.js'],
    rules: {
      'no-console': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
]
