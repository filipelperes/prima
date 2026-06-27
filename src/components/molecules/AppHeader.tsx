import { memo } from 'react';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { Search } from 'lucide-react';

interface AppHeaderProps {
  onSearchClick?: () => void;
}

export const AppHeader = memo(function AppHeader({ onSearchClick }: AppHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3 p-4 mt-6 mb-3 bg-surface/75 backdrop-blur-lg will-change-[backdrop-filter] border border-border-custom rounded-xl max-md:p-3 max-sm:mx-2.5 max-sm:p-2.5 max-sm:gap-2">
      <div className="flex-1 min-w-0">
        <h1 className="text-xl font-black tracking-[-1px] bg-gradient-to-br from-accent to-purple-500 bg-clip-text text-transparent shrink-0 max-md:text-lg max-sm:text-base max-sm:tracking-[-0.5px]">
          Prima
        </h1>
        <p className="text-[11px] text-muted mt-0.5 tracking-[0.3px] max-sm:text-[10px]">
          Guia interativo de Opções — do básico às gregas
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0 mt-0.5">
        <ThemeToggle />
        <button
          onClick={onSearchClick}
          aria-label="Buscar no guia"
          className="w-[38px] h-[38px] rounded-lg bg-accent/10 border border-accent/20 cursor-pointer flex items-center justify-center transition-all duration-200
            hover:bg-accent/20 hover:border-accent/35 hover:scale-105
            dark:hover:bg-accent/15 dark:hover:border-accent/40
            active:scale-95
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
            max-md:w-[34px] max-md:h-[34px]
            max-sm:w-8 max-sm:h-8"
        >
          <Search className="size-[18px] text-accent max-sm:size-[15px]" />
        </button>
      </div>
    </div>
  );
});
