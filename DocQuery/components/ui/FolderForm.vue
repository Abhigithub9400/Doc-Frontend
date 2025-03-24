<script setup lang="ts">
import RepositoryApiService from '~/services/RepositoryApiService';
import type { Repository } from '~/types/repository';

const props = defineProps({
  data: Object as PropType<Repository>,
  modelValue: Boolean,
});

const emit = defineEmits(['close', 'onFolderCreated']);

const header = ref('Create Folder');
const folderFormRef = ref(null);

const submit = async () => {
  //
  await folderFormRef?.value?.validate();
  if (folderFormRef?.value?.formErrors.length === 0) {
    const formData = folderFormRef?.value?.data;
    let response;
    const { _id, category, ...rest } = props?.data as unknown as Repository;
    if (!_id) {
      response = await RepositoryApiService.createRepositories(formData);
      if (response) {
        useNuxtApp().$showToast({
          severity: 'success',
          summary: 'Successfully created folder',
        });
        setFormValues({});
        emit('onFolderCreated');
      }
    } else {
      response = await RepositoryApiService.updateRepository({
        ...rest,
        _id,
        ...formData,
      });
      if (response) {
        useNuxtApp().$showToast({
          severity: 'success',
          summary: `Successfully ${_id ? 'Updated' : 'Create'} folder`,
        });
        setFormValues({});
        emit('onFolderCreated');
      }
    }
  }
};

const folderFormData = ref({});

const showDialog = ref(props.modelValue);

watch(
  () => {
    return props.modelValue;
  },
  (newValue) => {
    showDialog.value = newValue;
  },
);

const setFormValues = (data: Record<string, unknown> = {}) => {
  folderFormData.value = { ...data }; // Fallback if VueForm is not ready
};
watch(
  () => {
    return props.data;
  },
  (newValue) => {
    if (newValue && Object.keys(newValue).length > 0) {
      setFormValues(props?.data);
    }
  },
  { deep: true, immediate: true },
);

const cancel = () => {
  emit('close');
};
</script>

<template>
  <div>
    <Dialog
      v-model:visible="showDialog"
      modal
      :header="header"
      :style="{ width: '524px' }"
      @close="cancel"
    >
      <div class="relative">
        <div>
          <Vueform
            ref="folderFormRef"
            v-model="folderFormData"
            sync
            display-errors
          >
            <div class="gird col-span-12">
              <div class="w-full mb-2">
                <TextElement name="name" label="Folder name" required />
              </div>
              <div class="w-full mb-3">
                <TextElement
                  name="category"
                  label="Category"
                  required
                  disabled
                />
                <HiddenElement name="category_id" label="Category Id" />
              </div>
              <div>
                <div class="flex">
                  <span class="mr-3">Status</span>
                  <ToggleElement
                    name="is_active"
                    :add-class="{
                      toggle: {
                        toggle: 'folder-create-toggle',
                      },
                    }"
                  />
                </div>
              </div>
            </div>
          </Vueform>
        </div>
        <div class="flex justify-end">
          <button
            class="mr-6 rounded-lg py-2 px-4 border border-[var(--primary-black)] focus:outline-borderFocus disabled:cursor-not-allowed disabled:bg-grey-300 disabled:opacity-50"
            @click="cancel"
          >
            Cancel
          </button>
          <button
            class="rounded-lg py-2 px-4 border border-[var(--primary-black)] focus:outline-borderFocus bg-surfaceActionButton hover:bg-surfaceActionButtonHover text-borderAction"
            @click="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
