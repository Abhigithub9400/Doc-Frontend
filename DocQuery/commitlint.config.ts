import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 50], // Limit subject to 50 characters
    'subject-case': [2, 'always', 'sentence-case'], // Capitalize subject line (start with uppercase)
    'body-max-line-length': [2, 'always', 72], // Wrap body at 72 characters
    'type-enum': [
      2,
      'always',
      [
        'feat', // A new feature
        'fix', // A bug fix
        'docs', // Documentation changes
        'style', // Formatting
        'refactor', // Refactoring code
        'perf', // Performance improvements
        'test', // Adding tests
        'chore', // Miscellaneous tasks
      ],
    ],
  },
};

export default config;
