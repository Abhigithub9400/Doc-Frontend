import BaseApiClient from '~/services/BaseApiClient';
import type { AxiosResponse } from 'axios';

class PasswordApiService extends BaseApiClient {
  private static readonly RESOURCE = 'v1/auth/';
  private static instance: PasswordApiService;

  private constructor() {
    super(PasswordApiService.RESOURCE);
  }
  static getInstance() {
    if (!PasswordApiService.instance) {
      PasswordApiService.instance = new PasswordApiService();
    }
    return PasswordApiService.instance;
  }

  async passwordRecovery(email: string): Promise<AxiosResponse> {
    return this.post('password-recovery', { email });
  }

  async verifyToken(token: string): Promise<AxiosResponse> {
    return this.post(`verify-token/${token}`);
  }

  async resetPassword(data: Record<string, unknown>): Promise<AxiosResponse> {
    return this.post(`reset-password`, data);
  }
}

export default PasswordApiService.getInstance();
