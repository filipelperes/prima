interface AppHeaderProps {
  onSearchClick?: () => void;
}

export function AppHeader({ onSearchClick }: AppHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3 p-4 mt-6 mb-3 bg-surface/75 backdrop-blur-xl border border-border-custom rounded-xl max-md:p-3 max-sm:mx-2.5 max-sm:p-2.5 max-sm:gap-2">
      <div className="flex-1 min-w-0">
        <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent shrink-0 max-md:text-lg max-sm:text-base max-sm:tracking-tight">
          Prima
        </h1>
        <p className="text-[11px] text-muted mt-0.5 tracking-wide max-sm:text-[10px]">
          Guia interativo de Opções — do básico às gregas
        </p>
      </div>
      <button
        onClick={onSearchClick}
        aria-label="Buscar no guia"
        className="shrink-0 w-[38px] h-[38px] rounded-lg bg-accent/10 border border-accent/20 cursor-pointer text-base flex items-center justify-center transition-all duration-200 mt-0.5
          hover:bg-accent/20 hover:border-accent/35 hover:scale-105
          active:scale-95
          max-md:w-[34px] max-md:h-[34px] max-md:text-sm
          max-sm:w-8 max-sm:h-8 max-sm:text-[13px]"
      >
        🔍
      </button>
    </div>
  );
}
