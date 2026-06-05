interface ProgressRowProps {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
  displayValue?: string;
}

export function ProgressRow({
  label,
  value,
  maxValue = 20,
  color,
  displayValue,
}: ProgressRowProps) {
  const width = Math.min(100, (value / maxValue) * 100);
  return (
    <div className="prog-row">
      <span className="prog-label" style={{ color }}>
        {label}
      </span>
      <div className="prog-bar-bg">
        <div
          className="prog-bar-fill"
          style={{ width: `${width}%`, background: color }}
        />
      </div>
      <span className="prog-val" style={{ color }}>
        {displayValue ?? `${value.toFixed(2)}`}
      </span>
    </div>
  );
}
