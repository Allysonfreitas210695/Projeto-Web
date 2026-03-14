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
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] sm:h-[calc(100vh-12rem)] flex flex-col gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end px-1 sm:px-2">
        <div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Assistente IA
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 flex items-center gap-2">
            <Sparkles size={14} className="text-primary animate-pulse" />
            Gemini 2.5 Flash
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 text-[10px] sm:text-xs font-medium text-muted-foreground hover:text-destructive transition-colors px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-destructive/10 border border-transparent hover:border-destructive/20"
          >
            <Trash2 size={12} />
            Limpar
          </button>
        )}
      </div>

      <div className="flex-1 overflow-hidden flex flex-col bg-card/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-border/50 shadow-xl sm:shadow-2xl relative">
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4 sm:p-8 space-y-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10 animate-bounce-slow">
                <Bot className="text-primary w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div className="max-w-sm">
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                  Como posso ajudar?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Sou seu assistente inteligente. Posso analisar dados, gerar conteúdo ou tirar suas
                  dúvidas.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-6 sm:mt-8 w-full max-w-lg">
                <button
                  onClick={() => setPrompt('Analise o desempenho da minha empresa no último mês.')}
                  className="p-3 sm:p-4 text-xs sm:text-sm text-left rounded-xl sm:rounded-2xl border bg-background/50 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer group"
                >
                  <p className="font-medium group-hover:text-primary transition-colors">
                    Análise de Dados
                  </p>
                  <p className="hidden sm:block text-xs text-muted-foreground">
                    "Analise o desempenho da minha empresa..."
                  </p>
                </button>
                <button
                  onClick={() =>
                    setPrompt('Crie uma estratégia de marketing para as redes sociais.')
                  }
                  className="p-3 sm:p-4 text-xs sm:text-sm text-left rounded-xl sm:rounded-2xl border bg-background/50 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer group"
                >
                  <p className="font-medium group-hover:text-primary transition-colors">
                    Marketing
                  </p>
                  <p className="hidden sm:block text-xs text-muted-foreground">
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
                  className={`flex gap-2 sm:gap-3 max-w-[92%] sm:max-w-[85%] ${
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border ${
                      msg.role === 'user'
                        ? 'bg-primary/10 border-primary/20 text-primary'
                        : 'bg-muted border-border text-muted-foreground'
                    }`}
                  >
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div
                    className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                        : 'bg-background border border-border/50 rounded-tl-none'
                    }`}
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-sm sm:text-[15px] leading-relaxed">
                      {msg.content}
                    </div>
                    <div
                      className={`text-[9px] sm:text-[10px] mt-1.5 sm:mt-2 opacity-50 ${
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
              <div className="flex gap-2 sm:gap-3 max-w-[92%] sm:max-w-[75%] flex-row">
                <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border bg-muted border-border text-primary">
                  <Bot size={14} className="animate-pulse" />
                </div>
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-background border border-border/50 rounded-tl-none flex items-center gap-2 sm:gap-3">
                  <span className="flex gap-1">
                    <span
                      className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary/40 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    ></span>
                    <span
                      className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary/40 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    ></span>
                    <span
                      className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary/40 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    ></span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">
                    Digitalizando...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 sm:p-4 bg-background/50 border-t border-border/50 backdrop-blur-md">
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
              className="w-full min-h-[48px] sm:min-h-[56px] max-h-32 sm:max-h-40 p-3 sm:p-4 pr-12 sm:pr-14 rounded-xl sm:rounded-2xl border border-border/50 bg-background/80 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none transition-all shadow-lg group-hover:border-primary/30 text-sm"
            />
            <button
              onClick={handleSend}
              disabled={loading || !prompt.trim()}
              className="absolute right-2 bottom-2 sm:right-2.5 sm:bottom-2.5 w-9 h-9 sm:w-10 sm:h-10 bg-primary text-primary-foreground rounded-lg sm:rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none shadow-md"
            >
              {loading ? (
                <Loader2 className="animate-spin w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              ) : (
                <Send className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              )}
            </button>
          </div>
          <div className="text-center mt-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold opacity-40">
              IA pode cometer erros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIToolsPage;
