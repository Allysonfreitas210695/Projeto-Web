import { useEffect } from 'react';

export const FAQSchema = () => {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O que é o SIFU?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O SIFU (Sistema Integrado de Fluxo Universitário) é uma plataforma inovadora da UFERSA que utiliza inteligência artificial para potencializar seus estudos. Oferecemos ferramentas de resumo, análise de textos e gestão de processos acadêmicos para estudantes e pesquisadores.',
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
          name: 'Quem pode usar o SIFU?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O SIFU é voltado para estudantes, professors e técnicos-administrativos da UFERSA. Para acessar, basta criar uma conta com seu email institucional (@ufersa.edu.br).',
          },
        },
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default FAQSchema;
