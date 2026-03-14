import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, MessageSquareText, Users, LogOut, X } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: MessageSquareText, label: 'Ferramentas de IA', path: '/ai-tools' },
    { icon: Users, label: 'Usuários', path: '/users' },
  ];

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 w-72 bg-card border-r flex flex-col h-screen transition-transform duration-300 lg:sticky lg:top-0 lg:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="p-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">Academic MVP</h2>
        <button
          onClick={onClose}
          className="p-2 -mr-2 text-muted-foreground hover:text-foreground lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
              location.pathname === item.path
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-destructive hover:bg-destructive/10 transition-colors font-medium"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
