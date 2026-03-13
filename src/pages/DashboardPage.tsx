const DashboardPage = () => {
  const stats = [
    { label: 'Total de Usuários', value: '1,234', change: '+12%', color: 'text-blue-600' },
    { label: 'Requisições de IA', value: '456', change: '+5%', color: 'text-purple-600' },
    { label: 'Latência Média', value: '250ms', change: '-10%', color: 'text-green-600' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Visão geral das métricas da sua aplicação.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card p-6 rounded-xl border shadow-sm">
            <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className={stat.color + ' text-xs font-semibold'}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card p-6 rounded-xl border shadow-sm h-64 flex items-center justify-center text-muted-foreground text-center">
        Espaço reservado para representação visual de dados
      </div>
    </div>
  );
};

export default DashboardPage;
