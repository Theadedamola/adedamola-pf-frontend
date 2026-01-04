import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://adedamola-pf-backend.onrender.com/api';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling and token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (Token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Implement refresh token logic here
        // const refreshToken = useAuthStore.getState().refreshToken; // If we store refresh token
        // const response = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
        // const { token } = response.data;
        
        // useAuthStore.getState().login(token, useAuthStore.getState().user);
        // originalRequest.headers.Authorization = `Bearer ${token}`;
        // return axiosInstance(originalRequest);
        
        // For now, just logout if 401
        useAuthStore.getState().logout();
        window.location.href = '/admin/login';
        return Promise.reject(error);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        window.location.href = '/admin/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
