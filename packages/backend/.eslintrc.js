module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dist/**/*', 'node_modules/**/*'],
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/prefer-nullish-coalescing': 'off', // Requires strictNullChecks
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/ban-ts-comment': 'warn', // Allow @ts-ignore with warning

    // NestJS specific rules
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/ban-types': 'off',

    // General code quality
    'no-console': 'warn', // Warn about console.log in production code
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',

    // Import organization
    'sort-imports': ['error', {
      'ignoreCase': false,
      'ignoreDeclarationSort': true,
      'ignoreMemberSort': false,
      'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
      'allowSeparatedGroups': false
    }],

    // Async/await best practices
    'require-await': 'warn', // Allow async methods without await for now
    'no-return-await': 'warn', // Warn instead of error

    // Security and best practices
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',

    // Code style (handled by Prettier, but some logical rules)
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'brace-style': 'off', // Let Prettier handle this
  },
  overrides: [
    {
      // Test files can be more lenient
      files: ['**/*.spec.ts', '**/*.test.ts', '**/test/**/*.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'no-console': 'off',
      },
    },
    {
      // Migration files or scripts can use console.log
      files: ['**/*.seed.ts', '**/migrations/**/*.ts', '**/scripts/**/*.ts'],
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
