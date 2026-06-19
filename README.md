# Prima — Guia Interativo de Opções

> Uma ferramenta educacional visual para aprender sobre o mercado de opções financeiras na B3.

**Prima** é um guia interativo que explica opções de forma prática — com simulações, visualizações e analogias do mundo real. Do conceito de CALL e PUT até as gregas, prêmio, assimetria e risco.

### Sobre o nome

**Prima** é a fusão de **Pri** (de prisma) + **ma** (de prêmio).  
Assim como um prisma decompõe a luz branca em cores, a Prima decompõe o prêmio de uma opção em seus componentes fundamentais — valor intrínseco, valor temporal, volatilidade, gregas — para que o investidor enxergue cada camada com clareza.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Radix-000000?logo=shadcnui)](https://ui.shadcn.com)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-2ea44f?logo=github)](https://filipelperes.github.io/prima/)

---

## Funcionalidades

### 📖 Introdução
- Conceito de opções com analogias interativas (apartamento, seguro, loteria)
- Decodificador de códigos B3 em tempo real
- Comparação com outros mercados (ações, futuros)

### 📈 CALL / 📉 PUT
- Simulador completo com sliders ajustáveis
- Cenários rápidos com 1 clique
- Resultado visual com lucro/prejuízo, status ITM/ATM/OTM
- Modo comprador e vendedor (PUT)

### 🔬 Gregas (Δ Θ V Γ)
- Visualização interativa de Delta, Theta, Vega e Gamma
- Gráfico de decaimento temporal (Theta decay)
- Indicador dos 3 inimigos do comprador

### 💰 Prêmio
- Decomposição entre valor intrínseco e temporal
- Simulador de volatilidade implícita vs realizada
- Explicação da fórmula Black-Scholes

### 🎲 Assimetria
- Modelo "não precisa acertar sempre" (Tio Huli)
- Visualização de operações em grid
- Calculadora de payoff assimétrico

### ⚠️ Riscos
- Hierarquia completa de risco (do mais ao menos seguro)
- Explicação de margem de garantia e margin call
- Ciclo de vida de uma opção

### 🧩 Estratégias
- Covered Call, Protective Put, Collar, Cash Secured Put
- Tabela comparativa das estratégias
- Exemplos práticos com cenários reais

### 🔧 Montador B3
- Codificador/decodificador de códigos de opções da B3
- Exemplos rápidos (PETRH21, VALEK42, etc.)
- Tabela de referência das séries (A–L para CALL, M–X para PUT)

### 🌎 Global
- Panorama dos mercados de opções pelo mundo
- Termos internacionais vs Brasil
- Onde estudar opções (CBOE, Eurex, OIC, etc.)

---

## Stack

| Tecnologia | Versão |
|---|---|
| [Vite](https://vitejs.dev/) | 8.x |
| [React](https://react.dev/) | 19.x |
| [TypeScript](https://www.typescriptlang.org/) | 6.x |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x |
| [shadcn/ui](https://ui.shadcn.com/) | Componentes base |
| [gh-pages](https://github.com/tschaub/gh-pages) | Deploy |

---

## Arquitetura

```
src/
├── components/
│   ├── atoms/           # Button, Tag, SliderControl, GlossItem...
│   ├── molecules/       # TabBar, SearchDialog, ResultBox, GreekGrid...
│   └── organisms/       # IntroTab, CallTab, PutTab, GlobalTab...
├── data/                # Dados estáticos (analogias, decoder, hierarchy)
├── hooks/               # Custom hooks de simulação (useCallSimulation, usePutSimulation...)
├── lib/                 # Utilitários (formatters, utils, tipos globais)
├── App.tsx              # Entry point
└── main.tsx             # Bootstrap
```

### Princípios
- **Atomic Design** combinado com **Bulletproof React**
- Um componente = uma responsabilidade (SRP)
- Máximo 15 linhas por função ou handler
- Lógica extraída para hooks customizados
- Tipagem forte — sem `any`, prefira `unknown` com narrowing

---

## Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/filipelperes/prima.git
cd prima

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Deploy

O projeto usa GitHub Pages para publicação:

```bash
npm run deploy
```

Isso executa `npm run build` seguido de `gh-pages -d dist`, publicando no branch `gh-pages`.

---

## Links

- 🌐 **Site**: [filipelperes.github.io/prima](https://filipelperes.github.io/prima/)
- 📦 **Repo**: [github.com/filipelperes/prima](https://github.com/filipelperes/prima)

---

<p align="center">
  <strong>Prima</strong> — Guia educacional · Não é recomendação de investimento · B3 · Mercado de Opções
</p>
