import { Link } from 'react-router-dom';
import { Logo } from '@/components/shared/Logo';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const TermsPage = () => {
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
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="headline-lg text-on-surface">Termos de Uso</h1>
            <p className="body-md text-on-surface-variant">
              Última atualização: 14 de Março de 2026
            </p>
          </div>

          <Card variant="default" className="space-y-6">
            <p className="body-md text-on-surface">
              Bem-vindo ao <strong>SIFU - Sistema Integrado de Fluxo Universitário</strong>. Ao
              acessar ou usar nosso serviço, você concorda em cumprir e ser regido por estes Termos
              de Uso.
            </p>

            <div className="space-y-4">
              <h2 className="title-md font-semibold text-on-surface">1. Aceitação dos Termos</h2>
              <p className="body-sm text-on-surface-variant">
                Ao utilizar esta plataforma, você declara estar ciente e de acordo com as normas
                aqui estabelecidas. Este projeto é uma demonstração para fins acadêmicos e de
                pesquisa.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="title-md font-semibold text-on-surface">2. Uso do Serviço</h2>
              <p className="body-sm text-on-surface-variant">
                O usuário compromete-se a utilizar a plataforma de forma ética e legal, não
                comprometendo a integridade dos dados ou o funcionamento do sistema. É proibido o
                uso de técnicas de engenharia reversa para fins maliciosos.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="title-md font-semibold text-on-surface">3. Ferramentas de IA</h2>
              <p className="body-sm text-on-surface-variant">
                As funcionalidades de IA integradas são baseadas em modelos generativos. O{' '}
                <strong>SIFU</strong> não se responsabiliza por imprecisões ou alucinações geradas
                pelos modelos de inteligência artificial.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="title-md font-semibold text-on-surface">4. Propriedade Intelectual</h2>
              <p className="body-sm text-on-surface-variant">
                Todo o conteúdo visual, código e design são de propriedade dos desenvolvedores do
                projeto. O uso indevido de marcas e logos é estritamente proibido.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="title-md font-semibold text-on-surface">5. Alterações nos Termos</h2>
              <p className="body-sm text-on-surface-variant">
                Reservamo-nos o direito de atualizar estes termos a qualquer momento. Recomendamos a
                revisão periódica desta página.
              </p>
            </div>
          </Card>

          <div className="pt-8 border-t border-white/10">
            <p className="body-md text-on-surface-variant text-center">
              &copy; 2026 SIFU - UFERSA. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsPage;
