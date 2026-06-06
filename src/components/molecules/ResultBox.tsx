import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ResultBoxProps {
  isProfit: boolean;
  children: ReactNode;
}

export function ResultBox({ isProfit, children }: ResultBoxProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-4 mt-3 border',
        isProfit ? 'bg-[#00e67611] border-[#00e67633]' : 'bg-[#ff3d5711] border-[#ff3d5733]',
      )}
    >
      {children}
    </div>
  );
}
