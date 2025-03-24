<script setup lang="ts">
import type { PropType } from 'vue';
import type { Category } from '~/types/category';
import NoFolderFound from '~/components/ui/NoFolderFound.vue';
import categoryApiService from '~/services/CategoryApiService';
import FolderForm from '~/components/ui/FolderForm.vue';
import RepositoryApiService from '~/services/RepositoryApiService';
import CategoryFormDialog from '~/components/category/CategoryFormDialog.vue';
const props = defineProps({
  category: {
    type: Object as PropType<Category>,
    default: () => {
      return {};
    },
  },
});

const emit = defineEmits(['onDelete', 'onUpdate']);
const showFolderForm = ref(false);
const showCategoryForm = ref(false);
const category = computed(() => {
  return props.category;
});
const categorySettingMenu = ref(null);
const categoryMenuButton = ref(null);
const categorySettingMenuStyle = ref<DOMRect>();
const categoryFolders = ref([]);
const categorySettingsItems = ref([
  {
    label: 'Edit',
    icon: 'pen-underline',
    command: () => {
      showCategoryForm.value = true;
    },
  },
  {
    label: 'Delete',
    icon: 'trash-bin-2',
    command: () => {
      emit('onDelete', props.category);
    },
  },
]);

const getCategoryRepositories = async () => {
  const categoryId = props.category?._id as string;
  if (categoryId) {
    const response = await RepositoryApiService.getRepositoryList(
      categoryId,
      {},
    );
    // debugger
    if (response?.result.length > 0) {
      categoryFolders.value = response.result || [];
    }
  }
};

onMounted(() => {
  getCategoryRepositories();
});

const toggleMenu = async (event: MouseEvent) => {
  event.preventDefault();
  categorySettingMenu?.value.toggle(event);
  event.stopPropagation();
};

const updateCategory = async (updateCategory: Partial<Category>) => {
  try {
    const { _id, ...existingCategory } = category?.value || {};
    const response = await categoryApiService.updateCategory(
      category?.value?._id as string,
      {
        ...existingCategory,
        ...updateCategory,
      },
    );
    if (response) {
      useNuxtApp().$showToast({
        severity: 'success',
        summary: 'Successfully updated!',
      });
    }
  } catch (e) {
    console.error(e);
  }
};

const toggleStatus = async (event: MouseEvent) => {
  const is_active = event?.target?.checked;
  await updateCategory({
    is_active,
  });
};

const folderData = ref({});
const createFolder = () => {
  folderData.value = {
    category: props.category?.name,
    category_id: props.category?._id,
  };
  showFolderForm.value = true;
};

const handleClose = () => {
  showFolderForm.value = false;
};

const handleFolderCreate = () => {
  showFolderForm.value = false;
  getCategoryRepositories();
};

const handleAction = ({ type, folder }) => {
  if (type === 'edit') {
    const { category, ...restFolder } = folder;
    folderData.value = {
      ...restFolder,
      category: category?.name,
      category_id: category?._id as string,
    };
    showFolderForm.value = true;
  }

  if (type === 'delete') {
    useNuxtApp().$showConfirm({
      type: 'delete',
      icon: 'delete',
      header: 'Delete this Folder?',
      message: 'Are you sure want to delete this Folder?',
      accept: async () => {
        const response = await RepositoryApiService.deleteRepository([
          folder?._id as string,
        ]);
        console.warn(response);
      },
    });
  }
  getCategoryRepositories();
};

const handleFormUpdate = (response: {
  type: string;
  data: Partial<Category>;
}) => {
  if (['update', 'create'].includes(response?.type)) {
    showCategoryForm.value = false;
  }
  emit('onUpdate', response?.data);
};

const getMenuStyle = computed(() => {
  try {
    if (categoryMenuButton?.value) {
      const buttonElement = categoryMenuButton?.value.getBoundingClientRect();
      if (buttonElement) {
        let width = 0;
        if (categorySettingMenuStyle.value) {
          width = categorySettingMenuStyle.value?.width;
        }
        return {
          top: `${buttonElement.top + buttonElement.height}px`,
          left: `${buttonElement.left - width + buttonElement.width}px`,
        };
      }
    }
    return {};
  } catch (e) {
    console.error(e);
    return {};
  }
});
const handlePositionAndStyle = async () => {
  await nextTick(() => {
    const element = document.getElementById(`category-${props?.category?._id}`);
    categorySettingMenuStyle.value = element?.getBoundingClientRect();
  });
};
</script>

<template>
  <div class="w-[324px] border-r border-r-[#EFEFEF]">
    <div class="p-4">
      <div class="flex w-full">
        <div class="flex w-full items-center justify-between">
          <div class="overflow-hidden">
            <h4
              :title="category?.name"
              class="font-semibold text-[#181818] text-[18px] truncate whitespace-nowrap overflow-hidden"
            >
              {{ category?.name }}
            </h4>
          </div>
          <div>
            <div class="flex justify-between w-[161px]">
              <div class="flex items-center">
                <base-badge :active="category?.is_active" />
                <div class="ml-4">
                  <div
                    class="px-2 py-1 rounded-lg text-[12px] text-[#181818] bg-[#EFEFEF]"
                  >
                    2 Folders
                  </div>
                </div>
              </div>
              <div>
                <div class="relative category-action-menu-action">
                  <button ref="categoryMenuButton" @click="toggleMenu">
                    <Icon :name="`normal:3-dot-black`" />
                  </button>
                  <Menu
                    :id="`category-${category?._id}`"
                    ref="categorySettingMenu"
                    :model="categorySettingsItems"
                    append-to="body"
                    :popup="true"
                    :pt="{
                      root: () => {
                        return {
                          style: getMenuStyle,
                        };
                      },
                    }"
                    @show="handlePositionAndStyle"
                  >
                    <template #item="{ item }">
                      <div class="flex px-1 py-2">
                        <div class="mr-2">
                          <Icon :name="`normal:${item.icon}`" />
                        </div>
                        <div>
                          <span>{{ item.label }}</span>
                        </div>
                      </div>
                    </template>
                    <template #end>
                      <div class="px-2 pt-2">
                        <divider class="!m-0 !p-0" />
                      </div>
                      <div class="p-2">
                        <div>
                          <div class="flex justify-between">
                            <span>Status</span>
                            <div>
                              <ToggleSwitch
                                name="isActive"
                                :add-class="{
                                  text: '!rtl:ml-[1rem] !ml-[1rem]',
                                }"
                                @change="toggleStatus"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-[24px] folder-folder-add">
        <div class="flex w-full">
          <div v-if="!categoryFolders.length">
            <no-folder-found />
          </div>
          <div v-else class="flex w-full folder-list">
            <div class="folder-list-inner">
              <div class="folder-list-content">
                <div class="flex flex-col w-full">
                  <div
                    v-for="folder in categoryFolders"
                    :id="`id-${folder?._id}-category-folder-wrapper`"
                    :key="folder?._id"
                    class="mb-3 overflow-visible"
                  >
                    <category-card :folder="folder" @on-action="handleAction" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="folder-add-button">
          <div class="flex w-full justify-center text-center">
            <button class="inline-flex text-center p-3" @click="createFolder">
              <Icon name="normal:plus" />
              <span class="ml-2"> Add Folder </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showFolderForm">
      <folder-form
        v-model="showFolderForm"
        :data="folderData"
        @on-folder-created="handleFolderCreate"
        @close="handleClose"
      />
    </div>
    <div v-if="showCategoryForm">
      <category-form-dialog
        v-model="showCategoryForm"
        :data="category"
        @form-update="handleFormUpdate"
      />
    </div>
  </div>
</template>

<style scoped></style>
