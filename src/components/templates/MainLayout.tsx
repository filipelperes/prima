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
    <div className="app-wrapper">
      <div className="app-container">
        <TabBar
          tabs={TABS}
          activeTab={activeTab}
          onSwitch={handleSwitch}
        />
        <AppHeader
          onSearchClick={() => setSearchOpen(true)}
        />
        <div className="tab-pane active">{renderTab()}</div>
        <div className="footer">
          <strong style={{ color: 'var(--accent)' }}>Prima</strong> — Guia educacional · Não é recomendação de investimento · B3 · Mercado de Opções
        </div>
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
