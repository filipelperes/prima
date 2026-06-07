interface DecodeFieldProps {
  readonly label: string;
  readonly value: string;
  readonly color: string;
}

export function MontadorDecodeField({ label, value, color }: DecodeFieldProps) {
  return (
    <div>
      <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-1">
        {label}
      </div>
      <div className={`text-[13px] font-bold font-mono ${color}`}>
        {value}
      </div>
    </div>
  );
}
