import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const userSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  role: z.string().min(1, 'Por favor, selecione um cargo'),
  status: z.enum(['Active', 'Inactive']),
});

export type UserFormValues = z.infer<typeof userSchema>;

interface UseUserFormProps {
  onSubmit: (data: UserFormValues) => void;
}

export const useUserForm = ({ onSubmit }: UseUserFormProps) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      status: 'Active',
    },
  });

  return {
    ...form,
    handleFormSubmit: form.handleSubmit(onSubmit),
  };
};
