export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  refresh_token: string;
  access_token: string;
}

export interface IRefreshResponse {
  access_token: string;
  refresh_token: string;
}

export interface IIdentityResponse {
  email: string;
  is_super_admin: boolean;
  is_active: boolean;
  session_id: string;
}

export interface ILogoutResponse {
  message: string;
}

export interface IResponseError {
  error_code: number;
  message: string;
  extras: object;
  errors: Array;
}
