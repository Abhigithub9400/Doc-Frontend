<script setup lang="ts">
import CategoryForm from '~/components/forms/CategoryForm.vue';
import type { Category } from '~/types/category';

const header = ref('Create Category');

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object as () => Partial<Category>,
    default: () => {
      return {};
    },
  },
});

const emit = defineEmits(['formUpdate']);

const handleFormUpdate = (data) => {
  emit('formUpdate', data);
};

onMounted(() => {
  if (props?.data?._id) {
    header.value = 'Update Category';
  }
});
</script>

<template>
  <Dialog
    :visible="modelValue"
    modal
    :header="header"
    :style="{ width: '524px' }"
  >
    <div class="category-form-wrapper">
      <category-form
        :hide-title="true"
        :data="data"
        @category-form-update="handleFormUpdate"
      />
    </div>
  </Dialog>
</template>

<style scoped></style>
