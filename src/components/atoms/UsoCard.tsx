import { useState, useCallback } from 'react';

interface UsoCardProps {
  icon: string;
  name: string;
  desc: string;
  details?: string;
}

export function UsoCard({ icon, name, desc, details }: UsoCardProps) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  return (
    <div
      className="uso-card"
      style={{
        cursor: details ? 'pointer' : undefined,
        borderColor: open ? 'var(--accent)44' : 'var(--border)',
        transition: 'border-color 0.2s',
      }}
      onClick={details ? toggle : undefined}
      onKeyDown={details ? (e) => { if (e.key === 'Enter' || e.key === ' ') toggle(); } : undefined}
      role={details ? 'button' : undefined}
      tabIndex={details ? 0 : undefined}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        {icon && <div className="uso-icon">{icon}</div>}
        <div style={{ flex: 1 }}>
          <div className="uso-name">{name}</div>
          <div className="uso-desc">{desc}</div>
          {details && (
            <>
              <div
                style={{
                  fontSize: 10,
                  color: open ? 'var(--accent)' : 'var(--muted)',
                  marginTop: 8,
                  fontFamily: '"JetBrains Mono", monospace',
                  transition: 'color 0.2s',
                }}
              >
                {open ? '▲ recolher' : '▼ detalhes'}
              </div>
              {open && (
                <div
                  style={{
                    marginTop: 10,
                    padding: 12,
                    background: 'var(--surface)',
                    borderRadius: 8,
                    border: '1px solid var(--border)',
                    fontSize: 12,
                    lineHeight: 1.7,
                    color: '#94a3b8',
                  }}
                >
                  {details}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
