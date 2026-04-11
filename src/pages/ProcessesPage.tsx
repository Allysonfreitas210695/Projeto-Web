import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import {
  Download,
  Check,
  Archive,
  Route,
  Clock,
  User,
  AlertTriangle,
  Settings,
} from 'lucide-react';

interface ProcessStep {
  name: string;
  date: string;
  status: 'completed' | 'active' | 'pending';
}

interface Process {
  id: string;
  title: string;
  subtitle: string;
  status: 'in_progress' | 'completed' | 'pending';
  stage: number;
  steps: ProcessStep[];
  currentResponsible: {
    name: string;
    role: string;
    avatar?: string;
  };
  hoursInStage: number;
}

const ProcessesPage = () => {
  const [currentProcess] = useState<Process>({
    id: 'PR-2024-0892',
    title: 'Bolsa de Pesquisa Pós-Doutoral',
    subtitle: 'Trilha de Auditoria e Visualização do Fluxo para Ciclo 2024.B',
    status: 'in_progress',
    stage: 3,
    currentResponsible: {
      name: 'Dr. Ricardo Menezes',
      role: 'Director of Graduate Studies',
    },
    hoursInStage: 72,
    steps: [
      { name: 'Protocolo', date: '12 de Mar, 2024', status: 'completed' },
      { name: 'Análise', date: '15 de Mar, 2024', status: 'completed' },
      { name: 'Aprovação', date: 'Est: 22 de Mar', status: 'active' },
      { name: 'Arquivamento', date: '--', status: 'pending' },
    ],
  });

  const progress = (currentProcess.stage / currentProcess.steps.length) * 100;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
        <div className="space-y-2">
          <nav className="flex items-center gap-2 label-sm text-on-surface-variant">
            <span>Processos</span>
            <Route size={12} />
            <span>Bolsas Institucionais</span>
            <Route size={12} />
            <span className="text-primary font-bold">{currentProcess.id}</span>
          </nav>
          <h2 className="headline-lg text-on-surface">{currentProcess.title}</h2>
          <p className="body-md text-on-surface-variant">{currentProcess.subtitle}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="gap-2">
            <Download size={18} />
            Exportar Auditoria
          </Button>
          <Button variant="primary">Ação Necessária</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Card variant="default" className="p-8!">
            <div className="flex items-center justify-between mb-10">
              <h3 className="title-md font-semibold text-on-surface flex items-center gap-2">
                <Route size={20} className="text-primary" />
                Status do Fluxo
              </h3>
              <Chip variant="academic">Em Progresso</Chip>
            </div>

            <div className="relative px-4 py-8">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-surface-container-high -translate-y-1/2 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-primary rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="relative flex justify-between">
                {currentProcess.steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center text-center max-w-30">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 z-10 ring-4 ring-surface-container-lowest ${
                        step.status === 'completed'
                          ? 'bg-primary text-white shadow-lg shadow-primary/30'
                          : step.status === 'active'
                            ? 'w-14 h-14 -mt-1 bg-surface-container-lowest border-4 border-primary text-primary shadow-xl'
                            : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      {step.status === 'completed' ? (
                        <Check size={20} />
                      ) : step.status === 'active' ? (
                        <Clock size={20} />
                      ) : (
                        <Archive size={20} />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        step.status === 'active'
                          ? 'text-primary font-bold'
                          : step.status === 'pending'
                            ? 'text-on-surface-variant opacity-60'
                            : 'text-on-surface'
                      }`}
                    >
                      {step.name}
                    </span>
                    <span className="text-[10px] text-on-surface-variant mt-1">{step.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card variant="default" className="space-y-4">
              <p className="label-sm text-primary flex items-center gap-2">
                <User size={14} />
                RESPONSABILIDADE ATUAL
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="title-md font-bold">
                    {currentProcess.currentResponsible.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="title-sm font-semibold text-on-surface">
                    {currentProcess.currentResponsible.name}
                  </h4>
                  <p className="label-sm text-on-surface-variant">
                    {currentProcess.currentResponsible.role}
                  </p>
                  <Chip
                    variant="status"
                    className="mt-2 bg-secondary-container text-on-secondary-container"
                  >
                    Papel Crítico
                  </Chip>
                </div>
              </div>
            </Card>

            <Card variant="default" className="space-y-2">
              <div>
                <p className="label-sm text-secondary">TEMPO NO ESTÁGIO</p>
                <h4 className="text-3xl headline-md font-bold text-on-surface">
                  {currentProcess.hoursInStage}{' '}
                  <span className="text-base font-normal text-on-surface-variant">Horas</span>
                </h4>
              </div>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <Clock size={14} />
                <span>Dentro do prazo esperado</span>
              </div>
            </Card>
          </div>

          <Card variant="default" className="p-0! overflow-hidden">
            <div className="p-6 border-b bg-surface-container-low">
              <h3 className="title-md font-semibold text-on-surface">Histórico de Ações</h3>
            </div>
            <div className="divide-y divide-white/10">
              {[
                {
                  action: 'Documento submetido',
                  user: 'Dra. Helena Silva',
                  date: '12 de Mar, 2024 - 14:30',
                  type: 'submit',
                },
                {
                  action: 'Análise concluída',
                  user: 'Comitê Acadêmico',
                  date: '15 de Mar, 2024 - 09:15',
                  type: 'analysis',
                },
                {
                  action: 'Enviado para aprovação',
                  user: 'Sistema',
                  date: '18 de Mar, 2024 - 10:00',
                  type: 'system',
                },
              ].map((log, i) => (
                <div
                  key={i}
                  className="p-4 flex items-center justify-between hover:bg-surface-container-low/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        log.type === 'submit'
                          ? 'bg-primary'
                          : log.type === 'analysis'
                            ? 'bg-secondary'
                            : 'bg-tertiary'
                      }`}
                    />
                    <div>
                      <p className="title-sm font-medium text-on-surface">{log.action}</p>
                      <p className="label-sm text-on-surface-variant">{log.user}</p>
                    </div>
                  </div>
                  <span className="label-sm text-on-surface-variant">{log.date}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card variant="tonal" className="space-y-4">
            <h3 className="title-md font-semibold text-on-surface flex items-center gap-2">
              <Settings size={18} />
              Detalhes do Processo
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="label-sm text-on-surface-variant">Número</span>
                <span className="title-sm font-medium text-on-surface">{currentProcess.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="label-sm text-on-surface-variant">Tipo</span>
                <Chip variant="info">Bolsa de Pesquisa</Chip>
              </div>
              <div className="flex justify-between items-center">
                <span className="label-sm text-on-surface-variant">Departamento</span>
                <span className="title-sm font-medium text-on-surface">Pós-Graduação</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="label-sm text-on-surface-variant">Ciclo</span>
                <span className="title-sm font-medium text-on-surface">2024.B</span>
              </div>
            </div>
          </Card>

          <Card variant="status" className="bg-error-container/30">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-error shrink-0 mt-0.5" />
              <div>
                <h4 className="title-sm font-semibold text-on-surface mb-1">Atenção Necessária</h4>
                <p className="body-sm text-on-surface-variant">
                  O documento de certificação do Conselho de Segurança está pendente.
                </p>
                <Button variant="tertiary" size="sm" className="mt-3">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </Card>

          <Card variant="default" className="space-y-4">
            <h3 className="title-md font-semibold text-on-surface">Participantes</h3>
            <div className="space-y-3">
              {[
                { name: 'Dr. Helena Silva', role: 'Solicitante', active: true },
                { name: 'Comitê Acadêmico', role: 'Revisor', active: false },
                { name: 'Dir. Pós-Graduação', role: 'Aprovador', active: true },
              ].map((person, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                    <span className="text-xs font-bold">{person.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="title-sm font-medium text-on-surface">{person.name}</p>
                    <p className="label-sm text-on-surface-variant">{person.role}</p>
                  </div>
                  {person.active && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
              ))}
            </div>
          </Card>

          <Card variant="default" className="bg-secondary-container text-on-secondary-container">
            <h3 className="title-md font-semibold mb-2">Precisa de Ajuda?</h3>
            <p className="body-sm opacity-80 mb-4">
              Nossa equipe de suporte institucional está disponível das 8:00 às 18:00.
            </p>
            <Button variant="secondary" className="w-full">
              Contactar Suporte
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProcessesPage;
