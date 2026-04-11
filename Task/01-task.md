Aqui vai um prompt bem estruturado pra você usar com seu agente (tipo IA de código), focado em **boas práticas + fluxo completo + sem integrações externas**, usando **React + Tailwind + shadcn/ui + Zustand**:

---

## 🚀 PROMPT PARA AGENTE

Você é um desenvolvedor sênior especialista em **React**, **arquitetura frontend moderna** e **boas práticas de engenharia de software**.

Sua tarefa é construir um sistema frontend completo, **sem integrações externas (usar dados mockados/local state)**, seguindo rigorosamente as diretrizes abaixo.

---

## 🧠 Stack obrigatória

* React (com Vite ou Next.js - preferir Vite se não precisar SSR)
* Tailwind CSS
* shadcn/ui (para componentes)
* Zustand (gerenciamento de estado global)

---

## 🏗️ Arquitetura e organização

Siga uma arquitetura escalável e organizada:

```
src/
 ├── app/
 ├── components/
 │    ├── ui/ (shadcn)
 │    ├── shared/
 ├── features/
 │    ├── auth/
 │    ├── dashboard/
 │    ├── entities/
 ├── hooks/
 ├── stores/ (zustand)
 ├── services/ (mock services)
 ├── utils/
 ├── types/
 ├── routes/
```

---

## 📌 Regras de desenvolvimento

### 1. Boas práticas obrigatórias

* Usar **componentização forte**
* Separar lógica de UI (hooks/custom hooks)
* Tipagem com TypeScript
* Código limpo (Clean Code)
* Evitar duplicação (DRY)
* Nomeação clara e sem abreviações
* Componentes pequenos e reutilizáveis

---

### 2. Gerenciamento de estado (Zustand)

* Criar stores bem organizadas por domínio
* Evitar lógica complexa dentro de componentes
* Separar actions e states
* Persistência opcional (localStorage)

Exemplo esperado:

```ts
interface AuthState {
  user: User | null;
  login: (data: LoginDTO) => void;
  logout: () => void;
}
```

---

### 3. Simulação de backend (SEM API REAL)

* Criar serviços mockados em `/services`

* Simular:

  * login
  * cadastro
  * listagem
  * criação/edição/exclusão

* Usar `setTimeout` para simular delay

---

### 4. UI/UX (shadcn + Tailwind)

* Layout moderno e responsivo
* Usar componentes do shadcn:

  * Button
  * Input
  * Card
  * Dialog
  * Toast
  * Table
* Seguir padrão consistente de espaçamento e cores

---

### 5. Rotas

* Criar sistema de rotas (React Router ou App Router)
* Implementar:

  * Rotas públicas
  * Rotas privadas (com proteção)

---

### 6. Fluxos obrigatórios

Implemente o fluxo completo:

### 🔐 Autenticação

* Login
* Logout
* Persistência de sessão
* Proteção de rotas

### 📊 Dashboard

* Página inicial após login
* Cards com dados mockados

### 📦 CRUD genérico

* Listagem
* Criação
* Edição
* Exclusão

---

### 7. Validação de formulários

* Usar boas práticas (React Hook Form opcional)
* Validação clara
* Feedback visual

---

### 8. Feedback de usuário

* Loading states
* Toasts de sucesso/erro
* Empty states

---

## 🧩 Padrões importantes

* Container vs Presentational components
* Hooks customizados para regras de negócio
* Services desacoplados
* Stores independentes por feature

---

## 🎯 Objetivo final

Gerar um sistema completo, funcional, organizado e escalável, que possa futuramente ser integrado com backend real sem grandes refatorações.

---

## ⚠️ Restrições

* NÃO usar backend real
* NÃO usar Firebase, Supabase ou APIs externas
* NÃO misturar lógica de negócio com UI
* NÃO criar código desorganizado ou monolítico

---

## 🧪 Extras (diferencial)

* Dark mode
* Persistência com Zustand
* Skeleton loading
* Componentes reutilizáveis avançados

---

Se quiser, posso adaptar esse prompt pro **seu sistema específico (tipo BarberAgenda, sistema de prefeitura, fila digital, etc.)**, já deixando ele MUITO mais poderoso pra gerar código pronto.
