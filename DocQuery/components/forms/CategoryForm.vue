<script setup lang="ts">
import categoryApiService from '~/services/CategoryApiService';
import { ref } from 'vue';
import type { Category } from '~/types/category';
const form$ = ref(null);

const props = defineProps({
  classes: {
    type: String,
    default: '',
  },
  data: {
    type: Object as () => Partial<Category>,
    default: () => {
      return {};
    },
  },
  hideTitle: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['categoryFormUpdate', 'cancelForm']);
const cancel = () => {
  emit('cancelForm', '');
};

const isUpdateForm = ref(props?.data?._id);
const formData = ref({});

const updateFormField = () => {
  formData.value = props?.data;
};
onMounted(() => {
  if (props?.data?._id) {
    updateFormField(props?.data);
  }
});

const save = async () => {
  try {
    await form$?.value?.validate();
    if (form$?.value?.formErrors.length === 0) {
      // do something with the form data.
      let response;
      const categoryData = {
        ...props?.data,
        ...form$.value?.data,
      };
      if (isUpdateForm.value) {
        const { _id, ...updateCategoryData } = categoryData;
        response = await categoryApiService.updateCategory(
          _id,
          updateCategoryData,
        );
      } else {
        response = await categoryApiService.addCategory(categoryData);
      }
      useNuxtApp()?.$showToast({
        severity: 'success',
        summary: isUpdateForm.value ? 'Category Updated' : 'Category Added',
      });
      emit('categoryFormUpdate', {
        type: isUpdateForm?.value ? 'update' : 'create',
        data: response,
      });
      form$.value.reset();
    }
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <div class="category-form" :class="classes">
    <div class="body flex-1">
      <Vueform
        ref="form$"
        v-model="formData"
        sync
        :display-errors="false"
        :add-classes="{
          FormElements: {
            container: ['!gap-y-[1.875rem]'],
          },
        }"
        @submit="save"
      >
        <div class="gird col-span-12">
          <StaticElement v-if="!hideTitle" name="head">
            <h3 class="font-semibold text-[1.125rem] h-8 flex items-center">
              Add Category
            </h3>
          </StaticElement>
          <div class="mb-3">
            <HiddenElement name="_id" />
            <div class="mb-2">
              <TextElement
                name="name"
                placeholder="Category name"
                :floating="false"
                label="Category"
                :rules="['required']"
              />
            </div>
            <div class="mb-2">
              <TextareaElement
                name="description"
                label="Description"
                :floating="false"
                :rules="['required']"
              />
            </div>
            <div class="mb-2">
              <ToggleElement
                name="is_active"
                :add-class="{
                  text: '!rtl:ml-[1rem] !ml-[1rem]',
                  toggle: {
                    toggle: 'folder-create-toggle',
                  },
                }"
                >Make Active</ToggleElement
              >
            </div>
          </div>

          <div class="footer flex justify-between w-full self-end">
            <button
              class="rounded-lg border border-solid border-[#030501] bg-[#FFF] px-[1.25rem] py-[0.5rem]"
              @click="cancel"
            >
              <span
                class="text-[#414651] text-[1rem] leading-[1.5rem] font-normal"
                >Cancel</span
              >
            </button>
            <button
              type="submit"
              class="w-[5.8125rem] rounded-lg bg-[#030501] border border-none"
            >
              <span
                class="text-[#C8EF7B] text-[1rem] font-medium leading-[1.5rem]"
                >{{ isUpdateForm ? 'Update' : 'Save' }}</span
              >
            </button>
          </div>
        </div>
      </Vueform>
    </div>
  </div>
</template>

<style scoped></style>
