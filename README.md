# SIFU - Sistema Integrado de Fluxo Universitário

Este é o projeto acadêmico da UFERSA para gestão de processos institucionais com assistência de IA.

## 🚀Funcionalidades Implementadas

1. **Sistema de Autenticação**
   - Login e Cadastro com validação
   - Gerenciamento de sessão com Zustand
   - Proteção de rotas

2. **Módulos Principais**
   - **Painel Institucional:** Métricas, atividades recentes e acesso rápido
   - **Central de Solicitações:** Gestão de solicitações acadêmicas com filtros
   - **Fluxo de Processos:** Visualização de workflow e timeline
   - **Assistente IA:** Chat com Gemini para suporte acadêmico
   - **Gestão de Usuários:** CRUD completo
   - **Perfil:** Informações do usuário

3. **Qualidade e CI/CD**
   - Husky & lint-staged
   - ESLint & Prettier
   - Tailwind CSS v4

## 📁 Estrutura do Projeto

```
src/
├── app/           # Roteamento e configurações
├── components/    # Componentes reutilizáveis
├── features/      # Componentes por funcionalidade
├── layouts/       # Layouts (Sidebar, Navbar)
├── lib/          # Utilitários
├── pages/         # Páginas principais
├── services/     # Serviços externos (IA)
└── store/        # Gerenciamento de estado
```

## 🛠️ Tecnologias

- React 19, Vite 8, TypeScript
- Tailwind CSS v4
- Zustand (estado)
- React Hook Form + Zod
- Google Gemini API
- Lucide React (ícones)

## 📋 Rotas

- `/` - Painel Institucional
- `/solicitacoes` - Central de Solicitações
- `/processos` - Fluxo de Processos
- `/ai-assistente` - Assistente IA
- `/usuarios` - Gestão de Usuários
- `/perfil` - Perfil do Usuário
- `/login` - Login
- `/cadastro` - Cadastro

## ✅ Validações

- [x] Login e persistência de sessão
- [x] Navegação entre todas as páginas
- [x] CRUD de usuários com validação
- [x] Integração com Gemini AI
- [x] Interface em Português (PT-BR)
- [x] Design System SIFU/UFERSA

---

© 2024-2026 SIFU - UFERSA. Todos os direitos reservados.
