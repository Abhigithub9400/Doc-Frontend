import { useCustomConfirm } from '~/composables/useCustomConfirm';

export default defineNuxtPlugin((nuxtApp) => {
  const { openConfirm } = useCustomConfirm();

  nuxtApp.provide('showConfirm', openConfirm);
});
