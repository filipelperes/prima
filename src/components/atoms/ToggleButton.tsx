interface ToggleButtonProps {
  label: string;
  active: boolean;
  variant: 'green' | 'red';
  onClick: () => void;
}

export function ToggleButton({ label, active, variant, onClick }: ToggleButtonProps) {
  const activeClass =
    variant === 'green' ? 'active-green' : 'active-red';
  return (
    <button
      className={`toggle-btn ${active ? activeClass : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
