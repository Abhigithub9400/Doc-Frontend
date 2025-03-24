<template>
  <div
    class="h-auto flex justify-between xl:flex-row xl:items-center lg:flex-row lg:items-center md:flex-row md:items-center sm:flex-col sm:items-start xs:flex-col xs:items-start sm:gap-3 xs:gap-3"
  >
    <div class="flex items-center gap-6">
      <p>{{ title }}</p>
      <UiSelectAll
        select-title="Select all"
        @update:model-value="
          handleEvent(EVENT_SOURCE.SELECT_ALL, $event, { data: $event })
        "
      />
    </div>
    <div class="flex gap-4">
      <UiSearchBar
        placeholder="Search"
        @input="handleEvent(EVENT_SOURCE.SEARCH, $event, { data: $event })"
      />
      <UiActionDropdown
        :menu-items="actionItems"
        @selection-change="
          handleEvent(EVENT_SOURCE.ACCOUNT_STATE_ACTION_DROPDOWN, $event, {
            data: $event,
          })
        "
      />
      <UiButton
        label="Add"
        icon="plus"
        variant="primary"
        size="medium"
        icon-position="left"
        @click="handleEvent(EVENT_SOURCE.ADD_BUTTON, $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IActionDropdownItem, IFilterActionsPayload } from '~/types';
import { EVENT_SOURCE } from '~/enums';

defineProps({
  title: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['filter-actions']);

const actionItems = ref<IActionDropdownItem[]>([
  { label: 'All Accounts', action: null },
  { label: 'Active', action: true },
  { label: 'InActive', action: false },
]);

const handleEvent = (
  source: EVENT_SOURCE,
  event: Event,
  payload?: { data: unknown },
) => {
  emit('filter-actions', { source, event, payload } as IFilterActionsPayload);
};
</script>
