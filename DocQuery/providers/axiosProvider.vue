<script setup lang="ts">
import { useAxios } from '~/composables/useAxios';

const { isLoading } = useAxios();

const axiosLoading = ref(isLoading);
</script>

<template>
  <div class="w-full h-full relative">
    <slot />
    <div
      v-if="axiosLoading"
      data-testid="global-loader"
      class="fixed z-[100] w-full left-0 top-0 h-screen flex justify-center items-center bg-gray-300 backdrop-blur-2xl"
    >
      <ProgressSpinner />
    </div>
  </div>
</template>

<style scoped>
/* TEMPORARY. This whole component will be replaced with the grid syle loader component */
::v-deep {
  .p-progressspinner-circle {
    stroke: var(--success-400) !important;
  }
}
</style>
