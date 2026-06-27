import { memo, useCallback } from 'react';
import { pct } from '@/lib/formatters';

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  color: string;
  displayValue: string;
  onChange: (value: number) => void;
  minLabel?: string;
  maxLabel?: string;
}

export const SliderControl = memo(function SliderControl({
  label,
  value,
  min,
  max,
  step,
  color,
  displayValue,
  onChange,
  minLabel,
  maxLabel,
}: SliderControlProps) {
  const width = pct(value, min, max);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseFloat(e.target.value));
    },
    [onChange],
  );

  return (
    <div className="mb-3.5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-muted">{label}</span>
        <span className="text-[13px] font-bold font-mono" style={{ color }}>
          {displayValue}
        </span>
      </div>
      <div className="relative h-[5px] bg-border-custom rounded-[3px] cursor-pointer">
        <div
          className="absolute left-0 top-0 h-full rounded-[3px] origin-left transition-transform duration-[0.08s]"
          style={{ transform: `scaleX(${width / 100})`, background: color }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="absolute -top-[7px] left-0 w-full h-5 cursor-pointer bg-transparent appearance-none z-[2]
            [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:border-none [&::-webkit-slider-runnable-track]:h-[5px]
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-bg [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(0,212,255,0.3)] [&::-webkit-slider-thumb]:dark:shadow-[0_0_12px_rgba(0,212,255,0.5)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:-mt-[6px]
            [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:border-none [&::-moz-range-track]:h-[5px]
            [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-bg [&::-moz-range-thumb]:shadow-[0_0_8px_rgba(0,212,255,0.3)] [&::-moz-range-thumb]:dark:shadow-[0_0_12px_rgba(0,212,255,0.5)] [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
      <div className="flex justify-between mt-[3px]">
        {minLabel && <span className="text-[9px] text-soft">{minLabel}</span>}
        {maxLabel && <span className="text-[9px] text-soft">{maxLabel}</span>}
      </div>
    </div>
  );
});
