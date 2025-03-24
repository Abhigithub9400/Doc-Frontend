<template>
  <div
    class="min-w-[25%] h-full flex justify-center border-r border-r-[#EFEFEF]"
    :class="isAddCategoryForm ? 'items-start' : 'items-center'"
  >
    <div
      v-if="!isAddCategoryForm"
      class="flex flex-col justify-center items-center gap-[0.625rem]"
    >
      <button
        class="p-0.75 border border-[#EFEFEF] rounded-lg w-9 h-9 flex justify-center items-center"
        @click="handleAddCategory"
      >
        <IconPlus class="w-6 h-6 text-[#333333]" />
      </button>
      <p>Add Category</p>
    </div>
    <div
      v-show="isAddCategoryForm"
      class="p-4 flex flex-col gap-4 w-full h-full"
    >
      <category-form
        :data="{}"
        classes="flex flex-col h-full justify-center "
        @category-form-update="handleAddCategory"
        @cancel-form="handleCancel"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import IconPlus from '~/components/common/IconPlus.vue';

import CategoryForm from '~/components/forms/CategoryForm.vue';
import type { Category } from '~/types/category';

const isAddCategoryForm = ref(false);

const handleAddCategory = (response: {
  type: string;
  data: Partial<Category>;
}) => {
  if (response) {
    isAddCategoryForm.value = !isAddCategoryForm.value;
  }
};

const handleCancel = () => {
  isAddCategoryForm.value = false;
};
</script>
