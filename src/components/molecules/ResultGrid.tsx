import type { ReactNode } from 'react';

interface Stat {
  label: string;
  value: string;
  sub?: string;
  valueColor?: string;
}

interface ResultGridProps {
  stats: Stat[];
  children?: ReactNode;
}

function StatItem({ label, value, sub, valueColor }: Stat) {
  return (
    <div className="text-center">
      <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-[3px]">{label}</div>
      <div className="text-lg font-black" style={valueColor ? { color: valueColor } : undefined}>{value}</div>
      {sub && <div className="text-[10px] text-muted mt-0.5">{sub}</div>}
    </div>
  );
}

export function ResultGrid({ stats }: ResultGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5 mb-3 max-sm:grid-cols-1">
      {stats.map((s, i) => (
        <StatItem key={i} {...s} />
      ))}
    </div>
  );
}
