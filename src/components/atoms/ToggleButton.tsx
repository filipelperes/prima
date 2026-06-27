import { memo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const toggleVariants = cva(
  'flex-1 p-2 rounded-[7px] border text-[11px] font-bold font-sans tracking-wide uppercase transition-colors duration-200',
  {
    variants: {
      active: {
        true: '',
        false: 'bg-transparent border-transparent text-muted hover:text-text dark:hover:text-soft',
      },
      variant: {
        green: '',
        red: '',
      },
    },
    compoundVariants: [
      { active: true, variant: 'green', className: 'bg-green/15 border-green/40 text-green' },
      { active: true, variant: 'red', className: 'bg-red/15 border-red/40 text-red' },
    ],
    defaultVariants: {
      active: false,
      variant: 'green',
    },
  },
);

interface ToggleButtonProps extends VariantProps<typeof toggleVariants> {
  label: string;
  onClick: () => void;
}

export const ToggleButton = memo(function ToggleButton({ label, active, variant, onClick }: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(toggleVariants({ active, variant }))}
    >
      {label}
    </button>
  );
});
