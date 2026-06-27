// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCallSimulation } from './useCallSimulation';
import { fmtFlex } from '@/lib/formatters';

describe('useCallSimulation', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useCallSimulation());
    expect(result.current.state.acao).toBe(38);
    expect(result.current.state.strike).toBe(40);
    expect(result.current.state.premio).toBe(0.8);
    expect(result.current.state.contratos).toBe(10);
    expect(result.current.state.final).toBe(38);
  });

  it('computes initial result', () => {
    const { result } = renderHook(() => useCallSimulation());
    // acao=38, strike=40, premio=0.8, contratos=10, final=38
    // totalPago = 0.8 * 10 * 100 = 800
    // vi = max(0, 38-40) = 0
    // lucro = 0 - 800 = -800
    expect(result.current.result.totalPago).toBe(800);
    expect(result.current.result.vi).toBe(0);
    expect(result.current.result.lucro).toBe(-800);
    expect(result.current.result.isProfit).toBe(false);
    expect(result.current.result.status).toBe('OTM');
    expect(result.current.result.retornoPct).toBe(-100);
  });

  it('updates a single field via updateField', () => {
    const { result } = renderHook(() => useCallSimulation());
    act(() => {
      result.current.updateField('strike', 35);
    });
    expect(result.current.state.strike).toBe(35);
    // acao=38 > strike=35 → agora ITM
    expect(result.current.result.status).toBe('ITM');
  });

  it('updates the final price via setFinal', () => {
    const { result } = renderHook(() => useCallSimulation());
    act(() => {
      result.current.setFinal(46);
    });
    expect(result.current.state.final).toBe(46);
    // final=46, strike=40 → vi = 6, lucro = 6*10*100 - 800 = 5200
    expect(result.current.result.vi).toBe(6);
    expect(result.current.result.isProfit).toBe(true);
    expect(result.current.result.status).toBe('ITM');
  });

  it('recomputes result when multiple fields change', () => {
    const { result } = renderHook(() => useCallSimulation());
    act(() => {
      result.current.updateField('acao', 50);
      result.current.updateField('strike', 45);
      result.current.updateField('premio', 2);
      result.current.updateField('contratos', 5);
      result.current.setFinal(60);
    });
    // totalPago = 2 * 5 * 100 = 1000
    // vi = max(0, 60-45) = 15
    // lucro = 15*5*100 - 1000 = 7500 - 1000 = 6500
    expect(result.current.state.acao).toBe(50);
    expect(result.current.state.strike).toBe(45);
    expect(result.current.state.premio).toBe(2);
    expect(result.current.state.contratos).toBe(5);
    expect(result.current.state.final).toBe(60);
    expect(result.current.result.totalPago).toBe(1000);
    expect(result.current.result.vi).toBe(15);
    expect(result.current.result.lucro).toBe(6500);
    expect(result.current.result.isProfit).toBe(true);
  });

  it('returns loss when final is below strike (OTM)', () => {
    const { result } = renderHook(() => useCallSimulation());
    act(() => {
      result.current.setFinal(28);
    });
    expect(result.current.result.vi).toBe(0);
    expect(result.current.result.isProfit).toBe(false);
    expect(result.current.result.status).toBe('OTM');
  });

  it('returns ATM when final equals strike', () => {
    const { result } = renderHook(() => useCallSimulation());
    act(() => {
      result.current.setFinal(40);
    });
    expect(result.current.result.vi).toBe(0);
    expect(result.current.result.status).toBe('ATM');
    expect(result.current.result.isProfit).toBe(false);
  });

  it('description is generated for profit scenario', () => {
    const { result } = renderHook(() => useCallSimulation());
    act(() => {
      result.current.setFinal(54);
    });
    expect(result.current.result.descricao).toContain('PETR4 foi de');
    expect(result.current.result.descricao).toContain('retorno');
    expect(result.current.result.descricao).toContain(fmtFlex(54));
  });

  it('description is generated for OTM loss scenario', () => {
    const { result } = renderHook(() => useCallSimulation());
    act(() => {
      result.current.setFinal(28);
    });
    expect(result.current.result.descricao).toContain('A CALL virou pó');
  });
});
