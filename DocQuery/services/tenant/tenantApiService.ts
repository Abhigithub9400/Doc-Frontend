import { apiClient } from '../apiClient';
import type {
  ITenantAccessResponse,
  ITenantCreateRequest,
  ITenantCreateResponse,
  ITenantListRequest,
  ITenantListResponse,
  ITenantUpdateRequest,
} from '~/types';
import type { AxiosResponse, AxiosError } from 'axios';

const RESOURCE = 'v1/tenants';

export const tenantApiService = {
  async tenant(
    url: string,
    data: ITenantListRequest,
  ): Promise<ITenantListResponse> {
    const body = {
      is_active: data.is_active,
      limit: data.limit,
      page_number: data.page_number,
      search_text: data.search_text,
      sort_key: data.sort_key,
      sort_order: data.sort_order,
    };
    return apiClient
      .post(RESOURCE + url, body)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        if (error.code === '422') {
          console.error(error.response?.data);
        } else {
          console.error(error.response?.data);
        }
        throw error;
      });
  },

  async create(
    url: string,
    data: ITenantCreateRequest,
  ): Promise<ITenantCreateResponse> {
    const body = {
      description: data.description,
      email: data.email,
      is_active: data.is_active,
      name: data.name,
      password: data.password,
      tenant_config: {
        embedding_model: data.tenant_config.embedding_model,
        rag_model: data.tenant_config.rag_model,
      },
    };
    return apiClient
      .post(RESOURCE + url, body)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        if (error.code === '422') {
          console.error(error.response?.data);
        } else {
          console.error(error.response?.data);
        }
        throw error;
      });
  },

  async getTenantById(tenant_id: string): Promise<ITenantAccessResponse> {
    return apiClient
      .get(`${RESOURCE}/${tenant_id}`)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        if (error.code === '422') {
          console.error(error.response?.data);
        } else {
          console.error(error.response?.data);
        }
        throw error;
      });
  },

  async updateTenantById(
    tenant_id: string,
    data: ITenantUpdateRequest,
  ): Promise<ITenantAccessResponse> {
    const body = {
      description: data.description,
      is_active: data.is_active,
      name: data.name,
      tenant_config: {
        embedding_model: data.tenant_config.embedding_model,
        rag_model: data.tenant_config.rag_model,
      },
    };
    return apiClient
      .patch(`${RESOURCE}/${tenant_id}`, body)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        if (error.code === '422') {
          console.error(error.response?.data);
        } else {
          console.error(error.response?.data);
        }
        throw error;
      });
  },
};
