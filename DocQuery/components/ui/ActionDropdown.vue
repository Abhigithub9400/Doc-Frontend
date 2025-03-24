<template>
  <div>
    <Select
      v-model="selectedOption"
      :options="menuItems"
      option-label="label"
      :placeholder="firstPlaceholder"
      :disabled="isDisabled"
      pt:root:class="!border-borderPrimary100 !h-full !px-2 !py-2 !gap-2 !w-[10.125rem] !items-center"
      pt:label:class="!text-textPrimary !p-0 !text-sm !leading-[1.313rem] !font-normal"
      pt:dropdown:class="!text-iconPrimary !w-auto"
      pt:overlay:class="!p-2 !w-[10.125rem]"
      pt:list:class="!p-0"
      pt:option:class="!font-textPrimary !text-sm !font-normal !no-italic"
      class="!text-sm font-normal"
      @change="handleChange"
    >
      <template #dropdownicon>
        <!-- Inline SVG shall be replaced with an Icon Component after icon library is updated  -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="#333333"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </template>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, type PropType } from 'vue';
import type { IActionDropdownItem } from '~/types';
import Select from 'primevue/select';

const props = defineProps({
  menuItems: {
    type: Array as PropType<IActionDropdownItem[]>,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(['selection-change']);

const selectedOption = ref();

const firstPlaceholder = ref(props.menuItems[0].label);

const handleChange = () => {
  emit('selection-change', selectedOption.value);
};
</script>
