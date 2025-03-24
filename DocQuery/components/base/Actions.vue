<template>
  <div :id="`id-${id}-action-container`" class="category-action-menu-action">
    <button
      ref="buttonRef"
      class="w-auto h-full aspect-square flex items-center justify-center rounded-lg"
      :data-login-id="`id-${id}-category-folder-wrapper`"
      @click="toggle"
    >
      <Icon :name="`normal:3-dot-black`" />
    </button>
    <Menu
      :id="`base-action-menu-${id}`"
      ref="baseActionMenu"
      :model="items"
      :append-to="`${appendId ? appendId : 'self'}`"
      :popup="true"
      :pt="{
        root: () => {
          return {
            style: getMenuStyle,
          };
        },
      }"
      @show="handlePositionAndStyle"
    >
      <template #item="{ item }">
        <div class="flex px-1 py-2">
          <div class="mr-2">
            <Icon :name="`normal:${item.icon}`" />
          </div>
          <div>
            <span>{{ item.label }}</span>
          </div>
        </div>
      </template>
    </Menu>
  </div>
</template>

<script setup lang="ts">
const buttonRef = ref<HTMLButtonElement | null>(null);
const baseActionMenu = ref(null);
const baseActionStyles = ref<DOMRect>();

const props = defineProps<{
  id: string; // Optional
  items?: Record<string, unknown>[]; // Optional array of objects
  appendId?: string; // Optional
}>();

const toggle = async (event: Event) => {
  event.preventDefault();
  baseActionMenu?.value?.toggle(event);
  event.stopPropagation();
};

const handlePositionAndStyle = async () => {
  await nextTick(() => {
    const element = document.getElementById(`base-action-menu-${props?.id}`);
    baseActionStyles.value = element?.getBoundingClientRect();
  });
};

const getMenuStyle = computed(() => {
  try {
    if (buttonRef?.value) {
      const buttonElement = buttonRef?.value.getBoundingClientRect();
      if (buttonElement) {
        let width = 0;
        if (baseActionStyles.value) {
          width = baseActionStyles.value?.width;
        }
        return {
          top: `${buttonElement.top + buttonElement.height}px`,
          left: `${buttonElement.left - width + buttonElement.width}px`,
        };
      }
    }
    return {};
  } catch (e) {
    console.error(e);
    return {};
  }
});
</script>
