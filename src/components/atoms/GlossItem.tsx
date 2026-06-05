import type { GlossaryItem } from '@/lib/types';

export function GlossItem({ term, tags, def, analogy }: GlossaryItem) {
  return (
    <div className="gloss-item">
      <div className="gloss-term">
        {term}
        {tags.map((tag) => (
          <span key={tag.t} className={`gloss-term-label ${tag.c}`}>
            {tag.t}
          </span>
        ))}
      </div>
      <div className="gloss-def">{def}</div>
      {analogy && (
        <div className="gloss-analogy">
          <div className="analogy-label">ANALOGIA</div>
          {analogy}
        </div>
      )}
    </div>
  );
}
