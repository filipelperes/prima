import type { GlossaryItem } from '@/lib/types';

export function GlossItem({ term, tags, def, analogy }: GlossaryItem) {
  return (
    <div className="border-b border-border-custom py-3.5 last:border-b-0">
      <div className="text-sm font-bold mb-1.5">
        {term}
        {tags.map((tag) => (
          <span
            key={tag.t}
            className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-[5px] ml-2 align-middle"
            style={{ background: `${tag.c}22`, color: tag.c, border: `1px solid ${tag.c}33` }}
          >
            {tag.t}
          </span>
        ))}
      </div>
      <div className="text-[13px] leading-relaxed text-[#94a3b8]">{def}</div>
      {analogy && (
        <div className="bg-card-custom border-l-[3px] border-accent rounded-r-md p-2.5 mt-2 text-xs leading-relaxed text-[#7dd3fc]">
          <div className="text-[9px] tracking-[1px] text-accent mb-1 font-bold font-mono">
            ANALOGIA
          </div>
          {analogy}
        </div>
      )}
    </div>
  );
}
