import { useState } from 'react';
import { aiService } from '@/services/ai/aiService';
import { Loader2, Send } from 'lucide-react';

const AIToolsPage = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const result = await aiService.generateText(prompt);
      setResponse(result.text);
    } catch {
      setResponse('Falha ao gerar resposta da IA. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Ferramentas de IA</h2>
        <p className="text-muted-foreground">
          Experimente as capacidades de inteligência artificial.
        </p>
      </div>

      <div className="bg-card rounded-xl border shadow-sm divide-y">
        <div className="p-6">
          <label className="block text-sm font-medium mb-3">Seu Prompt</label>
          <div className="flex gap-2">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 min-h-[100px] p-4 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none resize-none transition-all"
              placeholder="Digite um texto para processar com a IA..."
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSend}
              disabled={loading || !prompt.trim()}
              className="flex items-center gap-2 px-6 h-10 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              Gerar Resposta
            </button>
          </div>
        </div>

        <div className="p-6 bg-muted/20 min-h-[200px]">
          <label className="block text-sm font-medium mb-3 text-muted-foreground">
            Resposta da IA
          </label>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2 text-muted-foreground">
              <Loader2 className="animate-spin" size={32} />
              <p className="text-sm font-medium">Processando...</p>
            </div>
          ) : response ? (
            <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap animate-in fade-in duration-300">
              {response}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground italic">
              Seu conteúdo gerado aparecerá aqui...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIToolsPage;
