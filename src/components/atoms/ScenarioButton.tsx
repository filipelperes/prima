import { memo } from 'react';
import { cn } from '@/lib/utils';

interface ScenarioButtonProps {
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

export const ScenarioButton = memo(function ScenarioButton({ label, onClick, isActive }: ScenarioButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`Cenário: ${label}`}
      aria-pressed={isActive}
      className={cn(
        'bg-transparent border border-border-custom rounded-md px-2.5 py-2 cursor-pointer text-[11px] text-muted font-sans transition-all duration-200 text-left leading-[1.4] hover:bg-accent/5 dark:hover:bg-accent/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:focus-visible:ring-accent',
        (isActive) && 'border-accent text-accent bg-accent/5',
      )}
    >
      {label}
    </button>
  );
});
