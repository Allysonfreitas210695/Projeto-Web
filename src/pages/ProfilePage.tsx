import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfile } from '@/hooks/useProfile';
import {
  Mail,
  Building2,
  GraduationCap,
  Calendar,
  Settings,
  Edit3,
  Shield,
  BookOpen,
  Bell,
  Globe,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Spinner } from '@/components/ui/Spinner';
import ProfileForm from '@/features/profile/ProfileForm';
import PasswordForm from '@/features/profile/PasswordForm';

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const {
    user: userData,
    activities,
    preferences,
    isLoading,
    isUpdatingUser,
    isChangingPassword,
    updateUser,
    changePassword,
  } = useProfile();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    );
  }

  const displayUser = userData || user;
  const createdAt = userData?.createdAt
    ? new Date(userData.createdAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    : 'Março de 2024';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h2 className="headline-lg text-on-surface">Meu Perfil</h2>
          <p className="body-md text-on-surface-variant">
            Gerencie suas informações e preferências acadêmicas.
          </p>
        </div>
        <Button
          variant="secondary"
          size="md"
          className="gap-2"
          onClick={() => setIsEditModalOpen(true)}
        >
          <Edit3 size={16} />
          Editar Perfil
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card variant="default" className="text-center space-y-4">
            <div className="relative mx-auto w-24 h-24">
              <div className="w-full h-full rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                <span className="headline-lg">{displayUser?.name?.charAt(0) || 'U'}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-surface-container-lowest rounded-full" />
            </div>
            <div>
              <h3 className="title-lg font-bold text-on-surface">
                {displayUser?.name || 'Usuário Acadêmico'}
              </h3>
              <p className="body-md text-on-surface-variant">
                {userData?.title || 'Pesquisador Sênior'}
              </p>
            </div>
            <Chip variant="academic">Verificado</Chip>
          </Card>

          <Card variant="tonal" className="space-y-4">
            <h4 className="title-sm flex items-center gap-2 text-on-surface">
              <Shield size={16} className="text-primary" />
              Segurança e Conta
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="w-full text-left title-md px-3 py-2.5 rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-between group text-on-surface-variant hover:text-on-surface"
              >
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

          <Card variant="tonal" className="space-y-4">
            <h4 className="title-sm flex items-center gap-2 text-on-surface">
              <Bell size={16} className="text-primary" />
              Preferências
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="body-md text-on-surface-variant">Notificações por email</span>
                <div
                  className={`w-10 h-6 rounded-full ${preferences?.emailNotifications ? 'bg-primary' : 'bg-surface-container-high'} relative`}
                >
                  <div
                    className={`absolute w-4 h-4 rounded-full bg-white top-1 transition-all ${preferences?.emailNotifications ? 'right-1' : 'left-1'}`}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="body-md text-on-surface-variant">Resumo semanal</span>
                <div
                  className={`w-10 h-6 rounded-full ${preferences?.weeklyDigest ? 'bg-primary' : 'bg-surface-container-high'} relative`}
                >
                  <div
                    className={`absolute w-4 h-4 rounded-full bg-white top-1 transition-all ${preferences?.weeklyDigest ? 'right-1' : 'left-1'}`}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="body-md text-on-surface-variant flex items-center gap-2">
                  <Globe size={14} /> Idioma
                </span>
                <span className="title-sm text-on-surface">
                  {preferences?.language === 'pt-BR' ? 'Português' : 'English'}
                </span>
              </div>
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
                    {displayUser?.email || 'usuario@universidade.edu.br'}
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
                    {userData?.institution || 'Universidade Federal (UFERSA)'}
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
                  <p className="title-sm font-medium text-on-surface">
                    {userData?.department || 'Ciência da Computação'}
                  </p>
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
                  <p className="title-sm font-medium text-on-surface">{createdAt}</p>
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
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <div key={activity.id} className="relative pl-10">
                      <div className="absolute left-0 top-1 w-10 h-10 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-surface-container-lowest" />
                      </div>
                      <div>
                        <p className="title-sm font-semibold text-on-surface">{activity.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="label-sm text-on-surface-variant">
                            {new Date(activity.date).toLocaleString('pt-BR', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <Chip variant="info">{activity.type}</Chip>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-on-surface-variant body-md">Nenhuma atividade recente.</p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {isEditModalOpen && (
        <ProfileForm
          user={userData}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={async (data) => {
            await updateUser(data);
            setIsEditModalOpen(false);
          }}
          isLoading={isUpdatingUser}
        />
      )}

      {isPasswordModalOpen && (
        <PasswordForm
          onClose={() => setIsPasswordModalOpen(false)}
          onSubmit={async (data) => {
            await changePassword(data.currentPassword, data.newPassword);
            setIsPasswordModalOpen(false);
          }}
          isLoading={isChangingPassword}
        />
      )}
    </div>
  );
};

export default ProfilePage;
