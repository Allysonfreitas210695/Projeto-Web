import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido').endsWith('.edu.br', 'Use um email acadêmico (.edu.br)'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  university: z.string().min(2, 'Informe sua instituição'),
  department: z.string().min(2, 'Informe seu curso ou departamento'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    console.log('Register data:', data);
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login');
    }, 1500);
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
  };
};
