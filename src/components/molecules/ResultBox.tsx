import { memo, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ResultBoxProps {
  isProfit: boolean;
  children: ReactNode;
}

export const ResultBox = memo(function ResultBox({ isProfit, children }: ResultBoxProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-4 mt-3 border',
        isProfit ? 'bg-green/[0.07] border-green/[0.20]' : 'bg-red/[0.07] border-red/[0.20]',
      )}
    >
      {children}
    </div>
  );
});
