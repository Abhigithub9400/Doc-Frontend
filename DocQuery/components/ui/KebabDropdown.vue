<template>
  <div class="relative inline-block">
    <component
      :is="actionIcon"
      class="w-[0.183rem] h-[1.034rem] cursor-pointer"
      @click="openActionModal"
    />
  </div>

  <div v-show="showDropdown">
    <div
      ref="dropdown"
      class="absolute mt-2 bg-[#FFF] rounded-lg border-[0.066rem] border-solid border-[#DFE4EE] pt-4 pb-[1.054rem] px-[1.054rem] min-w-[10.25rem]"
      :style="{ top: `${dropdownTop}px`, left: `${dropdownLeft}px` }"
    >
      <div class="flex flex-col">
        <ul class="flex flex-col gap-[0.659rem]">
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            class="text-left text-[#181818] text-[0.875rem] font-normal cursor-pointer"
            @click="handleMenuClick(item.label)"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
    </div>
    <ModalBox
      :modal-title="tenantData.name"
      :form-required="true"
      :expansion-required="true"
      :is-open="showModal"
      :tenant-id-data="tenantData"
      @close-modal="toggleModal"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, type PropType } from 'vue';
import type { IMenuItem } from '~/types';
import type ITenantData from '~/types/tenantData';
import ModalBox from '~/components/ui/ModalBox.vue';

const showModal = ref(false);
const showDropdown = ref(false);
const dropdown = ref<HTMLElement | null>(null);
const dropdownTop = ref(0);
const dropdownLeft = ref(0);

defineProps({
  actionIcon: {
    type: Object,
    required: true,
  },
  menuItems: {
    type: Array as PropType<IMenuItem[]>,
    required: true,
  },
  tenantData: {
    type: Object as PropType<ITenantData>,
    required: true,
  },
});

const openActionModal = (event: MouseEvent) => {
  showDropdown.value = !showDropdown.value;
  if (showDropdown.value && dropdown.value) {
    const buttonRect = (event.target as HTMLElement).getBoundingClientRect();
    dropdownTop.value = buttonRect.bottom + window.scrollY; // Adjust for page scroll
    dropdownLeft.value = buttonRect.right - dropdown.value.offsetWidth - 160; // Align right
  }
};

const handleMenuClick = (item: string) => {
  if (item == 'View details' || item == 'Edit') {
    showModal.value = true;
  }
};

const toggleModal = (val: boolean) => {
  showModal.value = val;
};

// Handle outside clicks
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
