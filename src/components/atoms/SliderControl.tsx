import { useCallback } from 'react';
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

export function SliderControl({
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
    <div className="slider-wrap">
      <div className="slider-row">
        <span className="slider-label">{label}</span>
        <span className="slider-val" style={{ color }}>
          {displayValue}
        </span>
      </div>
      <div className="slider-track">
        <div
          className="slider-fill"
          style={{ width: `${width}%`, background: color }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
        />
      </div>
      <div className="slider-minmax">
        {minLabel && <span>{minLabel}</span>}
        {maxLabel && <span>{maxLabel}</span>}
      </div>
    </div>
  );
}
