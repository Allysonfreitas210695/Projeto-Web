import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Plus, MoreVertical, TrendingUp, Bot, Clock, ArrowUp } from 'lucide-react';

interface Request {
  id: number;
  code: string;
  title: string;
  requester: string;
  timeAgo: string;
  status: 'in_progress' | 'resolved' | 'needs_review';
  priority: 'high' | 'medium' | 'low' | 'critical';
  classification: string;
}

const RequestsPage = () => {
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'resolved' | 'needs_review'>('all');

  const requests: Request[] = [
    {
      id: 8291,
      code: '#8291',
      title: 'Course Override - Calculus III',
      requester: 'Mariana Gonçalves',
      timeAgo: '2h ago',
      status: 'in_progress',
      priority: 'high',
      classification: 'Academic Exception',
    },
    {
      id: 8288,
      code: '#8288',
      title: 'Scholarship Renewal 2024.2',
      requester: 'João Pereira',
      timeAgo: '5h ago',
      status: 'resolved',
      priority: 'medium',
      classification: 'Financial Aid',
    },
    {
      id: 8285,
      code: '#8285',
      title: 'Transfer Credit Validation',
      requester: 'Carla Santos',
      timeAgo: '1d ago',
      status: 'needs_review',
      priority: 'critical',
      classification: 'Manual Review',
    },
  ];

  const getStatusChip = (status: Request['status']) => {
    switch (status) {
      case 'in_progress':
        return (
          <Chip variant="status" className="bg-secondary-fixed text-on-secondary">
            Em Progresso
          </Chip>
        );
      case 'resolved':
        return <Chip variant="academic">Resolvido</Chip>;
      case 'needs_review':
        return (
          <Chip variant="status" className="bg-error-container text-error">
            Precisa Revisão
          </Chip>
        );
    }
  };

  const getPriorityIcon = (priority: Request['priority']) => {
    switch (priority) {
      case 'critical':
        return <ArrowUp className="text-error w-4 h-4" />;
      case 'high':
        return <ArrowUp className="text-tertiary w-4 h-4" />;
      default:
        return (
          <span className="text-on-surface-variant text-xs font-medium">
            {priority === 'medium' ? 'Média' : 'Baixa'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
        <div className="space-y-2">
          <h2 className="headline-lg text-on-surface">Central de Solicitações</h2>
          <p className="body-md text-on-surface-variant">
            Gerencie as solicitações acadêmicas institucionais com IA.
          </p>
        </div>
        <Button variant="primary" className="gap-2">
          <Plus size={18} />
          Nova Solicitação
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              Todas <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">124</span>
            </button>
            <button
              onClick={() => setFilter('in_progress')}
              className={`px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${
                filter === 'in_progress'
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              Em Progresso{' '}
              <span className="bg-secondary-container px-2 text-white py-0.5 rounded-full text-[10px]">
                42
              </span>
            </button>
            <button
              onClick={() => setFilter('resolved')}
              className={`px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${
                filter === 'resolved'
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              Resolvidas{' '}
              <span className="bg-primary-fixed px-2 py-0.5 rounded-full text-[10px]">68</span>
            </button>
            <button
              onClick={() => setFilter('needs_review')}
              className={`px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${
                filter === 'needs_review'
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              Precisa Revisão{' '}
              <span className="bg-error-container px-2 py-0.5 rounded-full text-[10px]">14</span>
            </button>
            <div className="flex-1" />
            <Button variant="ghost" className="gap-2">
              <MoreVertical size={18} />
              Mais Filtros
            </Button>
          </div>

          <Card variant="default" className="p-0! overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="text-left px-6 py-5 label-md font-semibold text-on-surface-variant uppercase tracking-wider">
                    Detalhes
                  </th>
                  <th className="text-left px-6 py-5 label-md font-semibold text-on-surface-variant uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-5 label-md font-semibold text-on-surface-variant uppercase tracking-wider">
                    Prioridade
                  </th>
                  <th className="text-left px-6 py-5 label-md font-semibold text-on-surface-variant uppercase tracking-wider">
                    Classificação
                  </th>
                  <th className="text-right px-6 py-5 label-md font-semibold text-on-surface-variant uppercase tracking-wider">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {requests.map((req) => (
                  <tr
                    key={req.id}
                    className="hover:bg-surface-container-low/30 transition-colors group"
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary-fixed/20 flex items-center justify-center text-secondary font-bold text-xs">
                          {req.code}
                        </div>
                        <div>
                          <h4 className="title-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                            {req.title}
                          </h4>
                          <p className="label-sm text-on-surface-variant">
                            Aluno: {req.requester} • {req.timeAgo}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">{getStatusChip(req.status)}</td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-1 text-on-surface-variant">
                        {getPriorityIcon(req.priority)}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <Chip variant="info">{req.classification}</Chip>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                        <MoreVertical size={18} className="text-on-surface-variant" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 bg-surface-container-low/20 flex justify-between items-center">
              <p className="label-sm text-on-surface-variant">Mostrando 3 de 124 resultados</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant">
                  <Clock size={18} />
                </button>
                <button className="px-3 py-1 rounded-lg bg-primary text-white label-md font-bold">
                  1
                </button>
                <button className="px-3 py-1 rounded-lg hover:bg-surface-container-high text-on-surface label-md font-bold">
                  2
                </button>
                <button className="px-3 py-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant">
                  <Clock size={18} className="rotate-180" />
                </button>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card
            variant="default"
            className="bg-inverse-surface text-inverse-on-surface overflow-hidden p-6!"
          >
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <Bot size={18} className="text-primary-fixed" />
                <span className="label-sm uppercase tracking-widest text-primary-fixed font-bold">
                  IA Insights
                </span>
              </div>
              <h3 className="headline-sm text-on-surface">Mudança de Prioridade Detectada</h3>
              <p className="body-md text-on-surface opacity-80">
                O sistema identificou 12 solicitações similares para 'Course Override' na última
                hora. Recomendo processamento em lote.
              </p>
              <Button variant="primary" className="w-full gap-2">
                Iniciar Ação em Lote
                <TrendingUp size={18} />
              </Button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          </Card>

          <Card variant="tonal" className="space-y-4">
            <h3 className="title-md font-semibold text-on-surface">Nova Solicitação Rápida</h3>
            <div className="space-y-4">
              <div>
                <label className="label-sm text-on-surface-variant mb-1.5 ml-1 block">
                  Matrícula do Aluno
                </label>
                <input
                  className="w-full h-11 px-4 bg-surface-container-lowest rounded-lg text-on-surface outline-none focus:border-b-2 focus:border-primary transition-all placeholder:text-on-surface-variant/50"
                  placeholder="Ex: 202400129"
                />
              </div>
              <div>
                <label className="label-sm text-on-surface-variant mb-1.5 ml-1 block">
                  Tipo de Solicitação
                </label>
                <select className="w-full h-11 px-4 bg-surface-container-lowest rounded-lg text-on-surface outline-none focus:border-b-2 focus:border-primary transition-all">
                  <option>Selecionar...</option>
                  <option>Exceção Acadêmica</option>
                  <option>Auxílio Financeiro</option>
                  <option>Infraestrutura</option>
                </select>
              </div>
              <div>
                <label className="label-sm text-on-surface-variant mb-1.5 ml-1 block">
                  Descrição
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg text-on-surface outline-none focus:border-b-2 focus:border-primary transition-all placeholder:text-on-surface-variant/50 resize-none"
                  placeholder="Descreva brevemente a solicitação..."
                  rows={3}
                />
              </div>
              <Button variant="secondary" className="w-full">
                Salvar como Rascunho
              </Button>
              <Button variant="primary" className="w-full">
                Enviar Solicitação
              </Button>
            </div>
          </Card>

          <Card variant="academic" className="space-y-2">
            <div className="flex flex-col gap-1">
              <span className="label-sm uppercase tracking-widest text-on-tertiary-fixed opacity-70">
                Taxa de Resolução
              </span>
              <div className="flex items-end gap-2">
                <span className="headline-lg text-on-tertiary-fixed">88%</span>
                <span className="label-sm text-on-tertiary-fixed mb-1">+4.2% este mês</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;
