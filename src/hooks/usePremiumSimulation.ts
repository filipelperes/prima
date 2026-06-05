import { useState, useMemo } from 'react';
import type { PremiumState, PremiumBreakdown } from '@/lib/types';
import { calcPremiumBreakdown } from '@/lib/calculations';

const DEFAULT_STATE: PremiumState = {
  dias: 30,
  vol: 30,
  dist: 0,
};

export function usePremiumSimulation() {
  const [state, setState] = useState<PremiumState>(DEFAULT_STATE);

  const breakdown = useMemo<PremiumBreakdown>(
    () => calcPremiumBreakdown(state.dias, state.vol, state.dist),
    [state],
  );

  const updateField = <K extends keyof PremiumState>(key: K, value: PremiumState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return { state, breakdown, updateField };
}
