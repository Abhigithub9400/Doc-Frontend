<script setup lang="ts">
import { useRoute } from 'vue-router';
import SideMenu from '~/components/SideMenu.vue';
import AppHeader from '~/components/AppHeader.vue';

const route = useRoute();
const isLoginPage = route.path === '/login';
</script>

<template>
  <div class="flex h-screen overflow-y-hidden overflow-x-hidden">
    <SideMenu v-if="!isLoginPage" />
    <main class="flex-1 flex flex-col">
      <AppHeader />
      <div class="flex-1 overflow-auto">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
main {
  height: 100vh;
  /* Prevents content from expanding beyond viewport */
  max-height: 100vh;
}
</style>
