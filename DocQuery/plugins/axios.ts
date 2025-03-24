import createAxiosClient from '~/utils/axiosClient';
import type { AxiosInstance } from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const axiosClient: AxiosInstance = <AxiosInstance>(
    createAxiosClient(config.public.apiUrl)
  );
  nuxtApp.provide('axios', axiosClient);
});
