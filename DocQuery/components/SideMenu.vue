<template>
  <div
    class="hidden tab:flex tab:w-16 h-screen bg-[var(--primary-black)] py-6 px-3"
  >
    <div class="w-full h-full flex flex-col items-center">
      <div class="menuTop h-full flex flex-col gap-4 items-center">
        <button class="w-auto mx-auto mb-2" @click="handleBrandingClick">
          <Icon name="icon:branding" width="2rem" height="2rem" />
        </button>
        <button class="mt-2 mx-2.5 mb-4">
          <Icon name="icon:search" width="1.5rem" height="1.5rem" />
        </button>
        <div class="flex-1 flex flex-col items-center gap-[0.9375rem] w-full">
          <div
            v-for="navLink in navLinks"
            :key="navLink.key"
            :class="activeClass(navLink.route)"
          >
            <button
              class="flex items-center"
              @click="navigateTo(navLink.route)"
            >
              <Icon :name="`icon:${navLink.icon}`" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { watchEffect, ref } from 'vue';
import { useAuthStore } from '~/stores/useAuthStore';
import type { INavLink } from '~/types';
const route = useRoute();

const authStore = useAuthStore();
const navLinks = ref<INavLink[]>([
  { key: 'home', name: 'Home', icon: 'home', route: '/tenant' },
  {
    key: 'category',
    name: 'Category',
    icon: 'category-white',
    route: '/categories',
  },
]);

watchEffect(() => {
  if (route.meta.navLinks) {
    navLinks.value = route.meta.navLinks as INavLink[];
  }
});

const activeClass = (path: string) => {
  if (path === route.path) {
    return 'rounded-lg p-1 bg-[linear-gradient(134deg,_#C8EF7B_4.47%,_#6A990E_96.44%)] w-full h-auto aspect-square flex items-center justify-center';
  } else {
    return;
  }
};

const handleBrandingClick = () => {
  if (authStore.isSuperAdmin) {
    navigateTo('/tenants');
  } else if (authStore.isAdmin) {
    navigateTo('/categories');
  } else {
    return;
  }
};
</script>
