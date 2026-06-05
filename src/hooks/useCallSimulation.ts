import { useState, useCallback, useMemo } from 'react';
import type { CallState, CallResult } from '@/lib/types';
import { calcCallResult } from '@/lib/calculations';

const DEFAULT_STATE: CallState = {
  acao: 38,
  strike: 40,
  premio: 0.8,
  contratos: 10,
  final: 38,
};

export function useCallSimulation() {
  const [state, setState] = useState<CallState>(DEFAULT_STATE);

  const updateField = useCallback(
    <K extends keyof CallState>(key: K, value: CallState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const result = useMemo<CallResult>(() => calcCallResult(state), [state]);

  const setFinal = useCallback((value: number) => {
    setState((prev) => ({ ...prev, final: value }));
  }, []);

  return { state, result, updateField, setFinal };
}
