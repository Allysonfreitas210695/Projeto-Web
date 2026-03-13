# Walkthrough do Projeto MVP Acadêmico

Este documento resume a implementação do projeto MVP Acadêmico, destacando os principais recursos, decisões de arquitetura e validação.

## 🚀 O que foi realizado

1.  **Inicialização do Projeto:**
    - Configurado projeto Vite com React e TypeScript.
    - Arquitetura baseada em funcionalidades (`features/`, `services/`, `layouts/`).
    - Configuração do **Tailwind CSS v4** com o plugin oficial do Vite para máximo desempenho.

2.  **Sistema de Autenticação:**
    - Página de Login com design moderno.
    - Gerenciamento de estado global com **Zustand** e persistência em `localStorage`.
    - Proteção de rotas com componente `ProtectedRoute`.

3.  **Módulos Principais:**
    - **Dashboard:** Métricas do sistema e visão geral.
    - **Ferramentas de IA:** Interface para interação com serviços de IA (simulado via serviço dedicado).
    - **Gestão de Usuários:** CRUD completo (adicionar e remover) com validação de formulários via **Zod** e **React Hook Form**.

4.  **Integração de Qualidade e CI/CD:**
    - **Husky & lint-staged:** Garantia de código limpo antes de cada commit.
    - **Commitlint:** Padronização de mensagens de commit seguindo a convenção semântica.
    - **ESLint & Prettier:** Padronização de estilo de código.

## 📁 Estrutura do Projeto

```text
src/
├── app/          # Roteamento e configurações globais
├── features/     # Componentes específicos por funcionalidade (ex: Usuários)
├── layouts/      # Estruturas de página (Sidebar, Navbar)
├── lib/          # Utilitários (ex: cn para Tailwind)
├── pages/        # Componentes de página de alto nível
├── services/     # Camada de API e serviços externos (IA)
└── store/        # Gerenciamento de estado (Auth)
```

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 19, Vite 8, TypeScript.
- **Estilo:** Tailwind CSS v4, Lucide React (ícones).
- **Estado:** Zustand (Auth), TanStack Query (Server State).
- **Formulários:** React Hook Form + Zod.
- **Qualidade:** Husky, Lint-staged, Commitlint, ESLint, Prettier.

## ✅ Validação

As seguintes verificações foram realizadas:

- [x] Login e persistência de sessão.
- [x] Navegação entre Dashboard, IA e Usuários.
- [x] Criação de usuários com validação de campos.
- [x] Simulação de resposta da IA com estado de carregamento.
- [x] Configuração de commits semânticos aprovada.
- [x] Interface totalmente traduzida para Português (PT-BR).
- [x] Configuração do Tailwind v4 validada.
