import { Tag } from '@/components/atoms/Tag';
import { MARKETS_DATA, type MarketData } from '@/components/organisms/globalTabData';

export function GlobalMarketsGrid() {
  return (
    <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
      <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
        Principais mercados
      </div>
      <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
        {MARKETS_DATA.map((market) => (
          <MarketCard key={market.exchange} market={market} />
        ))}
      </div>
    </div>
  );
}

function MarketCard({ market }: { readonly market: MarketData }) {
  return (
    <div className="bg-surface rounded-[10px] p-3.5">
      <div className="text-[13px] font-bold mb-1.5 text-text">
        {market.emoji} {market.exchange}
      </div>
      <div className="text-[11px] text-muted leading-[1.7] mb-2">
        {market.description}
      </div>
      <Tag variant={market.tagVariant}>{market.tagLabel}</Tag>
      <div className="text-[10px] text-soft mt-1.5 border-t border-border-custom pt-1.5">
        {market.reference}
      </div>
    </div>
  );
}
