import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/components/ui/Toast';
import api from '@/services/api/apiClient';
import { useMutation } from '@tanstack/react-query';

const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

const loginUser = async (data: LoginFormValues) => {
  const response = await api.post('/login', data);
  return response.data;
};

export const useLoginForm = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { addToast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.user, data.token);
      addToast('success', `Bem-vindo, ${data.user.name}!`);
      navigate('/');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || 'Erro ao fazer login';
      addToast('error', message);
    },
  });

  const onSubmit = form.handleSubmit((data) => mutation.mutate(data));

  return {
    ...form,
    onSubmit,
    isLoading: mutation.isPending,
  };
};
