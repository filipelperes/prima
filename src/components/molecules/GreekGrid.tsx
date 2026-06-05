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
    <div className="greek-grid">
      {cards.map((card, i) => (
        <div key={i} className="greek-card">
          <div className="greek-name" style={{ color: card.nameColor }}>
            {card.name}
          </div>
          <div className="greek-val">{card.value}</div>
          <div className="greek-icon">{card.icon}</div>
          <div className="greek-desc">{card.children}</div>
        </div>
      ))}
    </div>
  );
}
