import { memo } from 'react';
import { cn } from '@/lib/utils';

interface StrategyRow {
  name: string;
  risk: string;
  riskColor: string;
  theta: string;
  thetaColor: string;
  ideal: string;
}

const HEADERS = ['ESTRATÉGIA', 'RISCO', 'THETA', 'IDEAL PARA'] as const;

const ROWS: StrategyRow[] = [
  { name: 'Covered Call', risk: 'Baixo', riskColor: 'text-green', theta: 'A favor', thetaColor: 'text-green', ideal: 'Renda mensal' },
  { name: 'Protective Put', risk: 'Prêmio pago', riskColor: 'text-yellow', theta: 'Contra', thetaColor: 'text-red', ideal: 'Proteger carteira' },
  { name: 'Collar', risk: 'Limitado', riskColor: 'text-green', theta: 'Neutro', thetaColor: 'text-text-secondary', ideal: 'Proteção zero-custo' },
  { name: 'Cash Secured Put', risk: 'Strike', riskColor: 'text-yellow', theta: 'A favor', thetaColor: 'text-green', ideal: 'Comprar com desconto' },
];

function StrategyCompareTableComponent() {
  return (
    <div className="rounded-[10px] overflow-hidden border border-border-custom">
      {/* Header */}
      <div className="grid grid-cols-[1.5fr_0.8fr_0.8fr_1.2fr] bg-surface border-b border-border-custom">
        {HEADERS.map((h) => (
          <div key={h} className="p-[8px_10px] font-bold text-[10px] text-muted tracking-[0.5px] font-mono">
            {h}
          </div>
        ))}
      </div>
      {/* Rows */}
      {ROWS.map((row, i) => (
        <div
          key={row.name}
          className={cn(
            'grid grid-cols-[1.5fr_0.8fr_0.8fr_1.2fr]',
            i < ROWS.length - 1 && 'border-b border-border-custom',
            i % 2 === 0 ? 'bg-card-custom' : 'bg-surface',
          )}
        >
          <div className="p-[8px_10px] text-[11px] text-text">{row.name}</div>
          <div className={cn('p-[8px_10px] text-[11px]', row.riskColor)}>{row.risk}</div>
          <div className={cn('p-[8px_10px] text-[11px]', row.thetaColor)}>{row.theta}</div>
          <div className="p-[8px_10px] text-[11px] text-text-secondary">{row.ideal}</div>
        </div>
      ))}
    </div>
  );
}

export const StrategyCompareTable = memo(StrategyCompareTableComponent);
