import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';
import {
  FileText,
  Clock,
  CheckCircle,
  Download,
  Plus,
  TrendingUp,
  Users,
  Bot,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

const DashboardPage = () => {
  const stats = [
    { label: 'Total de Solicitações', value: '1,248', change: '+12%', trend: 'up', icon: FileText },
    {
      label: 'Pendentes de Aprovação',
      value: '42',
      change: 'Requer atenção',
      trend: 'warning',
      icon: Clock,
    },
    {
      label: 'Processos Concluídos',
      value: '1,184',
      change: '94%',
      trend: 'success',
      icon: CheckCircle,
    },
  ];

  const recentActivities = [
    {
      title: 'Aquisição de Equipamentos de Laboratório',
      code: 'REQ-2024-0042',
      department: 'Química',
      requester: 'Dra. Helena Silva',
      status: 'pending',
      priority: 'high',
    },
    {
      title: 'Programa de Intercâmbio Acadêmico',
      code: 'REQ-2024-0038',
      department: 'Relações Internacionais',
      requester: 'Prof. Marcus Doe',
      status: 'approved',
      priority: 'medium',
    },
    {
      title: 'Manutenção da Sala de Servidores',
      code: 'REQ-2024-0031',
      department: 'TI',
      requester: 'Eng. Sofia Luz',
      status: 'review',
      priority: 'low',
    },
  ];

  const quickActions = [
    { label: 'Nova Solicitação', icon: Plus, color: 'primary' },
    { label: 'Histórico', icon: Clock, color: 'default' },
    { label: 'Equipes', icon: Users, color: 'default' },
    { label: 'Relatórios', icon: TrendingUp, color: 'default' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="headline-lg text-on-surface">Painel Institucional</h2>
          <p className="body-md text-on-surface-variant">
            Bem-vindo. Aqui está o status atual do ecossistema acadêmico.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="gap-2">
            <Download size={18} />
            Exportar Relatório
          </Button>
          <Button variant="primary" className="gap-2">
            <Plus size={18} />
            Nova Solicitação
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} variant="default" className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-xl bg-primary/5">
                <stat.icon size={24} className="text-primary" />
              </div>
              <Chip
                variant={
                  stat.trend === 'up' ? 'academic' : stat.trend === 'warning' ? 'status' : 'info'
                }
                className={
                  stat.trend === 'warning' ? 'bg-tertiary-fixed text-on-tertiary-fixed' : ''
                }
              >
                {stat.change}
              </Chip>
            </div>
            <p className="label-md text-on-surface-variant">{stat.label}</p>
            <span className="headline-md text-on-surface">{stat.value}</span>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <Card
            variant="default"
            className="bg-inverse-surface text-inverse-on-surface overflow-hidden !p-8"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32" />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-inverse-surface rounded-2xl flex items-center justify-center">
                  <Bot
                    size={40}
                    className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-400 to-purple-400"
                  />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="headline-sm text-on-surface mb-2">Assistente IA</h4>
                <p className="body-md text-on-surface opacity-70 mb-4">
                  Analisei sua carga de trabalho atual. Existem{' '}
                  <span className="text-primary-fixed font-bold">
                    5 bolsas de pesquisa críticas
                  </span>{' '}
                  que precisam de revisão antes do fim de semana.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Button variant="ghost" size="sm">
                    Elaborar Aprovações
                  </Button>
                  <Button variant="ghost" size="sm">
                    Resumir Pendentes
                  </Button>
                  <Button variant="primary" size="sm" className="gap-2">
                    Iniciar Conversa
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card variant="default" className="!p-0 overflow-hidden">
            <div className="p-6 border-b bg-surface-container-low flex justify-between items-center">
              <h4 className="title-md font-semibold text-on-surface">Atividades Recentes</h4>
              <Button variant="ghost" size="sm">
                Ver todos
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="px-6 py-4 label-md font-semibold text-on-surface-variant uppercase tracking-wider">
                      Descrição
                    </th>
                    <th className="px-6 py-4 label-md font-semibold text-on-surface-variant uppercase tracking-wider">
                      Solicitante
                    </th>
                    <th className="px-6 py-4 label-md font-semibold text-on-surface-variant uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 label-md font-semibold text-on-surface-variant uppercase tracking-wider">
                      Prioridade
                    </th>
                    <th className="px-6 py-4 label-md font-semibold text-on-surface-variant uppercase tracking-wider text-right">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {recentActivities.map((activity, i) => (
                    <tr key={i} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="title-sm font-semibold text-on-surface">{activity.title}</p>
                        <p className="label-sm text-on-surface-variant">
                          {activity.code} • {activity.department}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-surface-container-high" />
                          <span className="label-md text-on-surface-variant">
                            {activity.requester}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {activity.status === 'pending' ? (
                          <Chip variant="academic">Pendente</Chip>
                        ) : activity.status === 'approved' ? (
                          <Chip variant="info">Aprovado</Chip>
                        ) : (
                          <Chip variant="status" className="bg-secondary-fixed text-on-secondary">
                            Em Revisão
                          </Chip>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {activity.priority === 'high' ? (
                          <div className="flex items-center gap-1 text-error">
                            <AlertCircle size={14} />
                            <span className="label-sm font-bold uppercase">Alta</span>
                          </div>
                        ) : activity.priority === 'medium' ? (
                          <span className="label-sm text-on-surface-variant font-bold uppercase">
                            Média
                          </span>
                        ) : (
                          <span className="label-sm text-on-surface-variant font-bold opacity-60">
                            Baixa
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm">
                          Mais
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card variant="tonal" className="space-y-4">
            <h4 className="title-md font-semibold text-on-surface">Acesso Rápido</h4>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  className="p-4 rounded-xl bg-surface-container-lowest flex flex-col items-center gap-2 hover:bg-primary hover:text-white group transition-all"
                >
                  <action.icon size={24} className="text-primary group-hover:text-white" />
                  <span className="label-sm font-bold uppercase tracking-tight">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </Card>

          <Card variant="default" className="space-y-4">
            <h4 className="title-md font-semibold text-on-surface">Notícias Institucionais</h4>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-lg bg-surface-container-high flex-shrink-0" />
                <div>
                  <p className="label-xs font-bold text-primary uppercase mb-1">Em breve</p>
                  <h5 className="title-sm font-semibold text-on-surface">
                    Simpósio Anual de Pesquisa 2024
                  </h5>
                  <p className="label-sm text-on-surface-variant">12 de Outubro, 2024</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-lg bg-surface-container-high flex-shrink-0" />
                <div>
                  <p className="label-xs font-bold text-tertiary uppercase mb-1">Atualização</p>
                  <h5 className="title-sm font-semibold text-on-surface">
                    Novas Diretrizes de Assinatura Digital
                  </h5>
                  <p className="label-sm text-on-surface-variant">2 dias atrás</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" className="w-full">
              Ver Avisos do Conselho
            </Button>
          </Card>

          <Card variant="inverse" className="space-y-4">
            <h4 className="title-md font-semibold text-on-surface">Precisa de Ajuda?</h4>
            <p className="body-sm text-on-surface opacity-80">
              Nossa equipe de suporte institucional está disponível das 8:00 às 18:00.
            </p>
            <Button variant="primary" className="w-full">
              Contactar Suporte
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
