import type { ReactNode } from 'react';

interface TagProps {
  variant?: 'green' | 'red' | 'blue' | 'yellow' | 'purple' | 'accent';
  children: ReactNode;
}

const VARIANT_CLASS: Record<string, string> = {
  green: 'tag-green',
  red: 'tag-red',
  blue: 'tag-blue',
  yellow: 'tag-yellow',
  purple: 'tag-purple',
  accent: 'tag-accent',
};

export function Tag({ variant = 'accent', children }: TagProps) {
  const cls = VARIANT_CLASS[variant] ?? 'tag-accent';
  return <span className={`tag ${cls}`}>{children}</span>;
}
