import { memo } from 'react';
import type { HierarchyItem } from '@/lib/types';

interface HierarchyRowProps extends HierarchyItem {
  rank: number;
}

export const HierarchyRow = memo(function HierarchyRow({ name, risk, riskPct, color, desc, rank }: HierarchyRowProps) {
  return (
    <div
      className="flex items-center gap-2.5 px-3 py-2.5 rounded mb-1.5 bg-mix border-mix-13"
      style={{ '--mix-c': color }}
    >
      <div
        className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-black font-mono shrink-0 bg-mix-13"
        style={{ color, '--mix-c': color }}
      >
        {rank}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-bold">{name}</div>
        <div className="text-[10px] text-muted mt-0.5">{desc}</div>
        <div
          className="h-1 rounded-[2px] mt-1.5 origin-left transition-transform duration-300"
          style={{ background: color, transform: `scaleX(${riskPct / 100})` }}
        />
      </div>
      <div
        className="text-[11px] font-bold shrink-0 max-w-[70px] text-right"
        style={{ color }}
      >
        {risk}
      </div>
    </div>
  );
});
