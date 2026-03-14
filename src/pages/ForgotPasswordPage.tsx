import { useNavigate, Link } from 'react-router-dom';
import { Logo } from '@/components/shared/Logo';
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useForgotForm } from '@/hooks/useForgotForm';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const {
    register,
    onSubmit,
    isLoading,
    isSent,
    formState: { errors },
  } = useForgotForm();

  if (isSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="w-full max-w-md space-y-8 text-center animate-in zoom-in duration-300">
          <div className="flex justify-center">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Email Enviado!</h1>
            <p className="text-muted-foreground text-sm">
              Se o email informado estiver em nossa base acadêmica, você receberá um link para
              redefinir sua senha em instantes.
            </p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="w-full h-11 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all"
          >
            Voltar ao Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Recuperar Senha</h1>
            <p className="text-muted-foreground text-sm">
              Enviaremos as instruções de recuperação para o seu email.
            </p>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Registrado</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  {...register('email')}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background outline-hidden focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm"
                  placeholder="Seu email acadêmico"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Enviar Link de Recuperação'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm">
            <Link
              to="/login"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
