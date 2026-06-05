import type { ReactNode } from 'react';

interface WarningBoxProps {
  title?: string;
  children: ReactNode;
}

export function WarningBox({ title, children }: WarningBoxProps) {
  return (
    <div className="warning-box">
      {title && <div className="warning-title">{title}</div>}
      <div className="warning-text">{children}</div>
    </div>
  );
}
