import { cn } from '@/lib/utils';

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
    <div className="flex flex-wrap gap-1.5 my-3">
      {ops.map((op, i) => (
        <div
          key={i}
          className={cn(
            'w-[52px] h-[52px] rounded-[10px] flex flex-col items-center justify-center text-lg border-2 border-transparent',
            op.win ? 'bg-[#00e67611] border-[#00e67644]' : 'bg-[#ff3d5709] border-[#ff3d5730]',
            'max-sm:w-[38px] max-sm:h-[38px] max-sm:text-[13px] max-sm:rounded-[8px]',
          )}
        >
          <div>{op.win ? '🚀' : '💀'}</div>
          <div className={cn('text-[9px] font-bold mt-0.5', op.win ? 'text-green' : 'text-red')}>
            {op.win ? '+' : '-'}
            {absoluteDisplay(op.profit)}
          </div>
        </div>
      ))}
    </div>
  );
}
