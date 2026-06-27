/* ───────── Pure calculation functions for options ───────── */

import type {
  CallState,
  PutState,
  CallResult,
  PutResult,
  GreekValues,
  GammaLevel,
  PremiumBreakdown,
  AssimetriaState,
  AssimetriaResult,
  CallStatus,
  PutMode,
} from './types';
import { fmtFlex } from './formatters';

/* ── Helpers ── */

export function getCallStatus(acao: number, strike: number): CallStatus {
  if (acao > strike) return 'ITM';
  if (acao < strike) return 'OTM';
  return 'ATM';
}

export function getPutStatus(acao: number, strike: number): CallStatus {
  if (acao < strike) return 'ITM';
  if (acao > strike) return 'OTM';
  return 'ATM';
}

/* ── CALL Simulation ── */

function buildCallDescription(state: CallState, totalPago: number, vi: number, retornoPct: number, isProfit: boolean): string {
  if (isProfit) {
    return `PETR4 foi de ${fmtFlex(state.acao)} para ${fmtFlex(state.final)}. ` +
      `Sua CALL de strike ${fmtFlex(state.strike)} virou ITM. ` +
      `Cada opção vale ${fmtFlex(vi)} no vencimento. ` +
      `Com ${state.contratos * 100} opções você recebeu ${fmtFlex(vi * state.contratos * 100)} ` +
      `e pagou apenas ${fmtFlex(totalPago)} — retorno de ${retornoPct.toFixed(1)}%.`;
  }
  if (state.final === state.strike) {
    return `PETR4 fechou exatamente no strike ${fmtFlex(state.strike)}. ` +
      `Opção no zero a zero. Você perde os ${fmtFlex(totalPago)} do prêmio.`;
  }
  return `PETR4 encerrou em ${fmtFlex(state.final)}, abaixo do strike ${fmtFlex(state.strike)}. ` +
    `A CALL virou pó. Você perde os ${fmtFlex(totalPago)} do prêmio. Nada além disso.`;
}

function safePct(lucro: number, totalPago: number): number {
  return totalPago === 0 ? 0 : (lucro / totalPago) * 100;
}

export function calcCallResult(state: CallState): CallResult {
  const totalPago = state.premio * state.contratos * 100;
  const vi = Math.max(0, state.final - state.strike);
  const lucro = vi * state.contratos * 100 - totalPago;
  const isProfit = lucro > 0;
  const status = getCallStatus(state.final, state.strike);
  const retornoPct = isProfit ? safePct(lucro, totalPago) : -100;
  const descricao = buildCallDescription(state, totalPago, vi, retornoPct, isProfit);
  return { totalPago, vi, lucro, isProfit, status, retornoPct, descricao };
}

/* ── PUT Simulation ── */

function buildBuyerDescription(state: PutState, totalPago: number, vi: number, retornoPct: number, isProfit: boolean): string {
  if (isProfit) {
    return `Ação despencou para ${fmtFlex(state.final)}. Sua PUT de strike ${fmtFlex(state.strike)} ` +
      `está ITM. Cada opção vale ${fmtFlex(vi)}. ` +
      `Lucro de ${retornoPct.toFixed(1)}% sobre o prêmio pago.`;
  }
  return `Ação ficou acima do strike ${fmtFlex(state.strike)}. ` +
    `PUT vira pó. Você perde ${fmtFlex(totalPago)}.`;
}

function buildSellerDescription(state: PutState, totalPago: number, lucro: number, isProfit: boolean): string {
  if (isProfit) {
    return `Ação ficou acima do strike — PUT não foi exercida. ` +
      `Você fica com o prêmio de ${fmtFlex(totalPago)} no bolso.`;
  }
  return `DESASTRE. Ação foi a ${fmtFlex(state.final)}. ` +
    `O comprador exige que você compre ${state.contratos * 100} ações a ${fmtFlex(state.strike)} cada. ` +
    `Prejuízo: ${fmtFlex(Math.abs(lucro))}.`;
}

function buildPutDescription(state: PutState, totalPago: number, vi: number, lucro: number, retornoPct: number, isProfit: boolean, mode: PutMode): string {
  return mode === 'comprador'
    ? buildBuyerDescription(state, totalPago, vi, retornoPct, isProfit)
    : buildSellerDescription(state, totalPago, lucro, isProfit);
}

export function calcPutResult(state: PutState, mode: PutMode): PutResult {
  const totalPago = state.premio * state.contratos * 100;
  const vi = Math.max(0, state.strike - state.final);
  const riscoMax = state.strike * state.contratos * 100;

  const lucro = mode === 'comprador'
    ? vi * state.contratos * 100 - totalPago
    : totalPago - vi * state.contratos * 100;

  const isProfit = lucro > 0;
  const status = getPutStatus(state.final, state.strike);
  const retornoPct = safePct(lucro, totalPago);
  const descricao = buildPutDescription(state, totalPago, vi, lucro, retornoPct, isProfit, mode);
  return { totalPago, vi, lucro, isProfit, status, retornoPct, descricao, riscoMax };
}

/* ── Greeks ── */

export function calcDelta(dist: number): number {
  return Math.max(0.01, Math.min(0.99, 0.5 + dist * 0.05));
}

export function calcTheta(dias: number): number {
  return Math.round((40 / Math.max(dias, 1)) * 100) / 100;
}

export function calcVega(vol: number): number {
  return Math.round((vol / 30) * 100) / 100;
}

export function calcGamma(dist: number): GammaLevel {
  if (Math.abs(dist) < 2) return 'máximo';
  if (dist > 2) return 'alto';
  return 'baixo';
}

export function calcGreekValues(dias: number, vol: number, dist: number): GreekValues {
  return {
    delta: calcDelta(dist),
    theta: calcTheta(dias),
    vega: calcVega(vol),
    gamma: calcGamma(dist),
  };
}

export const THETA_BARS = [60, 50, 40, 30, 21, 14, 10, 7, 5, 3, 2, 1] as const;

/* ── Premium Breakdown ── */

export function calcPremiumBreakdown(dias: number, vol: number, dist: number): PremiumBreakdown {
  /* CALL perspective: dist > 0 = ITM. PUT would use Math.max(0, -dist) */
  const vi = Math.max(0, dist);
  const distNorm = Math.exp((-dist * dist) / (2 * Math.pow((vol / 30) * 3, 2)));
  const temporal = distNorm * (vol / 25) * Math.sqrt(dias / 30) * 2.5;
  return {
    intrinseco: vi,
    temporal: Math.round(temporal * 100) / 100,
    total: Math.round((vi + temporal) * 100) / 100,
  };
}

/* ── Assimetria ── */

function buildAssimetriaDescription(state: AssimetriaState, perdas: number, ganhos: number, ac: number, isProfit: boolean): string {
  const errPct = Math.round(((state.ops - ac) / state.ops) * 100);
  return `Em ${state.ops} operações, ${state.ops - ac} viraram pó — ` +
    `perdeu ${fmtFlex(perdas)}. Mas ${ac} explodiram com ${state.mult}x — ` +
    `ganhou ${fmtFlex(ganhos)}. ${isProfit ? `Assimetria garantiu lucro mesmo errando ${errPct}% das vezes.` : 'Ainda negativo. Aumente o multiplicador ou os acertos.'}`;
}

export function calcAssimetria(state: AssimetriaState): AssimetriaResult {
  const ac = Math.min(state.acertos, state.ops);
  const perdas = (state.ops - ac) * state.premio;
  const ganhos = ac * state.premio * state.mult;
  const resultado = ganhos - perdas;
  const isProfit = resultado >= 0;

  const opsArray = Array.from({ length: state.ops }, (_, i) => ({
    win: i < ac,
    profit: i < ac ? state.premio * (state.mult - 1) : -state.premio,
  }));

  const descricao = buildAssimetriaDescription(state, perdas, ganhos, ac, isProfit);
  return { perdas, ganhos, resultado, isProfit, opsArray, descricao };
}


