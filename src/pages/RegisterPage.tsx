import { Link } from 'react-router-dom';
import { Logo } from '@/components/shared/Logo';
import { User, Mail, Lock, GraduationCap, Building2, Loader2, ArrowRight } from 'lucide-react';
import { useRegisterForm } from '@/hooks/useRegisterForm';

const RegisterPage = () => {
  const {
    register,
    onSubmit,
    isLoading,
    formState: { errors },
  } = useRegisterForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-lg space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Criar Conta Acadêmica</h1>
            <p className="text-muted-foreground text-sm">
              Junte-se à maior comunidade de pesquisa assistida por IA.
            </p>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  {...register('name')}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background outline-hidden focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm"
                  placeholder="Seu nome"
                />
              </div>
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Acadêmico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  {...register('email')}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background outline-hidden focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm"
                  placeholder="voce@instituicao.edu.br"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Instituição</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    {...register('university')}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background outline-hidden focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm"
                    placeholder="Ex: UFERSA"
                  />
                </div>
                {errors.university && (
                  <p className="text-xs text-red-500">{errors.university.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Curso/Depto</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    {...register('department')}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background outline-hidden focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm"
                    placeholder="Ex: Computação"
                  />
                </div>
                {errors.department && (
                  <p className="text-xs text-red-500">{errors.department.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  {...register('password')}
                  type="password"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background outline-hidden focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Começar Jornada
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Já possui uma conta?{' '}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline underline-offset-4"
            >
              Fazer Login
            </Link>
          </p>
        </div>

        <div className="text-center">
          <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest font-medium">
            Mente Acadêmica - Pesquisa e Inteligência
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
