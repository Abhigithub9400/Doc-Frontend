export interface Category {
  _id?: number | string;
  description: string;
  name: string;
  is_active: boolean;
  create_time?: number;
  last_update_time?: number;
  creat_uid?: string;
  last_update_uid?: string;
}

export interface CategoryList {
  result: Category[];
  total_records: number;
  record_count: number;
  next_page: number;
  previous_page: number;
}
