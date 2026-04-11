import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/Toast';

const forgotSchema = z.object({
  email: z
    .string()
    .email('Email institucional inválido')
    .includes('ufersa', 'Use seu email institucional @ufersa.edu.br'),
});

export type ForgotFormValues = z.infer<typeof forgotSchema>;

export const useForgotForm = () => {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotFormValues) => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSent(true);
      addToast('success', 'Link de recuperação enviado para seu email institucional!');
    } catch (error) {
      addToast('error', 'Erro ao enviar email. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
    isSent,
  };
};
