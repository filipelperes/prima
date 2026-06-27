// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAssimetriaSimulation } from './useAssimetriaSimulation';

describe('useAssimetriaSimulation', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useAssimetriaSimulation());
    expect(result.current.state.premio).toBe(100);
    expect(result.current.state.ops).toBe(10);
    expect(result.current.state.acertos).toBe(3);
    expect(result.current.state.mult).toBe(8);
  });

  it('computes initial result with profit', () => {
    const { result } = renderHook(() => useAssimetriaSimulation());
    // premio=100, ops=10, acertos=3, mult=8
    // ac = 3 (min(3,10)), perdas = 7*100 = 700, ganhos = 3*100*8 = 2400
    // resultado = 2400 - 700 = 1700
    expect(result.current.result.perdas).toBe(700);
    expect(result.current.result.ganhos).toBe(2400);
    expect(result.current.result.resultado).toBe(1700);
    expect(result.current.result.isProfit).toBe(true);
  });

  it('updates premio via updateField', () => {
    const { result } = renderHook(() => useAssimetriaSimulation());
    act(() => {
      result.current.updateField('premio', 200);
    });
    expect(result.current.state.premio).toBe(200);
    // perdas = 7*200 = 1400, ganhos = 3*200*8 = 4800
    expect(result.current.result.perdas).toBe(1400);
    expect(result.current.result.ganhos).toBe(4800);
  });

  it('updates ops via updateField and caps acertos', () => {
    const { result } = renderHook(() => useAssimetriaSimulation());
    act(() => {
      result.current.updateField('ops', 5);
    });
    expect(result.current.state.ops).toBe(5);
    // acertos=3 > ops=5 → acertos deve ser 3 (não ultrapassa)
    expect(result.current.state.acertos).toBe(3);
    // ac = min(3,5) = 3, perdas = 2*100 = 200, ganhos = 3*100*8 = 2400
    expect(result.current.result.perdas).toBe(200);
    expect(result.current.result.ganhos).toBe(2400);
  });

  it('caps acertos when ops is reduced below acertos', () => {
    const { result } = renderHook(() => useAssimetriaSimulation());
    // Primeiro coloca ops=3, depois acertos=2, depois ops=1
    act(() => {
      result.current.updateField('ops', 3);
      result.current.updateField('acertos', 2);
    });
    expect(result.current.state.ops).toBe(3);
    expect(result.current.state.acertos).toBe(2);
    act(() => {
      result.current.updateField('ops', 1);
    });
    // acertos deve ser capado para no máximo ops (1)
    expect(result.current.state.acertos).toBe(1);
  });

  it('updates acertos via updateField', () => {
    const { result } = renderHook(() => useAssimetriaSimulation());
    act(() => {
      result.current.updateField('acertos', 8);
    });
    expect(result.current.state.acertos).toBe(8);
  });

  it('updates mult via updateField', () => {
    const { result } = renderHook(() => useAssimetriaSimulation());
    act(() => {
      result.current.updateField('mult', 3);
    });
    expect(result.current.state.mult).toBe(3);
    // With mult=3: ganhos = 3*100*3 = 900, perdas = 7*100 = 700, resultado = 200
    expect(result.current.result.ganhos).toBe(900);
    expect(result.current.result.resultado).toBe(200);
    expect(result.current.result.isProfit).toBe(true);
  });

  it('shows loss when gains do not cover losses', () => {
    const { result } = renderHook(() => useAssimetriaSimulation());
    act(() => {
      result.current.updateField('acertos', 1);
      result.current.updateField('mult', 3);
    });
    // ac=1, perdas=9*100=900, ganhos=1*100*3=300, resultado=-600
    expect(result.current.result.isProfit).toBe(false);
    expect(result.current.result.resultado).toBe(-600);
  });

  it('builds opsArray with correct length', () => {
    const { result } = renderHook(() => useAssimetriaSimulation());
    expect(result.current.result.opsArray).toHaveLength(10);
    expect(result.current.result.opsArray.filter((o) => o.win)).toHaveLength(3);
    expect(result.current.result.opsArray.filter((o) => !o.win)).toHaveLength(7);
  });

  it('generates description', () => {
    const { result } = renderHook(() => useAssimetriaSimulation());
    expect(result.current.result.descricao).toContain('operações');
    expect(result.current.result.descricao).toContain('Assimetria garantiu lucro');
  });

  it('maintains stable updateField reference', () => {
    const { result } = renderHook(() => useAssimetriaSimulation());
    const firstRef = result.current.updateField;
    act(() => {
      result.current.updateField('premio', 500);
    });
    expect(result.current.updateField).toBe(firstRef);
  });
});
