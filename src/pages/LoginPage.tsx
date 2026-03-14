import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { Logo } from '@/components/shared/Logo';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    login({ id: '1', name: 'Academic User', email }, 'mock-token');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl border shadow-sm space-y-8 animate-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center space-y-6">
          <Logo iconClassName="w-14 h-14" textClassName="text-2xl" />
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Bem-vindo</h1>
            <p className="text-muted-foreground">Entre na sua conta para continuar</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="usuario@exemplo.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full h-10 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity mt-4"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground italic">
          <p>Login simulado: qualquer e-mail/senha funciona</p>
        </div>
      </div>

      <div className="mt-8 flex gap-6 text-sm text-muted-foreground">
        <Link to="/termos" className="hover:text-primary transition-colors">
          Termos de Uso
        </Link>
        <Link to="/privacidade" className="hover:text-primary transition-colors">
          Privacidade
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
