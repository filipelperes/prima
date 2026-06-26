# agents.md

## Stack
- Vite + React + TypeScript + Tailwind CSS + shadcn/ui

## Princípio Norteador
> Toda decisão — arquitetura, componente, hook ou estilo — deve ser avaliada primeiro pelo seu impacto em **performance, desempenho, otimização e escalabilidade**. Em caso de empate entre "mais simples" e "mais performático/escalável", prioriza-se o segundo, desde que sem comprometer legibilidade.

## Arquitetura
**Atomic Design** combinado com **Bulletproof React**.

```
src/
├── assets/
├── components/
│   ├── atoms/        # Button, Input, Label, Badge...
│   ├── molecules/    # FormField, SearchBar, Card...
│   ├── organisms/    # Header, Sidebar, DataTable...
│   └── templates/    # PageLayout, AuthLayout...
├── features/         # Módulos por domínio (Bulletproof React)
│   └── [feature]/
│       ├── components/
│       ├── hooks/
│       ├── types/
│       └── index.ts
├── hooks/            # Hooks globais reutilizáveis
├── lib/              # Configurações de libs (ex: axios, queryClient)
├── pages/            # Rotas (apenas composição de templates + features)
├── types/            # Tipos globais
└── utils/            # Funções utilitárias puras
```

- Estrutura por `features/` favorece **code-splitting natural** (lazy load por domínio) e evita acoplamento que prejudica o crescimento do bundle.

## Regras

### Componentes
- Um componente = uma responsabilidade (SRP).
- Máximo **15 linhas** por função ou handler.
- Extraia lógica para hooks customizados quando o componente crescer.
- Exporte sempre pelo `index.ts` da pasta.
- Use **shadcn/ui** como base; estenda com Tailwind, nunca sobrescreva estilos inline.
- **Performance:**
  - `React.memo` em componentes que recebem props estáveis e renderizam em listas/loops.
  - Nunca crie objetos, arrays ou funções inline em props de componentes memoizados — use `useMemo`/`useCallback`.
  - Listas longas (>50 itens) exigem virtualização (`react-virtual`, `react-window`).
  - `lazy()` + `Suspense` para componentes pesados (modais, editores, gráficos) carregados condicionalmente.
  - Imagens: sempre com `width`/`height` explícitos e `loading="lazy"` para evitar layout shift e bloqueio de render.

### Hooks
- Prefixo `use` obrigatório.
- Cada hook resolve apenas uma preocupação.
- Máximo 15 linhas por função interna ao hook; extraia helpers para `utils/` se necessário.
- **Performance:**
  - Dependências de `useEffect`/`useMemo`/`useCallback` devem ser referencialmente estáveis (evite recriar objetos/arrays a cada render).
  - Cálculos custosos (filtragem, ordenação, agregação) sempre dentro de `useMemo`.
  - Hooks de dados (`useQuery`/`useSWR`) devem definir `staleTime`/cache adequados — nunca refetch desnecessário.
  - Debounce/throttle obrigatório em handlers de input de busca, scroll ou resize.

### Tipagem
- Sem `any`. Use `unknown` quando o tipo for incerto e faça narrowing.
- Props tipadas com `interface` (não `type`) para componentes React.
- Tipos de domínio ficam em `features/[feature]/types/`.
- Tipos amplos e bem definidos reduzem checagens em runtime e evitam re-renders por inferência incorreta.

### Estilo
- Classes Tailwind no JSX; sem CSS modules, sem styled-components.
- Variantes de componentes via `cva` (class-variance-authority) quando houver múltiplos estados visuais.
- Tokens de design centralizados no `tailwind.config.ts`.
- Evite classes condicionais geradas dinamicamente em runtime sem necessidade — prefira `cva` (resolve em build/estático) a concatenação de strings a cada render.

### Performance & Escalabilidade (transversal)
- **Bundle:** monitore tamanho com `vite-bundle-visualizer`; bibliotecas pesadas só via dynamic import.
- **Rotas:** todas as `pages/` usam `React.lazy` + `Suspense` no router.
- **Re-renders:** evite Context para estado que muda com frequência alta — prefira state managers granulares (Zustand/Jotai) ou colocation de estado.
- **Dados:** pagine ou pré-pagine listas vindas de API; nunca carregue coleções completas sem necessidade.
- **N+1 evitado:** consolide chamadas de API em `lib/` (ex: batch requests, cache de queryClient) ao invés de múltiplas chamadas por item renderizado.
- **Escalabilidade de código:** cada `feature/` deve ser independente o suficiente para ser removida ou substituída sem efeitos colaterais em outras features.
- Otimização prematura é evitada apenas quando custa legibilidade sem ganho medível — meça antes de otimizar (React DevTools Profiler, Lighthouse).

### Skills disponíveis
| Skill | Quando usar |
|---|---|
| `frontend-design` | Criar ou estilizar componentes e páginas |
| `file-reading` | Ler arquivos enviados pelo usuário |
| `docx` | Gerar documentos Word |
| `pdf` | Criar ou ler PDFs |
| `pptx` | Criar apresentações |
| `xlsx` | Criar ou ler planilhas |

### Qualidade
- Funções com mais de 15 linhas devem ser refatoradas — sem exceções.
- Sem lógica de negócio em componentes; use hooks ou `utils/`.
- Imports absolutos a partir de `src/` (configure em `tsconfig.json` com `paths`).
- Toda PR/feature nova deve justificar impacto em performance se tocar em listas, re-renders, bundle ou chamadas de rede.

## Exemplo de componente átomo
```tsx
// src/components/atoms/Button/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes } from 'react'
const button = cva('rounded font-medium transition-colors', {
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    },
    size: { sm: 'px-3 py-1 text-sm', md: 'px-4 py-2' },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})
interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}
export const Button = ({ variant, size, className, ...props }: ButtonProps) => (
  <button className={button({ variant, size, className })} {...props} />
)
```
```tsx
// src/components/atoms/Button/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button'
```

---

## TDD — Test Driven Development

> Ciclo obrigatório para `utils/`, `hooks/` e lógica de `features/*/hooks` (regras de negócio): **Red → Green → Refactor**. Nenhuma função nova nessas camadas é implementada antes de existir um teste que falhe descrevendo o comportamento esperado.

### Ciclo

1. **Red:** escreva o teste do comportamento (sem implementação ainda) e confirme que falha.
2. **Green:** implemente o mínimo necessário para o teste passar — sem otimizar ainda.
3. **Refactor:** limpe a implementação (extraia helpers, respeite o limite de 15 linhas) mantendo os testes verdes.

### Stack de Teste

- **Vitest** (nativo ao Vite, mais rápido que Jest neste setup) + **React Testing Library** + `@testing-library/user-event`.
- `msw` (Mock Service Worker) para mockar chamadas de API em testes de hooks/integração — nunca golpear API real ou mockar `axios` no nível de implementação.

### Estrutura de Testes

```
src/
  utils/
    formatCurrency.ts
    formatCurrency.test.ts
  hooks/
    useDebounce.ts
    useDebounce.test.ts
  features/
    auth/
      hooks/
        useLogin.ts
        useLogin.test.ts
      components/
        LoginForm.tsx
        LoginForm.test.tsx
```

- Teste sempre co-localizado ao lado do arquivo testado (`Nome.test.ts(x)`) — nunca em pasta `__tests__` separada.

### O que priorizar com TDD

| Camada                                  | Prioridade | Motivo                                                                          |
| ----------------------------------------- | ---------- | --------------------------------------------------------------------------------- |
| `utils/` (funções puras)                 | **Alta**   | Fáceis de testar, alto reuso, zero efeito colateral.                            |
| `features/*/hooks` (regras de negócio)   | **Alta**   | Onde a lógica de domínio mora — bug aqui é bug de produto.                      |
| `hooks/` globais (useDebounce, etc.)     | **Alta**   | Reutilizados em todo o app; regressão aqui afeta múltiplas features.            |
| `lib/` (config de axios, queryClient)    | **Média**  | Teste de interceptors, retry, cache key — não da infra externa em si.           |
| `components/` (atoms/molecules/organisms) | **Média**  | Teste de comportamento (render condicional, eventos), não snapshot de estilo.   |
| `pages/`                                  | **Baixa**  | Apenas composição; cobertura via teste de integração das features que compõe.   |

### Regras

- Sem `any` nos testes — mocks também são tipados.
- Teste o **comportamento observável** (o que o usuário vê/faz), nunca detalhe de implementação interna (evite inspecionar state interno; prefira `getByRole`/`getByText` e o retorno de hooks via `renderHook`).
- Nada de snapshot test como única cobertura — snapshot quebra a cada ajuste visual e não valida lógica.
- Toda chamada de rede em teste passa por `msw`, nunca por mock manual do client HTTP — garante que o teste valida o contrato real da requisição.
- Cobertura mínima sugerida: **80% em `utils/` e `features/*/hooks`**; componentes visuais sem meta rígida, priorize os com lógica condicional relevante (ex: estados de erro/loading de um form).
- PRs que tocam em `features/*/hooks` ou `utils/` sem teste novo/atualizado são tratados como incompletos.
