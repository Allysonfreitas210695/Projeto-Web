import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X } from 'lucide-react';

const userSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  role: z.string().min(1, 'Por favor, selecione um cargo'),
  status: z.enum(['Active', 'Inactive']),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  onClose: () => void;
  onSubmit: (data: UserFormValues) => void;
}

const UserForm = ({ onClose, onSubmit }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      status: 'Active',
    },
  });

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-md border rounded-xl shadow-lg animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold">Adicionar Novo Usuário</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome Completo</label>
            <input
              {...register('name')}
              className="w-full h-10 px-3 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="Ex: João Silva"
            />
            {errors.name && <p className="text-xs text-destructive mt-1 font-medium">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cargo</label>
            <select
              {...register('role')}
              className="w-full h-10 px-3 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
            >
              <option value="">Selecione um cargo</option>
              <option value="Admin">Administrador</option>
              <option value="Editor">Editor</option>
              <option value="User">Usuário</option>
            </select>
            {errors.role && <p className="text-xs text-destructive mt-1 font-medium">{errors.role.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status Inicial</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="Active" {...register('status')} className="text-primary focus:ring-primary" />
                <span className="text-sm">Ativo</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="Inactive" {...register('status')} className="text-primary focus:ring-primary" />
                <span className="text-sm">Inativo</span>
              </label>
            </div>
            {errors.status && <p className="text-xs text-destructive mt-1 font-medium">{errors.status.message}</p>}
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
              className="flex-1 h-10 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity"
            >
              Criar Usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
