import { cn } from '@/lib/utils';

export interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onSwitch: (id: string) => void;
}

export function TabBar({ tabs, activeTab, onSwitch }: TabBarProps) {
  return (
    <nav
      role="tablist"
      className="sticky top-3 z-50 flex gap-0.5 px-1.5 pb-2.5 pt-1.5 overflow-x-auto overflow-y-hidden rounded-xl border border-border-custom
        bg-surface/85 backdrop-blur-xl
        [mask-image:linear-gradient(to_right,transparent_0,#000_4px,#000_calc(100%-4px),transparent_100%)]
        [-webkit-mask-image:linear-gradient(to_right,transparent_0,#000_4px,#000_calc(100%-4px),transparent_100%)]
        [scrollbar-color:var(--color-border-custom)_transparent]
        hover:scrollbar-color-[var(--color-soft)_transparent]
        [&::-webkit-scrollbar]:h-2.5
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-track]:mx-1.5
        [&::-webkit-scrollbar-thumb]:bg-border-custom
        [&::-webkit-scrollbar-thumb]:rounded-[5px]
        [&::-webkit-scrollbar-thumb]:border-2
        [&::-webkit-scrollbar-thumb]:border-solid
        [&::-webkit-scrollbar-thumb]:border-transparent
        [&::-webkit-scrollbar-thumb]:bg-clip-content
        [&::-webkit-scrollbar-thumb]:hover:bg-soft
        [&::-webkit-scrollbar-thumb]:hover:bg-clip-content
        max-md:[scrollbar-width:none]
        max-md:[&::-webkit-scrollbar]:h-0
        max-sm:mx-2.5
        max-sm:px-2.5
        max-sm:[mask-image:none]
        max-sm:[-webkit-mask-image:none]"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onSwitch(tab.id)}
          className={cn(
            'shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg border-none bg-transparent text-soft cursor-pointer font-sans text-[11px] font-semibold tracking-wide leading-none transition-all duration-200 whitespace-nowrap uppercase relative',
            'max-md:text-[10px] max-md:px-2.5 max-md:py-[5px]',
            'max-sm:text-[9px] max-sm:px-2',
            'lg:text-xs lg:px-3.5 lg:py-2 lg:gap-1.5',
            activeTab === tab.id && 'text-accent bg-accent/10 shadow-[0_0_20px_rgba(0,212,255,0.15)] after:content-[""] after:absolute after:bottom-[3px] after:left-3 after:right-3 after:h-[2px] after:bg-accent after:rounded-[2px] after:shadow-[0_0_10px_rgba(0,212,255,0.5)] lg:after:left-3.5 lg:after:right-3.5 max-md:after:left-2.5 max-md:after:right-2.5 max-sm:after:left-2 max-sm:after:right-2 max-sm:after:bottom-[2px]',
            activeTab !== tab.id && 'hover:text-text hover:bg-white/5',
          )}
        >
          <span className="text-sm leading-none transition-transform duration-200 hover:scale-110 lg:text-[15px] max-md:text-xs max-sm:text-[11px]">
            {tab.icon}
          </span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
