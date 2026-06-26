import { ASSET_NAMES as ASSET_MAP } from '@/data/assetCodes';

export type OptionType = 'CALL' | 'PUT';

export interface MontadorExample {
  readonly code: string;
  readonly asset: string;
  readonly type: OptionType;
  readonly month: string;
  readonly strike: number;
}

/** Re-exporta para uso nos componentes do montador */
export const ASSET_NAMES = ASSET_MAP;

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
