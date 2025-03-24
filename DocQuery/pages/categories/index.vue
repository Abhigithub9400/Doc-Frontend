<script setup lang="ts">
import categoryApiService from '~/services/CategoryApiService';
import type { Category } from '~/types/category';
import CategoryItem from '~/components/ui/CategoryItem.vue';
import CategoryHeader from '~/components/category/CategoryHeader.vue';

const categories = ref<Category[]>([]);

const requestCategoryList = async () => {
  const response = await categoryApiService.listCategories();
  if (response.result.length > 0) {
    categories.value = response.result;
  }
};
onMounted(() => {
  requestCategoryList();
});

const handleAddCategory = () => {
  requestCategoryList();
};

const handleDelete = async (category: Category) => {
  if (category?._id) {
    useNuxtApp()?.$showConfirm({
      message: 'Are you sure you want to delete this categories?',
      header: 'Delete',
      type: 'delete',
      icon: 'delete',
      acceptProps: {
        label: 'Delete',
      },
      rejectProps: {
        label: 'Cancel',
      },
      accept: async () => {
        try {
          const response = await categoryApiService.deleteCategory([
            category?._id,
          ]);
          if (response) {
            requestCategoryList();
          }
        } catch (error) {
          console.error(error);
        }
      },
    });
  }
};

const handleUpdate = async () => {
  await requestCategoryList();
};
</script>

<template>
  <div>
    <div>
      <category-header />
      <div />
      <div>
        <div class="category-list-wrapper flex flex-row bg-[#FCFDF9]">
          <div
            class="category-add-category h-full w-[292px]"
            :style="{ height: `calc(100dvh - 100px)` }"
          >
            <div class="w-full h-full flex flex-col">
              <category-add @add-category="handleAddCategory" />
            </div>
          </div>
          <div
            class="category-list-categories overflow-x-auto overflow-y-hidden flex px-2"
          >
            <div
              v-for="category in categories"
              :key="category._id"
              class="flex flex-row"
            >
              <category-item
                :category="category"
                @on-delete="handleDelete"
                @on-update="handleUpdate"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
