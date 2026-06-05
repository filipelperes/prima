interface OpData {
  win: boolean;
  profit: number;
}

interface OpsGridDisplayProps {
  ops: OpData[];
}

function absoluteDisplay(val: number): string {
  const abs = Math.abs(val);
  if (abs >= 1000) {
    return (abs / 1000).toFixed(1) + 'k';
  }
  return String(abs);
}

export function OpsGridDisplay({ ops }: OpsGridDisplayProps) {
  return (
    <div className="ops-grid">
      {ops.map((op, i) => (
        <div
          key={i}
          className={`op-cell ${op.win ? 'op-win' : 'op-loss'}`}
        >
          <div>{op.win ? '🚀' : '💀'}</div>
          <div
            className="op-label"
            style={{
              color: op.win ? 'var(--green)' : 'var(--red)',
            }}
          >
            {op.win ? '+' : '-'}
            {absoluteDisplay(op.profit)}
          </div>
        </div>
      ))}
    </div>
  );
}
