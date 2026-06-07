export type OptionType = 'CALL' | 'PUT';

export interface MontadorExample {
  readonly code: string;
  readonly asset: string;
  readonly type: OptionType;
  readonly month: string;
  readonly strike: number;
}

export const ASSET_NAMES: Record<string, string> = {
  PETR: 'Petrobras PN',
  VALE: 'Vale ON',
  ITUB: 'Itaú Unibanco',
  BBDC: 'Bradesco',
  ABEV: 'Ambev',
  BBAS: 'Banco do Brasil',
  ELET: 'Eletrobras',
  SANB: 'Santander',
  B3SA: 'B3',
  WEGE: 'WEG',
  RENT: 'Localiza',
  JBSS: 'JBS',
  SUZB: 'Suzano',
  CMIN: 'CSN Mineração',
  UGPA: 'Ultrapar',
  RDOR: "Rede D'Or",
  HAPV: 'Hapvida',
  ENGI: 'Engie',
  EQTL: 'Equatorial',
  CPLE: 'Copel',
  PRIO: 'PetroRio',
  RECV: 'PetroRecôncavo',
  CXSE: 'Caixa Seguridade',
  ENEV: 'Eneva',
  LOGG: 'Log-In',
  IRBR: 'IRB Brasil',
  MULT: 'Multiplan',
  NTCO: 'Natura',
  RAIL: 'Rumo Logística',
  BRAP: 'Bradespar',
  BRFS: 'BRF',
  CSAN: 'Cosan',
  CPFE: 'CPFL Energia',
  EGIE: 'Engie Brasil',
  FLRY: 'Fleury',
  GGBR: 'Gerdau',
  GOAU: 'Gerdau Met',
  HYPE: 'Hypera',
  KLBN: 'Klabin',
  LREN: 'Lojas Renner',
  MRFG: 'Marfrig',
  MRVE: 'MRV',
  RADL: 'Raia Drogasil',
  RRRP: '3R Petroleum',
  SBSP: 'Sabesp',
  TAEE: 'Taesa',
  TIMB: 'Tim',
  TOTS: 'TOTVS',
  USIM: 'Usiminas',
  VIVT: 'Telefônica Brasil',
  YDUQ: 'Yduqs',
  AZUL: 'Azul',
  CVCB: 'CVC',
  GOLL: 'Gol',
  MGLU: 'Magazine Luiza',
  VIIA: 'Via',
  AMER: 'Americanas',
  BOVA: 'BOVA11',
  IVVB: 'IVVB11',
  SMAL: 'SMAL11',
  MATB: 'MATB11',
  SPXI: 'SPXI11',
};

export const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
] as const;

export const CALL_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'] as const;
export const PUT_LETTERS = ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'] as const;

export const EXAMPLES_RAPIDOS: readonly MontadorExample[] = [
  { code: 'PETRH21', asset: 'PETR', type: 'CALL', month: 'Agosto', strike: 21 },
  { code: 'VALEK42', asset: 'VALE', type: 'CALL', month: 'Novembro', strike: 42 },
  { code: 'PETRM18', asset: 'PETR', type: 'PUT', month: 'Janeiro', strike: 18 },
  { code: 'ITUBM35', asset: 'ITUB', type: 'PUT', month: 'Janeiro', strike: 35 },
  { code: 'B3SAB11W1', asset: 'B3SA', type: 'CALL', month: 'Fevereiro', strike: 11 },
  { code: 'PETRC32W2', asset: 'PETR', type: 'CALL', month: 'Março', strike: 32 },
];

export function getSeriesLetter(type: OptionType, month: string): string {
  const idx = MONTHS.indexOf(month as (typeof MONTHS)[number]);
  if (idx === -1) return '?';
  return type === 'CALL' ? CALL_LETTERS[idx] : PUT_LETTERS[idx];
}
