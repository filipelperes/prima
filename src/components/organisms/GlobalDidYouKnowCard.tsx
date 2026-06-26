import { memo } from 'react';

export const GlobalDidYouKnowCard = memo(function GlobalDidYouKnowCard() {
  return (
    <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
      <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
        📊 Você sabia?
      </div>
      <p className="text-[13px] leading-[1.8] text-muted mb-0">
        O mercado de opções GLOBAL movimentou mais de 119 BILHÕES de
        contratos em 2025. O Brasil (B3) é um dos maiores mercados da América
        Latina, mas representa uma fração do volume global. Enquanto isso, a
        Índia disparou e hoje responde pela maior parte do volume de opções do
        mundo, com mais de 70 bilhões de contratos negociados em 2025.
      </p>
    </div>
  );
});
