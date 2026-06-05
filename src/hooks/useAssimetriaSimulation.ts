import { useState, useMemo, useCallback } from 'react';
import type { AssimetriaState, AssimetriaResult } from '@/lib/types';
import { calcAssimetria } from '@/lib/calculations';

const DEFAULT_STATE: AssimetriaState = {
  premio: 100,
  ops: 10,
  acertos: 3,
  mult: 8,
};

export function useAssimetriaSimulation() {
  const [state, setState] = useState<AssimetriaState>(DEFAULT_STATE);

  const result = useMemo<AssimetriaResult>(() => calcAssimetria(state), [state]);

  const updateField = useCallback(
    <K extends keyof AssimetriaState>(key: K, value: AssimetriaState[K]) => {
      setState((prev) => {
        const next = { ...prev, [key]: value };
        if (key === 'ops') {
          next.acertos = Math.min(next.acertos, next.ops);
        }
        if (key === 'acertos') {
          next.acertos = Math.min(value as number, next.ops);
        }
        return next;
      });
    },
    [],
  );

  return { state, result, updateField };
}
