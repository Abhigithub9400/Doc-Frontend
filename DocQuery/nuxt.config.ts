import { defineNuxtConfig } from 'nuxt/config';
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_BASE_API_URL || 'https://docquery-backend-dev.mypits.org/api', // Default fallback
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxt/test-utils/module',
    '@vueform/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/storybook',
    '@primevue/nuxt-module',
    '@nuxt/icon',
  ],
  piniaPluginPersistedstate: {
    storage: 'sessionStorage',
    cookieOptions: {
      sameSite: 'lax',
    },
    debug: true,
  },
  googleFonts: {
    families: {
      Inter: [100, 200, 300, 400, 500, 700, 900],
    },
    display: 'swap',
    preload: true,
  },
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura,
      },
    },
  },
  css: [
    '~/assets/css/tailwind.css',
    'vue3-side-panel/dist/vue3-side-panel.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: [
    { path: '~/components/views', pathPrefix: false },
    '~/components',
  ],
  devtools: { enabled: false },
  compatibilityDate: '2024-11-01',
  nitro: { preset: 'node-server' },
  plugins: [
    {
      src: '~/plugins/axios',
      mode: 'client',
    },
    {
      src: '~/plugins/confirm',
      mode: 'client',
    },
    {
      src: '~/plugins/toast',
      mode: 'client',
    },
  ],
  icon: {
    provider: 'server',
    customCollections: [
      {
        prefix: 'icon',
        dir: './assets/icons',
        normalizeIconName: false,
      },
      {
        prefix: 'normal',
        dir: './assets/icons',
        normalizeIconName: false,
      },
    ],
  },
});
