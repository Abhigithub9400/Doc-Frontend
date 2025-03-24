// import axiosClient from '~/utils/axiosClient';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export const apiClient = {
  async get(
    url: string,
    params?: Record<string, unknown>,
  ): Promise<AxiosResponse> {
    const axiosClient: AxiosInstance = useNuxtApp().$axios as AxiosInstance;
    return axiosClient
      .get(url, params)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  },

  async post(
    url: string,
    body?: Record<string, unknown>,
  ): Promise<AxiosResponse> {
    const axiosClient = useNuxtApp().$axios as AxiosInstance;
    return axiosClient
      .post(url, body)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  },

  async put(
    url: string,
    body?: Record<string, unknown>,
  ): Promise<AxiosResponse> {
    const axiosClient = useNuxtApp().$axios as AxiosInstance;
    return axiosClient
      .put(url, body)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  },

  async patch(
    url: string,
    body?: Record<string, unknown>,
  ): Promise<AxiosResponse> {
    const axiosClient = useNuxtApp().$axios as AxiosInstance;
    return axiosClient
      .patch(url, body)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  },

  async delete(
    url: string,
    params?: Record<string, unknown>,
  ): Promise<AxiosResponse> {
    const axiosClient = useNuxtApp().$axios as AxiosInstance;
    return axiosClient
      .delete(url, params)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  },
};
