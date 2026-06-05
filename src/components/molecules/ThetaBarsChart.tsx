interface ThetaBarsChartProps {
  bars: number[];
  currentDias: number;
}

export function ThetaBarsChart({ bars, currentDias }: ThetaBarsChartProps) {
  return (
    <div className="theta-bar-wrap">
      {bars.map((d) => {
        const height = Math.sqrt(d / 60) * 100;
        const isActive = d <= currentDias;
        const color =
          d <= 7
            ? 'var(--red)'
            : d <= 14
              ? 'var(--yellow)'
              : 'var(--green)';
        return (
          <div key={d} className="theta-bar-col">
            <div
              className="theta-bar"
              style={{
                height: `${height}%`,
                background: isActive ? color : 'var(--border)',
              }}
            />
            <div className="theta-bar-label">{d}d</div>
          </div>
        );
      })}
    </div>
  );
}
