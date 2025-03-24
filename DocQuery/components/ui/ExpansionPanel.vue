<script setup lang="ts">
import { ref, defineProps } from 'vue';
import IconMinus from '../common/IconMinus.vue';
import IconPlus from '../common/IconPlus.vue';

const showDropdown = ref(false);
const props = defineProps({
  expansionTitle: {
    type: String,
    required: true,
  },
  selectBox: {
    type: Boolean,
    required: true,
  },
  checkBox: {
    type: Boolean,
    required: true,
  },
  toggleSelect: {
    type: Boolean,
    required: true,
  },
  formData: {
    type: Object,
    required: true,
  },
  isEditable: {
    type: Boolean,
    required: true,
  },
  tenantName: {
    type: String,
    required: true,
  },
});
const actionItems = ref([
  { label: 'View details', action: 'view' },
  { label: 'Edit', action: 'edit' },
  { label: 'Delete', action: 'delete' },
]);

const openExpansion = () => {
  showDropdown.value = !showDropdown.value;
};

const emit = defineEmits(['update-form-data']);

const localFormData = ref({ ...props.formData });

watch(
  localFormData,
  (newData) => {
    emit('update-form-data', newData);
  },
  { deep: true },
);

const showAllList = ref([
  { label: 'All Accounts', action: 'all_accounts' },
  { label: 'Active Accounts', action: 'active_accounts' },
  { label: 'InActive Accounts', action: 'inactive_accounts' },
]);

const handleCheckboxChange = (newValue: boolean) => {
  // eslint-disable-next-line no-console
  console.log('Checkbox is now:', newValue);
};

const handleToggleSelect = (selected: boolean) => {
  // eslint-disable-next-line no-console
  console.log('Checkbox is now:', selected);
};
</script>

<template>
  <div>
    <div
      class="py-2 px-4 rounded-t-lg rounded-b-none border border-solid border-[#E4E4E4] flex justify-between"
      :class="{ 'bg-[#F6F6F6]': !showDropdown, 'bg-[#FBF5FF]': showDropdown }"
      @click="openExpansion"
    >
      <p class="text-[#000] text-[1rem] font-semibold">{{ expansionTitle }}</p>
      <IconMinus v-if="showDropdown" class="w-6 h-6" />
      <IconPlus v-else class="w-6 h-6 text-[#666666]" />
    </div>
    <div
      v-show="showDropdown"
      class="rounded-b-lg rounded-l-lg border border-solid border-[#E4E4E4] p-4"
    >
      <div v-show="selectBox && checkBox">
        <div class="flex flex-col gap-[6px]">
          <label class="text-[#666] text-[0.875rem] font-normal"
            >Employment*</label
          >
          <UiTaggableDropdown
            :is-disabled="!props.isEditable && tenantName"
            :menu-items="showAllList"
            :min-width="'9.75rem'"
            class="bg-[#FFF] text-[#999] text-[0.875rem] font-normal py-2 px-3 rounded-lg border border-solid border-[#EFEFEF] focus:outline-none"
          />
        </div>
        <div class="flex mt-6 gap-6">
          <div class="flex flex-col flex-1 gap-[6px]">
            <label class="text-[#666] text-[0.875rem] font-normal"
              >Category name*</label
            >
            <UiActionDropdown
              :menu-items="actionItems"
              :min-width="'9.75rem'"
              :is-disabled="!props.isEditable && tenantName"
            />
          </div>
          <div class="flex flex-col flex-1 gap-[6px]">
            <label class="text-[#666] text-[0.875rem] font-normal"
              >Category type*</label
            >
            <UiActionDropdown
              :menu-items="actionItems"
              :min-width="'9.75rem'"
              :is-disabled="!props.isEditable && tenantName"
            />
          </div>
        </div>
        <div v-if="isEditable || !tenantName" class="flex mt-6 gap-6">
          <div class="flex gap-2">
            <UiSelectAll
              v-model="localFormData.isCheckedOne"
              select-title="Checkbox"
              text-color="#666"
              @update:model-value="handleCheckboxChange"
            />
          </div>
          <div class="flex gap-2">
            <UiSelectAll
              v-model="localFormData.isCheckedTwo"
              select-title="Checkbox"
              text-color="#666"
              @update:model-value="handleCheckboxChange"
            />
          </div>
        </div>
      </div>
      <div v-show="checkBox && toggleSelect">
        <div class="flex flex-col mt-6 gap-6">
          <div class="flex justify-between gap-2">
            <UiSelectAll
              v-model="localFormData.settingsOne"
              select-title="Settings 1"
              text-color="#666"
              :is-disabled="!props.isEditable && tenantName"
              @update:model-value="handleCheckboxChange"
            />
            <div
              v-if="isEditable || !tenantName"
              class="flex m-auto gap-[4.75rem]"
            >
              <UiToggleCheckBox
                v-model:toggle-check="localFormData.settingsOneView"
                :select-title="'View'"
                @update:toggle-check="handleToggleSelect"
              />
              <UiToggleCheckBox
                v-model:toggle-check="localFormData.settingsOneCreate"
                :select-title="'Create'"
                @update:toggle-check="handleToggleSelect"
              />
              <UiToggleCheckBox
                v-model:toggle-check="localFormData.settingsOneEdit"
                :select-title="'Edit'"
                @update:toggle-check="handleToggleSelect"
              />
              <UiToggleCheckBox
                v-model:toggle-check="localFormData.settingsOneApprove"
                :select-title="'Approve'"
                @update:toggle-check="handleToggleSelect"
              />
            </div>
            <div v-else class="flex m-auto gap-[1.75rem]">
              <img
                :src="
                  localFormData.settingsoneView
                    ? '../../assets/icons/greenTick.svg'
                    : '../../assets/icons/redTick.svg'
                "
                alt=""
                class="w-6 h-6"
              />
              <p class="text-[#000] text-[0.875rem] font-normal">View</p>
              <img
                :src="
                  localFormData.settingsOneCreate
                    ? '../../assets/icons/greenTick.svg'
                    : '../../assets/icons/redTick.svg'
                "
                alt=""
                class="w-6 h-6"
              />
              <p class="text-[#000] text-[0.875rem] font-normal">Create</p>
              <img
                :src="
                  localFormData.settingsOneEdit
                    ? '../../assets/icons/greenTick.svg'
                    : '../../assets/icons/redTick.svg'
                "
                alt=""
                class="w-6 h-6"
              />
              <p class="text-[#000] text-[0.875rem] font-normal">Edit</p>
              <img
                :src="
                  localFormData.settingsOneApprove
                    ? '../../assets/icons/greenTick.svg'
                    : '../../assets/icons/redTick.svg'
                "
                alt=""
                class="w-6 h-6"
              />
              <p class="text-[#000] text-[0.875rem] font-normal">Approve</p>
            </div>
          </div>
          <div class="flex justify-between gap-2">
            <UiSelectAll
              v-model="localFormData.settingsTwo"
              select-title="Settings 2"
              text-color="#666"
              :is-disabled="!props.isEditable && tenantName"
              @update:model-value="handleCheckboxChange"
            />
            <div
              v-if="isEditable || !tenantName"
              class="flex m-auto gap-[4.75rem]"
            >
              <UiToggleCheckBox
                v-model:toggle-check="localFormData.settingsTwoView"
                :select-title="'View'"
                @update:toggle-check="handleToggleSelect"
              />
              <UiToggleCheckBox
                v-model:toggle-check="localFormData.settingsTwoCreate"
                :select-title="'Create'"
                @update:toggle-check="handleToggleSelect"
              />
              <UiToggleCheckBox
                v-model:toggle-check="localFormData.settingsTwoEdit"
                :select-title="'Edit'"
                @update:toggle-check="handleToggleSelect"
              />
              <UiToggleCheckBox
                v-model:toggle-check="localFormData.settingsTwoApprove"
                :select-title="'Approve'"
                @update:toggle-check="handleToggleSelect"
              />
            </div>
            <div v-else class="flex m-auto gap-[1.75rem]">
              <img
                :src="
                  localFormData.settingsTwoView
                    ? '../../assets/icons/greenTick.svg'
                    : '../../assets/icons/redTick.svg'
                "
                alt=""
                class="w-6 h-6"
              />
              <p class="text-[#000] text-[0.875rem] font-normal">View</p>
              <img
                :src="
                  localFormData.settingsTwoCreate
                    ? '../../assets/icons/greenTick.svg'
                    : '../../assets/icons/redTick.svg'
                "
                alt=""
                class="w-6 h-6"
              />
              <p class="text-[#000] text-[0.875rem] font-normal">Create</p>
              <img
                :src="
                  localFormData.settingsTwoEdit
                    ? '../../assets/icons/greenTick.svg'
                    : '../../assets/icons/redTick.svg'
                "
                alt=""
                class="w-6 h-6"
              />
              <p class="text-[#000] text-[0.875rem] font-normal">Edit</p>
              <img
                :src="
                  localFormData.settingsTwoApprove
                    ? '../../assets/icons/greenTick.svg'
                    : '../../assets/icons/redTick.svg'
                "
                alt=""
                class="w-6 h-6"
              />
              <p class="text-[#000] text-[0.875rem] font-normal">Approve</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::v-deep(.p-select) {
  width: 100%;
}
</style>
