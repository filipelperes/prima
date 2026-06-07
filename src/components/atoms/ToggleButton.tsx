import { cn } from '@/lib/utils';

interface ToggleButtonProps {
  label: string;
  active: boolean;
  variant: 'green' | 'red';
  onClick: () => void;
}

export function ToggleButton({ label, active, variant, onClick }: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex-1 p-2 rounded-[7px] border text-[11px] font-bold font-sans tracking-wide uppercase transition-all duration-200',
        active && variant === 'green' && 'bg-green/15 border-green/40 text-green',
        active && variant === 'red' && 'bg-red/15 border-red/40 text-red',
        !active && 'bg-transparent border-transparent text-muted',
      )}
    >
      {label}
    </button>
  );
}
