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
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-val" style={valueColor ? { color: valueColor } : undefined}>
        {value}
      </div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

export function ResultGrid({ stats }: ResultGridProps) {
  return (
    <div className="result-grid">
      {stats.map((s, i) => (
        <StatItem key={i} {...s} />
      ))}
    </div>
  );
}
