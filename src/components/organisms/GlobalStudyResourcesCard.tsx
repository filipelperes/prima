import { STUDY_LINKS } from '@/components/organisms/globalTabData';

export function GlobalStudyResourcesCard() {
  return (
    <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
      <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
        📚 Onde estudar opções no mundo
      </div>
      <div className="text-[12px] text-muted leading-[1.8]">
        <p className="mb-2">
          <strong className="text-text">Documentação oficial:</strong>
        </p>
        <ul className="pl-4 m-0 list-none">
          {STUDY_LINKS.map((link) => (
            <li key={link.name} className="mb-1.5">
              • <strong className="text-accent">{link.name}</strong> — {link.url} ({link.description})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
