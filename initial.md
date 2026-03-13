Crie um projeto MVP acadêmico moderno utilizando React com Vite e TypeScript.

O objetivo é desenvolver um sistema web escalável com possibilidade de integração com Inteligência Artificial (IA), utilizando boas práticas de arquitetura de software, organização de código e tecnologias modernas do ecossistema JavaScript.

O projeto deve ser adequado para nível acadêmico (faculdade), demonstrando conceitos de:

- Arquitetura de software
- Boas práticas de desenvolvimento
- Integração com APIs
- Integração com IA
- Interface moderna
- Organização de código escalável

Stack obrigatória:

Frontend:

- React
- Vite
- TypeScript
- React Router DOM
- TanStack Query (React Query)
- Axios
- Zustand (estado global)
- TailwindCSS
- Shadcn/ui
- React Hook Form
- Zod
- Lucide React (ícones)

Integração com IA:

Criar uma estrutura preparada para consumir APIs de IA como:

- OpenAI
- Google Gemini
- AWS Bedrock
- APIs de Machine Learning

Criar uma camada de serviço para IA em:

src/services/ai/

Exemplo de funcionalidades com IA:

- geração automática de texto
- análise de dados
- recomendação de conteúdo
- chatbot simples
- resumo automático de texto

Arquitetura do projeto:

Utilizar arquitetura baseada em features para facilitar manutenção e escalabilidade.

Estrutura de pastas:

src/

app/
router/
providers/

components/
ui/
shared/

features/
auth/
dashboard/
ai-tools/
users/

services/
api/
ai/

hooks/

store/

utils/

types/

pages/

layouts/

Funcionalidades do MVP:

1 - Sistema de autenticação

- login
- logout
- persistência de sessão
- proteção de rotas

2 - Dashboard

- página inicial
- cards com métricas
- visualização de dados

3 - CRUD exemplo

- cadastro de usuários
- listagem
- edição
- exclusão

4 - Módulo de Inteligência Artificial
Criar uma seção chamada "AI Tools" contendo:

- campo de texto
- botão para enviar para IA
- exibição da resposta da IA

Exemplo:

Usuário escreve um texto → sistema envia para API de IA → IA retorna resposta → sistema exibe.

5 - Formulários

- React Hook Form
- validação com Zod
- mensagens de erro

6 - Gerenciamento de estado

- Zustand para estado global

7 - Requisições

- Axios com instância configurada
- interceptors

8 - Data fetching

- TanStack Query

9 - Layout

Criar layout moderno com:

- Sidebar
- Navbar
- área de conteúdo
- design responsivo

10 - UX

Adicionar:

- loading states
- error states
- feedback visual

Integração com IA (estrutura):

Criar exemplo de função em:

services/ai/aiService.ts

Que envia um prompt para uma API de IA e retorna a resposta.

Exemplo:

generateText(prompt: string)

Extras importantes para nível acadêmico:

- comentários explicando as partes principais
- tipagem completa com TypeScript
- separação clara de responsabilidades
- componentes reutilizáveis
- exemplo de hook customizado

Qualidade de código:

Adicionar configuração para:

- ESLint
- Prettier
- Husky
- lint-staged

Mostrar também:

- comandos de instalação do projeto
- configuração do Tailwind
- configuração do Shadcn
- exemplo de requisição para IA
- exemplo de formulário completo
- exemplo de store com Zustand

Objetivo final:

Criar um boilerplate acadêmico moderno que demonstre boas práticas de desenvolvimento frontend e integração com APIs de Inteligência Artificial.
