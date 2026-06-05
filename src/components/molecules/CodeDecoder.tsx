import { useState, useCallback, useMemo } from 'react';
import { decodeB3, decodeB3Weekly, smartSearch, EXAMPLES } from '@/data/decoder';
import { Tag } from '@/components/atoms/Tag';

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

  const statusColor =
    result?.type === 'CALL'
      ? 'var(--green)'
      : 'var(--red)';

  const isWeekly = result?.week !== undefined;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 12,
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => handleDecode(e.target.value)}
          placeholder="Digite um código... ex: PETRH21"
          style={{
            flex: 1,
            background: 'var(--surface)',
            border: `1px solid ${result ? statusColor : 'var(--border)'}`,
            borderRadius: 8,
            padding: '10px 12px',
            color: 'var(--text)',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 15,
            fontWeight: 700,
            outline: 'none',
            letterSpacing: 1,
            transition: 'border 0.2s',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          marginBottom: 14,
        }}
      >
        {EXAMPLES.map((ex) => (
          <button
            key={ex.code}
            onClick={() => handleDecode(ex.code)}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '4px 10px',
              cursor: 'pointer',
              color: 'var(--accent)',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 12,
              transition: 'all 0.2s',
            }}
          >
            {ex.code}
          </button>
        ))}
      </div>

      {result && (
        <div
          style={{
            background: 'var(--surface)',
            border: `1px solid ${statusColor}44`,
            borderRadius: 12,
            padding: 16,
          }}
        >
          <div className="grid-2" style={{ gap: 10 }}>
            <DecodeField label="Ativo" value={result.asset} color="var(--accent)" />
            <DecodeField
              label="Tipo"
              value={result.type}
              color={statusColor}
              badge={result.type === 'CALL' ? 'green' : 'red'}
            />
            <DecodeField label="Strike" value={`R$ ${result.strike.toFixed(1)}`} color="var(--yellow)" />
            <DecodeField
              label="Vencimento"
              value={`${result.month}${isWeekly ? ` — Semana ${result.week}` : ` (mês ${result.monthNum})`}`}
              color="var(--purple)"
            />
          </div>
        </div>
      )}

      {suggestions.length > 0 && !result && (
        <div
          style={{
            marginTop: 8,
            padding: 12,
            background: 'var(--surface)',
            borderRadius: 10,
            border: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              fontSize: 9,
              color: 'var(--muted)',
              letterSpacing: 1,
              textTransform: 'uppercase',
              fontFamily: '"JetBrains Mono", monospace',
              marginBottom: 8,
            }}
          >
            Sugestões
          </div>
          {suggestions.map((s) => (
            <button
              key={s.raw}
              onClick={() => handleDecode(s.raw)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid var(--border)',
                padding: '8px 4px',
                cursor: 'pointer',
                color: 'var(--text)',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 12,
                transition: 'background 0.15s',
              }}
            >
              <span style={{ color: 'var(--accent)' }}>{s.raw}</span>
              <span style={{ color: 'var(--muted)', marginLeft: 8, fontFamily: '"Space Grotesk", sans-serif' }}>
                {s.type} · {s.month}
              </span>
            </button>
          ))}
          <div
            style={{
              fontSize: 10,
              color: 'var(--muted)',
              marginTop: 6,
              textAlign: 'center',
            }}
          >
            O número no código NÃO é necessariamente o strike real — consulte sua plataforma
          </div>
        </div>
      )}

      {!result && suggestions.length === 0 && input.length >= 6 && (
        <div
          style={{
            fontSize: 12,
            color: 'var(--red)',
            padding: '8px 0',
          }}
        >
          Código inválido. Use o formato: 4 letras ativo + 1 letra série + strike (ex: PETRH21) ou opções semanais (ex: B3SAB11W1)
        </div>
      )}
    </div>
  );
}

function DecodeField({
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
      <div
        style={{
          fontSize: 9,
          color: 'var(--muted)',
          letterSpacing: 1,
          textTransform: 'uppercase',
          fontFamily: '"JetBrains Mono", monospace',
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color,
          fontFamily: '"JetBrains Mono", monospace',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {badge && <Tag variant={badge}>{value}</Tag>}
        {!badge && value}
      </div>
    </div>
  );
}
