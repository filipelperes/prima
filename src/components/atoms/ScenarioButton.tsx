import { cn } from '@/lib/utils';

interface ScenarioButtonProps {
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

export function ScenarioButton({ label, onClick, isActive }: ScenarioButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-transparent border border-border-custom rounded-md px-2.5 py-2 cursor-pointer text-[11px] text-muted font-sans transition-all duration-200 text-left leading-tight',
        (isActive) && 'border-accent text-accent bg-accent/5',
      )}
    >
      {label}
    </button>
  );
}
