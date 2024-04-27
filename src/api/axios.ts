import { API_BASE_URL } from '@/shared/config';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 100000,
})

export default axiosInstance