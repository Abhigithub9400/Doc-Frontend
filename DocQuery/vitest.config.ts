import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    // globals: true, // Enables global test APIs like `describe`, `it`, etc.
    // environment: 'jsdom', // Uses jsdom to simulate a browser environment
    environment: 'nuxt',
  },
});
