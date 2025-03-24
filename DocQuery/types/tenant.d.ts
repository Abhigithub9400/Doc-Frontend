export interface ITenantListRequest {
  is_active: boolean | null;
  limit: number;
  page_number: number;
  search_text: string;
  sort_key: string;
  sort_order: number;
}

export interface ITenantListResult {
  _id: string;
  create_time: number;
  last_update_time: number;
  create_uid: string;
  last_update_uid: string;
  is_deleted: boolean;
  name: string;
  email: string;
  tenant_code: string;
  tenant_config: {
    embedding_model: string;
    rag_model: string;
  };
  is_active: boolean;
  description: string;
}

export interface ITenantListResponse {
  result: ITenantListResult[] | [];
  total_record: number;
  record_count: number;
  next_page: number;
}

export interface ITenantCreateRequest {
  description: string;
  email: string;
  is_active: boolean;
  name: string;
  password: string;
  tenant_config: {
    embedding_model: string;
    rag_model: string;
  };
}

export interface ITenantCreateResponse {
  _id: string;
  email: string;
  name: string;
  is_active: boolean;
  tenant_code: string;
  user_data: [
    {
      _id: string;
      email: string;
      name: string;
      is_deleted: boolean;
      avatar_url: string;
    },
  ];
}

export interface ITenantAccessResponse {
  _id: string;
  create_time: number;
  last_update_time: number;
  create_uid: string;
  last_update_uid: string;
  is_deleted: boolean;
  email: string;
  name: string;
  description: string;
  tenant_code: string;
  tenant_config: object;
}

export interface ITenantUpdateRequest {
  description: string;
  is_active: boolean;
  name: string;
  tenant_config: {
    embedding_model: string;
    rag_model: string;
  };
}
export interface ITenantUpdateResponse {
  _id: string;
  create_time: number;
  last_update_time: number;
  create_uid: string;
  last_update_uid: string;
  is_deleted: boolean;
  email: string;
  name: string;
  description: string;
  tenant_code: string;
  tenant_config: object;
}
