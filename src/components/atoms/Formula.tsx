import type { ReactNode } from 'react';

interface FormulaProps {
  children: ReactNode;
}

export function Formula({ children }: FormulaProps) {
  return (
    <div className="bg-surface border border-border-custom rounded-md px-3.5 py-3 font-mono text-xs leading-relaxed my-2.5">
      {children}
    </div>
  );
}
