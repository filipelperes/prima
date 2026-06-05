import { useState, useMemo } from 'react';
import type { GreekState, GreekValues } from '@/lib/types';
import { calcGreekValues, getThetaBarsData } from '@/lib/calculations';

const DEFAULT_STATE: GreekState = {
  dias: 30,
  vol: 30,
  dist: 0,
};

export function useGreekSimulation() {
  const [state, setState] = useState<GreekState>(DEFAULT_STATE);

  const values = useMemo<GreekValues>(
    () => calcGreekValues(state.dias, state.vol, state.dist),
    [state],
  );

  const thetaBars = useMemo(() => getThetaBarsData(), []);

  const updateField = <K extends keyof GreekState>(key: K, value: GreekState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return { state, values, thetaBars, updateField };
}
