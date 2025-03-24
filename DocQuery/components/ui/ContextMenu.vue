<template>
  <div class="relative">
    <Button
      pt:root:class="!p-0 !py-1 !border-none !bg-transparent"
      @click="handleClick"
    >
      <Icon name="normal:hamburger" />
    </Button>
    <Menu
      id="overlay_menu"
      ref="menu"
      :model="items"
      :popup="true"
      append-to="self"
      pt:root:class="!top-8 !right-0 !left-auto"
      pt:submenu-label:class="!hidden"
      pt:list:class="!p-2"
    />
  </div>
</template>

<script setup lang="ts">
import Menu from 'primevue/menu';
import { CRUD } from '~/enums';

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits(['action']);

const menu = ref();
const items = ref([
  {
    items: [
      {
        label: 'View Details',
        command: () => {
          emit('action', CRUD.VIEW);
        },
      },
      {
        label: 'Edit',
        command: () => {
          emit('action', CRUD.EDIT);
        },
      },
      {
        label: 'Delete',
        command: () => {
          emit('action', CRUD.DELETE);
        },
      },
    ],
  },
]);

const handleClick = (event: Event) => {
  menu.value.toggle(event);
};
</script>
