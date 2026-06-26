import type { ReactNode } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface WarningBoxProps {
  title?: string;
  children: ReactNode;
}

export function WarningBox({ title, children }: WarningBoxProps) {
  return (
    <Alert variant="destructive" className="bg-red/10 border-red/40 dark:bg-red/[0.07] dark:border-red/30 rounded-lg p-3.5 mb-3">
      {title && (
        <AlertTitle className="text-red font-bold text-[13px] mb-1.5">
          {title}
        </AlertTitle>
      )}
      <AlertDescription className="text-text-secondary text-xs leading-relaxed">
        {children}
      </AlertDescription>
    </Alert>
  );
}
