import { useAuthStore } from '@/store/useAuthStore';
import {
  Mail,
  Building2,
  GraduationCap,
  Calendar,
  Settings,
  Edit3,
  Shield,
  BookOpen,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h2 className="headline-lg text-on-surface">Meu Perfil</h2>
          <p className="body-md text-on-surface-variant">
            Gerencie suas informações e preferências acadêmicas.
          </p>
        </div>
        <Button variant="secondary" size="md" className="gap-2">
          <Edit3 size={16} />
          Editar Perfil
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card variant="default" className="text-center space-y-4">
            <div className="relative mx-auto w-24 h-24">
              <div className="w-full h-full rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                <span className="headline-lg">{user?.name?.charAt(0) || 'U'}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-surface-container-lowest rounded-full" />
            </div>
            <div>
              <h3 className="title-lg font-bold text-on-surface">
                {user?.name || 'Academic User'}
              </h3>
              <p className="body-md text-on-surface-variant">Pesquisador Sênior</p>
            </div>
            <Chip variant="academic">Verificado</Chip>
          </Card>

          <Card variant="tonal" className="space-y-4">
            <h4 className="title-sm flex items-center gap-2 text-on-surface">
              <Shield size={16} className="text-primary" />
              Segurança e Conta
            </h4>
            <div className="space-y-1">
              <button className="w-full text-left title-md px-3 py-2.5 rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-between group text-on-surface-variant hover:text-on-surface">
                Mudar Senha
                <Settings
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </button>
              <button className="w-full text-left title-md px-3 py-2.5 rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-between group text-on-surface-variant hover:text-on-surface">
                Configurações de Privacidade
                <Settings
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card variant="default" className="overflow-hidden p-0!">
            <div className="px-6 py-4 bg-surface-container-low border-b">
              <h4 className="title-sm text-on-surface">Informações Acadêmicas</h4>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                    Email Institucional
                  </p>
                  <p className="title-sm font-medium text-on-surface">
                    {user?.email || 'usuario@universidade.edu.br'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                  <Building2 size={20} />
                </div>
                <div>
                  <p className="label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                    Instituição
                  </p>
                  <p className="title-sm font-medium text-on-surface">
                    Universidade Federal (UFERSA)
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                    Departamento
                  </p>
                  <p className="title-sm font-medium text-on-surface">Ciência da Computação</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                    Membro desde
                  </p>
                  <p className="title-sm font-medium text-on-surface">Março de 2024</p>
                </div>
              </div>
            </div>
          </Card>

          <Card variant="default" className="overflow-hidden p-0!">
            <div className="px-6 py-4 bg-surface-container-low border-b flex items-center justify-between">
              <h4 className="title-sm text-on-surface">Atividade Recente</h4>
              <BookOpen size={16} className="text-on-surface-variant" />
            </div>
            <div className="p-6">
              <div className="space-y-6 relative before:absolute before:left-4.75 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-high">
                {[
                  { title: 'Pesquisa sobre IA e Educação', date: 'Hoje, 14:20', type: 'Chat' },
                  {
                    title: 'Resumo de Artigo: Redes Neurais',
                    date: 'Ontem, 09:15',
                    type: 'Ferramenta',
                  },
                  { title: 'Novo projeto iniciado', date: '12 Mar, 16:40', type: 'Sistema' },
                ].map((activity, i) => (
                  <div key={i} className="relative pl-10">
                    <div className="absolute left-0 top-1 w-10 h-10 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-surface-container-lowest" />
                    </div>
                    <div>
                      <p className="title-sm font-semibold text-on-surface">{activity.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="label-sm text-on-surface-variant">{activity.date}</span>
                        <Chip variant="info">{activity.type}</Chip>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
