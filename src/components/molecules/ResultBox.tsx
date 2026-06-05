import type { ReactNode } from 'react';

interface ResultBoxProps {
  isProfit: boolean;
  children: ReactNode;
}

export function ResultBox({ isProfit, children }: ResultBoxProps) {
  const bg = isProfit ? '#00e67611' : '#ff3d5711';
  const border = isProfit ? '1px solid #00e67633' : '1px solid #ff3d5733';
  return (
    <div className="result-box" style={{ background: bg, border }}>
      {children}
    </div>
  );
}
