import { APP_SERVICE_URL } from '@/shared/config';
import type { AxiosInstance } from 'axios';

const baseRequestConfig: AxiosRequestConfig = {
    config: {
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL: APP_SERVICE_URL,
    }
}

export class CrudRepository<T> {
    constructor(protected endpoint: string, protected axiosInstance: AxiosInstance) {}

    async get(id: string | number) {
        return this.axiosInstance.get<T>(`${this.endpoint}?idd=${id}`, baseRequestConfig.config);
    }
    async list() {
        return this.axiosInstance.get<T>(this.endpoint, baseRequestConfig.config);
    }
}
