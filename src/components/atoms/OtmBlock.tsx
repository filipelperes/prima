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
      className="otm-block"
      style={{ background: bgColor, border: `1px solid ${borderColor}` }}
    >
      <div className="otm-label" style={{ color: labelColor }}>
        {label}
      </div>
      <div className="otm-desc">{children}</div>
    </div>
  );
}
