// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import js from '@eslint/js';

export default withNuxt([
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'arrow-body-style': ['error', 'always'],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'any',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
    },
  },
]);
