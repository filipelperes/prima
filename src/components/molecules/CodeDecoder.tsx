import { useState, useCallback, memo } from 'react';
import { decodeB3, decodeB3Weekly, smartSearch, EXAMPLES, type DecodeResult } from '@/data/decoder';
import { Tag } from '@/components/atoms/Tag';

const SuggestionButton = memo(function SuggestionButton({ suggestion, onDecode }: { suggestion: DecodeResult; onDecode: (code: string) => void }) {
  return (
    <button
      onClick={() => onDecode(suggestion.raw)}
      className="block w-full text-left bg-transparent border-none border-b border-border-custom px-1 py-2 cursor-pointer text-text font-mono text-xs transition-colors duration-150 last:border-b-0 hover:bg-accent/5 dark:hover:bg-accent/[0.07]"
    >
      <span className="text-accent">{suggestion.raw}</span>
      <span className="text-muted ml-2 font-sans">
        {suggestion.type} · {suggestion.month}
      </span>
    </button>
  );
});

const ExampleButtons = memo(function ExampleButtons({ onDecode }: { onDecode: (code: string) => void }) {
  return (
    <div className="flex gap-1.5 flex-wrap mb-3.5">
      {EXAMPLES.map((ex) => (
        <button
          key={ex.code}
          onClick={() => onDecode(ex.code)}
          className="bg-surface border border-border-custom rounded-md px-2.5 py-1 cursor-pointer text-accent font-mono text-xs transition-all duration-200 hover:bg-accent/10 dark:hover:bg-accent/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {ex.code}
        </button>
      ))}
    </div>
  );
});

export function CodeDecoder() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ReturnType<typeof decodeB3>>(null);
  const [suggestions, setSuggestions] = useState<ReturnType<typeof smartSearch>>([]);

  const handleDecode = useCallback((code: string) => {
    setInput(code);
    const r = decodeB3(code) ?? decodeB3Weekly(code) ?? null;
    setResult(r);
    if (code.length >= 4 && !r) {
      const s = smartSearch(code);
      setSuggestions(s.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleDecode(e.target.value);
  }, [handleDecode]);

  const statusColor =
    result?.type === 'CALL'
      ? 'var(--color-green)'
      : 'var(--color-red)';

  const isWeekly = result?.week !== undefined;

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Digite um código... ex: PETRH21"
          className="flex-1 bg-surface border rounded-lg px-4 py-2.5 text-text font-mono text-[15px] font-bold outline-none tracking-wider transition-colors duration-200
            placeholder:text-soft focus:border-accent dark:focus:border-accent"
          style={{ borderColor: result ? statusColor : 'var(--color-border-custom)' }}
        />
      </div>

      <ExampleButtons onDecode={handleDecode} />

      {result && (
        <div
          className="bg-surface rounded-xl p-4"
          style={{ border: `1px solid color-mix(in srgb, ${statusColor} 27%, transparent)` }}
        >
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            <DecodeField label="Ativo" value={result.asset} color="var(--color-accent)" />
            <DecodeField
              label="Tipo"
              value={result.type}
              color={statusColor}
              badge={result.type === 'CALL' ? 'green' : 'red'}
            />
            <DecodeField label="Strike" value={`R$ ${result.strike.toFixed(1)}`} color="var(--color-yellow)" />
            <DecodeField
              label="Vencimento"
              value={`${result.month}${isWeekly ? ` — Semana ${result.week}` : ` (mês ${result.monthNum})`}`}
              color="var(--color-purple)"
            />
          </div>
        </div>
      )}

      {suggestions.length > 0 && !result && (
        <div className="mt-2 p-3 bg-surface border border-border-custom rounded-xl">
          <div className="text-[9px] text-muted tracking-[1px] uppercase font-mono mb-2">
            Sugestões
          </div>
          {suggestions.map((s) => (
            <SuggestionButton key={s.raw} suggestion={s} onDecode={handleDecode} />
          ))}
          <div className="text-[10px] text-muted mt-1.5 text-center">
            O número no código NÃO é necessariamente o strike real — consulte sua plataforma
          </div>
        </div>
      )}

      {!result && suggestions.length === 0 && input.length >= 6 && (
        <div className="text-xs text-red mt-2">
          Código inválido. Use o formato: 4 letras ativo + 1 letra série + strike (ex: PETRH21) ou opções semanais (ex: B3SAB11W1)
        </div>
      )}
    </div>
  );
}

const DecodeField = memo(function DecodeField({
  label,
  value,
  color,
  badge,
}: {
  label: string;
  value: string;
  color: string;
  badge?: 'green' | 'red';
}) {
  return (
    <div>
      <div className="text-[9px] text-muted tracking-[1px] uppercase font-mono mb-1">
        {label}
      </div>
      <div className="text-sm font-bold font-mono flex items-center gap-1.5" style={{ color }}>
        {badge && <Tag variant={badge}>{value}</Tag>}
        {!badge && value}
      </div>
    </div>
  );
});
