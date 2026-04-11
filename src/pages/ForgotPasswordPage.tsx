import { useNavigate, Link } from 'react-router-dom';
import { Logo } from '@/components/shared/Logo';
import { Mail, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { useForgotForm } from '@/hooks/useForgotForm';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

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
      <div className="min-h-screen flex items-center justify-center bg-surface p-6">
        <Card variant="default" className="w-full max-w-md space-y-8 text-center">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="headline-md text-on-surface">Email Enviado!</h1>
            <p className="body-md text-on-surface-variant">
              Se o email informado estiver em nossa base acadêmica, você receberá um link para
              redefinir sua senha em instantes.
            </p>
          </div>
          <Button variant="primary" onClick={() => navigate('/login')} className="w-full">
            Voltar ao Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-6">
      <div className="w-full max-w-md space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div>
            <h1 className="headline-md text-on-surface">Recuperar Senha</h1>
            <p className="body-md text-on-surface-variant">
              Enviaremos as instruções de recuperação para o seu email.
            </p>
          </div>
        </div>

        <Card variant="default" className="space-y-6">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="label-md text-on-surface-variant">Email Registrado</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
                <input
                  {...register('email')}
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container-high text-on-surface outline-none focus:border-b-2 focus:border-primary transition-all text-sm placeholder:text-on-surface-variant/50"
                  placeholder="Seu email acadêmico"
                />
              </div>
              {errors.email && <p className="label-sm text-error">{errors.email.message}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Enviar Link de Recuperação'
              )}
            </Button>
          </form>

          <div className="text-center">
            <Link
              to="/login"
              className="label-md text-primary hover:underline flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
