import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  GitBranch,
  Bot,
  Users,
  LogOut,
  X,
  User,
  Menu,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Logo } from '@/components/shared/Logo';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const Sidebar = ({ open, onClose, onOpen }: SidebarProps) => {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Solicitações', path: '/solicitacoes' },
    { icon: GitBranch, label: 'Processos', path: '/processos' },
    { icon: Bot, label: 'Assistente IA', path: '/ai-assistente' },
    { icon: Users, label: 'Usuários', path: '/usuarios' },
    { icon: User, label: 'Meu Perfil', path: '/perfil' },
  ];

  return (
    <>
      <button
        onClick={onOpen}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg lg:hidden bg-surface-container-high text-on-surface hover:bg-surface-container-low transition-colors"
      >
        <Menu size={24} />
      </button>

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 flex flex-col h-screen transition-transform duration-300 lg:sticky lg:top-0 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="glass border-b border-white/10">
          <div className="p-6 flex items-center justify-between">
            <Logo />
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-on-surface-variant hover:text-on-surface lg:hidden"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 bg-surface-container-low space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                location.pathname === item.path
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              )}
            >
              <item.icon size={20} />
              <span className="title-md">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 bg-surface-container-low border-t border-white/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-error hover:bg-error-container transition-colors title-md"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={onClose} />}
    </>
  );
};

export default Sidebar;
