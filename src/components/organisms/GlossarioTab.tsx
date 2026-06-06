import { GlossItem } from '@/components/atoms/GlossItem';
import { GLOSSARY } from '@/data/glossary';

export function GlossarioTab() {
  return (
    <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
      <div id="glossario-list">
        {GLOSSARY.map((item, i) => (
          <GlossItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
