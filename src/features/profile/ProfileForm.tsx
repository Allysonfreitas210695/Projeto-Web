import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect } from 'react';
import { Spinner } from '@/components/ui/Spinner';

const profileSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  title: z.string().optional(),
  department: z.string().optional(),
  institution: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface User {
  id: string;
  name: string;
  email: string;
  title?: string;
  department?: string;
  institution?: string;
}

interface ProfileFormProps {
  user?: User | null;
  onClose: () => void;
  onSubmit: (data: ProfileFormValues) => Promise<void>;
  isLoading: boolean;
}

const ProfileForm = ({ user, onClose, onSubmit, isLoading }: ProfileFormProps) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      title: '',
      department: '',
      institution: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        title: user.title || '',
        department: user.department || '',
        institution: user.institution || '',
      });
    }
  }, [user, reset]);

  const handleFormSubmit = async (data: ProfileFormValues) => {
    await onSubmit(data);
    reset({
      name: '',
      email: '',
      title: '',
      department: '',
      institution: '',
    });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-md border rounded-xl shadow-lg animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-card z-10">
          <h3 className="text-xl font-bold">Editar Perfil</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome Completo</label>
            <input
              {...register('name')}
              className="w-full h-10 px-3 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="Ex: João Silva"
            />
            {errors.name && (
              <p className="text-xs text-destructive mt-1 font-medium">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register('email')}
              type="email"
              className="w-full h-10 px-3 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="Ex: joao@ufersa.edu.br"
            />
            {errors.email && (
              <p className="text-xs text-destructive mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cargo/Título (opcional)</label>
            <input
              {...register('title')}
              className="w-full h-10 px-3 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="Ex: Pesquisador Sênior"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Departamento (opcional)</label>
            <input
              {...register('department')}
              className="w-full h-10 px-3 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="Ex: Ciência da Computação"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Instituição (opcional)</label>
            <input
              {...register('institution')}
              className="w-full h-10 px-3 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="Ex: UFERSA"
            />
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
              {isLoading ? <Spinner size="sm" /> : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
