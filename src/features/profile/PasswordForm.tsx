import { X, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Spinner } from '@/components/ui/Spinner';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
    newPassword: z.string().min(6, 'Nova senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirme a senha'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface PasswordFormProps {
  onClose: () => void;
  onSubmit: (data: { currentPassword: string; newPassword: string }) => Promise<void>;
  isLoading: boolean;
}

export const PasswordForm = ({ onClose, onSubmit, isLoading }: PasswordFormProps) => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-md border rounded-xl shadow-lg animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Lock size={20} />
            Mudar Senha
          </h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit((data) =>
            onSubmit({ currentPassword: data.currentPassword, newPassword: data.newPassword })
          )}
          className="p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Senha Atual</label>
            <div className="relative">
              <input
                {...register('currentPassword')}
                type={showCurrent ? 'text' : 'password'}
                className="w-full h-10 px-3 pr-10 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-xs text-destructive mt-1 font-medium">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nova Senha</label>
            <div className="relative">
              <input
                {...register('newPassword')}
                type={showNew ? 'text' : 'password'}
                className="w-full h-10 px-3 pr-10 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-destructive mt-1 font-medium">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirmar Nova Senha</label>
            <div className="relative">
              <input
                {...register('confirmPassword')}
                type={showConfirm ? 'text' : 'password'}
                className="w-full h-10 px-3 pr-10 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-destructive mt-1 font-medium">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-10 border font-medium rounded-md hover:bg-muted transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 h-10 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? <Spinner size="sm" /> : 'Alterar Senha'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordForm;
