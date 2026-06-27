/* ───────── B3 Options Code Decoder ─────────
 *
 * Formato: AAAA B NNN
 *   AAAA = código do ativo (4 letras, algumas exceções com 5)
 *   B    = letra da série: A-L para CALL (A=Jan, B=Fev…), M-X para PUT (M=Jan, N=Fev…)
 *   NNN  = número identificador do strike (NÃO é necessariamente o valor do strike)
 *
 * Opções semanais: AAAA B NNN W S
 *   W    = indicador de opção semanal
 *   S    = número da semana (1, 2, 4 ou 5)
 *
 * Exemplos:
 *   PETRH21   = Petrobras CALL, Agosto, strike ≈ R$ 21
 *   PETRM18   = Petrobras PUT,  Janeiro, strike ≈ R$ 18
 *   B3SAB11W1 = B3 CALL, semanal 1
 *   PETRC32W2 = Petrobras CALL, semanal 2
 */

import { ASSET_NAMES } from '@/data/assetCodes';

export interface DecodeResult {
  asset: string;
  type: 'CALL' | 'PUT';
  month: string;
  monthNum: number;
  strike: number;
  raw: string;
  /** Presente apenas para opções semanais (1, 2, 4 ou 5) */
  week?: number;
}

const EXAMPLE_SUFFIXES = ['H21', 'M18', 'K42'] as const;
const VALID_WEEK_VALUES = new Set([1, 2, 4, 5]);

const SERIES: Record<string, { type: 'CALL' | 'PUT'; month: string; num: number }> = {
  A: { type: 'CALL', month: 'Janeiro', num: 1 },
  B: { type: 'CALL', month: 'Fevereiro', num: 2 },
  C: { type: 'CALL', month: 'Março', num: 3 },
  D: { type: 'CALL', month: 'Abril', num: 4 },
  E: { type: 'CALL', month: 'Maio', num: 5 },
  F: { type: 'CALL', month: 'Junho', num: 6 },
  G: { type: 'CALL', month: 'Julho', num: 7 },
  H: { type: 'CALL', month: 'Agosto', num: 8 },
  I: { type: 'CALL', month: 'Setembro', num: 9 },
  J: { type: 'CALL', month: 'Outubro', num: 10 },
  K: { type: 'CALL', month: 'Novembro', num: 11 },
  L: { type: 'CALL', month: 'Dezembro', num: 12 },
  M: { type: 'PUT', month: 'Janeiro', num: 1 },
  N: { type: 'PUT', month: 'Fevereiro', num: 2 },
  O: { type: 'PUT', month: 'Março', num: 3 },
  P: { type: 'PUT', month: 'Abril', num: 4 },
  Q: { type: 'PUT', month: 'Maio', num: 5 },
  R: { type: 'PUT', month: 'Junho', num: 6 },
  S: { type: 'PUT', month: 'Julho', num: 7 },
  T: { type: 'PUT', month: 'Agosto', num: 8 },
  U: { type: 'PUT', month: 'Setembro', num: 9 },
  V: { type: 'PUT', month: 'Outubro', num: 10 },
  W: { type: 'PUT', month: 'Novembro', num: 11 },
  X: { type: 'PUT', month: 'Dezembro', num: 12 },
};

/* ─── Shared helpers ─── */

function isSeriesLetter(cleaned: string, index: number): boolean {
  return index < cleaned.length && (cleaned[index] ?? '') in SERIES;
}

function parseWeeklySuffix(rest: string): { strikeStr: string; weekNum: number } | null {
  const match = rest.match(/^(\d+)W([1245])$/);
  if (!match) return null;
  const weekNum = parseInt(match[2] ?? '', 10);
  if (!VALID_WEEK_VALUES.has(weekNum)) return null;
  return { strikeStr: match[1] ?? '', weekNum };
}

interface ParsedComponents {
  assetCode: string;
  seriesLetter: string;
  strikeStr: string;
  weekNum: number | null;
}

function determineAssetLen(cleaned: string): number {
  if (cleaned.length > 5 && isSeriesLetter(cleaned, 5)) return 5;
  return 4;
}

/**
 * Tenta interpretar um código B3 (semanal ou padrão) e retorna seus
 * componentes brutos. Retorna `null` se o formato for inválido.
 */
function parseB3Code(code: string): ParsedComponents | null {
  const cleaned = code.trim().toUpperCase();
  if (cleaned.length < 6) return null;

  const assetLen = determineAssetLen(cleaned);
  if (!isSeriesLetter(cleaned, assetLen)) return null;

  const assetCode = cleaned.slice(0, assetLen);
  const seriesLetter = cleaned[assetLen] ?? '';
  const rest = cleaned.slice(assetLen + 1);

  if (rest.length === 0) return null;

  const weekly = parseWeeklySuffix(rest);
  return weekly
    ? { assetCode, seriesLetter, strikeStr: weekly.strikeStr, weekNum: weekly.weekNum }
    : { assetCode, seriesLetter, strikeStr: rest, weekNum: null };
}

function parseStrike(strikeStr: string): number {
  const strikeNum = parseInt(strikeStr, 10);
  return strikeStr.length >= 4 ? strikeNum / 100 : strikeNum / 10;
}

function formatAssetName(assetCode: string): string {
  return assetCode in ASSET_NAMES
    ? `${assetCode} (${ASSET_NAMES[assetCode]})`
    : assetCode;
}

type SeriesEntry = { type: 'CALL' | 'PUT'; month: string; num: number };

function createDecodeResult(parsed: ParsedComponents, raw: string, series: SeriesEntry): DecodeResult {
  const result: DecodeResult = {
    asset: formatAssetName(parsed.assetCode),
    type: series.type,
    month: series.month,
    monthNum: series.num,
    strike: parseStrike(parsed.strikeStr),
    raw,
  };
  if (parsed.weekNum !== null) {
    result.week = parsed.weekNum;
  }
  return result;
}

/** Converte componentes parseados em um DecodeResult. */
function buildResult(parsed: ParsedComponents, raw: string): DecodeResult | null {
  const series = SERIES[parsed.seriesLetter];
  if (!series) return null;
  const strikeNum = parseInt(parsed.strikeStr, 10);
  if (isNaN(strikeNum) || strikeNum <= 0) return null;
  return createDecodeResult(parsed, raw, series);
}

/* ─── Public API ─── */

/**
 * Decodifica códigos de opções B3 **mensais** (formato padrão).
 * Retorna `null` para opções semanais ou códigos inválidos.
 */
export function decodeB3(code: string): DecodeResult | null {
  const parsed = parseB3Code(code);
  if (!parsed || parsed.weekNum !== null) return null;
  return buildResult(parsed, code.trim().toUpperCase());
}

/**
 * Decodifica códigos de **opções semanais** B3 (formato AAAA B NNN W S).
 * Retorna `null` para opções mensais ou códigos inválidos.
 *
 * Exemplos: B3SAB11W1, PETRC32W2, VALED45W4
 */
export function decodeB3Weekly(code: string): DecodeResult | null {
  const parsed = parseB3Code(code);
  if (!parsed || parsed.weekNum === null) return null;
  return buildResult(parsed, code.trim().toUpperCase());
}

function searchAssetSuffixes(code: string): DecodeResult[] {
  const results: DecodeResult[] = [];
  const seen = new Set<string>();
  for (const suffix of EXAMPLE_SUFFIXES) {
    const d = decodeB3(code + suffix);
    if (d && !seen.has(d.raw)) {
      seen.add(d.raw);
      results.push(d);
    }
  }
  return results;
}

function searchByAssetMatch(cleaned: string): DecodeResult[] {
  for (const [code, name] of Object.entries(ASSET_NAMES)) {
    if (code.includes(cleaned) || name.toUpperCase().includes(cleaned)) {
      const results = searchAssetSuffixes(code);
      if (results.length > 0) return results;
    }
  }
  return [];
}

function searchBySuffix(cleaned: string): DecodeResult[] {
  const results: DecodeResult[] = [];
  const seen = new Set<string>();

  for (const [code] of Object.entries(ASSET_NAMES)) {
    const d = decodeB3(code + cleaned) ?? decodeB3Weekly(code + cleaned);
    if (d && !seen.has(d.raw)) {
      seen.add(d.raw);
      results.push(d);
      if (results.length >= 5) break;
    }
  }
  return results;
}

/**
 * Busca inteligente com suporte a entrada parcial.
 *
 * 1. Tenta decodificar diretamente (mensal ou semanal).
 * 2. Se falhar, busca ativos cujo código ou nome contenham o input.
 * 3. Se ainda sem resultados, trata o input como sufixo (série+strike)
 *    e varre todos os ativos conhecidos.
 *
 * @returns Um array de DecodeResult com os resultados encontrados.
 */
export function smartSearch(input: string): DecodeResult[] {
  const cleaned = input.trim().toUpperCase();
  if (!cleaned) return [];

  const direct = decodeB3(cleaned) ?? decodeB3Weekly(cleaned);
  if (direct) return [direct];

  const assetResults = searchByAssetMatch(cleaned);
  if (assetResults.length > 0) return assetResults;

  return searchBySuffix(cleaned);
}

export const EXAMPLES = [
  { code: 'PETRH21', label: 'Petrobras CALL strike R$ 21 — Agosto' },
  { code: 'PETRM18', label: 'Petrobras PUT strike R$ 18 — Janeiro' },
  { code: 'VALEK42', label: 'Vale CALL strike R$ 42 — Novembro' },
  { code: 'ITUBM35', label: 'Itaú PUT strike R$ 35 — Janeiro' },
  { code: 'B3SAB11W1', label: 'B3 CALL strike B11 — Semanal 1' },
  { code: 'PETRC32W2', label: 'Petrobras CALL strike C32 — Semanal 2' },
  { code: 'BBDCM35', label: 'Bradesco PUT strike R$ 35 — Janeiro' },
] as const;
