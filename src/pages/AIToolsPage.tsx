import { useState, useRef, useEffect } from 'react';
import { aiService } from '@/services/ai/aiService';
import { Loader2, Send, Bot, User, Sparkles, Trash2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIToolsPage = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!prompt.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');
    setLoading(true);

    try {
      const result = await aiService.generateText(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          'Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-12rem)] flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end px-2">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Assistente IA
          </h2>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <Sparkles size={16} className="text-primary animate-pulse" />
            Potencializado por Gemini 2.5 Flash
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors px-3 py-1.5 rounded-full hover:bg-destructive/10 border border-transparent hover:border-destructive/20"
          >
            <Trash2 size={14} />
            Limpar Chat
          </button>
        )}
      </div>

      <div className="flex-1 overflow-hidden flex flex-col bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 shadow-2xl relative">
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10 animate-bounce-slow">
                <Bot size={40} className="text-primary" />
              </div>
              <div className="max-w-sm">
                <h3 className="text-xl font-semibold mb-2">Como posso ajudar hoje?</h3>
                <p className="text-muted-foreground">
                  Sou seu assistente inteligente. Posso analisar dados, gerar conteúdo ou tirar suas
                  dúvidas em segundos.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 w-full max-w-lg">
                <button
                  onClick={() => setPrompt('Analise o desempenho da minha empresa no último mês.')}
                  className="p-4 text-sm text-left rounded-2xl border bg-background/50 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer group"
                >
                  <p className="font-medium group-hover:text-primary transition-colors">
                    Análise de Dados
                  </p>
                  <p className="text-xs text-muted-foreground">
                    "Analise o desempenho da minha empresa..."
                  </p>
                </button>
                <button
                  onClick={() =>
                    setPrompt('Crie uma estratégia de marketing para as redes sociais.')
                  }
                  className="p-4 text-sm text-left rounded-2xl border bg-background/50 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer group"
                >
                  <p className="font-medium group-hover:text-primary transition-colors">
                    Marketing
                  </p>
                  <p className="text-xs text-muted-foreground">
                    "Crie uma estratégia de marketing..."
                  </p>
                </button>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex w-full animate-in slide-in-from-bottom-2 duration-300 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${
                      msg.role === 'user'
                        ? 'bg-primary/10 border-primary/20 text-primary'
                        : 'bg-muted border-border text-muted-foreground'
                    }`}
                  >
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div
                    className={`p-4 rounded-2xl shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                        : 'bg-background border border-border/50 rounded-tl-none'
                    }`}
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-[15px] leading-relaxed">
                      {msg.content}
                    </div>
                    <div
                      className={`text-[10px] mt-2 opacity-50 ${
                        msg.role === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex gap-3 max-w-[75%] flex-row">
                <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border bg-muted border-border text-primary">
                  <Bot size={16} className="animate-pulse" />
                </div>
                <div className="p-4 rounded-2xl bg-background border border-border/50 rounded-tl-none flex items-center gap-3">
                  <span className="flex gap-1">
                    <span
                      className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    ></span>
                    <span
                      className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    ></span>
                    <span
                      className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    ></span>
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    Digitalizando resposta...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background/50 border-t border-border/50 backdrop-blur-md">
          <div className="relative group max-w-4xl mx-auto">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Pergunte qualquer coisa..."
              className="w-full min-h-[56px] max-h-40 p-4 pr-14 rounded-2xl border border-border/50 bg-background/80 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all shadow-lg group-hover:border-primary/30"
            />
            <button
              onClick={handleSend}
              disabled={loading || !prompt.trim()}
              className="absolute right-2.5 bottom-2.5 w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none shadow-md"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            </button>
          </div>
          <div className="text-center mt-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold opacity-40">
              IA pode cometer erros. Verifique informações importantes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIToolsPage;
