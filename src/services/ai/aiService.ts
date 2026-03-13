// Simulação de serviço de IA para o MVP

/**
 * AI Service Layer
 * This service is responsible for interacting with AI APIs (OpenAI, Gemini, etc.)
 */

export interface AIResponse {
  text: string;
  usage?: {
    total_tokens: number;
  };
}

class AIService {
  /**
   * Generates text based on a prompt.
   * This is a mock implementation for the MVP.
   */
  async generateText(prompt: string): Promise<AIResponse> {
    // In a real application, this would call an actual AI API.
    // For the academic MVP, we simulate a response.
    console.log('Sending prompt to AI:', prompt);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          text: `[Resposta Simulada da IA para: "${prompt}"]\n\nEsta é uma demonstração de como o serviço de IA se integra ao frontend. Em um projeto real, você substituiria isso por uma chamada de API para o OpenAI ou Google Gemini.`,
          usage: { total_tokens: 150 },
        });
      }, 1500);
    });
  }
}

export const aiService = new AIService();
