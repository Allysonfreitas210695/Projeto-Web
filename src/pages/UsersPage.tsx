import { useState } from 'react';
import UserForm from '@/features/users/UserForm';

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
    <div className="px-6 pt-6 pb-8 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Usuários</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Gerencie os pesquisadores e funcionários da universidade.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="h-10 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 transition-all flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto"
        >
          Adicionar Usuário
        </button>
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-x-auto text-sm md:text-base">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b text-muted-foreground">
              <th className="text-left py-4 px-6 font-semibold">Nome</th>
              <th className="text-left py-4 px-6 font-semibold">Cargo</th>
              <th className="text-left py-4 px-6 font-semibold">Status</th>
              <th className="text-right py-4 px-6 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                <td className="py-4 px-6 font-medium">{user.name}</td>
                <td className="py-4 px-6 text-muted-foreground">
                  {user.role === 'Admin'
                    ? 'Administrador'
                    : user.role === 'Editor'
                      ? 'Editor'
                      : 'Usuário'}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {user.status === 'Active' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="py-4 px-6 text-right space-x-4 uppercase tracking-wider text-xs font-bold">
                  <button className="text-primary hover:underline">Editar</button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-destructive hover:underline"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <UserForm onClose={() => setIsModalOpen(false)} onSubmit={handleAddUser} />}
    </div>
  );
};

export default UsersPage;
