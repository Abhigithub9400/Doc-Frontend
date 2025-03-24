export default interface ITenantData {
  _id: string;
  create_time: number;
  last_update_time: number;
  create_uid: string;
  last_update_uid: string;
  is_deleted: boolean;
  name: string;
  email: string;
  password?: string;
  tenant_code: string;
  tenant_config: {
    embedding_model: string;
    rag_model: string;
  };
  is_active: boolean;
  description: string;
}
