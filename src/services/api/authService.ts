import { axiosInstance } from './axiosInstance';
import type { LoginRequest, LoginResponse } from '../../types/api';

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },
};
