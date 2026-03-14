import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const forgotSchema = z.object({
  email: z.string().email('Email inválido'),
});

export type ForgotFormValues = z.infer<typeof forgotSchema>;

export const useForgotForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotFormValues) => {
    setIsLoading(true);
    console.log('Forgot password request for:', data.email);
    // Simulating API call (AWS SES flow)
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
    isSent,
  };
};
