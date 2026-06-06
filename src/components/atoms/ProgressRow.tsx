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
    <div className="flex items-center gap-2.5 mb-2.5">
      <span className="text-xs w-[90px] shrink-0" style={{ color }}>
        {label}
      </span>
      <div className="flex-1 h-2 bg-border-custom rounded-[4px] overflow-hidden">
        <div
          className="h-full rounded-[4px] transition-[width] duration-300"
          style={{ width: `${width}%`, background: color }}
        />
      </div>
      <span className="text-xs font-bold w-[50px] text-right font-mono" style={{ color }}>
        {displayValue ?? `${value.toFixed(2)}`}
      </span>
    </div>
  );
}
