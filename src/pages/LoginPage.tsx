import { Link } from 'react-router-dom';
import { Logo } from '@/components/shared/Logo';
import { useLoginForm } from '@/hooks/useLoginForm';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Mail, Loader2 } from 'lucide-react';
import { FAQSection } from '@/components/shared/FAQSection';
import { FAQSchema } from '@/components/shared/FAQSchema';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const LoginPage = () => {
  const {
    register,
    onSubmit,
    isLoading,
    formState: { errors },
  } = useLoginForm();

  return (
    <div className="min-h-screen bg-surface overflow-y-auto selection:bg-primary-fixed/50">
      <FAQSchema />

      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Card
          variant="default"
          className="w-full max-w-md space-y-8 animate-in zoom-in-95 duration-500"
        >
          <div className="flex flex-col items-center space-y-6">
            <Logo iconClassName="w-14 h-14" textClassName="text-2xl" />
            <div className="text-center space-y-2">
              <h1 className="headline-md text-on-surface">Bem-vindo</h1>
              <p className="body-md text-on-surface-variant">Entre na sua conta para continuar</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="label-md text-on-surface-variant">E-mail</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4 group-focus-within:text-primary transition-colors" />
                <input
                  {...register('email')}
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container-high text-on-surface outline-none focus:ring-0 focus:border-b-2 focus:border-primary transition-all text-sm placeholder:text-on-surface-variant/50"
                  placeholder="usuario@exemplo.com"
                />
              </div>
              {errors.email && <p className="label-sm text-error mt-1">{errors.email.message}</p>}
            </div>

            <PasswordInput register={register('password')} error={errors.password?.message} />

            <div className="flex justify-end">
              <Link
                to="/esqueci-senha"
                className="label-md text-primary hover:underline underline-offset-4"
              >
                Esqueci minha senha
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Entrar'}
            </Button>
          </form>

          <div className="text-center body-md text-on-surface-variant">
            Não tem uma conta?{' '}
            <Link
              to="/cadastro"
              className="text-primary font-semibold hover:underline underline-offset-4"
            >
              Cadastre-se
            </Link>
          </div>
        </Card>

        <div className="mt-8 flex gap-6 text-sm text-on-surface-variant animate-pulse">
          <span className="label-md">Role para baixo para ver o FAQ ↓</span>
        </div>
      </div>

      <div className="bg-surface-container-low border-t border-white/10">
        <FAQSection />
      </div>

      <footer className="pb-12 text-center">
        <div className="flex justify-center gap-6 body-md text-on-surface-variant">
          <Link to="/termos" className="hover:text-primary transition-colors">
            Termos de Uso
          </Link>
          <Link to="/privacidade" className="hover:text-primary transition-colors">
            Privacidade
          </Link>
        </div>
        <p className="mt-4 label-sm text-on-surface-variant/60">
          © {new Date().getFullYear()} SIFU - UFERSA. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
