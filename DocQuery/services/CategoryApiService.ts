import type { Category, CategoryList } from '~/types/category';
import type { PaginationOption } from '~/types';
import BaseApiClient from '~/services/BaseApiClient';
import type { AxiosResponse } from 'axios';

class CategoryApiService extends BaseApiClient {
  private static readonly RESOURCE = 'v1/tenant/';
  private static readonly PATH = `categories`;

  private static instance: CategoryApiService;

  private constructor() {
    super(CategoryApiService.RESOURCE);
  }

  static getInstance(): CategoryApiService {
    if (!CategoryApiService.instance) {
      CategoryApiService.instance = new CategoryApiService();
    }
    return CategoryApiService.instance;
  }

  async addCategory(category: Category): Promise<AxiosResponse<Category>> {
    const requestBody: Record<string, unknown> = { ...category } as Record<
      string,
      unknown
    >;
    return this.post(`${CategoryApiService.PATH}`, requestBody);
  }

  async deleteCategory(
    ids: Array<string>,
  ): Promise<AxiosResponse<Record<string, string>>> {
    return this.delete(`${CategoryApiService.PATH}`, {
      category_ids: ids,
    });
  }

  async updateCategory(
    id: string,
    category: Partial<Category>,
  ): Promise<AxiosResponse<Category>> {
    try {
      if (id) {
        const { _id, ...updatedCategory } = category as unknown as Record<
          string,
          unknown
        >;
        return this.patch(`${CategoryApiService.PATH}/${id}`, updatedCategory);
      }
      this.handleError('Category id missing');
    } catch (e: unknown) {
      return this.handleError(e);
    }
  }

  async listCategories(
    categoryPagination: PaginationOption = {},
  ): Promise<AxiosResponse<CategoryList>> {
    const { is_active, ...rest } = this.defaultPageOptions;
    const mergedOptions: Record<string, unknown> = {
      ...rest,
      ...categoryPagination,
    };
    return this.post(`${CategoryApiService.PATH}/listing`, mergedOptions);
  }
}

const categoryApiService = CategoryApiService.getInstance();

export default categoryApiService;
