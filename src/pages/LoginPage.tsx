import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

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
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-xl border shadow-sm">
        <h1 className="text-3xl font-bold text-center mb-2">Bem-vindo</h1>
        <p className="text-muted-foreground text-center mb-8">Entre na sua conta</p>

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

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Login simulado: qualquer e-mail/senha funciona</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
