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
        const opsValue = key === 'ops' ? value as number : prev.ops;
        const acertosValue = key === 'acertos' ? value as number : prev.acertos;
        return {
          ...prev,
          [key]: value,
          acertos: key === 'ops' && acertosValue > opsValue ? opsValue : acertosValue,
        };
      });
    },
    [],
  );

  return { state, result, updateField };
}
