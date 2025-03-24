// Commitlint.test.ts
import { execSync } from 'child_process';
import { describe, expect, it } from 'vitest';

describe('Git Commit Hooks', () => {
  it('should pass commitlint with valid commit message', () => {
    // Simulate a valid commit message like `feat: add user login functionality`
    const validCommitMessage = 'feat: add user login functionality';

    // Simulate running commitlint on a commit message
    const result = execSync(
      `echo "${validCommitMessage}" | node --loader ts-node/esm --require tsconfig-paths/register commitlint.config.ts --edit`,
    );

    expect(result.toString()).not.toContain('Error');
  });

  it('should fail commitlint with invalid commit message (no type)', () => {
    // Simulate an invalid commit message like `added user login functionality`
    const invalidCommitMessage = 'added user login functionality';

    // Simulate running commitlint on a commit message
    try {
      execSync(
        `echo "${invalidCommitMessage}" | npx --no-install ts-node commitlint.config.ts --edit`,
      );
    } catch (error) {
      const err = error as Error;
      expect(err.message).toContain('Error');
    }
  });

  it('should pass lint-staged for valid files', () => {
    // Simulate running lint-staged on a file that meets the linting and formatting rules
    try {
      execSync('npx lint-staged');
    } catch (error) {
      const err = error as Error;
      expect(err.message).toBeNull();
    }
  });

  it('should run prettier and eslint with lint-staged', () => {
    // Simulate running lint-staged with prettier and eslint on valid files
    const result = execSync('npx lint-staged');
    expect(result.toString()).not.toContain('Error');
  });
});
