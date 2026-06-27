import { memo } from 'react';
import { ScenarioButton } from '@/components/atoms/ScenarioButton';

interface Scenario {
  label: string;
  onClick: () => void;
}

interface ScenarioGridProps {
  scenarios: Scenario[];
  activeIndex?: number;
}

export const ScenarioGrid = memo(function ScenarioGrid({ scenarios, activeIndex }: ScenarioGridProps) {
  return (
    <div className="grid grid-cols-2 gap-1.5 mb-3 max-sm:grid-cols-1">
      {scenarios.map((s, i) => (
        <ScenarioButton key={s.label} label={s.label} onClick={s.onClick} isActive={i === activeIndex} />
      ))}
    </div>
  );
});
