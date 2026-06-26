interface ThetaBarsChartProps {
  bars: readonly number[];
  currentDias: number;
}

export function ThetaBarsChart({ bars, currentDias }: ThetaBarsChartProps) {
  return (
    <div className="h-20 flex items-end gap-[3px]">
      {bars.map((d) => {
        const height = Math.sqrt(d / 60) * 100;
        const isActive = d <= currentDias;
        const color =
          d <= 7
            ? 'var(--color-red)'
            : d <= 14
              ? 'var(--color-yellow)'
              : 'var(--color-green)';
        return (
          <div key={d} className="flex-1 flex flex-col items-center">
            <div
              className="w-full rounded-t-[3px] min-h-[3px] transition-[background] duration-300"
              style={{
                height: `${height}%`,
                background: isActive ? color : 'var(--color-border-custom)',
              }}
            />
            <div className="text-[8px] text-muted mt-0.5">{d}d</div>
          </div>
        );
      })}
    </div>
  );
}
