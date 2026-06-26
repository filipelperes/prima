import { memo } from 'react';
import { cn } from '@/lib/utils';
import { TERMS_TABLE } from '@/components/organisms/globalTabData';

export const GlobalTermsTable = memo(function GlobalTermsTable() {
  return (
    <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
      <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
        🌐 Termos internacionais vs Brasil
      </div>
      <div className="text-[12px] text-muted leading-[1.8]">
        <p className="mb-2.5">Cada mercado usa termos diferentes para o mesmo conceito:</p>
        <div className="rounded-[10px] overflow-hidden border border-border-custom">
          <div className="grid grid-cols-3 bg-surface border-b border-border-custom">
            <div className="px-2.5 py-2 font-bold text-[10px] text-muted font-mono">CONCEITO</div>
            <div className="px-2.5 py-2 font-bold text-[10px] text-muted font-mono">BRASIL (B3)</div>
            <div className="px-2.5 py-2 font-bold text-[10px] text-muted font-mono">EUA / EUROPA</div>
          </div>
          {TERMS_TABLE.map((row, index) => (
            <div
              key={row.concept}
              className={cn(
                'grid grid-cols-3',
                index < TERMS_TABLE.length - 1 && 'border-b border-border-custom',
                index % 2 === 0 ? 'bg-card-custom' : 'bg-surface',
              )}
            >
              <div className="px-2.5 py-1.5 text-[11px] text-text">{row.concept}</div>
              <div className="px-2.5 py-1.5 text-[11px] text-accent font-mono">{row.brTerm}</div>
              <div className="px-2.5 py-1.5 text-[11px] text-yellow font-mono">{row.usTerm}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
