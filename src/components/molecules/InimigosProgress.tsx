import type { Inimigo } from '@/lib/types';

interface InimigosProgressProps {
  inimigos: Inimigo[];
}

export function InimigosProgress({ inimigos }: InimigosProgressProps) {
  return (
    <>
      {inimigos.map((item) => (
        <div key={item.label}>
          <div className="prog-row">
            <span
              className="prog-label"
              style={{ color: item.color, fontSize: 11 }}
            >
              {item.label}
            </span>
            <div className="prog-bar-bg">
              <div
                className="prog-bar-fill"
                style={{
                  background: item.color,
                  width: `${item.val}%`,
                }}
              />
            </div>
            <span className="prog-val" style={{ color: item.color }}>
              {item.val}%
            </span>
          </div>
          <div
            style={{
              fontSize: 10,
              color: 'var(--muted)',
              marginBottom: 8,
              paddingLeft: 100,
            }}
          >
            {item.desc}
          </div>
        </div>
      ))}
    </>
  );
}
