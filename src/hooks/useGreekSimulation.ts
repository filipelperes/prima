import { useState, useMemo, useCallback } from 'react';
import type { GreekState, GreekValues } from '@/lib/types';
import { calcGreekValues } from '@/lib/calculations';

const DEFAULT_STATE: GreekState = {
  dias: 30,
  vol: 30,
  dist: 0,
};

export function useGreekSimulation() {
  const [state, setState] = useState<GreekState>(DEFAULT_STATE);

  const { dias, vol, dist } = state;

  const values = useMemo<GreekValues>(
    () => calcGreekValues(dias, vol, dist),
    [dias, vol, dist],
  );

  const updateField = useCallback(
    <K extends keyof GreekState>(key: K, value: GreekState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return { state, values, updateField };
}
