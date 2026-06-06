import type { ReactNode } from 'react';

interface GreekCardData {
  name: string;
  nameColor: string;
  value: string;
  icon: string;
  children: ReactNode;
}

interface GreekGridProps {
  cards: GreekCardData[];
}

export function GreekGrid({ cards }: GreekGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5 mb-3 max-sm:grid-cols-1">
      {cards.map((card, i) => (
        <div key={i} className="bg-card-custom border border-border-custom rounded-lg p-3.5 max-sm:p-3">
          <div className="text-[15px] font-black mb-[3px]" style={{ color: card.nameColor }}>
            {card.name}
          </div>
          <div className="text-xl font-black mb-1.5 font-mono">{card.value}</div>
          <div className="text-[10px] text-muted mb-1.5">{card.icon}</div>
          <div className="text-[11px] leading-relaxed text-[#6b7a94]">{card.children}</div>
        </div>
      ))}
    </div>
  );
}
