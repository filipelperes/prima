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

interface ParsedComponents {
  assetCode: string;
  seriesLetter: string;
  strikeStr: string;
  weekNum: number | null;
}

/**
 * Tenta interpretar um código B3 (semanal ou padrão) e retorna seus
 * componentes brutos. Retorna `null` se o formato for inválido.
 */
function parseB3Code(code: string): ParsedComponents | null {
  const cleaned = code.trim().toUpperCase();
  if (cleaned.length < 6) return null;

  /* Detecta se o ativo tem 4 ou 5 letras:
   *   - Se cleaned[5] é uma letra de série válida → ativo de 5 letras
   *   - Caso contrário, exige que cleaned[4] seja uma letra de série → ativo de 4 letras
   */
  let assetLen = 4;
  if (cleaned.length > 5 && cleaned[5] in SERIES) {
    assetLen = 5;
  } else if (!(cleaned[4] in SERIES)) {
    return null;
  }

  const assetCode = cleaned.slice(0, assetLen);
  const seriesLetter = cleaned[assetLen];
  const rest = cleaned.slice(assetLen + 1);

  if (!(seriesLetter in SERIES)) return null;
  if (rest.length === 0) return null;

  /* Tenta padrão semanal: dígitos + W + semana (1, 2, 4 ou 5) */
  const weeklyMatch = rest.match(/^(\d+)W([1245])$/);
  if (weeklyMatch) {
    return {
      assetCode,
      seriesLetter,
      strikeStr: weeklyMatch[1],
      weekNum: parseInt(weeklyMatch[2], 10),
    };
  }

  /* Padrão normal (vencimento mensal) */
  return { assetCode, seriesLetter, strikeStr: rest, weekNum: null };
}

/** Converte componentes parseados em um DecodeResult. */
function buildResult(parsed: ParsedComponents, raw: string): DecodeResult | null {
  const series = SERIES[parsed.seriesLetter];
  const strikeNum = parseInt(parsed.strikeStr, 10);
  if (isNaN(strikeNum) || strikeNum <= 0) return null;

  const strike = parsed.strikeStr.length >= 4 ? strikeNum / 100 : strikeNum / 10;

  const assetDisplay =
    parsed.assetCode in ASSET_NAMES
      ? `${parsed.assetCode} (${ASSET_NAMES[parsed.assetCode]})`
      : parsed.assetCode;

  const result: DecodeResult = {
    asset: assetDisplay,
    type: series.type,
    month: series.month,
    monthNum: series.num,
    strike,
    raw,
  };

  if (parsed.weekNum !== null) {
    result.week = parsed.weekNum;
  }

  return result;
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

  /* 1 — Tentativa de decodificação direta */
  const direct = decodeB3(cleaned) ?? decodeB3Weekly(cleaned);
  if (direct) return [direct];

  const results: DecodeResult[] = [];

  /* 2 — Match parcial contra código ou nome do ativo */
  for (const [code, name] of Object.entries(ASSET_NAMES)) {
    if (code.includes(cleaned) || name.toUpperCase().includes(cleaned)) {
      for (const suffix of ['H21', 'M18', 'K42']) {
        const d = decodeB3(code + suffix);
        if (d && !results.some(r => r.raw === d.raw)) results.push(d);
      }
      if (results.length > 0) break; /* prioriza o primeiro match */
    }
  }

  /* 3 — Input como sufixo (ex: "H21" → PETRH21, VALEH21, …) */
  if (results.length === 0) {
    for (const [code] of Object.entries(ASSET_NAMES)) {
      const d = decodeB3(code + cleaned) ?? decodeB3Weekly(code + cleaned);
      if (d) {
        results.push(d);
        if (results.length >= 5) break;
      }
    }
  }

  return results;
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
