import { Link } from 'react-router-dom';
import { Logo } from '@/components/shared/Logo';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="h-16 border-b bg-card px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
        <Link
          to="/login"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Voltar para Login</span>
        </Link>
        <Logo showText={false} className="lg:hidden" />
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 sm:py-20 animate-in fade-in duration-700">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck size={28} />
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">Política de Privacidade</h1>
              <p className="text-muted-foreground text-sm">
                Transparência e proteção no Mente Acadêmica
              </p>
            </div>
          </div>

          <section className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/80 leading-relaxed">
            <p>
              Sua privacidade é importante para nós. Esta política explica como lidamos com seus
              dados no contexto deste projeto acadêmico.
            </p>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">1. Coleta de Informações</h2>
              <p>
                No momento, este projeto opera de forma simulada. Não coletamos dados pessoais
                sensíveis ou permanentes para além do necessário para a experiência de demonstração.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">2. Uso de Dados de IA</h2>
              <p>
                Os prompts enviados às ferramentas de IA são processados via API. Recomendamos que
                você não compartilhe informações pessoais reais ou críticas durante os testes.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">3. Armazenamento</h2>
              <p>
                Os dados de sessão são armazenados localmente no navegador (localStorage) para
                persistir o estado do chat durante a visita, podendo ser limpos a qualquer momento
                pelo usuário.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">4. Cookies</h2>
              <p>
                Utilizamos tecnologias básicas para manter sua preferência de tema (claro/escuro) e
                status de login simulado.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">5. Contato</h2>
              <p>
                Por se tratar de um projeto para fins universitários, eventuais dúvidas sobre o
                tratamento de dados podem ser encaminhadas aos desenvolvedores responsáveis.
              </p>
            </div>
          </section>

          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground text-center">
              &copy; 2026 Mente Acadêmica. Comprometidos com a ética em IA.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPage;
