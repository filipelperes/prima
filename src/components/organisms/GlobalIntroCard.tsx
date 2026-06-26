import { memo } from 'react';

export const GlobalIntroCard = memo(function GlobalIntroCard() {
  return (
    <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
      <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
        🌎 Opções pelo Mundo
      </div>
      <p className="text-[13px] leading-[1.8] text-muted mb-0">
        Mercado de opções não existe só no Brasil! Opções são negociadas em
        bolsas do mundo inteiro. Cada mercado tem suas próprias regras,
        horários e particularidades. Conheça os principais:
      </p>
    </div>
  );
});
