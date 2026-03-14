import { useAuthStore } from '@/store/useAuthStore';
import {
  User,
  Mail,
  Building2,
  GraduationCap,
  Calendar,
  Settings,
  Edit3,
  Shield,
  BookOpen,
} from 'lucide-react';

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="px-6 pt-6 pb-8 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Meu Perfil</h2>
          <p className="text-muted-foreground">
            Gerencie suas informações e preferências acadêmicas.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors">
          <Edit3 size={16} />
          Editar Perfil
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border rounded-2xl p-8 text-center space-y-4 shadow-xs">
            <div className="relative mx-auto w-24 h-24">
              <div className="w-full h-full rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <User size={40} />
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-card rounded-full"
                title="Online"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">{user?.name || 'Academic User'}</h3>
              <p className="text-sm text-muted-foreground">Pesquisador Sênior</p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <div className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                Verificado
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6 space-y-4 shadow-xs">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <Shield size={16} className="text-primary" />
              Segurança e Conta
            </h4>
            <div className="space-y-3">
              <button className="w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center justify-between group">
                Mudar Senha
                <Settings
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </button>
              <button className="w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center justify-between group">
                Configurações de Privacidade
                <Settings
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-2xl overflow-hidden shadow-xs">
            <div className="px-6 py-4 border-b bg-muted/30">
              <h4 className="font-semibold text-sm">Informações Acadêmicas</h4>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                    Email Institucional
                  </p>
                  <p className="text-sm font-medium">
                    {user?.email || 'usuario@universidade.edu.br'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                  <Building2 size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                    Instituição
                  </p>
                  <p className="text-sm font-medium">Universidade Federal (UFERSA)</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                    Departamento
                  </p>
                  <p className="text-sm font-medium">Ciência da Computação</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                    Membro desde
                  </p>
                  <p className="text-sm font-medium">Março de 2024</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-2xl overflow-hidden shadow-xs">
            <div className="px-6 py-4 border-b bg-muted/30 flex items-center justify-between">
              <h4 className="font-semibold text-sm">Atividade Recente</h4>
              <BookOpen size={16} className="text-muted-foreground" />
            </div>
            <div className="p-6">
              <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-muted">
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
                      <div className="w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{activity.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground font-medium uppercase tracking-tighter">
                          {activity.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
