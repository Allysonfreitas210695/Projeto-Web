import { Link } from 'react-router-dom';
import { Logo } from '@/components/shared/Logo';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-surface">
      <header className="h-16 glass border-b px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
        <Link
          to="/login"
          className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="title-sm font-medium">Voltar para Login</span>
        </Link>
        <Logo showText={false} className="lg:hidden" />
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 sm:py-20 animate-in fade-in duration-700">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
            <ShieldCheck size={28} />
          </div>
          <div className="space-y-1">
            <h1 className="headline-lg text-on-surface">Política de Privacidade</h1>
            <p className="body-md text-on-surface-variant">Transparência e proteção no SIFU</p>
          </div>
        </div>

        <Card variant="default" className="space-y-6">
          <p className="body-md text-on-surface">
            Sua privacidade é importante para nós. Esta política explica como lidamos com seus dados
            no contexto deste projeto acadêmico.
          </p>

          <div className="space-y-4">
            <h2 className="title-md font-semibold text-on-surface">1. Coleta de Informações</h2>
            <p className="body-sm text-on-surface-variant">
              No momento, este projeto opera de forma simulada. Não coletamos dados pessoais
              sensíveis ou permanentes para além do necessário para a experiência de demonstração.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="title-md font-semibold text-on-surface">2. Uso de Dados de IA</h2>
            <p className="body-sm text-on-surface-variant">
              Os prompts enviados às ferramentas de IA são processados via API. Recomendamos que
              você não compartilhe informações pessoais reais ou críticas durante os testes.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="title-md font-semibold text-on-surface">3. Armazenamento</h2>
            <p className="body-sm text-on-surface-variant">
              Os dados de sessão são armazenados localmente no navegador (localStorage) para
              persistir o estado do chat durante a visita, podendo ser limpos a qualquer momento
              pelo usuário.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="title-md font-semibold text-on-surface">4. LGPD Compliance</h2>
            <p className="body-sm text-on-surface-variant">
              Este projeto foi desenvolvido siguiendo os princípios da Lei Geral de Proteção de
              Dados (LGPD). O almacenamiento de dados simulado pode ser eliminado a qualquer
              momento.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="title-md font-semibold text-on-surface">5. Contato</h2>
            <p className="body-sm text-on-surface-variant">
              Por se tratar de um projeto para fins universitários, eventuais dúvidas sobre o
              tratamento de dados podem ser encaminhadas aos desenvolvedores responsáveis.
            </p>
          </div>
        </Card>

        <div className="pt-8 border-t border-white/10">
          <p className="body-md text-on-surface-variant text-center">
            &copy; 2026 SIFU - UFERSA. Comprometidos com a ética em IA.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPage;
