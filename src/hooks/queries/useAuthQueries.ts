import { useMutation } from '@tanstack/react-query';
import { authService } from '../../services/api/authService';
import type { LoginRequest } from '../../types/api';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (response) => {
      login(response.token, response.data.user);
      navigate('/admin/dashboard');
    },
  });
};
