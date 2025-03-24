import { apiClient } from '~/services/apiClient';
import type { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';

class BaseApiClient {
  private readonly baseURLPrefix;

  constructor(url: string) {
    this.baseURLPrefix = url;
  }

  public defaultPageOptions = {
    is_active: true,
    limit: 15,
    page_number: 1,
    search_text: '',
    sort_key: 'name',
    sort_order: 1,
  };
  handleError(error: AxiosError | unknown): never {
    let message: string = '',
      displayMessage = '';
    if (error instanceof AxiosError) {
      const response = error?.response as AxiosResponse;
      message = response?.data?.message;
      displayMessage = message;
    }
    if (!message) {
      if (error instanceof Error) {
        message = error.message;
      }
    }
    if (displayMessage) {
      useNuxtApp()?.$showToast({
        severity: 'error',
        summary: displayMessage,
      });
    }
    throw new Error(message);
  }

  async handleRequest<T>(apiCall: () => Promise<AxiosResponse<T>>): Promise<T> {
    try {
      const response = await apiCall();
      if (response.status === 200) {
        if (response?.data?.message) {
          useNuxtApp()?.$showToast({
            severity: 'success',
            summary: response.data?.message,
          });
        }
      }
      return response?.data;
    } catch (error: unknown) {
      return this.handleError(error);
    }
  }

  async get(
    url: string,
    params: Record<string, unknown> = {},
  ): Promise<AxiosResponse> {
    return this.handleRequest(() => {
      return apiClient.get(this.baseURLPrefix + url, params);
    });
  }

  async post(
    url: string,
    data: Record<string, unknown> = {},
  ): Promise<AxiosResponse> {
    return this.handleRequest(() => {
      return apiClient.post(this.baseURLPrefix + url, data);
    });
  }
  async put(
    url: string,
    data: Record<string, unknown> = {},
  ): Promise<AxiosResponse> {
    return this.handleRequest(() => {
      return apiClient.put(this.baseURLPrefix + url, data);
    });
  }

  async patch(
    url: string,
    params: Record<string, unknown> = {},
  ): Promise<AxiosResponse> {
    return this.handleRequest(() => {
      return apiClient.patch(this.baseURLPrefix + url, params);
    });
  }
  async delete(
    url: string,
    data: Record<string, unknown> = {},
  ): Promise<AxiosResponse> {
    return this.handleRequest(() => {
      return apiClient.delete(this.baseURLPrefix + url, {
        data: data,
      });
    });
  }
}
export default BaseApiClient;
