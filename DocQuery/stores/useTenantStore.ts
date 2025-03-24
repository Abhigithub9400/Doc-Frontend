import { defineStore } from 'pinia';
import { tenantApiService } from '~/services';
import type {
  IResponseError,
  ITenantAccessResponse,
  ITenantCreateRequest,
  ITenantCreateResponse,
  ITenantListRequest,
  ITenantListResponse,
  ITenantUpdateRequest,
  ITenantUpdateResponse,
} from '~/types';

export const useTenantStore = defineStore('tenantStore', {
  state: () => {
    return {
      is_active: false,
      limit: 0,
      page_number: 0,
      search_text: '',
      sort_key: '',
      sort_order: 0,
    };
  },
  actions: {
    async tenant(data: ITenantListRequest) {
      return await tenantApiService
        .tenant('/listing', data)
        .then((response: ITenantListResponse) => {
          return response;
        })
        .catch((error: IResponseError) => {
          // do something with the error value like displaying a modal etc.
          const handledErrorCodes = new Set([400, 401, 403, 404, 500]);
          if (handledErrorCodes.has(error.error_code)) {
            console.error(error.message);
          } else {
            console.error(error.message);
          }
          throw error;
        });
    },
    async create(data: ITenantCreateRequest) {
      return await tenantApiService
        .create('/create', data)
        .then((response: ITenantCreateResponse) => {
          return response;
        })
        .catch((error: IResponseError) => {
          // do something with the error value like displaying a modal etc.
          const handledErrorCodes = new Set([400, 401, 403, 404, 500]);
          if (handledErrorCodes.has(error.error_code)) {
            console.error(error.message);
          } else {
            console.error(error.message);
          }
          throw error;
        });
    },
    async getTenantById(id: string) {
      return await tenantApiService
        .getTenantById(`/${id}`)
        .then((response: ITenantAccessResponse) => {
          return response;
        })
        .catch((error: IResponseError) => {
          // do something with the error value like displaying a modal etc.
          const handledErrorCodes = new Set([400, 401, 403, 404, 500]);
          if (handledErrorCodes.has(error.error_code)) {
            console.error(error.message);
          } else {
            console.error(error.message);
          }
          throw error;
        });
    },
    async updateTenantById(id: string, data: ITenantUpdateRequest) {
      return await tenantApiService
        .updateTenantById(`/${id}`, data)
        .then((response: ITenantUpdateResponse) => {
          return response;
        })
        .catch((error: IResponseError) => {
          // do something with the error value like displaying a modal etc.
          const handledErrorCodes = new Set([400, 401, 403, 404, 500]);
          if (handledErrorCodes.has(error.error_code)) {
            console.error(error.message);
          } else {
            console.error(error.message);
          }
          throw error;
        });
    },
  },
});
