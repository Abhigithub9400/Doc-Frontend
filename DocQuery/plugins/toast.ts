import { useCustomToast } from '~/composables/useAlert';

export default defineNuxtPlugin((nuxtApp) => {
  const { showToast } = useCustomToast();

  nuxtApp.provide('showToast', showToast);
});
