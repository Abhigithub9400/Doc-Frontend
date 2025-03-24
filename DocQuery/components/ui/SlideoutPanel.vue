<template>
  <Drawer
    v-bind="$attrs"
    :position="position"
    pt:root:class="!w-1/2 !border-none"
    pt:header:class="!p-3 !px-6 !gap-3 !bg-surfaceBackgroundGrey"
    pt:footer:class="!p-0"
    pt:content:class="!p-3 !px-6"
    :pt="{
      pcCloseButton: {
        root: {
          class:
            '!p-1.5 !rounded-md !w-auto !h-auto !aspect-square !bg-surefaeGrey',
        },
      },
    }"
  >
    <template #header>
      <slot name="header">
        <div class="flex justify-between items-center h-full w-full">
          <h2 class="!text-textPrimary !text-lg !font-semibold !no-italic">
            {{ title }}
          </h2>
          <UiButton
            v-if="isEdit"
            variant="hugged"
            icon="pencilEdit"
            label="Edit"
            @click="handleEdit"
          />
        </div>
      </slot>
    </template>
    <template #default>
      <slot class="overflow-y-auto" />
    </template>
    <template v-if="!isPreview" #footer>
      <div
        class="flex items-center justify-between !w-full !p-6 !border-t !border-borderPrimary100"
      >
        <UiButton label="Cancel" variant="secondary" />
        <UiButton label="Save" variant="primary" />
      </div>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits(['onEdit']);

withDefaults(
  defineProps<{
    position?: 'left' | 'right' | 'top' | 'bottom' | 'full' | undefined;
    title?: string;
    isEdit?: boolean;
    isPreview?: boolean;
  }>(),
  {
    position: 'right',
    title: '',
    isEdit: false,
    isPreview: false,
  },
);

const payload = ref({});

const handleEdit = () => {
  emit('onEdit', { payload: payload.value });
};
</script>
