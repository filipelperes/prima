import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface UsoCardProps {
  icon: string;
  name: string;
  desc: string;
  details?: string;
}

export function UsoCard({ icon, name, desc, details }: UsoCardProps) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  return (
    <div
      className={cn(
        'bg-card-custom border rounded-lg p-3.5 max-sm:p-3 mb-2.5 transition-colors duration-200',
        open ? 'border-accent/30' : 'border-border-custom',
        details && 'cursor-pointer hover:border-accent/20 dark:hover:border-accent/15',
      )}
      onClick={details ? toggle : undefined}
      onKeyDown={details ? (e) => { if (e.key === 'Enter' || e.key === ' ') toggle(); } : undefined}
      role={details ? 'button' : undefined}
      tabIndex={details ? 0 : undefined}
    >
      <div className="flex items-start gap-2.5">
        {icon && <div className="text-xl mb-1.5">{icon}</div>}
        <div className="flex-1">
          <div className="text-[13px] font-bold mb-1.5">{name}</div>
          <div className="text-xs leading-relaxed text-text-secondary">{desc}</div>
          {details && (
            <>
              <div
                className={cn(
                  'text-[10px] font-mono mt-2 transition-colors duration-200',
                  open ? 'text-accent' : 'text-muted',
                )}
              >
                {open ? '▲ recolher' : '▼ detalhes'}
              </div>
              {open && (
                <div className="mt-2.5 p-3 bg-surface border border-border-custom rounded-lg text-xs leading-relaxed text-text-secondary">
                  {details}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
