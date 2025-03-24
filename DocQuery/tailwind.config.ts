import type { Config } from 'tailwindcss';
// @ts-expect-error Type declaration missing in the package
import vueform from '@vueform/vueform/tailwind';

export default <Partial<Config>>{
  darkMode: 'class',
  content: {
    files: [
      // All directories and extensions will correspond to your Nuxt config
      '/components/**/*.{vue,js,jsx,mjs,ts,tsx}',
      '/layouts/**/*.{vue,js,jsx,mjs,ts,tsx}',
      '/pages/**/*.{vue,js,jsx,mjs,ts,tsx}',
      '/plugins/**/*.{js,ts,mjs}',
      '/composables/**/*.{js,ts,mjs}',
      '/providers/**/*.{vue,js,ts,mjs}',
      '/utils/**/*.{js,ts,mjs}',
      '/{A,a}pp.{vue,js,jsx,mjs,ts,tsx}',
      '/{E,e}rror.{vue,js,jsx,mjs,ts,tsx}',
      './vueform.config.ts',
      './node_modules/@vueform/vueform/themes/tailwind/**/*.vue',
      './node_modules/@vueform/vueform/themes/tailwind/**/*.js',
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // This makes Inter the default font
      },
      screens: {
        tab: '46.5rem',
        desktop: '85.375rem',
      },
      fontSize: {
        xle: ['1.375rem', '1.625rem'],
        '2xle': ['1.75rem', '2.125rem'],
      },
    },
    colors: {
      transparent: 'transparent',
      textPrimary: 'var(--neutral-800)',
      textPlaceholder: 'var(--neutral-200)',
      textLabel: 'var(--neutral-400)',
      textLink: 'var(--primary-800)',
      textLinkHover: 'var(--primary-500)',
      textDisabled: 'var(--neutral-300)',
      textInformation: 'var(--information-600)',
      textSuccess: 'var(--success-600)',
      textWarning: 'var(--yellow-600)',
      textError: 'var(--error-600)',
      textButtonText: 'var(--primary-500)',
      textInverse: 'var(--neutral-white)',
      surfacePage: 'var(--neutral-white)',
      surfacePageLightBlue: 'var(--primary-50)',
      surfaceBackgroundGrey: 'var(--neutral-100)',
      surfaceBackground: 'var(--neutral-white)',
      surfaceSuccess: 'var(--success-100)',
      surfaceWarning: 'var(--warning-200)',
      surfaceError: 'var(--error-100)',
      surfaceDisabled: 'var(--neutral-100)',
      surfaceActionButton: 'var(--secondary-900)',
      surfaceActionButtonHover: 'var(--neutral-600)',
      surfaceBackgroundGray: 'var(--neutral-100)',
      borderPrimary100: 'var(--neutral-100)',
      borderPrimary200: 'var(--neutral-200)',
      borderSecondary: 'var(--primary-400)',
      borderSecondary900: 'var(--secondary-900)',
      borderTertiary: 'var(--neutral-dark)',
      borderSuccess: 'var(--success-600)',
      borderWarning: 'var(--warning-600)',
      borderError: 'var(--error-600)',
      borderDisabled: 'var(--neutral-300)',
      borderAction: 'var(--primary-500)',
      borderActionHover: 'var(--primary-600)',
      borderFocus: 'var(--primary-500)',
      borderLightest: 'var(--neutral-50)',
      iconPrimary: 'var(--neutral-400)',
      iconInformation: 'var(--information-600)',
      iconSuccess: 'var(--success-600)',
      iconWarning: 'var(--warning-600)',
      iconError: 'var(--error-600)',
      information: 'var(--information)',
      error: 'var(--error)',
      warning: 'var(--warning)',
      success: 'var(--success)',
      delete: 'var(--delete)',
      logout: 'var(--logout)',
      'alert-success': 'var(--alert-success)',
      'alert-info': 'var(--alert-info)',
      'alert-error': 'var(--alert-error)',
      'alert-warning': 'var(--alert-warning)',
      'repository-active': 'var(--repository-active-bg)',
      white: 'var(--white)',
      loginPrimaryBg: 'var(--login-primary)',
      loginPrimaryHoverBg: 'var(--login-primary-200)',
      loginPrimaryText: 'var(--login-text)',
    },
  },

  plugins: [vueform],
};
