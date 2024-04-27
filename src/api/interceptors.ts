import axiosInstance from "./axios"
import { type InternalAxiosRequestConfig, type AxiosResponse, AxiosError } from "axios"

axiosInstance.interceptors.request.use(
    (config): InternalAxiosRequestConfig => {
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
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
      Promise.reject(error);
    },
  );