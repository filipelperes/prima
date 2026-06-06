import type { Inimigo } from '@/lib/types';

interface InimigosProgressProps {
  inimigos: Inimigo[];
}

export function InimigosProgress({ inimigos }: InimigosProgressProps) {
  return (
    <>
      {inimigos.map((item) => (
        <div key={item.label}>
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="text-xs w-[90px] shrink-0" style={{ color: item.color }}>
              {item.label}
            </span>
            <div className="flex-1 h-2 bg-border-custom rounded-[4px] overflow-hidden">
              <div
                className="h-full rounded-[4px] transition-[width] duration-300"
                style={{
                  background: item.color,
                  width: `${item.val}%`,
                }}
              />
            </div>
            <span className="text-xs font-bold w-[50px] text-right font-mono" style={{ color: item.color }}>
              {item.val}%
            </span>
          </div>
          <div className="text-[10px] text-muted mb-2 pl-[100px]">
            {item.desc}
          </div>
        </div>
      ))}
    </>
  );
}
