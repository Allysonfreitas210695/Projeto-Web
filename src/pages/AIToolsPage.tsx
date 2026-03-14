import { useState, useRef, useEffect } from 'react';
import { aiService } from '@/services/ai/aiService';
import { Loader2, Send, Bot, User } from 'lucide-react';

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

  return (
    <div className="flex flex-col h-full bg-background animate-in fade-in duration-700 relative">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scroll-smooth group/scroll pb-32">
        <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 pt-4 sm:pt-8 space-y-6 sm:space-y-8">
          {messages.length === 0 ? (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-8">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10 transition-transform hover:scale-110 duration-500">
                <Bot className="text-primary w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight px-4">
                  Como posso ajudar?
                </h2>
                <p className="text-muted-foreground text-sm max-w-[280px] mx-auto">
                  Sou seu assistente inteligente. Pronto para analisar dados ou tirar dúvidas.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg px-4">
                {[
                  {
                    label: 'Resumo Acadêmico',
                    prompt: 'Crie um resumo acadêmico estruturado para este artigo.',
                  },
                  {
                    label: 'Metodologia',
                    prompt: 'Sugira uma metodologia de pesquisa para um TCC sobre IA.',
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setPrompt(item.prompt)}
                    className="p-4 text-sm text-left rounded-2xl border border-border/50 bg-card hover:bg-muted/50 hover:border-primary/20 transition-all group"
                  >
                    <p className="font-semibold group-hover:text-primary transition-colors">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">"{item.prompt}"</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 sm:gap-6 group/message animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                      msg.role === 'user'
                        ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                        : 'bg-muted border-border text-muted-foreground'
                    }`}
                  >
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div
                    className={`flex flex-col gap-2 min-w-0 flex-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[90%] sm:max-w-[85%] px-4 py-3 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-muted/50 text-foreground'
                          : 'bg-transparent text-foreground'
                      }`}
                    >
                      <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-[15px] leading-relaxed">
                        {msg.content}
                      </div>
                    </div>
                    <div className="text-[10px] text-muted-foreground/30 font-medium px-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3 sm:gap-6 animate-pulse">
                  <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border bg-muted border-border text-primary">
                    <Bot size={16} />
                  </div>
                  <div className="flex flex-col gap-2 flex-1 items-start">
                    <div className="h-10 w-24 bg-muted/20 rounded-2xl" />
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Persistent Input Bar */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 pb-4 sm:pb-8 pt-10 bg-linear-to-t from-background via-background/90 to-transparent">
          <div className="relative pointer-events-auto max-w-2xl mx-auto">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Envie uma mensagem..."
              className="w-full min-h-[52px] max-h-40 p-3.5 sm:p-4 pr-12 rounded-2xl border border-border/60 bg-card shadow-[0_0_40px_rgba(0,0,0,0.05)] dark:shadow-[0_0_40px_rgba(0,0,0,0.2)] focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none resize-none transition-all placeholder:text-muted-foreground/50 text-[15px]"
            />
            <button
              onClick={handleSend}
              disabled={loading || !prompt.trim()}
              className="absolute right-2 bottom-2 w-9 h-9 sm:w-10 sm:h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale shadow-lg shadow-primary/10"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="text-center mt-2 px-4">
            <p className="text-[10px] text-muted-foreground/40 font-medium tracking-tight uppercase">
              O Assistente IA pode fornecer informações imprecisas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIToolsPage;
