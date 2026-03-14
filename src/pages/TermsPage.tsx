import { Link } from 'react-router-dom';
import { Logo } from '@/components/shared/Logo';
import { ArrowLeft } from 'lucide-react';

const TermsPage = () => {
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
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Termos de Uso</h1>
            <p className="text-muted-foreground">Última atualização: 14 de Março de 2026</p>
          </div>

          <section className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/80 leading-relaxed">
            <p>
              Bem-vindo ao <strong>Mente Acadêmica</strong>. Ao acessar ou usar nosso serviço, você
              concorda em cumprir e ser regido por estes Termos de Uso.
            </p>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">1. Aceitação dos Termos</h2>
              <p>
                Ao utilizar esta plataforma, você declara estar ciente e de acordo com as normas
                aqui estabelecidas. Este projeto é uma demonstração para fins acadêmicos e de
                pesquisa.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">2. Uso do Serviço</h2>
              <p>
                O usuário compromete-se a utilizar a plataforma de forma ética e legal, não
                comprometendo a integridade dos dados ou o funcionamento do sistema. É proibido o
                uso de técnicas de engenharia reversa para fins maliciosos.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">3. Ferramentas de IA</h2>
              <p>
                As funcionalidades de IA integradas são baseadas em modelos generativos. O{' '}
                <strong>Mente Acadêmica</strong> não se responsabiliza por imprecisões ou
                alucinações geradas pelos modelos de inteligência artificial.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">4. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo visual, código e design são de propriedade dos desenvolvedores do
                projeto. O uso indevido de marcas e logos é estritamente proibido.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">5. Alterações nos Termos</h2>
              <p>
                Reservamo-nos o direito de atualizar estes termos a qualquer momento. Recomendamos a
                revisão periódica desta página.
              </p>
            </div>
          </section>

          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground text-center">
              &copy; 2026 Mente Acadêmica. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsPage;
