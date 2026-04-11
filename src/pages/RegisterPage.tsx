import { Link } from 'react-router-dom';
import { Logo } from '@/components/shared/Logo';
import { User, Mail, GraduationCap, Building2, Loader2, ArrowRight } from 'lucide-react';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const RegisterPage = () => {
  const {
    register,
    onSubmit,
    isLoading,
    formState: { errors },
  } = useRegisterForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-6">
      <div className="w-full max-w-lg space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div>
            <h1 className="headline-md text-on-surface">Criar Conta Acadêmica</h1>
            <p className="body-md text-on-surface-variant">
              Junte-se à maior comunidade de pesquisa assistida por IA.
            </p>
          </div>
        </div>

        <Card variant="default" className="space-y-5">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="label-md text-on-surface-variant">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
                <input
                  {...register('name')}
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container-high text-on-surface outline-none focus:ring-0 focus:border-b-2 focus:border-primary transition-all text-sm placeholder:text-on-surface-variant/50"
                  placeholder="Seu nome"
                />
              </div>
              {errors.name && <p className="label-sm text-error">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="label-md text-on-surface-variant">Email Acadêmico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
                <input
                  {...register('email')}
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container-high text-on-surface outline-none focus:ring-0 focus:border-b-2 focus:border-primary transition-all text-sm placeholder:text-on-surface-variant/50"
                  placeholder="voce@instituicao.edu.br"
                />
              </div>
              {errors.email && <p className="label-sm text-error">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="label-md text-on-surface-variant">Instituição</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
                  <input
                    {...register('university')}
                    className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container-high text-on-surface outline-none focus:ring-0 focus:border-b-2 focus:border-primary transition-all text-sm placeholder:text-on-surface-variant/50"
                    placeholder="Ex: UFERSA"
                  />
                </div>
                {errors.university && (
                  <p className="label-sm text-error">{errors.university.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="label-md text-on-surface-variant">Curso/Depto</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
                  <input
                    {...register('department')}
                    className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container-high text-on-surface outline-none focus:ring-0 focus:border-b-2 focus:border-primary transition-all text-sm placeholder:text-on-surface-variant/50"
                    placeholder="Ex: Computação"
                  />
                </div>
                {errors.department && (
                  <p className="label-sm text-error">{errors.department.message}</p>
                )}
              </div>
            </div>

            <PasswordInput
              register={register('password')}
              error={errors.password?.message}
              placeholder="Mínimo 8 caracteres"
            />

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
                <>
                  Começar Jornada
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="text-center body-md text-on-surface-variant">
            Já possui uma conta?{' '}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline underline-offset-4"
            >
              Fazer Login
            </Link>
          </div>
        </Card>

        <div className="text-center">
          <p className="label-sm text-on-surface-variant/50 uppercase tracking-widest">
            Mente Acadêmica - Pesquisa e Inteligência
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
