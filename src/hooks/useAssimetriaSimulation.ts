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

  const { premio, ops, acertos, mult } = state;

  const result = useMemo<AssimetriaResult>(
    () => calcAssimetria({ premio, ops, acertos, mult }),
    [premio, ops, acertos, mult],
  );

  const updateField = useCallback(
    <K extends keyof AssimetriaState>(key: K, value: AssimetriaState[K]) => {
      setState((prev) => {
        const next = { ...prev, [key]: value };
        next.acertos = Math.min(next.acertos, next.ops);
        return next;
      });
    },
    [],
  );

  return { state, result, updateField };
}
