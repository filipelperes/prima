import { memo } from 'react';
import { cn } from '@/lib/utils';
import { useDragScroll } from '@/hooks/useDragScroll';

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

interface TabButtonProps {
  tab: Tab;
  activeTab: string;
  onSwitch: (id: string) => void;
  isDragging: boolean;
}

const TabButton = memo(function TabButton({ tab, activeTab, onSwitch, isDragging }: TabButtonProps) {
  const isActive = activeTab === tab.id;
  return (
    <button
      key={tab.id}
      role="tab"
      aria-selected={isActive}
      onClick={() => {
        if (!isDragging) onSwitch(tab.id);
      }}
      className={cn(
        'shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-md border-none bg-transparent text-soft cursor-pointer font-sans text-[11px] font-semibold tracking-[0.3px] leading-none transition-all duration-200 whitespace-nowrap uppercase relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:focus-visible:ring-accent',
        'max-md:text-[10px] max-md:px-2.5 max-md:py-[5px]',
        'max-sm:text-[9px] max-sm:px-2',
        'lg:text-xs lg:px-3.5 lg:py-2 lg:gap-1.5',
        isActive && 'text-accent bg-accent/10 [text-shadow:0_0_20px_rgba(0,212,255,0.15)] dark:[text-shadow:0_0_20px_rgba(0,212,255,0.35)] after:content-[""] after:absolute after:bottom-[3px] after:left-3 after:right-3 after:h-[2px] after:bg-accent after:rounded-[2px] after:shadow-[0_0_10px_rgba(0,212,255,0.5)] dark:after:shadow-[0_0_14px_rgba(0,212,255,0.7)] lg:after:left-3.5 lg:after:right-3.5 max-md:after:left-2.5 max-md:after:right-2.5 max-sm:after:left-2 max-sm:after:right-2 max-sm:after:bottom-[2px]',
        !isActive && 'hover:text-text hover:bg-accent/5 dark:hover:bg-accent/[0.07]',
      )}
    >
      <span className="text-sm leading-none transition-transform duration-200 hover:scale-110 lg:text-[15px] max-md:text-xs max-sm:text-[11px]">
        {tab.icon}
      </span>
      <span>{tab.label}</span>
    </button>
  );
});

export const TabBar = memo(function TabBar({ tabs, activeTab, onSwitch }: TabBarProps) {
  const { ref, isDragging, handlers } = useDragScroll();

  return (
    <nav
      ref={ref}
      role="tablist"
      {...handlers}
      className={cn(
        'sticky top-3 z-[100] flex gap-0.5 px-1.5 pb-2.5 pt-1.5 overflow-x-auto overflow-y-hidden rounded-xl border border-border-custom',
        'bg-surface/85 backdrop-blur-lg',
        'select-none',
        isDragging
          ? 'cursor-grabbing [&_button]:pointer-events-none'
          : 'cursor-grab',
        '[mask-image:linear-gradient(to_right,transparent_0,#000_4px,#000_calc(100%-4px),transparent_100%)]',
        '[-webkit-mask-image:linear-gradient(to_right,transparent_0,#000_4px,#000_calc(100%-4px),transparent_100%)]',
        '[scrollbar-color:var(--color-border-custom)_transparent]',
        'hover:scrollbar-color-[var(--color-soft)_transparent]',
        '[&::-webkit-scrollbar]:h-2.5',
        '[&::-webkit-scrollbar-track]:bg-transparent',
        '[&::-webkit-scrollbar-track]:mx-1.5',
        '[&::-webkit-scrollbar-thumb]:bg-border-custom',
        '[&::-webkit-scrollbar-thumb]:rounded-[5px]',
        '[&::-webkit-scrollbar-thumb]:border-2',
        '[&::-webkit-scrollbar-thumb]:border-solid',
        '[&::-webkit-scrollbar-thumb]:border-transparent',
        '[&::-webkit-scrollbar-thumb]:bg-clip-content',
        '[&::-webkit-scrollbar-thumb]:hover:bg-soft',
        '[&::-webkit-scrollbar-thumb]:hover:bg-clip-content',
        'max-md:[scrollbar-width:none]',
        'max-md:[&::-webkit-scrollbar]:h-0',
        'max-sm:mx-2.5',
        'max-sm:px-2.5',
        'max-sm:[mask-image:none]',
        'max-sm:[-webkit-mask-image:none]',
      )}
      style={{ touchAction: 'pan-y' } as React.CSSProperties}
    >
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          tab={tab}
          activeTab={activeTab}
          onSwitch={onSwitch}
          isDragging={isDragging}
        />
      ))}
    </nav>
  );
});
