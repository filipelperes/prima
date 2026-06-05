interface AppHeaderProps {
  onSearchClick?: () => void;
}

export function AppHeader({ onSearchClick }: AppHeaderProps) {
  return (
    <div className="app-header">
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="app-title">Prima</div>
        <div className="app-subtitle">
          Guia interativo de Opções — do básico às gregas
        </div>
      </div>
      <button
        className="search-fab"
        onClick={onSearchClick}
        aria-label="Buscar no guia"
      >
        🔍
      </button>
    </div>
  );
}
