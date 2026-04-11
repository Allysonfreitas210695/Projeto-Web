import { useState } from 'react';
import UserForm from '@/features/users/UserForm';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';

interface User {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Alice Johnson', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Smith', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Charlie Brown', role: 'User', status: 'Inactive' },
  ]);

  const handleAddUser = (data: Omit<User, 'id'>) => {
    const newUser = {
      ...data,
      id: Math.max(...users.map((u) => u.id), 0) + 1,
    };
    setUsers([...users, newUser]);
    setIsModalOpen(false);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
        <div className="space-y-2">
          <h2 className="headline-lg text-on-surface">Usuários</h2>
          <p className="body-md text-on-surface-variant">
            Gerencie os pesquisadores e funcionários da universidade.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          className="whitespace-nowrap"
        >
          Adicionar Usuário
        </Button>
      </div>

      <Card variant="default" className="overflow-x-auto p-0!">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b">
              <th className="text-left py-4 px-6 title-sm font-semibold text-on-surface">Nome</th>
              <th className="text-left py-4 px-6 title-sm font-semibold text-on-surface">Cargo</th>
              <th className="text-left py-4 px-6 title-sm font-semibold text-on-surface">Status</th>
              <th className="text-right py-4 px-6 title-sm font-semibold text-on-surface">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-surface-container-low transition-colors">
                <td className="py-4 px-6 title-sm font-medium text-on-surface">{user.name}</td>
                <td className="py-4 px-6 body-md text-on-surface-variant">
                  {user.role === 'Admin'
                    ? 'Administrador'
                    : user.role === 'Editor'
                      ? 'Editor'
                      : 'Usuário'}
                </td>
                <td className="py-4 px-6">
                  {user.status === 'Active' ? (
                    <Chip variant="academic">Ativo</Chip>
                  ) : (
                    <Chip variant="status" className="bg-error-container text-error">
                      Inativo
                    </Chip>
                  )}
                </td>
                <td className="py-4 px-6 text-right space-x-4">
                  <button className="label-md text-primary hover:underline">Editar</button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="label-md text-error hover:underline"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {isModalOpen && <UserForm onClose={() => setIsModalOpen(false)} onSubmit={handleAddUser} />}
    </div>
  );
};

export default UsersPage;
