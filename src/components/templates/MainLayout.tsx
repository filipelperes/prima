import { useState, useCallback } from 'react';
import { AppHeader } from '@/components/molecules/AppHeader';
import { TabBar } from '@/components/molecules/TabBar';
import SearchDialog from '@/components/molecules/SearchDialog';
import type { Tab } from '@/components/molecules/TabBar';
import { IntroTab } from '@/components/organisms/IntroTab';
import { CallTab } from '@/components/organisms/CallTab';
import { PutTab } from '@/components/organisms/PutTab';
import { GregasTab } from '@/components/organisms/GregasTab';
import { PremioTab } from '@/components/organisms/PremioTab';
import { AssimetriaTab } from '@/components/organisms/AssimetriaTab';
import { RiscosTab } from '@/components/organisms/RiscosTab';
import { GlossarioTab } from '@/components/organisms/GlossarioTab';
import EstrategiasTab from '@/components/organisms/EstrategiasTab';
import MontadorTab from '@/components/organisms/MontadorTab';
import GlobalTab from '@/components/organisms/GlobalTab';

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

export function MainLayout() {
  const [activeTab, setActiveTab] = useState('intro');
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSwitch = useCallback((id: string) => {
    setActiveTab(id);
  }, []);

  const handleSearchNavigate = useCallback((tabId: string) => {
    setActiveTab(tabId);
    setSearchOpen(false);
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case 'intro':
        return <IntroTab />;
      case 'estrategias':
        return <EstrategiasTab />;
      case 'montador':
        return <MontadorTab />;
      case 'call':
        return <CallTab />;
      case 'put':
        return <PutTab />;
      case 'gregas':
        return <GregasTab />;
      case 'premio':
        return <PremioTab />;
      case 'assimetria':
        return <AssimetriaTab />;
      case 'riscos':
        return <RiscosTab />;
      case 'global':
        return <GlobalTab />;
      case 'glossario':
        return <GlossarioTab />;
      default:
        return <IntroTab />;
    }
  };

  return (
    <div className="bg-bg min-h-screen">
      <div className="max-w-[1100px] mx-auto w-full px-4 lg:px-5 max-sm:px-0">
        <TabBar
          tabs={TABS}
          activeTab={activeTab}
          onSwitch={handleSwitch}
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
        <SearchDialog
          onClose={() => setSearchOpen(false)}
          onNavigate={handleSearchNavigate}
        />
      )}
    </div>
  );
}
