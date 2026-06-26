/* ───────── Types for Options Trading Simulator ───────── */

export type CallStatus = 'ITM' | 'ATM' | 'OTM';
export type PutMode = 'comprador' | 'vendedor';

export interface CallState {
  acao: number;
  strike: number;
  premio: number;
  contratos: number;
  final: number;
}

export interface PutState {
  acao: number;
  strike: number;
  premio: number;
  contratos: number;
  final: number;
}

export interface GreekState {
  dias: number;
  vol: number;
  dist: number;
}

export interface PremiumState {
  dias: number;
  vol: number;
  dist: number;
}

export interface AssimetriaState {
  premio: number;
  ops: number;
  acertos: number;
  mult: number;
}

export interface CallResult {
  totalPago: number;
  vi: number;
  lucro: number;
  isProfit: boolean;
  status: CallStatus;
  retornoPct: number;
  descricao: string;
}

export interface PutResult {
  totalPago: number;
  vi: number;
  lucro: number;
  isProfit: boolean;
  status: CallStatus;
  retornoPct: number;
  descricao: string;
  riscoMax: number;
}

export type GammaLevel = 'máximo' | 'alto' | 'baixo';

export interface GreekValues {
  delta: number;
  theta: number;
  vega: number;
  gamma: GammaLevel;
}

export interface PremiumBreakdown {
  intrinseco: number;
  temporal: number;
  total: number;
}

export interface AssimetriaResult {
  perdas: number;
  ganhos: number;
  resultado: number;
  isProfit: boolean;
  opsArray: Array<{ win: boolean; profit: number }>;
  descricao: string;
}

export interface Inimigo {
  label: string;
  val: number;
  color: string;
  desc: string;
}

export interface HierarchyItem {
  name: string;
  risk: string;
  riskPct: number;
  color: string;
  desc: string;
}

export interface GlossaryItem {
  term: string;
  tags: Array<{ t: string; c: string }>;
  def: string;
  analogy?: string;
}


