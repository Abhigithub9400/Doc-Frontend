<template>
  <div class="flex items-center">
    <button
      class="w-[30px] h-[30px] rounded-full border border-[black]"
      @click="toggleMenu"
    >
      <img
        v-if="!authStore.avatarUrl"
        src="~/assets/images/avatar.png"
        alt="default avatar image"
        class="rounded-full"
      />
      <img v-else src="" alt="profile image" width="30px" height="30px" />
    </button>
    <Menu
      ref="menuRef"
      :popup="true"
      pt:root:class="p-4"
      pt:list:class="!hidden"
      pt:end:class="!mt-2"
    >
      <template #start>
        <div class="flex flex-col justify-center gap-3">
          <span class="h-fit w-full inline-flex items-center gap-2.5">
            <span
              class="w-8 h-8 flex items-center justify-center rounded-full text-textSuccess bg-surfaceSuccess text-xs leading-[18px] font-medium"
              >SA</span
            >
            <span class="text-sm text-textPrimary font-normal">{{
              authStore.isSuperAdmin
                ? 'Super Admin'
                : authStore.username.toUpperCase()
            }}</span>
          </span>
          <Divider pt:root:class="!m-0" />
        </div>
      </template>
      <template #end>
        <a
          v-ripple
          class="flex p-2 text-center justify-between items-center w-full hover:cursor-pointer hover:bg-surfaceBackgroundGrey rounded-lg h-fit"
          @click="logout"
        >
          <span class="text-textError">Logout</span>
          <Icon name="normal:logout" width="1rem" height="1rem" />
        </a>
      </template>
    </Menu>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/stores/useAuthStore';
import Divider from 'primevue/divider';

const authStore = useAuthStore();

const menuRef = ref();

const toggleMenu = (event: MouseEvent) => {
  menuRef.value.toggle(event);
};

const isAuthenticated: ComputedRef<boolean> = computed(() => {
  return authStore.getIsAuthenticated;
});

watch(isAuthenticated, () => {
  if (!isAuthenticated.value) {
    navigateTo('/login');
  }
});
const logout = async () => {
  useNuxtApp()?.$showConfirm({
    header: 'Logout',
    message: 'Are you sure Logout?',
    icon: 'logout',
    type: 'logout',
    accept: async () => {
      await authStore.logout();
    },
  });
};
</script>
