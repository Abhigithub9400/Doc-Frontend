import BaseApiClient from '~/services/BaseApiClient';
import type { AxiosResponse } from 'axios';
import type { Repository, RepositoryList } from '~/types/repository';
import type { PaginationOption } from '~/types';

class RepositoryApiService extends BaseApiClient {
  private static readonly RESOURCE = 'v1/tenant/';
  private static readonly PATH = `repositories`;

  private static instance: RepositoryApiService;
  constructor() {
    super(RepositoryApiService.RESOURCE);
  }
  static getInstance(): RepositoryApiService {
    if (!RepositoryApiService.instance) {
      RepositoryApiService.instance = new RepositoryApiService();
    }
    return RepositoryApiService.instance;
  }

  async getRepositoryList(
    category_id: string,
    repositoryPagination: PaginationOption,
  ): Promise<AxiosResponse<RepositoryList>> {
    const paginationOptions = {
      category_id,
      ...(this.defaultPageOptions as Record<string, unknown>),
      ...repositoryPagination,
    };
    return this.post(`${RepositoryApiService.PATH}/listing`, paginationOptions);
  }

  async createRepositories(
    repository: Repository,
  ): Promise<AxiosResponse<Repository>> {
    const requestBody: Record<string, unknown> = { ...repository } as Record<
      string,
      unknown
    >;
    return this.post(`${RepositoryApiService.PATH}`, requestBody);
  }

  async getRepositoryById(id: string): Promise<AxiosResponse<Repository>> {
    return this.get(`${RepositoryApiService.PATH}/${id}`);
  }

  async updateRepository(
    repository: Partial<Repository>,
  ): Promise<AxiosResponse<Repository>> {
    const { _id, ...updateRepository } = repository;
    return this.patch(`${RepositoryApiService.PATH}/${_id}`, updateRepository);
  }

  async deleteRepository(
    ids: string[],
  ): Promise<AxiosResponse<Record<string, unknown>>> {
    return this.post(`${RepositoryApiService.PATH}/delete`, {
      repository_ids: ids,
    });
  }
}

export default RepositoryApiService.getInstance();
