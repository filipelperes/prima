import { useState, useCallback, lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { AppHeader } from '@/components/molecules/AppHeader';
import { TabBar } from '@/components/molecules/TabBar';
import type { Tab } from '@/components/molecules/TabBar';

const SearchDialog = lazy(() => import('@/components/molecules/SearchDialog'));

const IntroTab = lazy(() => import('@/components/organisms/IntroTab').then(m => ({ default: m.IntroTab })));
const CallTab = lazy(() => import('@/components/organisms/CallTab').then(m => ({ default: m.CallTab })));
const PutTab = lazy(() => import('@/components/organisms/PutTab').then(m => ({ default: m.PutTab })));
const GregasTab = lazy(() => import('@/components/organisms/GregasTab').then(m => ({ default: m.GregasTab })));
const PremioTab = lazy(() => import('@/components/organisms/PremioTab').then(m => ({ default: m.PremioTab })));
const AssimetriaTab = lazy(() => import('@/components/organisms/AssimetriaTab').then(m => ({ default: m.AssimetriaTab })));
const RiscosTab = lazy(() => import('@/components/organisms/RiscosTab').then(m => ({ default: m.RiscosTab })));
const GlossarioTab = lazy(() => import('@/components/organisms/GlossarioTab').then(m => ({ default: m.GlossarioTab })));
const EstrategiasTab = lazy(() => import('@/components/organisms/EstrategiasTab'));
const MontadorTab = lazy(() => import('@/components/organisms/MontadorTab'));
const GlobalTab = lazy(() => import('@/components/organisms/GlobalTab'));

const TAB_COMPONENTS: Record<string, LazyExoticComponent<ComponentType>> = {
  intro: IntroTab,
  call: CallTab,
  put: PutTab,
  gregas: GregasTab,
  premio: PremioTab,
  assimetria: AssimetriaTab,
  riscos: RiscosTab,
  glossario: GlossarioTab,
  estrategias: EstrategiasTab,
  montador: MontadorTab,
  global: GlobalTab,
};

const TABS: Tab[] = [
  { id: 'intro', label: 'Intro', icon: '📖' },
  { id: 'estrategias', label: 'Estratégias', icon: '🧩' },
  { id: 'montador', label: 'Montador', icon: '🔧' },
  { id: 'call', label: 'CALL', icon: '📈' },
  { id: 'put', label: 'PUT', icon: '📉' },
  { id: 'gregas', label: 'Gregas', icon: '🔬' },
  { id: 'premio', label: 'Prêmio', icon: '💰' },
  { id: 'assimetria', label: 'Assimetria', icon: '🎲' },
  { id: 'riscos', label: 'Riscos', icon: '⚠️' },
  { id: 'global', label: 'Global', icon: '🌎' },
  { id: 'glossario', label: 'Glossário', icon: '📚' },
];

const FALLBACK = <div className="flex justify-center py-16 text-muted text-sm">Carregando…</div>;

export function MainLayout() {
  const [activeTab, setActiveTab] = useState('intro');
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchNavigate = useCallback((tabId: string) => {
    setActiveTab(tabId);
    setSearchOpen(false);
  }, []);

  const renderTab = () => {
    const Component = TAB_COMPONENTS[activeTab] ?? IntroTab;
    return <Suspense fallback={FALLBACK}><Component /></Suspense>;
  };

  return (
    <div className="bg-bg min-h-screen">
      <div className="max-w-[1100px] mx-auto w-full px-4 lg:px-5 max-sm:px-0">
        <TabBar
          tabs={TABS}
          activeTab={activeTab}
          onSwitch={setActiveTab}
        />
        <AppHeader
          onSearchClick={() => setSearchOpen(true)}
        />
        <div className="block max-md:px-3 max-md:pb-3 max-sm:px-2.5 max-sm:pb-2.5">{renderTab()}</div>
        <footer className="text-center py-5 text-[10px] text-soft border-t border-border-custom mt-3 max-md:px-3.5 max-md:py-4 max-sm:px-2.5 max-sm:py-3.5 max-sm:text-[9px]">
          <strong className="text-accent">Prima</strong> — Guia educacional · Não é recomendação de investimento · B3 · Mercado de Opções
        </footer>
      </div>

      {searchOpen && (
        <Suspense fallback={null}>
          <SearchDialog
            onClose={() => setSearchOpen(false)}
            onNavigate={handleSearchNavigate}
          />
        </Suspense>
      )}
    </div>
  );
}
