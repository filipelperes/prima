import type { ReactNode } from 'react';

interface OtmBlockProps {
  label: string;
  labelColor: string;
  mixColor: string;
  children: ReactNode;
}

export function OtmBlock({
  label,
  labelColor,
  mixColor,
  children,
}: OtmBlockProps) {
  return (
    <div
      className="rounded-[10px] p-3 mb-1.5 bg-mix border-mix-20"
      style={{ '--mix-c': mixColor }}
    >
      <div className="text-[11px] font-bold tracking-[0.5px] mb-1" style={{ color: labelColor }}>
        {label}
      </div>
      <div className="text-xs leading-[1.6] text-text-secondary">
        {children}
      </div>
    </div>
  );
}
