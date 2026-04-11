# SIFU - Sistema Integrado de Fluxo Universitário

Este é o projeto acadêmico da UFERSA para gestão de processos institucionais com assistência de IA.

## 🚀 Funcionalidades Implementadas

1. **Sistema de Autenticação**
   - Login e Cadastro com validação
   - Gerenciamento de sessão com Zustand
   - Proteção de rotas

2. **Módulos Principais**
   - **Painel Institucional:** Métricas, atividades recentes e acesso rápido
   - **Central de Solicitações:** Gestão de solicitações acadêmicas com filtros
   - **Fluxo de Processos:** Visualização de workflow e timeline
   - **Assistente IA:** Chat com Gemini para suporte acadêmico
   - **Gestão de Usuários:** CRUD completo com React Query
   - **Perfil:** Informações do usuário, edição, mudança de senha, preferências

3. **Qualidade e CI/CD**
   - Husky & lint-staged
   - ESLint & Prettier
   - Tailwind CSS v4
   - React Query para gerenciamento de estado servidor

## 📁 Estrutura do Projeto

```
src/
├── app/           # Roteamento e configurações
├── components/    # Componentes reutilizáveis (UI)
├── features/      # Componentes por funcionalidade
├── hooks/         # Hooks personalizados (React Query)
├── layouts/       # Layouts (Sidebar, Navbar)
├── lib/          # Utilitários
├── pages/         # Páginas principais
├── services/     # Serviços externos (API, IA)
└── store/        # Gerenciamento de estado (Zustand)

docs/              # Schemas DynamoDB (disciplina AWS)
lambda/            # Funções Lambda (disciplina AWS)
```

## 🛠️ Tecnologias

- React 19, Vite 8, TypeScript
- Tailwind CSS v4
- Zustand (estado cliente)
- React Query (estado servidor)
- React Hook Form + Zod
- Google Gemini API
- JSON Server (API mock)

## 🚦 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
npm install
```

### Executando o Projeto

Abra **dois terminais**:

**Terminal 1 - Servidor API:**

```bash
npm run server
```

O servidorirá rodar em http://localhost:3001

**Terminal 2 - Frontend:**

```bash
npm run client
```

O frontendirá rodar em http://localhost:5173

### Credenciais de Teste

```
Email: helena.silva@ufersa.edu.br
Senha: 123456
```

## 📋 Rotas

- `/` - Painel Institucional
- `/solicitacoes` - Central de Solicitações
- `/processos` - Fluxo de Processos
- `/ai-assistente` - Assistente IA
- `/usuarios` - Gestão de Usuários (apenas admin)
- `/perfil` - Perfil do Usuário
- `/login` - Login
- `/cadastro` - Cadastro

## 🌐 Documentação AWS (Disciplina)

### Schemas DynamoDB

Localizados em `docs/`:

- `dynamodb-users.json` - Tabela de usuários
- `dynamodb-requests.json` - Tabela de solicitações
- `dynamodb-activities.json` - Tabela de atividades
- `dynamodb-preferences.json` - Tabela de preferências

### Funções Lambda

Localizadas em `lambda/`:

- `auth.js` - Login e autenticação
- `users.js` - CRUD de usuários
- `requests.js` - CRUD de solicitações
- `activities.js` - Gestão de atividades
- `preferences.js` - Preferências do usuário

## ✅ Validações

- [x] Login e persistência de sessão
- [x] Navegação entre todas as páginas
- [x] CRUD de usuários com React Query
- [x] Edição de perfil com dados da API
- [x] Mudança de senha
- [x] Preferências do usuário
- [x] Integração com Gemini AI
- [x] Interface em Português (PT-BR)
- [x] Design System SIFU/UFERSA

---

© 2024-2026 SIFU - UFERSA. Todos os direitos reservados.
