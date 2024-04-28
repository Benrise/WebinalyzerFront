import { APP_SERVICE_URL } from '@/shared/config';
import type { AxiosInstance } from 'axios';

const baseRequestConfig: AxiosRequestConfig = {
  config: {
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL: APP_SERVICE_URL,
  },
};

const fileRequestConfig: AxiosRequestConfig = {
  config: {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    baseURL: APP_SERVICE_URL,
  },
};

export class CrudRepository<T> {
  constructor(
    protected endpoint: string,
    protected axiosInstance: AxiosInstance
  ) {}

  async get(id: string | number) {
    return this.axiosInstance.get<T>(`${this.endpoint}?idd=${id}`, baseRequestConfig.config);
  }
  async list() {
    return this.axiosInstance.get<T>(this.endpoint, baseRequestConfig.config);
  }
  async sendFile(file: any) {
    console.log(file);
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    return this.axiosInstance.post(`${this.endpoint}`, bodyFormData, fileRequestConfig.config);
  }
}
