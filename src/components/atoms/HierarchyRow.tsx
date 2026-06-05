import type { HierarchyItem } from '@/lib/types';

interface HierarchyRowProps extends HierarchyItem {
  rank: number;
}

export function HierarchyRow({ name, risk, riskPct, color, desc, rank }: HierarchyRowProps) {
  return (
    <div
      className="hierarchy-row"
      style={{ background: `${color}11`, border: `1px solid ${color}22` }}
    >
      <div
        className="hier-num"
        style={{ background: `${color}22`, color }}
      >
        {rank}
      </div>
      <div style={{ flex: 1 }}>
        <div className="hier-name">{name}</div>
        <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>
          {desc}
        </div>
        <div
          className="hier-bar"
          style={{ background: color, width: `${riskPct}%`, marginTop: 6 }}
        />
      </div>
      <div
        className="hier-risk"
        style={{ color, fontSize: 11, fontWeight: 700, maxWidth: 70 }}
      >
        {risk}
      </div>
    </div>
  );
}
