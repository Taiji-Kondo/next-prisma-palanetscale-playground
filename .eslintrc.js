module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  plugins: [
    'simple-import-sort',
    'sort-keys-fix',
    'sort-destructure-keys',
    'typescript-sort-keys',
    'import',
    'unused-imports',
  ],
  rules: {
    'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'sort-keys-fix/sort-keys-fix': 'warn',
    'sort-destructure-keys/sort-destructure-keys': 'warn',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'typescript-sort-keys/interface': 'warn',
    'typescript-sort-keys/string-enum': 'warn',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'unused-imports/no-unused-imports': 'warn',
  },
  ignorePatterns: ['**/*.js', '**/*.json', 'node_modules', 'public', '.next', 'dist'],
};
