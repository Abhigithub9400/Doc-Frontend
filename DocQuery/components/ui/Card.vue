<template>
  <div
    class="flex flex-col bg-[#FFF] p-4 justify-between items-center rounded-md gap-2 hover:bg-surfaceBackgroundGray transition-colors"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="w-full flex justify-between items-center">
      <div class="flex items-center gap-3">
        <div
          class="flex justify-center items-center rounded-lg w-[2.25rem] h-[2.25rem] relative"
          :class="[
            content.status ? 'bg-[#ECFDF3]' : '!bg-surfaceBackgroundGrey',
            checked.length > 0 || isHovered
              ? '!bg-surfaceBackgroundGrey'
              : 'bg-[#ECFDF3]',
          ]"
        >
          <span
            v-show="!isHovered && !(checked.length > 0)"
            class="text-base font-medium"
            :class="[
              content.status ? 'text-textSuccess' : 'text-borderTertiary',
            ]"
          >
            {{ content.tenant_code?.substring(0, 2) }}
          </span>
          <Checkbox
            v-show="isHovered || checked.length > 0"
            v-model="checked"
            name="checkbox"
            class="absolute"
            :value="content._id"
            @change="handleCheckboxChange"
          />
        </div>
        <p class="text-textPrimary text-base font-medium not-italic">
          {{ content.name }}
        </p>
      </div>
      <UiContextMenu @action="handleAction" />
    </div>
    <div class="w-full flex flex-col gap-3">
      <hr class="w-full flex !border-t !border-t-borderLightest" />
      <div class="w-full flex justify-between items-center">
        <span class="text-xs leading-[1.125rem] font-normal">
          {{ formatDate(content.timestamp) }}
        </span>
        <UiMessage :severity="severity">{{
          content.status ? 'Active' : 'Inactive'
        }}</UiMessage>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import type { ICardContent } from '~/types';
import { useDateFormatter } from '~/composables/useDateFormatter';
import { CRUD } from '~/enums';

const emit = defineEmits(['tenant-selected', 'context-menu-action']);

const { formatDate } = useDateFormatter();

const isHovered = ref(false);
const checked = ref<string[]>([]);

const props = defineProps<{
  content: ICardContent;
  allSelected: boolean;
}>();

watch(
  () => {
    return props.allSelected;
  },
  (newValue) => {
    if (newValue) {
      checked.value = [props.content._id];
    } else {
      checked.value = [];
    }
  },
);

const severity = computed(() => {
  return props.content.status ? 'success' : 'secondary';
});

const handleCheckboxChange = () => {
  emit('tenant-selected', checked.value);
};

const handleAction = (action: CRUD) => {
  switch (action) {
    case CRUD.VIEW:
      emit('context-menu-action', CRUD.VIEW);
      break;

    case CRUD.EDIT:
      emit('context-menu-action', CRUD.EDIT);
      break;

    case CRUD.DELETE:
      emit('context-menu-action', CRUD.DELETE);
      break;
  }
};
</script>
