import { API_BASE_URL } from '@/shared/config';
import axios from 'axios';
import { type InternalAxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios';
import { useToast } from '@/shared/ui/toast/use-toast';

const { toast } = useToast();

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100000,
});

axiosInstance.interceptors.request.use(
  (config): InternalAxiosRequestConfig => {
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response): Promise<AxiosResponse> => {
    return Promise.resolve(response);
  },
  async (error: AxiosError) => {
    console.error(error);
    toast({
      variant: 'destructive',
      title: 'Непредвиденная ошибка',
      description: `${error}`,
    });
    Promise.reject(error);
  }
);

export default axiosInstance;
