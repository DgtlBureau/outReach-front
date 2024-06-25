module.exports = {
  env: {
    node: true,
  },
  extends: 'eslint:recommended',

  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      env: {
        browser: true,
        es2020: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      plugins: ['react-refresh'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
        'react-refresh/only-export-components': 'warn',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
}
