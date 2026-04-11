import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="h-16 glass border-b border-white/10 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 lg:pl-72">
        <button
          onClick={onMenuClick}
          className="p-2 -mr-2 text-on-surface-variant hover:text-on-surface lg:hidden"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <h1 className="title-md text-on-surface truncate max-w-[180px] sm:max-w-none">
          Olá, <span className="text-primary font-semibold">{user?.name || 'Usuário'}</span>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link
          to="/perfil"
          className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold hover:opacity-90 transition-opacity title-md"
          title="Ver Perfil"
        >
          {user?.name?.charAt(0) || 'U'}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
