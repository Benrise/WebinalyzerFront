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

    async get() {
        return this.axiosInstance.get<T>(this.endpoint, baseRequestConfig.config);
    }
}
