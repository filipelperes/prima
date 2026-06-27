import { memo } from 'react';

interface ProgressRowProps {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
  displayValue?: string;
}

export const ProgressRow = memo(function ProgressRow({
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
          className="h-full w-full rounded-[4px] origin-left transition-transform duration-300"
          style={{ transform: `scaleX(${width / 100})`, background: color }}
        />
      </div>
      <span className="text-xs font-bold w-[50px] text-right font-mono" style={{ color }}>
        {displayValue ?? `${value.toFixed(2)}`}
      </span>
    </div>
  );
});
