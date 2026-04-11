import { useState } from 'react';
import UserForm from '@/features/users/UserForm';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { useUsers } from '@/hooks/useUsers';
import { Spinner } from '@/components/ui/Spinner';

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { users, isLoading, deleteUser, toggleStatus } = useUsers();

  const handleDeleteUser = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      await deleteUser(id);
    }
  };

  const handleToggleStatus = async (id: string) => {
    await toggleStatus(id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    );
  }

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
              <th className="text-left py-4 px-6 title-sm font-semibold text-on-surface">Email</th>
              <th className="text-left py-4 px-6 title-sm font-semibold text-on-surface">Cargo</th>
              <th className="text-left py-4 px-6 title-sm font-semibold text-on-surface">Status</th>
              <th className="text-right py-4 px-6 title-sm font-semibold text-on-surface">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-surface-container-low transition-colors">
                <td className="py-4 px-6 title-sm font-medium text-on-surface">{user.name}</td>
                <td className="py-4 px-6 body-md text-on-surface-variant">{user.email}</td>
                <td className="py-4 px-6 body-md text-on-surface-variant">
                  {user.role === 'admin'
                    ? 'Administrador'
                    : user.role === 'editor'
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
                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    className="label-md text-primary hover:underline"
                  >
                    {user.status === 'Active' ? 'Desativar' : 'Ativar'}
                  </button>
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

      {isModalOpen && <UserForm onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default UsersPage;
