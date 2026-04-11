import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left hover:text-primary transition-colors focus:outline-none group"
      >
        <span className="text-base font-semibold pr-8 leading-relaxed">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ease-out ${
            isOpen ? 'rotate-180 text-primary' : 'group-hover:text-primary'
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mb-5' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden text-muted-foreground text-sm leading-relaxed px-1">
          {answer}
        </div>
      </div>
    </div>
  );
};

export const FAQSection = () => {
  const faqs = [
    {
      question: 'O que é o Mente Acadêmica?',
      answer:
        'O Mente Acadêmica é uma plataforma inovadora que utiliza inteligência artificial para potencializar seus estudos. Oferecemos ferramentas de resumo, análise de textos e geração de insights para estudantes e pesquisadores.',
    },
    {
      question: 'Como as ferramentas de IA podem me ajudar?',
      answer:
        'Nossas ferramentas automatizam tarefas repetitivas como extração de conceitos-chave, organização de referências e auxílio na escrita acadêmica, permitindo que você foque no que realmente importa: o conteúdo.',
    },
    {
      question: 'É seguro colocar meus dados acadêmicos na plataforma?',
      answer:
        'Sim! Levamos sua privacidade a sério. Seus textos e dados são processados de forma segura e não são compartilhados com terceiros. Você tem total controle sobre suas informações.',
    },
    {
      question: 'A plataforma é gratuita?',
      answer:
        'Oferecemos um plano inicial gratuito para todos os novos usuários, para que você possa experimentar o poder da nossa IA. Também temos planos premium para necessidades mais avançadas.',
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          Perguntas Frequentes
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Tire suas dúvidas sobre como usar o Mente Acadêmica para elevar seu nível acadêmico.
        </p>
      </div>

      <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 shadow-xl shadow-primary/5 p-4 sm:p-8">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Ainda tem dúvidas?{' '}
          <span className="text-primary font-medium hover:underline cursor-pointer">
            Entre em contato suporte
          </span>
        </p>
      </div>
    </section>
  );
};
