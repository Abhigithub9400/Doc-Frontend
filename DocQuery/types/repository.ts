import type { Category } from '~/types/category';

export interface Repository {
  _id?: string;
  create_time: number;
  last_update_time: number;
  create_uid: string;
  last_update_uid: string;
  is_deleted: boolean;
  name: string;
  description: string;
  category_id: string;
  group_ids?: string[];
  category?: Partial<Category>;
}

export interface RepositoryList {
  result: Repository[];
  total_records: number;
  record_count: number;
  next_page: number;
  previous_page: number;
}
