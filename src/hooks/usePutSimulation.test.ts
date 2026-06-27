// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePutSimulation } from './usePutSimulation';

describe('usePutSimulation', () => {
  it('initializes with default state and comprador mode', () => {
    const { result } = renderHook(() => usePutSimulation());
    expect(result.current.state.acao).toBe(38);
    expect(result.current.state.strike).toBe(36);
    expect(result.current.state.premio).toBe(1.2);
    expect(result.current.state.contratos).toBe(10);
    expect(result.current.state.final).toBe(38);
    expect(result.current.mode).toBe('comprador');
  });

  it('computes initial result as comprador (OTM loss)', () => {
    const { result } = renderHook(() => usePutSimulation());
    // acao=38, strike=36, final=38 → vi = max(0, 36-38) = 0
    // totalPago = 1.2 * 10 * 100 = 1200
    // lucro = 0 - 1200 = -1200
    expect(result.current.result.totalPago).toBe(1200);
    expect(result.current.result.vi).toBe(0);
    expect(result.current.result.lucro).toBe(-1200);
    expect(result.current.result.isProfit).toBe(false);
    expect(result.current.result.status).toBe('OTM');
    expect(result.current.result.riscoMax).toBe(36 * 10 * 100);
  });

  it('switches to vendedor mode', () => {
    const { result } = renderHook(() => usePutSimulation());
    act(() => {
      result.current.setMode('vendedor');
    });
    expect(result.current.mode).toBe('vendedor');
  });

  it('vendedor profits when final > strike (OTM, not exercised)', () => {
    const { result } = renderHook(() => usePutSimulation());
    act(() => {
      result.current.setMode('vendedor');
    });
    // final=38 > strike=36 → OTM, not exercised
    // lucro = totalPago - 0 = 1200
    expect(result.current.result.isProfit).toBe(true);
    expect(result.current.result.lucro).toBe(1200);
    expect(result.current.result.status).toBe('OTM');
  });

  it('vendedor loses when final < strike (ITM, assigned)', () => {
    const { result } = renderHook(() => usePutSimulation());
    act(() => {
      result.current.setMode('vendedor');
      result.current.setFinal(20);
    });
    // final=20 < strike=36 → ITM
    // vi = 36-20 = 16
    // lucro = 1200 - 16*10*100 = 1200 - 16000 = -14800
    expect(result.current.result.vi).toBe(16);
    expect(result.current.result.isProfit).toBe(false);
    expect(result.current.result.lucro).toBe(-14800);
    expect(result.current.result.status).toBe('ITM');
  });

  it('comprador profits when final < strike (ITM)', () => {
    const { result } = renderHook(() => usePutSimulation());
    act(() => {
      result.current.setFinal(15);
    });
    // final=15 < strike=36 → ITM
    // vi = 36-15 = 21
    // lucro = 21*10*100 - 1200 = 21000 - 1200 = 19800
    expect(result.current.result.vi).toBe(21);
    expect(result.current.result.isProfit).toBe(true);
    expect(result.current.result.lucro).toBe(19800);
    expect(result.current.result.status).toBe('ITM');
  });

  it('updates field via updateField', () => {
    const { result } = renderHook(() => usePutSimulation());
    act(() => {
      result.current.updateField('strike', 40);
    });
    expect(result.current.state.strike).toBe(40);
  });

  it('computes riscoMax correctly', () => {
    const { result } = renderHook(() => usePutSimulation());
    // riscoMax = strike * contratos * 100 = 36 * 10 * 100 = 36000
    expect(result.current.result.riscoMax).toBe(36000);
    act(() => {
      result.current.updateField('strike', 50);
      result.current.updateField('contratos', 20);
    });
    expect(result.current.result.riscoMax).toBe(50 * 20 * 100);
  });

  it('returns ATM when final equals strike', () => {
    const { result } = renderHook(() => usePutSimulation());
    act(() => {
      result.current.setFinal(36);
    });
    expect(result.current.result.status).toBe('ATM');
    expect(result.current.result.isProfit).toBe(false);
  });

  it('generates description for comprador profit', () => {
    const { result } = renderHook(() => usePutSimulation());
    act(() => {
      result.current.setFinal(0);
    });
    expect(result.current.result.descricao).toContain('Ação despencou');
  });

  it('generates description for vendedor profit', () => {
    const { result } = renderHook(() => usePutSimulation());
    act(() => {
      result.current.setMode('vendedor');
    });
    expect(result.current.result.descricao).toContain('PUT não foi exercida');
  });

  it('generates description for vendedor disaster', () => {
    const { result } = renderHook(() => usePutSimulation());
    act(() => {
      result.current.setMode('vendedor');
      result.current.setFinal(0);
    });
    expect(result.current.result.descricao).toContain('DESASTRE');
  });
});
