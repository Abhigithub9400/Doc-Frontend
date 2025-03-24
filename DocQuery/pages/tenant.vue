<template>
  <div class="w-full h-full flex flex-col">
    <div class="w-full shadow-sm bg-[#FFF] px-4 py-2 h-fit">
      <div>
        <UiActionsPanel title="Tenant" @filter-actions="handleFilterActions" />
      </div>
    </div>
    <div class="flex-1 h-full overflow-y-auto px-4 flex justify-center">
      <div
        v-if="!(tenantList.result?.length === 0) && !isLoading"
        class="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1 gap-4 mt-4 w-full h-fit"
      >
        <UiCard
          v-for="tenant in tenantList.result"
          :key="tenant._id"
          :content="cardContent(tenant)"
          :all-selected="isAllTenantsSelected"
          @context-menu-action="
            (action: CRUD) => handleContextMenuAction(action, tenant._id)
          "
        />
      </div>
      <div
        v-if="
          (!tenantList.result || tenantList.result.length === 0) && !isLoading
        "
        class="w-full h-full flex flex-col justify-center items-center gap-4"
      >
        <Icon
          :name="
            isSearchResultEmpty ? 'normal:emptyResult' : 'normal:emptyList'
          "
          width="50px"
          height="50px"
        />
        <p class="text-textDisabled">
          {{
            isSearchResultEmpty
              ? 'No results found for your search'
              : 'No tenants available on this page'
          }}
        </p>
      </div>
    </div>
    <UiPagination
      :total-records="Number(tenantList.total_record)"
      @page-change="handlePageChange"
    />
    <UiSlideoutPanel v-model:visible="isDrawerVisible" :title="formTitle">
      <template #default>
        <Component :is="currentComponent" />
      </template>
    </UiSlideoutPanel>
  </div>
</template>

<script setup lang="ts">
import { useTenantStore } from '~/stores';
import AddTenantForm from '~/form/AddTenantForm.vue';
import EditTenantForm from '~/form/EditTenantForm.vue';
import PreviewTenantForm from '~/form/PreviewTenantForm.vue';
import type {
  IFilterActionsPayload,
  IPagination,
  ITenantListRequest,
  ITenantListResponse,
  ITenantListResult,
  IActionDropdownItem,
} from '~/types';
import { EVENT_SOURCE, type CRUD } from '~/enums';

const isLoading = ref(false);
const tenantStore = useTenantStore();
const tenantList = ref<Partial<ITenantListResponse>>({});
const listingPayload = ref<ITenantListRequest>({
  is_active: null,
  limit: 15,
  page_number: 1,
  search_text: '',
  sort_key: 'name',
  sort_order: 1,
});
const isAllTenantsSelected = ref(false);
const isSearchResultEmpty = ref(false);
const isDrawerVisible = ref(false);
const currentForm = ref('AddTenantForm');
const formTitle = ref('Add Tenant');

const currentComponent = computed(() => {
  switch (currentForm.value) {
    case 'AddTenantForm':
      return AddTenantForm;
    case 'EditTenantForm':
      return EditTenantForm;
    case 'PreviewTenantForm':
      return PreviewTenantForm;
    default:
      return AddTenantForm;
  }
});

const showAddForm = () => {
  currentForm.value = 'AddTenantForm';
  formTitle.value = 'Add Tenant';
  isDrawerVisible.value = true;
};

const showEditForm = (id: string) => {
  if (id) {
    currentForm.value = 'EditTenantForm';
    formTitle.value = 'Edit Tenant';
    isDrawerVisible.value = true;
  }
};

const showPreviewForm = (id: string) => {
  if (id) {
    currentForm.value = 'PreviewTenantForm';
    formTitle.value = 'Tenant Details';
    isDrawerVisible.value = true;
  }
};

const handleContextMenuAction = (action: string, tenantId: string) => {
  switch (action) {
    case 'VIEW':
      showPreviewForm(tenantId);
      break;
    case 'EDIT':
      showEditForm(tenantId);
      break;
    default:
      break;
  }
};

const cardContent = (data: ITenantListResult) => {
  return {
    _id: data._id,
    tenant_code: data.tenant_code,
    name: data.name,
    description: data.description,
    timestamp: data.last_update_time,
    status: data.is_active,
  };
};

const fetchTenants = async (data: ITenantListRequest) => {
  isSearchResultEmpty.value = false;
  isLoading.value = true;
  try {
    tenantList.value = await tenantStore.tenant(data);
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
};

const handleFilterActions = async (action: IFilterActionsPayload) => {
  switch (action.source) {
    case EVENT_SOURCE.SELECT_ALL:
      isAllTenantsSelected.value = action.payload.data as unknown as boolean;
      break;
    case EVENT_SOURCE.ACCOUNT_STATE_ACTION_DROPDOWN:
      listingPayload.value.is_active = (
        action.payload.data as IActionDropdownItem
      ).action;
      await fetchTenants(listingPayload.value);
      if (!tenantList.value.result || tenantList.value.result.length === 0) {
        isSearchResultEmpty.value = true;
      }
      break;
    case EVENT_SOURCE.SEARCH:
      listingPayload.value.search_text = action.payload.data as string;
      await fetchTenants(listingPayload.value);
      if (!tenantList.value.result || tenantList.value.result.length === 0) {
        isSearchResultEmpty.value = true;
      }
      break;
    case EVENT_SOURCE.ADD_BUTTON:
      showAddForm();
      break;
    default:
      break;
  }
};

const handlePageChange = async (data: IPagination) => {
  listingPayload.value.page_number = data.currentPage;
  listingPayload.value.limit = data.perPage;
  await fetchTenants(listingPayload.value);
};

onMounted(async () => {
  await fetchTenants(listingPayload.value);
});
</script>
