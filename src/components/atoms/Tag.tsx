import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TagProps {
  variant?: 'green' | 'red' | 'blue' | 'yellow' | 'purple' | 'accent';
  children: ReactNode;
}

const variantClasses: Record<NonNullable<TagProps['variant']>, string> = {
  green: 'bg-green/15 text-green border-green/30',
  red: 'bg-red/15 text-red border-red/30',
  blue: 'bg-blue/15 text-blue border-blue/30',
  yellow: 'bg-yellow/15 text-yellow border-yellow/30',
  purple: 'bg-purple/15 text-purple border-purple/30',
  accent: 'bg-accent/15 text-accent border-accent/30',
};

export function Tag({ variant = 'accent', children }: TagProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'font-sans text-[11px] font-bold px-2.5 py-[3px] rounded-sm tracking-wide leading-none',
        variantClasses[variant],
      )}
    >
      {children}
    </Badge>
  );
}
