import { memo } from 'react';
import { GlobalIntroCard } from '@/components/organisms/GlobalIntroCard';
import { GlobalMarketsGrid } from '@/components/organisms/GlobalMarketsGrid';
import { GlobalDidYouKnowCard } from '@/components/organisms/GlobalDidYouKnowCard';
import { GlobalStudyResourcesCard } from '@/components/organisms/GlobalStudyResourcesCard';
import { GlobalTermsTable } from '@/components/organisms/GlobalTermsTable';
import { GlobalBrazilContextCard } from '@/components/organisms/GlobalBrazilContextCard';

export const GlobalTab = memo(function GlobalTab() {
  return (
    <>
      <GlobalIntroCard />
      <GlobalMarketsGrid />
      <GlobalDidYouKnowCard />
      <GlobalStudyResourcesCard />
      <GlobalTermsTable />
      <GlobalBrazilContextCard />
    </>
  );
});
