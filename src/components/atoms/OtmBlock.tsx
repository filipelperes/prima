import type { ReactNode } from 'react';

interface OtmBlockProps {
  label: string;
  labelColor: string;
  bgColor: string;
  borderColor: string;
  children: ReactNode;
}

export function OtmBlock({
  label,
  labelColor,
  bgColor,
  borderColor,
  children,
}: OtmBlockProps) {
  return (
    <div
      className="rounded-[10px] p-3 mb-1.5"
      style={{ background: bgColor, border: `1px solid ${borderColor}` }}
    >
      <div className="text-[11px] font-bold tracking-wide mb-1" style={{ color: labelColor }}>
        {label}
      </div>
      <div className="text-xs leading-relaxed text-[#94a3b8]">
        {children}
      </div>
    </div>
  );
}
