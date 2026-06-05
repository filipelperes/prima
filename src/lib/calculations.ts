/* ───────── Pure calculation functions for options ───────── */

import type {
  CallState,
  PutState,
  CallResult,
  PutResult,
  GreekValues,
  PremiumBreakdown,
  AssimetriaState,
  AssimetriaResult,
  CallStatus,
  PutMode,
} from './types';

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

export function calcCallResult(state: CallState): CallResult {
  const totalPago = state.premio * state.contratos * 100;
  const vi = Math.max(0, state.final - state.strike);
  const lucro = vi * state.contratos * 100 - totalPago;
  const isProfit = lucro > 0;
  const status = getCallStatus(state.final, state.strike);
  const retornoPct = isProfit ? (lucro / totalPago) * 100 : -100;

  let descricao: string;
  if (isProfit) {
    descricao = `PETR4 foi de ${fmtStr(state.acao)} para ${fmtStr(state.final)}. ` +
      `Sua CALL de strike ${fmtStr(state.strike)} virou ITM. ` +
      `Cada opção vale ${fmtStr(vi)} no vencimento. ` +
      `Com ${state.contratos * 100} opções você recebeu ${fmtStr(vi * state.contratos * 100)} ` +
      `e pagou apenas ${fmtStr(totalPago)} — retorno de ${retornoPct.toFixed(1)}%.`;
  } else if (state.final === state.strike) {
    descricao = `PETR4 fechou exatamente no strike ${fmtStr(state.strike)}. ` +
      `Opção no zero a zero. Você perde os ${fmtStr(totalPago)} do prêmio.`;
  } else {
    descricao = `PETR4 encerrou em ${fmtStr(state.final)}, abaixo do strike ${fmtStr(state.strike)}. ` +
      `A CALL virou pó. Você perde os ${fmtStr(totalPago)} do prêmio. Nada além disso.`;
  }

  return { totalPago, vi, lucro, isProfit, status, retornoPct, descricao };
}

/* ── PUT Simulation ── */

export function calcPutResult(state: PutState, mode: PutMode): PutResult {
  const totalPago = state.premio * state.contratos * 100;
  const vi = Math.max(0, state.strike - state.final);
  const riscoMax = state.strike * state.contratos * 100;

  let lucro: number;
  if (mode === 'comprador') {
    lucro = vi * state.contratos * 100 - totalPago;
  } else {
    lucro = totalPago - vi * state.contratos * 100;
  }

  const isProfit = lucro > 0;
  const status = getPutStatus(state.final, state.strike);

  const retornoPct = (lucro / totalPago) * 100;

  let descricao: string;
  if (mode === 'comprador') {
    if (isProfit) {
      descricao = `Ação despencou para ${fmtStr(state.final)}. Sua PUT de strike ${fmtStr(state.strike)} ` +
        `está ITM. Cada opção vale ${fmtStr(vi)}. ` +
        `Lucro de ${retornoPct.toFixed(1)}% sobre o prêmio pago.`;
    } else {
      descricao = `Ação ficou acima do strike ${fmtStr(state.strike)}. ` +
        `PUT vira pó. Você perde ${fmtStr(totalPago)}.`;
    }
  } else {
    if (isProfit) {
      descricao = `Ação ficou acima do strike — PUT não foi exercida. ` +
        `Você fica com o prêmio de ${fmtStr(totalPago)} no bolso.`;
    } else {
      descricao = `DESASTRE. Ação foi a ${fmtStr(state.final)}. ` +
        `O comprador exige que você compre ${state.contratos * 100} ações a ${fmtStr(state.strike)} cada. ` +
        `Prejuízo: ${fmtStr(Math.abs(lucro))}.`;
    }
  }

  return { totalPago, vi, lucro, isProfit, status, retornoPct, descricao, riscoMax };
}

/* ── Greeks ── */

export function calcDelta(dist: number): number {
  return Math.max(0.01, Math.min(0.99, 0.5 + dist * 0.05));
}

export function calcTheta(dias: number): number {
  return parseFloat((0.5 * (1 / Math.max(dias, 1)) * 80).toFixed(2));
}

export function calcVega(vol: number): string {
  return (vol / 30).toFixed(2);
}

export function calcGamma(dist: number): string {
  if (Math.abs(dist) < 2) return 'máximo';
  if (dist > 2) return 'alto';
  return 'baixo';
}

export function calcGreekValues(dias: number, vol: number, dist: number): GreekValues {
  return {
    delta: calcDelta(dist),
    theta: calcTheta(dias),
    vega: parseFloat(calcVega(vol)),
    gamma: calcGamma(dist),
  };
}

export function getThetaBarsData(): number[] {
  return [60, 50, 40, 30, 21, 14, 10, 7, 5, 3, 2, 1];
}

/* ── Premium Breakdown ── */

export function calcPremiumBreakdown(dias: number, vol: number, dist: number): PremiumBreakdown {
  /* CALL perspective: dist > 0 = ITM. PUT would use Math.max(0, -dist) */
  const vi = Math.max(0, dist);
  const distNorm = Math.exp((-dist * dist) / (2 * Math.pow((vol / 30) * 3, 2)));
  const temporal = distNorm * (vol / 25) * Math.sqrt(dias / 30) * 2.5;
  return {
    intrinseco: vi,
    temporal: parseFloat(temporal.toFixed(2)),
    total: parseFloat((vi + temporal).toFixed(2)),
  };
}

/* ── Assimetria ── */

export function calcAssimetria(state: AssimetriaState): AssimetriaResult {
  const ac = Math.min(state.acertos, state.ops);
  const perdas = (state.ops - ac) * state.premio;
  const ganhos = ac * state.premio * state.mult;
  const resultado = ganhos - perdas;
  const isProfit = resultado >= 0;

  const opsArray = Array.from({ length: state.ops }, (_, i) => {
    const isW = i < ac;
    return {
      win: isW,
      profit: isW ? state.premio * (state.mult - 1) : -state.premio,
    };
  });

  const descricao = `Em ${state.ops} operações, ${state.ops - ac} viraram pó — ` +
    `perdeu ${fmtStr(perdas)}. Mas ${ac} explodiram com ${state.mult}x — ` +
    `ganhou ${fmtStr(ganhos)}. ${isProfit ? `Assimetria garantiu lucro mesmo errando ${Math.round(((state.ops - ac) / state.ops) * 100)}% das vezes.` : 'Ainda negativo. Aumente o multiplicador ou os acertos.'}`;

  return { perdas, ganhos, resultado, isProfit, opsArray, descricao };
}

/* ── Private helper ── */

function fmtStr(valor: number): string {
  return 'R$ ' + valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
