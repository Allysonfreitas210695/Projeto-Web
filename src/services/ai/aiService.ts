import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

/**
 * AI Service Layer
 * This service is responsible for interacting with Google Gemini API
 */

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
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  /**
   * Generates text based on a prompt.
   */
  async generateText(prompt: string): Promise<AIResponse> {
    try {
      console.log('Sending prompt to Gemini Flash:', prompt);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return {
        text,
        // Gemini SDK doesn't return tokens in a simple way for generateContent
        // but we can add more complex usage tracking if needed
      };
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }
}

export const aiService = new AIService();
