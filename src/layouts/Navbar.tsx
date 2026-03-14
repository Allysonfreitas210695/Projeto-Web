import { Menu } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="h-16 border-b bg-card px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 text-muted-foreground hover:text-foreground lg:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-sm sm:text-lg font-semibold text-foreground truncate max-w-[180px] sm:max-w-none">
          Bem-vindo, {user?.name || 'Usuário'}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
          {user?.name?.charAt(0) || 'U'}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
