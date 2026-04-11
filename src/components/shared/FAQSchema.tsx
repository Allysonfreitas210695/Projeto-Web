import { useEffect } from 'react';

export const FAQSchema = () => {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O que é o Mente Acadêmica?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O Mente Acadêmica é uma plataforma inovadora que utiliza inteligência artificial para potencializar seus estudos. Oferecemos ferramentas de resumo, análise de textos e geração de insights para estudantes e pesquisadores.',
          },
        },
        {
          '@type': 'Question',
          name: 'Como as ferramentas de IA podem me ajudar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nossas ferramentas automatizam tarefas repetitivas como extração de conceitos-chave, organização de referências e auxílio na escrita acadêmica, permitindo que você foque no que realmente importa: o conteúdo.',
          },
        },
        {
          '@type': 'Question',
          name: 'É seguro colocar meus dados acadêmicos na plataforma?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim! Levamos sua privacidade a sério. Seus textos e dados são processados de forma segura e não são compartilhados com terceiros. Você tem total controle sobre suas informações.',
          },
        },
        {
          '@type': 'Question',
          name: 'A plataforma é gratuita?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oferecemos um plano inicial gratuito para todos os novos usuários, para que você possa experimentar o poder da nossa IA. Também temos planos premium para necessidades mais avançadas.',
          },
        },
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.innerHTML = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('faq-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return null; // This component doesn't render anything UI-wise
};
