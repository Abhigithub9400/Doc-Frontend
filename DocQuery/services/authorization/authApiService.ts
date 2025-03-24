import { apiClient } from '../apiClient';
import type {
  IIdentityResponse,
  ILoginRequest,
  ILoginResponse,
  ILogoutResponse,
  IRefreshResponse,
} from '~/types';
import type { AxiosResponse, AxiosError } from 'axios';

const RESOURCE = 'v1/auth';

export const authApiService = {
  async login(url: string, data: ILoginRequest): Promise<ILoginResponse> {
    const body: Record<string, unknown> = {
      username: data.username,
      password: data.password,
    };
    return apiClient
      .post(RESOURCE + url, body)
      .then((response: AxiosResponse) => {
        const result: ILoginResponse = {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        };
        return result;
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

  async logout(url: string): Promise<ILogoutResponse> {
    return apiClient
      .post(RESOURCE + url)
      .then((response: AxiosResponse) => {
        const result: ILogoutResponse = {
          message: response.data.message,
        };
        return result;
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.data);
        throw error;
      });
  },

  async refresh(url: string): Promise<IRefreshResponse> {
    return apiClient
      .post(RESOURCE + url)
      .then((response: AxiosResponse) => {
        const result: IRefreshResponse = {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        };
        return result;
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.data);
        throw error;
      });
  },

  async whoami(url: string): Promise<IIdentityResponse> {
    return apiClient
      .get(RESOURCE + url)
      .then((response: AxiosResponse) => {
        return {
          email: response.data.email,
          is_super_admin: response.data.is_super_admin,
          is_active: response.data.is_active,
          session_id: response.data.session_id,
        };
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.data);
        throw error;
      });
  },

  async verifyExpiredLink(token: string): Promise<AxiosResponse | AxiosError> {
    return apiClient
      .get(`${RESOURCE}/verify-link?token=${token}`, {})
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error: AxiosError) => {
        return error;
      });
  },

  async resendLink(email: string): Promise<AxiosResponse | AxiosError> {
    return apiClient
      .post(`${RESOURCE}/resend-link`, { email })
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error: AxiosError) => {
        return error;
      });
  },
};
