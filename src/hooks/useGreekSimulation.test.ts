// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGreekSimulation } from './useGreekSimulation';

describe('useGreekSimulation', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useGreekSimulation());
    expect(result.current.state.dias).toBe(30);
    expect(result.current.state.vol).toBe(30);
    expect(result.current.state.dist).toBe(0);
  });

  it('computes initial Greek values for ATM (dist=0, vol=30, 30d)', () => {
    const { result } = renderHook(() => useGreekSimulation());
    expect(result.current.values.delta).toBe(0.5);
    expect(result.current.values.theta).toBeCloseTo(1.33, 2);
    expect(result.current.values.vega).toBe(1);
    expect(result.current.values.gamma).toBe('máximo');
  });

  it('updates dias via updateField and recomputes theta', () => {
    const { result } = renderHook(() => useGreekSimulation());
    act(() => {
      result.current.updateField('dias', 7);
    });
    expect(result.current.state.dias).toBe(7);
    // theta = round(40/7 * 100)/100 = round(571.43)/100 = 571/100 = 5.71
    expect(result.current.values.theta).toBe(5.71);
  });

  it('updates vol via updateField and recomputes vega', () => {
    const { result } = renderHook(() => useGreekSimulation());
    act(() => {
      result.current.updateField('vol', 60);
    });
    expect(result.current.state.vol).toBe(60);
    expect(result.current.values.vega).toBe(2);
  });

  it('updates dist via updateField and recomputes delta/gamma', () => {
    const { result } = renderHook(() => useGreekSimulation());
    act(() => {
      result.current.updateField('dist', 5);
    });
    expect(result.current.state.dist).toBe(5);
    // delta = 0.5 + 5*0.05 = 0.75
    expect(result.current.values.delta).toBe(0.75);
    // dist=5 → |5| >= 2 and 5>2 → 'alto'
    expect(result.current.values.gamma).toBe('alto');
  });

  it('recomputes all values when multiple fields change', () => {
    const { result } = renderHook(() => useGreekSimulation());
    act(() => {
      result.current.updateField('dias', 1);
      result.current.updateField('vol', 80);
      result.current.updateField('dist', -5);
    });
    expect(result.current.state.dias).toBe(1);
    expect(result.current.state.vol).toBe(80);
    expect(result.current.state.dist).toBe(-5);
    // delta = 0.5 + (-5)*0.05 = 0.25
    expect(result.current.values.delta).toBe(0.25);
    // theta = round(40/1 * 100)/100 = 40
    expect(result.current.values.theta).toBe(40);
    // vega = round(80/30 * 100)/100 = round(266.67)/100 = 267/100 = 2.67
    expect(result.current.values.vega).toBe(2.67);
    // dist=-5 <= -2 → 'baixo'
    expect(result.current.values.gamma).toBe('baixo');
  });

  it('handles negative dist for OTM scenario', () => {
    const { result } = renderHook(() => useGreekSimulation());
    act(() => {
      result.current.updateField('dist', -3);
    });
    expect(result.current.values.delta).toBe(0.35); // 0.5 - 3*0.05
    expect(result.current.values.gamma).toBe('baixo'); // -3 <= -2
  });

  it('handles large positive dist (deep ITM)', () => {
    const { result } = renderHook(() => useGreekSimulation());
    act(() => {
      result.current.updateField('dist', 10);
    });
    expect(result.current.values.delta).toBe(0.99); // clamped
    expect(result.current.values.gamma).toBe('alto');
  });

  it('handles ATM-adjacent dist values', () => {
    const { result } = renderHook(() => useGreekSimulation());
    act(() => {
      result.current.updateField('dist', 1.5);
    });
    // |1.5| < 2 → 'máximo'
    expect(result.current.values.gamma).toBe('máximo');
    expect(result.current.values.delta).toBe(0.5 + 1.5 * 0.05);
  });
});
