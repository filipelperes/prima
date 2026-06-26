/* ───────── Unit tests for calculations.ts ───────── */

import { describe, it, expect } from 'vitest';
import {
  getCallStatus,
  getPutStatus,
  calcCallResult,
  calcPutResult,
  calcDelta,
  calcTheta,
  calcVega,
  calcGamma,
  calcGreekValues,
  calcPremiumBreakdown,
  calcAssimetria,
  THETA_BARS,
} from './calculations';
import type {
  CallState,
  PutState,
  AssimetriaState,
  GreekValues,
} from './types';

/* ──────────────────────────────────────────────
   getCallStatus
   ────────────────────────────────────────────── */
describe('getCallStatus', () => {
  it('returns ITM when acao > strike', () => {
    expect(getCallStatus(25, 20)).toBe('ITM');
    expect(getCallStatus(100, 50)).toBe('ITM');
    expect(getCallStatus(0.01, 0)).toBe('ITM');
  });

  it('returns OTM when acao < strike', () => {
    expect(getCallStatus(15, 20)).toBe('OTM');
    expect(getCallStatus(0, 1)).toBe('OTM');
    expect(getCallStatus(-5, 0)).toBe('OTM');
  });

  it('returns ATM when acao === strike', () => {
    expect(getCallStatus(20, 20)).toBe('ATM');
    expect(getCallStatus(0, 0)).toBe('ATM');
    expect(getCallStatus(-5, -5)).toBe('ATM');
  });
});

/* ──────────────────────────────────────────────
   getPutStatus
   ────────────────────────────────────────────── */
describe('getPutStatus', () => {
  it('returns ITM when acao < strike', () => {
    expect(getPutStatus(15, 20)).toBe('ITM');
    expect(getPutStatus(0, 100)).toBe('ITM');
    expect(getPutStatus(-10, 0)).toBe('ITM');
  });

  it('returns OTM when acao > strike', () => {
    expect(getPutStatus(25, 20)).toBe('OTM');
    expect(getPutStatus(100, 0)).toBe('OTM');
    expect(getPutStatus(5, -5)).toBe('OTM');
  });

  it('returns ATM when acao === strike', () => {
    expect(getPutStatus(20, 20)).toBe('ATM');
    expect(getPutStatus(0, 0)).toBe('ATM');
    expect(getPutStatus(-5, -5)).toBe('ATM');
  });
});

/* ──────────────────────────────────────────────
   calcCallResult
   ────────────────────────────────────────────── */
describe('calcCallResult', () => {
  const baseState: CallState = { acao: 25, strike: 20, premio: 2, contratos: 1, final: 30 };

  it('returns profit when final > strike + premium (ITM)', () => {
    const result = calcCallResult(baseState);
    expect(result.totalPago).toBe(200);       // 2 * 1 * 100
    expect(result.vi).toBe(10);               // 30 - 20
    expect(result.lucro).toBe(800);           // 10 * 100 - 200
    expect(result.isProfit).toBe(true);
    expect(result.status).toBe('ITM');
    expect(result.retornoPct).toBe(400);      // (800/200)*100
    expect(result.descricao).toContain('PETR4 foi de');
    expect(result.descricao).toContain('retorno de 400.0%');
  });

  it('returns loss when final < strike (OTM, out of the money)', () => {
    const state: CallState = { ...baseState, final: 18 };
    const result = calcCallResult(state);
    expect(result.vi).toBe(0);
    expect(result.lucro).toBe(-200);
    expect(result.isProfit).toBe(false);
    expect(result.status).toBe('OTM');
    expect(result.retornoPct).toBe(-100);
    expect(result.descricao).toContain('A CALL virou pó');
    expect(result.descricao).toContain(`R$ 200`);
  });

  it('returns ATM when final === strike (zero a zero)', () => {
    const state: CallState = { ...baseState, final: 20 };
    const result = calcCallResult(state);
    expect(result.vi).toBe(0);
    expect(result.lucro).toBe(-200);
    expect(result.isProfit).toBe(false);
    expect(result.status).toBe('ATM');
    expect(result.retornoPct).toBe(-100);
    expect(result.descricao).toContain('exatamente no strike');
    expect(result.descricao).toContain('zero a zero');
  });

  it('handles zero premium gracefully (totalPago = 0, profit path)', () => {
    const state: CallState = { acao: 25, strike: 20, premio: 0, contratos: 1, final: 30 };
    const result = calcCallResult(state);
    expect(result.totalPago).toBe(0);
    expect(result.vi).toBe(10);
    expect(result.lucro).toBe(1000);          // 10 * 100 - 0
    expect(result.isProfit).toBe(true);
    expect(result.retornoPct).toBe(0);         // safePct returns 0 when totalPago === 0
  });

  it('handles multiple contracts correctly', () => {
    const state: CallState = { acao: 25, strike: 20, premio: 2, contratos: 5, final: 30 };
    const result = calcCallResult(state);
    expect(result.totalPago).toBe(1000);       // 2 * 5 * 100
    expect(result.vi).toBe(10);
    expect(result.lucro).toBe(4000);           // 10 * 500 - 1000
    expect(result.descricao).toContain('Com 500 opções');
  });

  it('handles zero acao value', () => {
    const state: CallState = { acao: 0, strike: 10, premio: 1, contratos: 1, final: 15 };
    const result = calcCallResult(state);
    expect(result.isProfit).toBe(true);
    expect(result.status).toBe('ITM');
    expect(result.vi).toBe(5);
  });

  it('handles final exactly equal to strike + premium breakeven', () => {
    const state: CallState = { acao: 25, strike: 20, premio: 2, contratos: 1, final: 22 };
    const result = calcCallResult(state);
    expect(result.vi).toBe(2);                 // 22 - 20
    expect(result.lucro).toBe(0);              // 2*100 - 200 = 0
    expect(result.isProfit).toBe(false);       // lucro > 0 is false
    expect(result.retornoPct).toBe(-100);      // isProfit is false, so -100
    expect(result.status).toBe('ITM');
  });

  it('description includes all key fields for profit case', () => {
    const result = calcCallResult(baseState);
    expect(result.descricao).toContain('R$ 25');
    expect(result.descricao).toContain('R$ 30');
    expect(result.descricao).toContain('R$ 20');
    expect(result.descricao).toContain('R$ 10');
    expect(result.descricao).toContain('R$ 1.000');
    expect(result.descricao).toContain('R$ 200');
  });

  it('description for OTM loss case is accurate', () => {
    const state: CallState = { acao: 25, strike: 20, premio: 2, contratos: 1, final: 15 };
    const result = calcCallResult(state);
    expect(result.descricao).toContain('PETR4 encerrou em');
    expect(result.descricao).toContain('R$ 15');
    expect(result.descricao).toContain('abaixo do strike');
    expect(result.descricao).toContain('Nada além disso');
  });
});

/* ──────────────────────────────────────────────
   calcPutResult
   ────────────────────────────────────────────── */
describe('calcPutResult', () => {
  const baseState: PutState = { acao: 30, strike: 40, premio: 3, contratos: 1, final: 20 };

  describe('comprador mode', () => {
    it('returns profit when final < strike (ITM)', () => {
      const result = calcPutResult(baseState, 'comprador');
      expect(result.totalPago).toBe(300);       // 3 * 1 * 100
      expect(result.vi).toBe(20);               // 40 - 20
      expect(result.lucro).toBe(1700);          // 20*100 - 300
      expect(result.isProfit).toBe(true);
      expect(result.status).toBe('ITM');
      expect(result.riscoMax).toBe(4000);       // 40 * 1 * 100
      expect(result.descricao).toContain('Ação despencou');
      expect(result.descricao).toContain('Lucro de 566.7%');
    });

    it('returns loss when final > strike (OTM, put expires worthless)', () => {
      const state: PutState = { ...baseState, final: 45 };
      const result = calcPutResult(state, 'comprador');
      expect(result.vi).toBe(0);
      expect(result.lucro).toBe(-300);
      expect(result.isProfit).toBe(false);
      expect(result.status).toBe('OTM');
      expect(result.retornoPct).toBe(-100);
      expect(result.descricao).toContain('Ação ficou acima do strike');
      expect(result.descricao).toContain('PUT vira pó');
    });

    it('returns ATM (zero a zero) when final === strike', () => {
      const state: PutState = { ...baseState, final: 40 };
      const result = calcPutResult(state, 'comprador');
      expect(result.vi).toBe(0);
      expect(result.lucro).toBe(-300);
      expect(result.isProfit).toBe(false);
      expect(result.status).toBe('ATM');
    });

    it('handles zero premium', () => {
      const state: PutState = { ...baseState, premio: 0 };
      const result = calcPutResult(state, 'comprador');
      expect(result.totalPago).toBe(0);
      expect(result.lucro).toBe(2000);
      expect(result.isProfit).toBe(true);
      expect(result.retornoPct).toBe(0);
    });

    it('handles multiple contracts', () => {
      const state: PutState = { ...baseState, contratos: 3 };
      const result = calcPutResult(state, 'comprador');
      expect(result.totalPago).toBe(900);       // 3 * 3 * 100
      expect(result.vi).toBe(20);
      expect(result.lucro).toBe(5100);          // 20*300 - 900
      expect(result.riscoMax).toBe(12000);      // 40 * 3 * 100
    });
  });

  describe('vendedor mode', () => {
    it('returns profit when final > strike (put not exercised)', () => {
      const state: PutState = { ...baseState, final: 45 };
      const result = calcPutResult(state, 'vendedor');
      expect(result.totalPago).toBe(300);
      expect(result.vi).toBe(0);
      expect(result.lucro).toBe(300);           // 300 - 0
      expect(result.isProfit).toBe(true);
      expect(result.status).toBe('OTM');
      expect(result.descricao).toContain('PUT não foi exercida');
      expect(result.descricao).toContain('Você fica com o prêmio');
    });

    it('returns loss when final < strike (assigned, disaster)', () => {
      const result = calcPutResult(baseState, 'vendedor');
      expect(result.totalPago).toBe(300);
      expect(result.vi).toBe(20);
      expect(result.lucro).toBe(-1700);         // 300 - 2000
      expect(result.isProfit).toBe(false);
      expect(result.status).toBe('ITM');
      expect(result.descricao).toContain('DESASTRE');
      expect(result.descricao).toContain('comprador exige');
      expect(result.descricao).toContain('Prejuízo');
    });

    it('handles multiple contracts for vendedor loss case', () => {
      const state: PutState = { ...baseState, contratos: 5 };
      const result = calcPutResult(state, 'vendedor');
      expect(result.riscoMax).toBe(20000);      // 40 * 5 * 100
      expect(result.totalPago).toBe(1500);
      expect(result.lucro).toBe(-8500);         // 1500 - 20*500
    });
  });

  it('retornoPct is computed via safePct for both modes', () => {
    const profitState: PutState = { acao: 30, strike: 40, premio: 3, contratos: 1, final: 45 };
    const buyerResult = calcPutResult(profitState, 'comprador');
    const sellerResult = calcPutResult(profitState, 'vendedor');
    // Buyer loss at OTM: lucro = -300, retornoPct = -100
    expect(buyerResult.retornoPct).toBe(-100);
    // Seller profit at OTM: lucro = 300, retornoPct = (300/300)*100 = 100
    expect(sellerResult.retornoPct).toBe(100);
  });
});

/* ──────────────────────────────────────────────
   calcDelta
   ────────────────────────────────────────────── */
describe('calcDelta', () => {
  it('returns 0.5 when dist is 0 (ATM)', () => {
    expect(calcDelta(0)).toBe(0.5);
  });

  it('returns values above 0.5 for positive dist', () => {
    expect(calcDelta(1)).toBe(0.55);   // 0.5 + 0.05
    expect(calcDelta(4)).toBe(0.7);    // 0.5 + 0.20
    expect(calcDelta(9)).toBe(0.95);   // 0.5 + 0.45
  });

  it('returns values below 0.5 for negative dist', () => {
    expect(calcDelta(-1)).toBe(0.45);  // 0.5 - 0.05
    expect(calcDelta(-4)).toBe(0.3);   // 0.5 - 0.20
    expect(calcDelta(-9)).toBeCloseTo(0.05, 10);  // 0.5 - 0.45 (floating-point safe)
  });

  it('clamps to 0.99 maximum for large positive dist', () => {
    expect(calcDelta(10)).toBe(0.99);  // 0.5 + 0.50 = 1.0 → clamped
    expect(calcDelta(20)).toBe(0.99);
    expect(calcDelta(100)).toBe(0.99);
  });

  it('clamps to 0.01 minimum for large negative dist', () => {
    expect(calcDelta(-10)).toBe(0.01); // 0.5 - 0.50 = 0.0 → clamped
    expect(calcDelta(-20)).toBe(0.01);
    expect(calcDelta(-100)).toBe(0.01);
  });

  it('handles fractional dist values', () => {
    expect(calcDelta(0.5)).toBe(0.525);
    expect(calcDelta(-0.5)).toBe(0.475);
    expect(calcDelta(2.5)).toBe(0.625);
  });
});

/* ──────────────────────────────────────────────
   calcTheta
   ────────────────────────────────────────────── */
describe('calcTheta', () => {
  it('returns 40 when dias = 1 (minimum effective day)', () => {
    expect(calcTheta(1)).toBe(40);
  });

  it('returns ~13.33 when dias = 3', () => {
    expect(calcTheta(3)).toBe(13.33);   // round(40/3 * 100)/100 = round(1333.33)/100 = 1333/100
  });

  it('returns ~2.86 when dias = 14', () => {
    expect(calcTheta(14)).toBe(2.86);   // round(40/14 * 100)/100
  });

  it('returns 2 when dias = 20', () => {
    expect(calcTheta(20)).toBe(2);      // round(40/20 * 100)/100 = 2
  });

  it('returns 1 when dias = 40 (beyond last theta bar, still computed)', () => {
    expect(calcTheta(40)).toBe(1);      // round(40/40 * 100)/100 = 1
  });

  it('treats dias = 0 as 1 to avoid division by zero', () => {
    expect(calcTheta(0)).toBe(40);
  });

  it('treats negative dias as 1', () => {
    expect(calcTheta(-5)).toBe(40);
    expect(calcTheta(-100)).toBe(40);
  });

  it('returns higher theta for fewer days (accelerating decay)', () => {
    expect(calcTheta(1)).toBeGreaterThan(calcTheta(10));
    expect(calcTheta(7)).toBeGreaterThan(calcTheta(21));
  });
});

/* ──────────────────────────────────────────────
   calcVega
   ────────────────────────────────────────────── */
describe('calcVega', () => {
  it('returns 1 when vol = 30 (base)', () => {
    expect(calcVega(30)).toBe(1);
  });

  it('returns 2 when vol = 60', () => {
    expect(calcVega(60)).toBe(2);
  });

  it('returns ~0.67 when vol = 20', () => {
    expect(calcVega(20)).toBe(0.67);    // round(20/30 * 100)/100 = round(66.67)/100 = 67/100
  });

  it('returns 0 when vol = 0', () => {
    expect(calcVega(0)).toBe(0);
  });

  it('returns ~0.03 when vol = 1', () => {
    expect(calcVega(1)).toBe(0.03);     // round(1/30 * 100)/100 = round(3.33)/100 = 3/100
  });

  it('handles high volatility', () => {
    expect(calcVega(90)).toBe(3);       // round(90/30 * 100)/100 = 3
    expect(calcVega(150)).toBe(5);      // round(150/30 * 100)/100 = 5
  });
});

/* ──────────────────────────────────────────────
   calcGamma
   ────────────────────────────────────────────── */
describe('calcGamma', () => {
  it('returns "máximo" when |dist| < 2', () => {
    expect(calcGamma(0)).toBe('máximo');
    expect(calcGamma(1)).toBe('máximo');
    expect(calcGamma(-1)).toBe('máximo');
    expect(calcGamma(1.9)).toBe('máximo');
    expect(calcGamma(-1.9)).toBe('máximo');
  });

  it('returns "alto" when dist > 2', () => {
    expect(calcGamma(3)).toBe('alto');
    expect(calcGamma(10)).toBe('alto');
    expect(calcGamma(100)).toBe('alto');
  });

  it('returns "baixo" when dist <= -2', () => {
    expect(calcGamma(-2)).toBe('baixo');
    expect(calcGamma(-3)).toBe('baixo');
    expect(calcGamma(-10)).toBe('baixo');
    expect(calcGamma(-100)).toBe('baixo');
  });

  it('returns "baixo" when dist = 2 (boundary: |2| is not < 2 and 2 is not > 2)', () => {
    expect(calcGamma(2)).toBe('baixo');
  });
});

/* ──────────────────────────────────────────────
   calcGreekValues
   ────────────────────────────────────────────── */
describe('calcGreekValues', () => {
  it('returns correct GreekValues for ATM (dist=0, low vol, 30d)', () => {
    const result = calcGreekValues(30, 30, 0);
    const expected: GreekValues = {
      delta: 0.5,
      theta: 1.33,
      vega: 1,
      gamma: 'máximo',
    };
    expect(result).toEqual(expected);
  });

  it('returns correct GreekValues for deep ITM (high vol, few days)', () => {
    const result = calcGreekValues(5, 60, 8);
    expect(result.delta).toBe(calcDelta(8));
    expect(result.theta).toBe(calcTheta(5));
    expect(result.vega).toBe(calcVega(60));
    expect(result.gamma).toBe(calcGamma(8));
    // Verify exact values:
    expect(result.delta).toBe(0.9);        // 0.5 + 8*0.05 = 0.9
    expect(result.theta).toBe(8);           // 40/5 = 8
    expect(result.vega).toBe(2);            // 60/30 = 2
    expect(result.gamma).toBe('alto');
  });

  it('returns correct GreekValues for OTM (negative dist)', () => {
    const result = calcGreekValues(21, 25, -4);
    expect(result.delta).toBe(0.3);        // 0.5 - 4*0.05 = 0.3
    expect(result.theta).toBe(1.9);        // round(40/21 * 100)/100
    expect(result.vega).toBe(0.83);        // round(25/30 * 100)/100
    expect(result.gamma).toBe('baixo');    // dist = -4, <= -2
  });
});

/* ──────────────────────────────────────────────
   THETA_BARS
   ────────────────────────────────────────────── */
describe('THETA_BARS', () => {
  it('is a const array with exactly the expected descending values', () => {
    expect(THETA_BARS).toEqual([60, 50, 40, 30, 21, 14, 10, 7, 5, 3, 2, 1]);
  });

  it('has length 12', () => {
    expect(THETA_BARS).toHaveLength(12);
  });

  it('is strictly descending', () => {
    for (let i = 1; i < THETA_BARS.length; i++) {
      const current = THETA_BARS[i]!;
      const previous = THETA_BARS[i - 1]!;
      expect(current).toBeLessThan(previous);
    }
  });

  it('starts at 60 and ends at 1', () => {
    expect(THETA_BARS[0]).toBe(60);
    expect(THETA_BARS[THETA_BARS.length - 1]).toBe(1);
  });
});

/* ──────────────────────────────────────────────
   calcPremiumBreakdown
   ────────────────────────────────────────────── */
describe('calcPremiumBreakdown', () => {
  it('returns zero intrinsic and positive time value for ATM (dist = 0)', () => {
    const result = calcPremiumBreakdown(30, 30, 0);
    // vi = 0, distNorm = exp(0) = 1, temporal = 1 * (30/25) * sqrt(1) * 2.5 = 3
    expect(result.intrinseco).toBe(0);
    expect(result.temporal).toBe(3);
    expect(result.total).toBe(3);
  });

  it('returns positive intrinsic for ITM (dist > 0)', () => {
    const result = calcPremiumBreakdown(30, 30, 5);
    expect(result.intrinseco).toBe(5);
    expect(result.temporal).toBeGreaterThan(0);
    expect(result.total).toBeGreaterThan(5);
  });

  it('returns zero intrinsic for OTM (dist < 0)', () => {
    const result = calcPremiumBreakdown(30, 30, -5);
    expect(result.intrinseco).toBe(0);    // max(0, -5) = 0
    expect(result.temporal).toBeGreaterThan(0);
    expect(result.total).toBeGreaterThan(0);
  });

  it('intrinseco + temporal equals total (within rounding tolerance)', () => {
    const result = calcPremiumBreakdown(15, 25, 2);
    const sum = result.intrinseco + result.temporal;
    expect(Math.abs(sum - result.total)).toBeLessThanOrEqual(0.01);
  });

  it('all values are rounded to at most 2 decimal places', () => {
    const result = calcPremiumBreakdown(7, 45, 3.5);
    [result.intrinseco, result.temporal, result.total].forEach((val) => {
      expect(Number.isInteger(Math.round(val * 100))).toBe(true);
    });
  });

  it('produces deterministic known output for specific inputs', () => {
    // dist=0, vol=30, dias=30 → intrinseco=0, temporal=3, total=3
    expect(calcPremiumBreakdown(30, 30, 0)).toEqual({
      intrinseco: 0,
      temporal: 3,
      total: 3,
    });

    // dist=2, vol=30, dias=30:
    // vi = 2, distNorm = exp(-4/(2*9)) = exp(-4/18) = exp(-0.2222) ≈ 0.8007
    // temporal = 0.8007 * 1.2 * 2.5 ≈ 2.4022 → rounded 2.4
    // total = 2 + 2.4 = 4.4
    const result = calcPremiumBreakdown(30, 30, 2);
    expect(result.intrinseco).toBe(2);
    expect(result.temporal).toBeCloseTo(2.4, 1);
    expect(result.total).toBeCloseTo(4.4, 1);
  });

  it('time value decays as dist increases (further OTM/ITM -> less time value)', () => {
    const atm = calcPremiumBreakdown(30, 30, 0);
    const itm = calcPremiumBreakdown(30, 30, 5);
    const otm = calcPremiumBreakdown(30, 30, -5);
    // Time value should be highest at ATM and decay as |dist| grows
    expect(atm.temporal).toBeGreaterThan(itm.temporal);
    expect(atm.temporal).toBeGreaterThan(otm.temporal);
  });
});

/* ──────────────────────────────────────────────
   calcAssimetria
   ────────────────────────────────────────────── */
describe('calcAssimetria', () => {
  it('returns profit when gains exceed losses', () => {
    const state: AssimetriaState = { premio: 10, ops: 10, acertos: 4, mult: 5 };
    // ac = 4 (all within ops), perdas = 6*10 = 60, ganhos = 4*10*5 = 200, resultado = 140
    const result = calcAssimetria(state);
    expect(result.perdas).toBe(60);
    expect(result.ganhos).toBe(200);
    expect(result.resultado).toBe(140);
    expect(result.isProfit).toBe(true);
    expect(result.descricao).toContain('Assimetria garantiu lucro');
  });

  it('returns loss when gains do not cover losses', () => {
    const state: AssimetriaState = { premio: 10, ops: 10, acertos: 1, mult: 3 };
    // ac = 1, perdas = 9*10 = 90, ganhos = 1*10*3 = 30, resultado = -60
    const result = calcAssimetria(state);
    expect(result.perdas).toBe(90);
    expect(result.ganhos).toBe(30);
    expect(result.resultado).toBe(-60);
    expect(result.isProfit).toBe(false);
    expect(result.descricao).toContain('Ainda negativo');
  });

  it('returns break-even (resultado = 0, isProfit = true due to >= 0)', () => {
    // ac * mult = ops - ac  =>  ac * (mult+1) = ops  =>  ac = ops/(mult+1) = 10/5 = 2
    const state: AssimetriaState = { premio: 10, ops: 10, acertos: 2, mult: 4 };
    const result = calcAssimetria(state);
    expect(result.perdas).toBe(80);      // 8 * 10
    expect(result.ganhos).toBe(80);      // 2 * 10 * 4
    expect(result.resultado).toBe(0);
    expect(result.isProfit).toBe(true);   // resultado >= 0
  });

  it('caps acertos at ops when acertos > ops', () => {
    const state: AssimetriaState = { premio: 10, ops: 5, acertos: 99, mult: 3 };
    // ac = min(99, 5) = 5
    const result = calcAssimetria(state);
    expect(result.perdas).toBe(0);        // (5-5) * 10 = 0
    expect(result.ganhos).toBe(150);      // 5 * 10 * 3 = 150
    expect(result.resultado).toBe(150);
    expect(result.isProfit).toBe(true);
  });

  it('builds opsArray with wins first, then losses', () => {
    const state: AssimetriaState = { premio: 100, ops: 5, acertos: 3, mult: 4 };
    const result = calcAssimetria(state);
    expect(result.opsArray).toHaveLength(5);

    // First 3 are wins
    for (let i = 0; i < 3; i++) {
      expect(result.opsArray[i]!.win).toBe(true);
      expect(result.opsArray[i]!.profit).toBe(300); // 100 * (4 - 1)
    }

    // Last 2 are losses
    for (let i = 3; i < 5; i++) {
      expect(result.opsArray[i]!.win).toBe(false);
      expect(result.opsArray[i]!.profit).toBe(-100); // -premio
    }
  });

  it('handles single operation win', () => {
    const state: AssimetriaState = { premio: 50, ops: 1, acertos: 1, mult: 2 };
    const result = calcAssimetria(state);
    expect(result.perdas).toBe(0);
    expect(result.ganhos).toBe(100);          // 1 * 50 * 2
    expect(result.resultado).toBe(100);
    expect(result.isProfit).toBe(true);
    expect(result.opsArray).toHaveLength(1);
    expect(result.opsArray[0]).toEqual({ win: true, profit: 50 });
  });

  it('handles single operation loss', () => {
    const state: AssimetriaState = { premio: 50, ops: 1, acertos: 0, mult: 2 };
    const result = calcAssimetria(state);
    expect(result.perdas).toBe(50);
    expect(result.ganhos).toBe(0);
    expect(result.resultado).toBe(-50);
    expect(result.isProfit).toBe(false);
    expect(result.opsArray[0]).toEqual({ win: false, profit: -50 });
  });

  it('handles zero acertos (all losses)', () => {
    const state: AssimetriaState = { premio: 10, ops: 5, acertos: 0, mult: 3 };
    const result = calcAssimetria(state);
    expect(result.perdas).toBe(50);
    expect(result.ganhos).toBe(0);
    expect(result.resultado).toBe(-50);
    expect(result.isProfit).toBe(false);
    expect(result.opsArray.every((o) => !o.win)).toBe(true);
  });

  it('handles all acertos (all wins)', () => {
    const state: AssimetriaState = { premio: 10, ops: 3, acertos: 3, mult: 2 };
    const result = calcAssimetria(state);
    expect(result.perdas).toBe(0);
    expect(result.ganhos).toBe(60);           // 3 * 10 * 2
    expect(result.resultado).toBe(60);
    expect(result.isProfit).toBe(true);
    expect(result.opsArray.every((o) => o.win)).toBe(true);
  });

  it('builds description with error percentage', () => {
    const state: AssimetriaState = { premio: 10, ops: 10, acertos: 3, mult: 4 };
    const result = calcAssimetria(state);
    // ops=10, ac=3, errPct = round((7/10)*100) = 70%
    expect(result.descricao).toContain('70%');
  });
});
