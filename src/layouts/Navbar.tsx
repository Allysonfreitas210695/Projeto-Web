import { useAuthStore } from '@/store/useAuthStore';

const Navbar = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="h-16 border-b bg-card px-8 flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-lg font-semibold text-foreground">
        Bem-vindo de volta, {user?.name || 'Usuário'}
      </h1>
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
          {user?.name?.charAt(0) || 'U'}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
