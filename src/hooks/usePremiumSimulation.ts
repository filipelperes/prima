import { useState, useMemo, useCallback } from 'react';
import type { PremiumState, PremiumBreakdown } from '@/lib/types';
import { calcPremiumBreakdown } from '@/lib/calculations';

const DEFAULT_STATE: PremiumState = {
  dias: 30,
  vol: 30,
  dist: 0,
};

export function usePremiumSimulation() {
  const [state, setState] = useState<PremiumState>(DEFAULT_STATE);

  const { dias, vol, dist } = state;

  const breakdown = useMemo<PremiumBreakdown>(
    () => calcPremiumBreakdown(dias, vol, dist),
    [dias, vol, dist],
  );

  const updateField = useCallback(
    <K extends keyof PremiumState>(key: K, value: PremiumState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return { state, breakdown, updateField };
}
