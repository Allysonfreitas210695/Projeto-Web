import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';

const DashboardPage = () => {
  const stats = [
    { label: 'Total de Usuários', value: '1,234', change: '+12%', trend: 'up' },
    { label: 'Requisições de IA', value: '456', change: '+5%', trend: 'up' },
    { label: 'Latência Média', value: '250ms', change: '-10%', trend: 'down' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="headline-lg text-on-surface">Dashboard</h2>
        <p className="body-md text-on-surface-variant">
          Visão geral das métricas da sua aplicação.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} variant="default" className="space-y-3">
            <p className="label-md text-on-surface-variant">{stat.label}</p>
            <div className="flex items-baseline gap-3">
              <span className="headline-md text-on-surface">{stat.value}</span>
              <Chip
                variant={stat.trend === 'up' ? 'academic' : 'status'}
                className={stat.trend === 'down' ? 'bg-error-container text-error' : ''}
              >
                {stat.change}
              </Chip>
            </div>
          </Card>
        ))}
      </div>

      <Card variant="tonal" className="h-64 flex items-center justify-center">
        <p className="body-md text-on-surface-variant text-center">
          Espaço reservado para representação visual de dados
        </p>
      </Card>
    </div>
  );
};

export default DashboardPage;
