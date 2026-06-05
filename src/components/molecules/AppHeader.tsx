import { SearchBar } from '@/components/molecules/SearchBar';

interface AppHeaderProps {
  onSearchNavigate?: (tabId: string) => void;
}

export function AppHeader({ onSearchNavigate }: AppHeaderProps) {
  return (
    <div className="app-header">
      <div className="header-top-row">
        <div className="app-title">Prisma</div>
        <div className="header-search">
          <SearchBar onNavigate={onSearchNavigate} />
        </div>
      </div>
      <div className="app-subtitle">
        Guia interativo de Opções — do básico às gregas
      </div>
      <div className="header-tags">
        <span className="tag tag-accent">Simuladores</span>
        <span className="tag tag-green">CALL &amp; PUT</span>
        <span className="tag tag-yellow">Gregas</span>
        <span className="tag tag-purple">Assimetria</span>
        <span className="tag tag-blue">Glossário</span>
        <span className="tag" style={{background:'#ffd54f22', color:'var(--yellow)', border:'1px solid #ffd54f33'}}>Estratégias</span>
        <span className="tag" style={{background:'#4fc3f722', color:'var(--blue)', border:'1px solid #4fc3f733'}}>Global</span>
      </div>
    </div>
  );
}
