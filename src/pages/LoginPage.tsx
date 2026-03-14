import { Link } from 'react-router-dom';
import { Logo } from '@/components/shared/Logo';
import { useLoginForm } from '@/hooks/useLoginForm';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Mail, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const {
    register,
    onSubmit,
    isLoading,
    formState: { errors },
  } = useLoginForm();

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

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                {...register('email')}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm"
                placeholder="usuario@exemplo.com"
              />
            </div>
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <PasswordInput register={register('password')} error={errors.password?.message} />

          <div className="flex justify-end">
            <Link
              to="/esqueci-senha"
              catch-error="true"
              className="text-xs text-primary hover:underline underline-offset-4 font-medium"
            >
              Esqueci minha senha
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Não tem uma conta?{' '}
          <Link
            to="/cadastro"
            className="text-primary font-semibold hover:underline underline-offset-4"
          >
            Cadastre-se
          </Link>
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
