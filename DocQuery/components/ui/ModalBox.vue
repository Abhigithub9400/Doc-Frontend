<template>
  <!-- Changed == to = in the click handler -->
  <VueSidePanel
    v-model="localIsOpen"
    :no-close="true"
    :lock-scroll="true"
    width="80%"
  >
    <div class="py-3 px-6 bg-[#F6F6F6] sticky top-0">
      <div class="flex justify-between items-center">
        <p class="text-[#181D27] text-[1.25rem] font-semibold">
          {{ modalTitle }}
        </p>
        <img
          v-if="tenantIdData"
          src="../../assets/icons/pencilEdit.svg"
          alt=""
          class="w-6 h-6 mr-12 cursor-pointer"
          @click="toggleEditMode"
        />
      </div>
    </div>

    <div class="flex flex-col h-full">
      <form class="flex flex-col h-full">
        <div class="flex flex-col px-6 overflow-y-auto">
          <div class="flex flex-col py-5">
            <label class="text-[#666] text-[0.875rem] font-normal">Name</label>
            <input
              v-model="tenantIndividualData.name"
              type="text"
              :readonly="!isEditable && tenantIdData?._id"
              placeholder="Enter tenant name"
              class="bg-[#FFF] text-[#999] text-[0.875rem] font-normal py-2 px-3 rounded-lg border border-solid border-[#EFEFEF] focus:outline-none"
              @focus="clearValidation"
            />
            <span
              v-if="nameError"
              class="text-red-500 text-[.875rem] font-normal"
              >{{ nameError }}</span
            >
          </div>
          <div class="flex flex-col">
            <label class="text-[#666] text-[0.875rem] font-normal">Email</label>
            <input
              v-model="tenantIndividualData.email"
              type="text"
              placeholder="Email"
              :readonly="!isEditable && tenantIdData?._id"
              class="bg-[#FFF] text-[#999] text-[0.875rem] font-normal py-2 px-3 rounded-lg border border-solid border-[#EFEFEF] focus:outline-none"
              @focus="clearValidation"
            />
            <span
              v-if="adminEmailError"
              class="text-red-500 text-[.875rem] font-normal"
              >{{ adminEmailError }}</span
            >
          </div>
          <div class="flex flex-col pt-5">
            <label class="text-[#666] text-[0.875rem] font-normal"
              >Password</label
            >
            <input
              v-model="tenantIndividualData.password"
              type="text"
              placeholder="Password"
              :readonly="!isEditable && tenantIdData?._id"
              class="bg-[#FFF] text-[#999] text-[0.875rem] font-normal py-2 px-3 rounded-lg border border-solid border-[#EFEFEF] focus:outline-none"
            />
          </div>
          <div>
            <div class="flex flex-col py-5">
              <label class="text-[#666] text-[0.875rem] font-normal"
                >Description</label
              >
              <textarea
                v-model="tenantIndividualData.description"
                rows="6"
                placeholder="Placeholder"
                :readonly="!isEditable && tenantIdData?._id"
                class="bg-[#FFF] text-[#999] text-[0.875rem] font-normal py-2 px-3 rounded-lg border border-solid border-[#EFEFEF] focus:outline-none"
              />
            </div>
          </div>
          <div v-if="expansionPanel">
            <div
              v-for="(panel, index) in expansionPanels"
              :key="index"
              class="mt-6"
            >
              <UiExpansionPanel
                :expansion-title="panel.title"
                :select-box="panel.selectBox"
                :check-box="panel.checkBox"
                :toggle-select="panel.toggleSelect"
                :form-data="formData"
                :is-editable="isEditable"
                :tenant-name="tenantIndividualData.name"
                @update-form-data="updateFormData"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-between mt-auto px-6 pb-[4rem] pt-[5.25rem]">
          <button
            v-if="isEditable || !tenantIdData"
            class="rounded-lg border border-solid border-[#D5D7DA] bg-[#FFF] py-[10px] px-[18px]"
            @click="closeModal"
          >
            <span
              class="text-[#414651] text-[1rem] font-semibold"
              @click="clearAllFields"
              >Cancel</span
            >
          </button>
          <button
            v-if="isEditable || !tenantIdData"
            class="w-[5.8125rem] h-10 rounded-lg bg-[#030501] px-[1rem]"
            @click.prevent="handleSubmit"
          >
            <span class="text-[#C8EF7B] text-[1rem] font-semibold">Save</span>
          </button>
        </div>
      </form>
    </div>
  </VueSidePanel>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import type ITenantData from '~/types/tenantData';
const nameError = ref('');
const adminEmailError = ref('');
const tenantCodeError = ref('');

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  modalTitle: {
    type: String,
    required: true,
  },
  formRequired: {
    type: Boolean,
    required: true,
  },
  expansionRequired: {
    type: Boolean,
    required: true,
  },
  tenantIdData: {
    type: Object as PropType<ITenantData>,
    required: false,
  },
});

const isEditable = ref(false);

const tenantIndividualData = ref({
  name: '',
  email: '',
  password: '',
  description: '',
});

const formData = ref({
  isCheckedOne: false,
  isCheckedTwo: false,
  settingsOne: false,
  settingsTwo: false,
  settingsOneView: false,
  settingsOneCreate: false,
  settingsOneEdit: false,
  settingsOneApprove: false,
  settingsTwoView: false,
  settingsTwoCreate: false,
  settingsTwoEdit: false,
  settingsTwoApprove: false,
});

const expansionPanels = ref([
  {
    title: 'Permissions',
    selectBox: true,
    checkBox: true,
    toggleSelect: false,
  },
  {
    title: 'Security',
    selectBox: false,
    checkBox: true,
    toggleSelect: true,
  },
  {
    title: 'Permission',
    selectBox: false,
    checkBox: false,
    toggleSelect: false,
  },
]);

const emit = defineEmits(['close-modal']);

const updateFormData = (
  updatedData:
    | {
        isCheckedOne: boolean;
        isCheckedTwo: boolean;
        settingsOne: boolean;
        settingsTwo: boolean;
        settingsOneView: boolean;
        settingsOneCreate: boolean;
        settingsOneEdit: boolean;
        settingsOneApprove: boolean;
        settingsTwoView: boolean;
        settingsTwoCreate: boolean;
        settingsTwoEdit: boolean;
        settingsTwoApprove: boolean;
      }
    | {
        isCheckedOne: boolean;
        isCheckedTwo: boolean;
        settingsOne: boolean;
        settingsTwo: boolean;
        settingsOneView: boolean;
        settingsOneCreate: boolean;
        settingsOneEdit: boolean;
        settingsOneApprove: boolean;
        settingsTwoView: boolean;
        settingsTwoCreate: boolean;
        settingsTwoEdit: boolean;
        settingsTwoApprove: boolean;
      },
) => {
  formData.value = updatedData;
};

const localIsOpen = ref(props.isOpen);

const expansionPanel = ref(props.expansionRequired);

const closeModal = () => {
  emit('close-modal');
};

const toggleEditMode = () => {
  isEditable.value = !isEditable.value;
};

const validateAlphanumeric = (value: string, fieldName: string) => {
  if (!value) {
    return `${fieldName} is required.`;
  }

  const hasSpecialChars = /[^a-zA-Z0-9 ]/.test(value); // Checking for special chars

  if (hasSpecialChars) {
    return 'Please enter alphanumeric values only.';
  }

  return ''; // Return empty if no validation errors
};

const clearValidation = () => {
  nameError.value = '';
  tenantCodeError.value = '';
  adminEmailError.value = '';
};

const validateFields = () => {
  // Run validation for each field
  const nameErrorMsg = validateAlphanumeric(
    tenantIndividualData.value.name,
    'Tenant name',
  );
  const tenantCodeMsg = validateAlphanumeric(
    tenantIndividualData.value.password,
    'Tenant Code',
  );
  const emailErrorMsg = validateEmail(tenantIndividualData.value.email);
  // Set error messages if any
  nameError.value = nameErrorMsg;
  tenantCodeError.value = tenantCodeMsg;
  adminEmailError.value = emailErrorMsg;
  // Return false if any error exists
  if (nameErrorMsg || tenantCodeMsg || emailErrorMsg) {
    return false;
  }

  return true;
};

const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email) {
    return 'Admin Email is required.';
  }

  if (!emailRegex.test(email)) {
    return 'Admin email must be a valid format.';
  }

  return ''; // Return empty if email is valid
};

const handleSubmit = () => {
  const combinedData = {
    ...tenantIndividualData.value,
    ...formData.value,
  };

  const isValid = validateFields();

  if (isValid) {
    // eslint-disable-next-line no-console
    console.log('Combined Data:', combinedData);

    // Example: Submit to API
    // apiService.submitForm(combinedData);
  } else {
    return;
  }
};

const clearAllFields = () => {
  tenantIndividualData.value = {
    name: '',
    email: '',
    password: '',
    description: '',
  };

  formData.value = {
    isCheckedOne: false,
    isCheckedTwo: false,
    settingsOne: false,
    settingsTwo: false,
    settingsOneView: false,
    settingsOneCreate: false,
    settingsOneEdit: false,
    settingsOneApprove: false,
    settingsTwoView: false,
    settingsTwoCreate: false,
    settingsTwoEdit: false,
    settingsTwoApprove: false,
  };

  // If you also want to reset any errors, clear them here as well
  nameError.value = '';
  adminEmailError.value = '';
};

// Watch for changes in props.isOpen and update localIsOpen
watch(
  () => {
    return props.isOpen;
  },
  (newValue) => {
    localIsOpen.value = newValue;
  },
);

// Watch for changes in localIsOpen and emit close event
watch(
  () => {
    return localIsOpen.value;
  },
  (newValue) => {
    if (!newValue) {
      emit('close-modal', false);
    }
  },
);

onMounted(() => {
  tenantIndividualData.value = { ...props.tenantIdData };
});
</script>
