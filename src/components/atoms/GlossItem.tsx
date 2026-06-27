import { memo } from 'react';
import type { GlossaryItem } from '@/lib/types';

/** Maps tag‑colour identifiers to CSS custom‑property references. */
const TAG_COLORS: Record<string, string> = {
  'tag-accent': 'var(--color-accent)',
  'tag-green':  'var(--color-green)',
  'tag-red':    'var(--color-red)',
  'tag-blue':   'var(--color-blue)',
  'tag-yellow': 'var(--color-yellow)',
  'tag-purple': 'var(--color-purple)',
};

export const GlossItem = memo(function GlossItem({ term, tags, def, analogy }: GlossaryItem) {
  return (
    <div className="border-b border-border-custom py-3.5 last:border-b-0">
      <div className="text-sm font-bold mb-1.5">
        {term}
        {tags.map((tag) => {
          const c = TAG_COLORS[tag.c] ?? 'var(--color-accent)';
          return (
            <span
              key={tag.t}
              className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-[5px] ml-2 align-middle bg-mix-13 border-mix-20"
              style={{
                color: c,
                '--mix-c': c,
              }}
            >
              {tag.t}
            </span>
          );
        })}
      </div>
      <div className="text-[13px] leading-relaxed text-text-secondary">{def}</div>
      {analogy && (
        <div className="bg-card-custom border-l-[3px] border-accent rounded-r-md p-2.5 mt-2 text-xs leading-relaxed text-accent">
          <div className="text-[9px] tracking-[1px] text-accent mb-1 font-bold font-mono">
            ANALOGIA
          </div>
          {analogy}
        </div>
      )}
    </div>
  );
});
