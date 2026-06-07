export interface MarketData {
  readonly emoji: string;
  readonly exchange: string;
  readonly description: string;
  readonly tagVariant: 'green' | 'red' | 'blue' | 'yellow' | 'purple' | 'accent';
  readonly tagLabel: string;
  readonly reference: string;
}

export interface TermRow {
  readonly concept: string;
  readonly brTerm: string;
  readonly usTerm: string;
}

export interface StudyLink {
  readonly name: string;
  readonly url: string;
  readonly description: string;
}

export const MARKETS_DATA: readonly MarketData[] = [
  {
    emoji: '🇺🇸',
    exchange: 'Estados Unidos — CBOE / NYSE / NASDAQ',
    description:
      'Maior mercado de opções do mundo. Casa do VIX, SPX, e das opções mais líquidas do planeta. Regulado pela SEC e CFTC.',
    tagVariant: 'blue',
    tagLabel: 'MAIOR MERCADO',
    reference:
      '📎 Ref: SEC + CBOE Rule Book (atualizado mai/2026). Regulação: SEC e CFTC. Clearing: OCC.',
  },
  {
    emoji: '🇪🇺',
    exchange: 'Europa — Eurex / Euronext',
    description:
      'Alemanha (Eurex), França, Holanda, Bélgica, Portugal (Euronext). Mais de 500 ações europeias com opções.',
    tagVariant: 'yellow',
    tagLabel: 'PAN-EUROPEU',
    reference:
      '📎 Ref: ESMA. Eurex Contract Specifications (mai/2026). Euronext Rule Book Book I (jun/2025).',
  },
  {
    emoji: '🇬🇧',
    exchange: 'Reino Unido — LSE',
    description:
      'London Stock Exchange. Opções sobre ações do FTSE 100. Foco institucional.',
    tagVariant: 'purple',
    tagLabel: 'LONDRES',
    reference:
      '📎 Ref: FCA. IDEM Trading Procedures. LSE Derivatives Documentation.',
  },
  {
    emoji: '🇯🇵',
    exchange: 'Japão — Osaka Exchange (OSE)',
    description:
      'Opções sobre Nikkei 225 e TOPIX. Fuso horário asiático.',
    tagVariant: 'green',
    tagLabel: 'ÁSIA',
    reference:
      '📎 Ref: JFSA. Osaka Exchange Nikkei 225 Options Contract Specs. JPX Rulebook.',
  },
  {
    emoji: '🇮🇳',
    exchange: 'Índia — NSE / BSE',
    description:
      'Maior volume de opções do mundo em contratos. Crescimento explosivo.',
    tagVariant: 'accent',
    tagLabel: 'MAIOR VOLUME',
    reference:
      '📎 Ref: SEBI. NSE Options Trading Manual. BSE Derivatives Rules & Regulations.',
  },
  {
    emoji: '🇨🇳',
    exchange: 'China — CFFEX / HKEX',
    description:
      'China Financial Futures Exchange + Hong Kong. Crescendo rapidamente.',
    tagVariant: 'yellow',
    tagLabel: 'CRESCENDO',
    reference:
      '📎 Ref: CSRC. CFFEX Trading Rules. HKEX Derivatives Market Rules.',
  },
  {
    emoji: '🇦🇺',
    exchange: 'Austrália — ASX',
    description:
      'Australian Securities Exchange. Mercado maduro com boas opções sobre ações e índices.',
    tagVariant: 'green',
    tagLabel: 'MADURO',
    reference:
      '📎 Ref: ASIC. ASX Derivatives Trading Procedures. ASX Clear.',
  },
  {
    emoji: '🇸🇬',
    exchange: 'Singapura — SGX',
    description:
      'Singapore Exchange. Opções sobre índices MSCI. Hub asiático de derivatives.',
    tagVariant: 'blue',
    tagLabel: 'HUB',
    reference:
      '📎 Ref: MAS. SGX Derivatives Trading Rules. SGX FTSE Index Options Specs.',
  },
  {
    emoji: '🇨🇦',
    exchange: 'Canadá — TMX / Montreal Exchange',
    description:
      'Opções sobre ações canadenses e commodities. Forte em energia e mineração.',
    tagVariant: 'yellow',
    tagLabel: 'COMMODITIES',
    reference:
      '📎 Ref: CSA. Montreal Exchange Options Rules. TMX Derivatives Manual.',
  },
  {
    emoji: '🇿🇦',
    exchange: 'África do Sul — JSE',
    description:
      'Johannesburg Stock Exchange. Maior mercado de derivatives da África.',
    tagVariant: 'purple',
    tagLabel: 'ÁFRICA',
    reference:
      '📎 Ref: FSCA. JSE Equity Derivatives Rules. JSE Clear.',
  },
] as const;

export const TERMS_TABLE: readonly TermRow[] = [
  { concept: 'Opção de Compra', brTerm: 'CALL', usTerm: 'Call Option' },
  { concept: 'Opção de Venda', brTerm: 'PUT', usTerm: 'Put Option' },
  { concept: 'Prêmio', brTerm: 'Prêmio', usTerm: 'Premium' },
  { concept: 'Preço de Exercício', brTerm: 'Strike', usTerm: 'Strike Price' },
  { concept: 'Lançador / Vendedor', brTerm: 'Lançador', usTerm: 'Writer / Seller' },
  { concept: 'Titular / Comprador', brTerm: 'Titular', usTerm: 'Holder / Buyer' },
  { concept: 'Lote Padrão', brTerm: '100 ações', usTerm: '100 shares' },
  { concept: 'Fora do Dinheiro', brTerm: 'OTM', usTerm: 'Out of the Money' },
  { concept: 'No Dinheiro', brTerm: 'ITM', usTerm: 'In the Money' },
  { concept: 'No Preço', brTerm: 'ATM', usTerm: 'At the Money' },
  { concept: 'Corretora', brTerm: 'Corretora', usTerm: 'Broker' },
  { concept: 'Bolsa', brTerm: 'B3', usTerm: 'Exchange (CBOE/NYSE)' },
] as const;

export const STUDY_LINKS: readonly StudyLink[] = [
  {
    name: 'CBOE',
    url: 'cboe.com',
    description: 'Rule Books, especificações FIX/BOE, FAQ',
  },
  {
    name: 'Eurex',
    url: 'eurex.com',
    description: 'Contract Specs, Trading Conditions, Circulars',
  },
  {
    name: 'Euronext',
    url: 'euronext.com',
    description: 'Rule Book, Trading Procedures, Notices',
  },
  {
    name: 'B3',
    url: 'b3.com.br',
    description: 'Regulamento de Negociação, Manual de Apreçamento, MPO',
  },
  {
    name: 'OIC',
    url: 'optionseducation.org',
    description: 'Guia de Estratégias, calculadoras, cursos gratuitos',
  },
  {
    name: 'FIA',
    url: 'fia.org',
    description: 'Estatísticas globais de derivativos, volumes mensais',
  },
] as const;
