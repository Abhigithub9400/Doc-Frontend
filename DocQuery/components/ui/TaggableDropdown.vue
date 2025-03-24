<template>
  <div>
    <MultiSelect
      v-model="selectedoption"
      display="chip"
      :options="menuItems"
      option-label="label"
      filter
      placeholder="Select"
      :disabled="isDisabled"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, type PropType, ref } from 'vue';
import type { IMenuItem } from '~/types';
import MultiSelect from 'primevue/multiselect';

const selectedoption = ref();

defineProps({
  menuItems: {
    type: Array as PropType<IMenuItem[]>,
    required: true,
  },
  minWidth: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    required: false,
  },
});
</script>

<style scoped>
:global(.p-multiselect-header) {
  display: none !important;
}
:global(.p-inputtext) {
  display: none;
}
:global(.p-inputicon) {
  display: none;
}
::v-deep(.p-multiselect) {
  width: 100%;
}

::v-deep(.p-multiselect-chip-item) {
  display: flex;
  height: 24px;
  padding: 4px 10px;
  border-radius: 8px;
  background: #f6f6f6;
  margin-right: 8px;
}
:global(.p-chip-remove-icon) {
  margin-left: 8px;
  /* background: url('../../assets/icons/close.svg');
  width: 16px;
  height: 16px; */
}
:global(.p-multiselect-list-container) {
  margin-top: 10px !important;
  background-color: #fff !important;
  border-radius: 0.5rem !important;
  border: 0.066rem solid #dfe4ee !important;
  padding: 1rem 1.054rem 1.054rem !important;
  color: #000 !important;
  font-size: 14px !important;
  font-weight: 400 !important;
}
:global(.p-multiselect-list) {
  display: flex !important;
  justify-content: flex-start !important;
  flex-direction: column !important;
  gap: 10px !important;
}
</style>
