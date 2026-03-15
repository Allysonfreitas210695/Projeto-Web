import { useState, useRef, useEffect } from 'react';
import { aiService } from '@/services/ai/aiService';
import { Send, Bot, User, Paperclip, X, FileText, Square, Pencil, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Dialog, { DialogType } from '@/components/ui/Dialog';
import { generatePDF } from '@/lib/pdfUtils';
import { Download } from 'lucide-react';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  fileAttachment?: {
    name: string;
    type: string;
    url: string;
  };
}

const AIToolsPage = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');

  // Abort controller for stopping generation
  const abortControllerRef = useRef<AbortController | null>(null);

  // Dialog state
  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    type: DialogType;
  }>({
    isOpen: false,
    title: '',
    description: '',
    type: 'info',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      fileAttachment: selectedFile
        ? {
            name: selectedFile.name,
            type: selectedFile.type,
            url: URL.createObjectURL(selectedFile),
          }
        : undefined,
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);
    setPrompt('');
    setLoading(true);

    // Create new abort controller
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      let fileData;
      if (selectedFile) {
        const base64 = await fileToBase64(selectedFile);
        fileData = {
          base64,
          mimeType: selectedFile.type,
        };
      }

      const result = await aiService.generateText(userMessage.content, fileData, controller.signal);
      setSelectedFile(null); // Clear file after sending

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.text,
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, assistantMessage]);
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        // User manually stopped the generation
        return;
      }
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          'Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.',
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleEdit = (msg: Message) => {
    setEditingId(msg.id);
    setEditPrompt(msg.content);
  };

  const saveEdit = async (id: string) => {
    if (!editPrompt.trim()) return;

    // Find the message index
    const index = messages.findIndex((m) => m.id === id);
    if (index === -1) return;

    // Remove all subsequent messages
    const updatedMessages = messages.slice(0, index + 1);
    updatedMessages[index] = {
      ...updatedMessages[index],
      content: editPrompt.trim(),
      timestamp: new Date(),
    };

    setMessages(updatedMessages);
    setEditingId(null);
    setEditPrompt('');

    // Re-trigger generation
    setLoading(true);
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const result = await aiService.generateText(
        updatedMessages[index].content,
        undefined,
        controller.signal
      );
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.text,
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, assistantMessage]);
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') return;
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          'Desculpe, ocorreu um erro ao processar sua solicitação após a edição. Por favor, tente novamente.',
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else if (file) {
      setDialogConfig({
        isOpen: true,
        title: 'Formato não suportado',
        description:
          'Por favor, selecione um arquivo no formato PDF. Outros formatos ainda não são suportados para análise.',
        type: 'warning',
      });
      // Clear input
      if (fileInputRef.current) fileInputRef.current.value = '';
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
              {messages.map((msg: Message) => (
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
                      className={`max-w-[90%] sm:max-w-[85%] px-4 py-3 rounded-2xl relative group/content ${
                        msg.role === 'user'
                          ? 'bg-muted/50 text-foreground'
                          : 'bg-transparent text-foreground'
                      }`}
                    >
                      {editingId === msg.id ? (
                        <div className="flex flex-col gap-2 w-full min-w-[200px] sm:min-w-[400px]">
                          <textarea
                            value={editPrompt}
                            onChange={(e) => setEditPrompt(e.target.value)}
                            className="w-full p-2 rounded-lg bg-background border border-border focus:ring-1 focus:ring-primary outline-none resize-none text-sm min-h-[80px]"
                            autoFocus
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1 text-xs font-medium rounded-md hover:bg-muted transition-colors"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={() => saveEdit(msg.id)}
                              className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1"
                            >
                              <Check size={12} /> Salvar & Reenviar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="prose prose-sm dark:prose-invert max-w-none text-[15px] leading-relaxed">
                            {msg.role === 'assistant' ? (
                              <div className="flex flex-col gap-4">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {msg.content}
                                </ReactMarkdown>
                                {!loading && (
                                  <div className="flex justify-start">
                                    <button
                                      onClick={() =>
                                        generatePDF(msg.content, `mente-academica-${msg.id}.pdf`)
                                      }
                                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border bg-background hover:bg-muted hover:text-primary transition-all group/dl"
                                    >
                                      <Download
                                        size={14}
                                        className="group-hover/dl:scale-110 transition-transform"
                                      />
                                      Baixar como PDF
                                    </button>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="flex flex-col gap-3">
                                {msg.fileAttachment && (
                                  <div className="flex items-center gap-2 p-3 bg-background/50 border border-border/60 rounded-xl max-w-sm">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                      <FileText size={16} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-medium truncate">
                                        {msg.fileAttachment.name}
                                      </p>
                                      <p className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                                        Anexo PDF
                                      </p>
                                    </div>
                                    <a
                                      href={msg.fileAttachment.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1.5 hover:bg-muted rounded-md transition-colors text-muted-foreground mr-1"
                                      title="Abrir PDF"
                                    >
                                      <Bot size={14} className="rotate-45" />
                                    </a>
                                  </div>
                                )}
                                <div className="whitespace-pre-wrap">{msg.content}</div>
                              </div>
                            )}
                          </div>

                          {msg.role === 'user' && !loading && (
                            <button
                              onClick={() => handleEdit(msg)}
                              className="absolute -left-10 top-2 p-1.5 opacity-0 group-hover/content:opacity-100 transition-opacity text-muted-foreground hover:text-primary hover:bg-muted rounded-md"
                              title="Editar mensagem"
                            >
                              <Pencil size={14} />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-medium px-1 opacity-70">
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
            {/* File Preview */}
            {selectedFile && (
              <div className="mb-2 flex items-center gap-2 p-2 bg-muted/50 border border-border/60 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <FileText size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{selectedFile.name}</p>
                  <p className="text-[10px] text-muted-foreground">PDF Document</p>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="p-1 hover:bg-muted rounded-md transition-colors text-muted-foreground mr-1"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            <div className="relative group">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className="absolute left-2.5 bottom-2.5 w-8 h-8 flex items-center justify-center rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all outline-none"
                title="Anexar PDF"
              >
                <Paperclip size={18} />
              </button>
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
                className="w-full min-h-[52px] max-h-40 p-3.5 sm:p-4 pl-12 pr-12 rounded-2xl border border-border/60 bg-card shadow-[0_0_40px_rgba(0,0,0,0.05)] dark:shadow-[0_0_40px_rgba(0,0,0,0.2)] focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none resize-none transition-all placeholder:text-muted-foreground/70 text-[15px]"
              />
              <button
                onClick={handleSend}
                disabled={loading || (!prompt.trim() && !selectedFile)}
                className="absolute right-2 bottom-2 w-9 h-9 sm:w-10 sm:h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/10 disabled:opacity-30 disabled:grayscale"
              >
                {loading ? (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStop();
                    }}
                    className="w-full h-full flex items-center justify-center bg-destructive text-destructive-foreground rounded-xl hover:bg-destructive/90 transition-colors group/stop"
                    title="Parar geração"
                  >
                    <Square size={16} className="fill-current" />
                  </div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div className="text-center mt-2 px-4">
            <p className="text-[10px] text-muted-foreground font-medium tracking-tight uppercase opacity-60">
              O Assistente IA pode fornecer informações imprecisas.
            </p>
          </div>
        </div>
      </div>

      {/* Custom Dialog */}
      <Dialog
        isOpen={dialogConfig.isOpen}
        onClose={() => setDialogConfig((prev) => ({ ...prev, isOpen: false }))}
        title={dialogConfig.title}
        description={dialogConfig.description}
        type={dialogConfig.type}
      />
    </div>
  );
};

export default AIToolsPage;
