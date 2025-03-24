import { defineStore } from 'pinia';
import { authApiService } from '~/services';
import type {
  ILoginRequest,
  ILoginResponse,
  ILogoutResponse,
  IRefreshResponse,
  IResponseError,
} from '~/types';

const initialAuthState = {
  username: '',
  password: '',
  access_token: '',
  refresh_token: '',
  message: '',
  email: '',
  isSuperAdmin: false,
  isAdmin: false,
  isActive: false,
  sessionId: '',
  isAuthenticated: false,
  isLoggedIn: false,
  avatarUrl: '',
};

export const useAuthStore = defineStore('authStore', {
  persist: true,
  state: () => {
    return {
      ...initialAuthState,
    };
  },
  actions: {
    async login(data: ILoginRequest) {
      return await authApiService
        .login('/login', data)
        .then((response: ILoginResponse) => {
          if (response.access_token && response.refresh_token) {
            this.access_token = response.access_token;
            this.refresh_token = response.refresh_token;
            this.isLoggedIn = true;
            this.isAuthenticated = true;
          }
          return response;
        })
        .catch((error: IResponseError) => {
          // do something with the error value like displaying a modal etc.
          const handledErrorCodes = new Set([400, 401, 403, 404, 500]);
          if (handledErrorCodes.has(error.error_code)) {
            console.error(error.message);
          } else {
            console.error(error.message);
          }
          throw error;
        });
    },

    async logout() {
      return await authApiService
        .logout('/logout')
        .then((response: ILogoutResponse) => {
          this.message = response.message;
          this.username = '';
          this.password = '';
          this.access_token = '';
          this.refresh_token = '';
          this.isLoggedIn = false;
          this.isAuthenticated = false;
          this.isSuperAdmin = false;

          sessionStorage.clear('authStore');

          return response;
        })
        .catch((error: IResponseError) => {
          // do something with the error value like displaying a modal etc.
          const handledErrorCodes = new Set([400, 401, 403, 404, 500]);
          if (handledErrorCodes.has(error.error_code)) {
            console.error(error.message);
          } else {
            console.error(error.message);
          }
          throw error;
        });
    },

    async refresh() {
      return await authApiService
        .refresh('/refresh')
        .then((response: IRefreshResponse) => {
          this.access_token = response.access_token;
          this.refresh_token = response.refresh_token;
          if (response.access_token && response.refresh_token) {
            this.isLoggedIn = true;
            this.isAuthenticated = true;
          }
          return response;
        })
        .catch((error: IResponseError) => {
          // do something with the error value like displaying a modal etc.
          const handledErrorCodes = new Set([400, 401, 403, 404, 500]);
          if (handledErrorCodes.has(error.error_code)) {
            console.error(error.message);
          } else {
            console.error(error.message);
          }
          throw error;
        });
    },

    async whoami() {
      return await authApiService
        .whoami('/whoami')
        .then((response) => {
          this.email = response.email;
          this.isSuperAdmin = response.is_super_admin;
          this.isActive = response.is_active;
          this.sessionId = response.session_id;
          return response;
        })
        .catch((error: IResponseError) => {
          // do something with the error value like displaying a modal etc.
          const handledErrorCodes = new Set([400, 401, 403, 404, 500]);
          if (handledErrorCodes.has(error.error_code)) {
            console.error(error.message);
          } else {
            console.error(error.message);
          }
          throw error;
        });
    },
  },
  getters: {
    getIsAuthenticated: (state) => {
      return state.isAuthenticated;
    },

    getIsLoggedId: (state) => {
      return state.isLoggedIn;
    },

    getIsSuperAdmin: (state) => {
      return state.isSuperAdmin;
    },
  },
});
