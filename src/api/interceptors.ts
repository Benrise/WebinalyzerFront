import axiosInstance from "./axios"
import { type InternalAxiosRequestConfig, type AxiosResponse, AxiosError } from "axios"
import { useToast } from '@/shared/ui/toast/use-toast'

const { toast } = useToast();

axiosInstance.interceptors.request.use(
    (config): InternalAxiosRequestConfig => {
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        alert()
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
  
    /**
     * 
     *  Success response
     * 
     */
    async (response): Promise<AxiosResponse> => { 

      return Promise.resolve(response);
    },
  
     /**
     * 
     *  Error response
     * 
     */
    async (error: AxiosError) => {
      const statusCode = error.response?.status;
      console.error(error);
      const { message } = error.response?.data as { message?: string };
      if (statusCode && statusCode >= 500) {
          toast({
            title: `${statusCode} - сервер недоступен`,
            description: 'Сервер по техническим причинам временно не может обрабатывать запросы',
          });
      }
      alert()
      Promise.reject(error);
    },
  );
