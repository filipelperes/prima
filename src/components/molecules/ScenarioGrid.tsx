import { ScenarioButton } from '@/components/atoms/ScenarioButton';

interface Scenario {
  label: string;
  onClick: () => void;
}

interface ScenarioGridProps {
  scenarios: Scenario[];
  activeIndex?: number;
}

export function ScenarioGrid({ scenarios, activeIndex }: ScenarioGridProps) {
  return (
    <div className="scenario-grid">
      {scenarios.map((s, i) => (
        <ScenarioButton key={i} label={s.label} onClick={s.onClick} isActive={i === activeIndex} />
      ))}
    </div>
  );
}
