import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/Toast';
import api from '@/services/api/apiClient';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  status: 'Active' | 'Inactive';
  department?: string;
  createdAt?: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

export const useUsers = () => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<User, 'id' | 'createdAt'>) =>
      api.post('/users', {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      addToast('success', 'Usuário criado com sucesso!');
    },
    onError: () => {
      addToast('error', 'Erro ao criar usuário.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      api.patch(`/users/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      addToast('success', 'Usuário atualizado!');
    },
    onError: () => {
      addToast('error', 'Erro ao atualizar usuário.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      addToast('success', 'Usuário excluído.');
    },
    onError: () => {
      addToast('error', 'Erro ao excluir usuário.');
    },
  });

  const createUser = async (data: Omit<User, 'id' | 'createdAt'>) => {
    await createMutation.mutateAsync(data);
    return true;
  };

  const updateUser = async (id: string, data: Partial<User>) => {
    await updateMutation.mutateAsync({ id, data });
    return true;
  };

  const deleteUser = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  const toggleStatus = async (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      await updateUser(id, { status: user.status === 'Active' ? 'Inactive' : 'Active' });
    }
  };

  const getStats = () => ({
    total: users.length,
    active: users.filter((u) => u.status === 'Active').length,
    inactive: users.filter((u) => u.status === 'Inactive').length,
    admins: users.filter((u) => u.role === 'admin').length,
  });

  return {
    users,
    isLoading,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    createUser,
    updateUser,
    deleteUser,
    toggleStatus,
    getStats,
  };
};
