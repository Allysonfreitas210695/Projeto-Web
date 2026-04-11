import { GoogleGenerativeAI, GenerativeModel, Part } from '@google/generative-ai';

/**
 * AI Service Layer
 * This service is responsible for interacting with Google Gemini API
 */

export interface AIFile {
  base64: string;
  mimeType: string;
}

export interface AIResponse {
  text: string;
  usage?: {
    total_tokens: number;
  };
}

class AIService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('ERRO: VITE_GEMINI_API_KEY não encontrada no ambiente.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey || 'MISSING_KEY');
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-2.5-flash', // Using 2.0 Flash as 2.5 might not be fully stable in SDK names yet, or update to correct stable name
      tools: [
        {
          googleSearchRetrieval: {},
        },
      ],
      systemInstruction: `Você é o "SIFU - Sistema Integrado de Fluxo Universitário", um assistente de inteligência artificial especializado em prover suporte para estudantes universitários e pesquisadores da UFERSA.

Seu objetivo é ser um mentor acadêmico, ajudando com:
1. Explicação de conceitos complexos de diversas disciplinas.
2. Sugestão de temas e metodologias para trabalhos e pesquisas.
3. Revisão e formatação básica de textos acadêmicos (estilo ABNT, etc).
4. Organização de cronogramas de estudo.

Tom de Voz:
- Profissional, amigável e encorajador.
- Sênior, porém acessível.
- Respostas estruturadas com tópicos quando apropriado.

Restrição de Tópico:
- Responda APENAS perguntas relacionadas ao universo acadêmico, escolar ou universitário.
- Se o usuário perguntar algo fora desse contexto, peça gentilmente para que ele foque em temas acadêmicos, pois esse é o seu propósito único.

Sempre se identifique como "SIFU" se perguntarem quem você é.`,
    });
  }

  /**
   * Generates text based on a prompt and optional file.
   */
  async generateText(prompt: string, file?: AIFile, signal?: AbortSignal): Promise<AIResponse> {
    try {
      console.log('Sending prompt to Gemini:', prompt);

      const parts: (string | Part)[] = [prompt];

      if (file) {
        parts.push({
          inlineData: {
            data: file.base64,
            mimeType: file.mimeType,
          },
        });
      }

      const result = await this.model.generateContent(parts, { signal });
      const response = await result.response;
      const text = response.text();

      return {
        text,
      };
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Gemini request aborted by user');
        throw error;
      }
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }
}

export const aiService = new AIService();
