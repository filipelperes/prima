import { GlossItem } from '@/components/atoms/GlossItem';
import { GLOSSARY } from '@/data/glossary';

export function GlossarioTab() {
  return (
    <div className="card">
      <div id="glossario-list">
        {GLOSSARY.map((item, i) => (
          <GlossItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
