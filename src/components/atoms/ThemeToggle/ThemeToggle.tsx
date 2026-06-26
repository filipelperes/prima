import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const label = theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro';

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center rounded-lg w-[38px] h-[38px] text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent max-md:w-[34px] max-md:h-[34px] max-sm:w-8 max-sm:h-8"
    >
      {/*
        Usamos a Tailwind `dark:` variant para mostrar/ocultar
        cada ícone conforme o tema ativo.
        - Sun: visível no light mode (default), oculta no dark
        - Moon: oculta no light mode, visível no dark
        Isto elimina a renderização condicional e mantém a
        lógica de tema no CSS, mais idiomático para Tailwind.
      */}
      <Sun className="size-[18px] text-muted transition-colors dark:hidden" />
      <Moon className="size-[18px] text-muted transition-colors hidden dark:block" />
    </button>
  );
}
