import { useState, useCallback, useMemo } from 'react';
import type { PutState, PutResult, PutMode } from '@/lib/types';
import { calcPutResult } from '@/lib/calculations';

const DEFAULT_STATE: PutState = {
  acao: 38,
  strike: 36,
  premio: 1.2,
  contratos: 10,
  final: 38,
};

export function usePutSimulation() {
  const [state, setState] = useState<PutState>(DEFAULT_STATE);
  const [mode, setMode] = useState<PutMode>('comprador');

  const updateField = useCallback(
    <K extends keyof PutState>(key: K, value: PutState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const result = useMemo<PutResult>(() => calcPutResult(state, mode), [state, mode]);

  const setFinal = useCallback((value: number) => {
    setState((prev) => ({ ...prev, final: value }));
  }, []);

  return { state, mode, result, updateField, setMode, setFinal };
}
