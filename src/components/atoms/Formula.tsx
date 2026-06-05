import type { ReactNode } from 'react';

interface FormulaProps {
  children: ReactNode;
}

export function Formula({ children }: FormulaProps) {
  return <div className="formula">{children}</div>;
}
