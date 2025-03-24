import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { useAxios } from '~/composables/useAxios';
const createAxiosClient = (API_BASE_URL: string): AxiosInstance => {
  const axiosClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosClient.interceptors.request.use(
    (config) => {
      let authStore;
      const authStoreString: string = sessionStorage.getItem('authStore') || '';
      try {
        authStore = JSON.parse(authStoreString);
      } catch (e: unknown) {
        console.warn(e);
      }
      const token = authStore?.access_token;

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      const { setLoading } = useAxios();
      setLoading(true);

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
      const { setLoading } = useAxios();
      setLoading(false);
      return response;
    },
    (error) => {
      const { setLoading } = useAxios();
      setLoading(false);
      return Promise.reject(error);
    },
  );

  return axiosClient;
};

export default createAxiosClient;
