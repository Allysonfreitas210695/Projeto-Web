import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  status: 'Active' | 'Inactive';
  department?: string;
  createdAt?: string;
}

const STORAGE_KEY = 'sifu_users';

const defaultUsers: User[] = [
  {
    id: '1',
    name: 'Dra. Helena Silva',
    email: 'helena.silva@ufersa.edu.br',
    role: 'admin',
    status: 'Active',
    department: 'Pós-Graduação',
  },
  {
    id: '2',
    name: 'Prof. Marcus Doe',
    email: 'marcus.doe@ufersa.edu.br',
    role: 'editor',
    status: 'Active',
    department: 'Graduação',
  },
  {
    id: '3',
    name: 'Eng. Sofia Luz',
    email: 'sofia.luz@ufersa.edu.br',
    role: 'user',
    status: 'Inactive',
    department: 'TI',
  },
  {
    id: '4',
    name: 'Dr. Ricardo Menezes',
    email: 'ricardo.menezes@ufersa.edu.br',
    role: 'admin',
    status: 'Active',
    department: 'Pesquisa',
  },
];

const getStoredUsers = (): User[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  return JSON.parse(stored);
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const useUsers = () => {
  const { addToast } = useToast();
  const [users, setUsers] = useState<User[]>(() => {
    if (typeof window !== 'undefined') {
      return getStoredUsers();
    }
    return defaultUsers;
  });
  const [isLoading, setIsLoading] = useState(false);

  const getAll = () => users;

  const createUser = async (data: Omit<User, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newUser: User = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      const updated = [...users, newUser];
      setUsers(updated);
      saveUsers(updated);
      addToast('success', 'Usuário criado com sucesso!');
      return true;
    } catch (error) {
      addToast('error', 'Erro ao criar usuário.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (id: string, data: Partial<User>) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const updated = users.map((u) => (u.id === id ? { ...u, ...data } : u));
      setUsers(updated);
      saveUsers(updated);
      addToast('success', 'Usuário atualizado!');
      return true;
    } catch (error) {
      addToast('error', 'Erro ao atualizar usuário.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const updated = users.filter((u) => u.id !== id);
      setUsers(updated);
      saveUsers(updated);
      addToast('success', 'Usuário excluído.');
    } catch (error) {
      addToast('error', 'Erro ao excluir usuário.');
    } finally {
      setIsLoading(false);
    }
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
    users: getAll(),
    isLoading,
    createUser,
    updateUser,
    deleteUser,
    toggleStatus,
    getStats,
  };
};
