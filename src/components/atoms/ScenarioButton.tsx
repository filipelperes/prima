interface ScenarioButtonProps {
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

export function ScenarioButton({ label, onClick, isActive }: ScenarioButtonProps) {
  const className = `scenario-btn${isActive ? ' active' : ''}`;
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
}
