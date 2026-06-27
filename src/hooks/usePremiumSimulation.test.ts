// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePremiumSimulation } from './usePremiumSimulation';

describe('usePremiumSimulation', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => usePremiumSimulation());
    expect(result.current.state.dias).toBe(30);
    expect(result.current.state.vol).toBe(30);
    expect(result.current.state.dist).toBe(0);
  });

  it('computes initial breakdown for ATM (dist=0, vol=30, 30d)', () => {
    const { result } = renderHook(() => usePremiumSimulation());
    // dist=0 → intrinseco=0
    // distNorm = exp(0) = 1
    // temporal = 1 * (30/25) * sqrt(30/30) * 2.5 = 1 * 1.2 * 1 * 2.5 = 3
    expect(result.current.breakdown.intrinseco).toBe(0);
    expect(result.current.breakdown.temporal).toBe(3);
    expect(result.current.breakdown.total).toBe(3);
  });

  it('updates dias via updateField', () => {
    const { result } = renderHook(() => usePremiumSimulation());
    act(() => {
      result.current.updateField('dias', 15);
    });
    expect(result.current.state.dias).toBe(15);
    // With fewer days, temporal value should decrease
    expect(result.current.breakdown.temporal).toBeLessThan(3);
  });

  it('updates vol via updateField', () => {
    const { result } = renderHook(() => usePremiumSimulation());
    act(() => {
      result.current.updateField('vol', 60);
    });
    expect(result.current.state.vol).toBe(60);
    // Higher vol → higher temporal value
    expect(result.current.breakdown.temporal).toBeGreaterThan(3);
  });

  it('updates dist via updateField (positive=ITM)', () => {
    const { result } = renderHook(() => usePremiumSimulation());
    act(() => {
      result.current.updateField('dist', 5);
    });
    expect(result.current.state.dist).toBe(5);
    // dist=5 → intrinseco=5
    expect(result.current.breakdown.intrinseco).toBe(5);
    expect(result.current.breakdown.total).toBeGreaterThan(5);
  });

  it('updates dist via updateField (negative=OTM)', () => {
    const { result } = renderHook(() => usePremiumSimulation());
    act(() => {
      result.current.updateField('dist', -5);
    });
    expect(result.current.state.dist).toBe(-5);
    // dist=-5 → intrinseco = max(0, -5) = 0
    expect(result.current.breakdown.intrinseco).toBe(0);
    // OTM still has time value
    expect(result.current.breakdown.temporal).toBeGreaterThan(0);
  });

  it('total equals intrinseco + temporal within rounding', () => {
    const { result } = renderHook(() => usePremiumSimulation());
    act(() => {
      result.current.updateField('dias', 7);
      result.current.updateField('vol', 45);
      result.current.updateField('dist', 3.5);
    });
    const sum = result.current.breakdown.intrinseco + result.current.breakdown.temporal;
    expect(Math.abs(sum - result.current.breakdown.total)).toBeLessThanOrEqual(0.01);
  });

  it('handles extreme values without errors', () => {
    const { result } = renderHook(() => usePremiumSimulation());
    act(() => {
      result.current.updateField('dias', 90);
      result.current.updateField('vol', 80);
      result.current.updateField('dist', 15);
    });
    expect(result.current.breakdown.intrinseco).toBe(15);
    expect(result.current.breakdown.temporal).toBeGreaterThan(0);
    expect(result.current.breakdown.total).toBeGreaterThan(15);
  });

  it('maintains stable updateField reference', () => {
    const { result } = renderHook(() => usePremiumSimulation());
    const firstRef = result.current.updateField;
    act(() => {
      result.current.updateField('dias', 45);
    });
    expect(result.current.updateField).toBe(firstRef);
  });
});
