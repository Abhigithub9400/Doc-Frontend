<template>
  <div>
    <AxiosProvider>
      <ConfirmProvider>
        <AlertProvider>
          <NuxtLayout>
            <NuxtPage />
          </NuxtLayout>
        </AlertProvider>
      </ConfirmProvider>
    </AxiosProvider>
  </div>
</template>

<script setup lang="ts">
import { useCookies } from '@vueuse/integrations/useCookies';
import ConfirmProvider from '~/providers/confirmProvider.vue';
import AlertProvider from '~/providers/alertProvider.vue';
import AxiosProvider from '~/providers/axiosProvider.vue';

const { apiUrl } = useRuntimeConfig().public;
useCookies().set('baseUrl', apiUrl, { httpOnly: false });
</script>
