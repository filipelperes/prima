import { useState, useCallback } from 'react';
import { CodeDecoder } from '@/components/molecules/CodeDecoder';
import { decodeB3, decodeB3Weekly } from '@/data/decoder';
import type { DecodeResult } from '@/data/decoder';

/* ── Constantes ── */

const ASSET_NAMES: Record<string, string> = {
  PETR: 'Petrobras PN',
  VALE: 'Vale ON',
  ITUB: 'Itaú Unibanco',
  BBDC: 'Bradesco',
  ABEV: 'Ambev',
  BBAS: 'Banco do Brasil',
  ELET: 'Eletrobras',
  SANB: 'Santander',
  B3SA: 'B3',
  WEGE: 'WEG',
  RENT: 'Localiza',
  JBSS: 'JBS',
  SUZB: 'Suzano',
  CMIN: 'CSN Mineração',
  UGPA: 'Ultrapar',
  RDOR: "Rede D'Or",
  HAPV: 'Hapvida',
  ENGI: 'Engie',
  EQTL: 'Equatorial',
  CPLE: 'Copel',
  PRIO: 'PetroRio',
  RECV: 'PetroRecôncavo',
  CXSE: 'Caixa Seguridade',
  ENEV: 'Eneva',
  LOGG: 'Log-In',
  IRBR: 'IRB Brasil',
  MULT: 'Multiplan',
  NTCO: 'Natura',
  RAIL: 'Rumo Logística',
  BRAP: 'Bradespar',
  BRFS: 'BRF',
  CSAN: 'Cosan',
  CPFE: 'CPFL Energia',
  EGIE: 'Engie Brasil',
  FLRY: 'Fleury',
  GGBR: 'Gerdau',
  GOAU: 'Gerdau Met',
  HYPE: 'Hypera',
  KLBN: 'Klabin',
  LREN: 'Lojas Renner',
  MRFG: 'Marfrig',
  MRVE: 'MRV',
  RADL: 'Raia Drogasil',
  RRRP: '3R Petroleum',
  SBSP: 'Sabesp',
  TAEE: 'Taesa',
  TIMB: 'Tim',
  TOTS: 'TOTVS',
  USIM: 'Usiminas',
  VIVT: 'Telefônica Brasil',
  YDUQ: 'Yduqs',
  AZUL: 'Azul',
  CVCB: 'CVC',
  GOLL: 'Gol',
  MGLU: 'Magazine Luiza',
  VIIA: 'Via',
  AMER: 'Americanas',
  BOVA: 'BOVA11',
  IVVB: 'IVVB11',
  SMAL: 'SMAL11',
  MATB: 'MATB11',
  SPXI: 'SPXI11',
};

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const CALL_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
const PUT_LETTERS = ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'];

interface Example {
  code: string;
  asset: string;
  type: 'CALL' | 'PUT';
  month: string;
  strike: number;
}

const EXAMPLES_RAPIDOS: Example[] = [
  { code: 'PETRH21', asset: 'PETR', type: 'CALL', month: 'Agosto', strike: 21 },
  { code: 'VALEK42', asset: 'VALE', type: 'CALL', month: 'Novembro', strike: 42 },
  { code: 'PETRM18', asset: 'PETR', type: 'PUT', month: 'Janeiro', strike: 18 },
  { code: 'ITUBM35', asset: 'ITUB', type: 'PUT', month: 'Janeiro', strike: 35 },
  { code: 'B3SAB11W1', asset: 'B3SA', type: 'CALL', month: 'Fevereiro', strike: 11 },
  { code: 'PETRC32W2', asset: 'PETR', type: 'CALL', month: 'Março', strike: 32 },
];

/* ── Helpers ── */

function getSeriesLetter(type: 'CALL' | 'PUT', month: string): string {
  const idx = MONTHS.indexOf(month);
  if (idx === -1) return '?';
  return type === 'CALL' ? CALL_LETTERS[idx] : PUT_LETTERS[idx];
}

/* ── Componente principal ── */

export default function MontadorTab() {
  const [asset, setAsset] = useState('');
  const [type, setType] = useState<'CALL' | 'PUT'>('CALL');
  const [month, setMonth] = useState('');
  const [strike, setStrike] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [decodedExample, setDecodedExample] = useState<DecodeResult | null>(null);

  const allFilled = asset.length > 0 && month.length > 0 && strike.length > 0;

  const generateCode = useCallback(() => {
    if (!allFilled) return;
    const letter = getSeriesLetter(type, month);
    const strikeNum = Math.round(parseFloat(strike));
    const code = `${asset.toUpperCase()}${letter}${strikeNum}`;
    setGeneratedCode(code);
    // Decodifica o código gerado para exibir o resultado
    const decoded = decodeB3(code) ?? decodeB3Weekly(code);
    setDecodedExample(decoded);
  }, [asset, type, month, strike, allFilled]);

  const handleExample = useCallback((ex: Example) => {
    setAsset(ex.asset);
    setType(ex.type);
    setMonth(ex.month);
    setStrike(String(ex.strike));
    setGeneratedCode(ex.code);
    const decoded = decodeB3(ex.code) ?? decodeB3Weekly(ex.code);
    setDecodedExample(decoded);
  }, []);

  const labelStyle: React.CSSProperties = {
    fontSize: 10,
    color: 'var(--muted)',
    marginBottom: 4,
  };

  const sectionHeader: React.CSSProperties = {
    fontSize: 9,
    color: 'var(--muted)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: '"JetBrains Mono", monospace',
    marginBottom: 12,
  };

  return (
    <>
      {/* ── Card 1: Montador de Opções B3 ── */}
      <div className="card">
        <div className="card-header">🧩 Montador de Opções B3</div>

        {/* Exemplos rápidos */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
            marginBottom: 16,
          }}
        >
          {EXAMPLES_RAPIDOS.map((ex) => (
            <button
              key={ex.code}
              onClick={() => handleExample(ex)}
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

        {/* Grid 2 colunas: Codificador | Decodificador */}
        <div className="grid-2">
          {/* ── CODIFICADOR ── */}
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div style={sectionHeader}>CODIFICADOR</div>

            {/* Ativo */}
            <div style={{ marginBottom: 10 }}>
              <div style={labelStyle}>Ativo</div>
              <input
                list="asset-list"
                value={asset}
                onChange={(e) => setAsset(e.target.value.toUpperCase())}
                placeholder="Ex: PETR"
                style={{
                  width: '100%',
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  padding: '8px 10px',
                  color: 'var(--text)',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
              <datalist id="asset-list">
                {Object.keys(ASSET_NAMES).map((code) => (
                  <option key={code} value={code} label={ASSET_NAMES[code]} />
                ))}
              </datalist>
            </div>

            {/* Tipo */}
            <div style={{ marginBottom: 10 }}>
              <div style={labelStyle}>Tipo</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['CALL', 'PUT'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    style={{
                      flex: 1,
                      padding: '7px 0',
                      borderRadius: 6,
                      border: `1px solid ${
                        type === t
                          ? t === 'CALL'
                            ? 'var(--green)'
                            : 'var(--red)'
                          : 'var(--border)'
                      }`,
                      background:
                        type === t
                          ? t === 'CALL'
                            ? '#00e67611'
                            : '#ff3d5711'
                          : 'transparent',
                      color:
                        type === t
                          ? t === 'CALL'
                            ? 'var(--green)'
                            : 'var(--red)'
                          : 'var(--muted)',
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Mês */}
            <div style={{ marginBottom: 10 }}>
              <div style={labelStyle}>Mês de vencimento</div>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  padding: '8px 10px',
                  color: 'var(--text)',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: 13,
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="">Selecione</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m} ({getSeriesLetter(type, m)})
                  </option>
                ))}
              </select>
            </div>

            {/* Strike */}
            <div style={{ marginBottom: 10 }}>
              <div style={labelStyle}>Strike (R$)</div>
              <input
                type="number"
                value={strike}
                onChange={(e) => setStrike(e.target.value)}
                placeholder="Ex: 21"
                min="0"
                step="0.01"
                style={{
                  width: '100%',
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  padding: '8px 10px',
                  color: 'var(--text)',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
            </div>

            {/* Botão Gerar */}
            <button
              onClick={generateCode}
              disabled={!allFilled}
              style={{
                width: '100%',
                padding: '10px 0',
                borderRadius: 8,
                border: 'none',
                background: allFilled ? 'var(--accent)' : 'var(--border)',
                color: allFilled ? '#fff' : 'var(--muted)',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 13,
                fontWeight: 700,
                cursor: allFilled ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
              }}
            >
              Gerar Código
            </button>

            {/* Código gerado */}
            {generatedCode && (
              <div
                style={{
                  marginTop: 12,
                  background: 'var(--card)',
                  border: '1px solid var(--accent)',
                  borderRadius: 10,
                  padding: 14,
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    color: 'var(--muted)',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    fontFamily: '"JetBrains Mono", monospace',
                    marginBottom: 6,
                  }}
                >
                  Código Gerado
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    fontFamily: '"JetBrains Mono", monospace',
                    letterSpacing: 2,
                  }}
                >
                  {generatedCode}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: '#94a3b8',
                    marginTop: 6,
                  }}
                >
                  {asset} · {type} · {month}
                </div>
              </div>
            )}
          </div>

          {/* ── DECODIFICADOR ── */}
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div style={sectionHeader}>DECODIFICADOR</div>
            <CodeDecoder />

            {/* Resultado decodificado (via exemplo ou código gerado) */}
            {decodedExample && generatedCode && (
              <div
                style={{
                  marginTop: 12,
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: 12,
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
                  Decodificação de {generatedCode}
                </div>
                <div className="grid-2" style={{ gap: 8 }}>
                  <DecodeField
                    label="Ativo"
                    value={decodedExample.asset}
                    color="var(--accent)"
                  />
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
                      Tipo
                    </div>
                    <span
                      className={
                        decodedExample.type === 'CALL'
                          ? 'tag tag-green'
                          : 'tag tag-red'
                      }
                    >
                      {decodedExample.type}
                    </span>
                  </div>
                  <DecodeField
                    label="Strike"
                    value={`R$ ${decodedExample.strike.toFixed(1)}`}
                    color="var(--yellow)"
                  />
                  <DecodeField
                    label="Vencimento"
                    value={
                      decodedExample.week !== undefined
                        ? `${decodedExample.month} — Semana ${decodedExample.week}`
                        : decodedExample.month
                    }
                    color="var(--purple)"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Card 2: Tabela de Referência das Séries ── */}
      <div className="card">
        <div className="card-header">📋 Tabela de Referência das Séries</div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 2,
            fontSize: 12,
          }}
        >
          {/* Cabeçalho */}
          {['CALL', 'Mês', 'PUT'].map((h) => (
            <div
              key={h}
              style={{
                padding: '6px 4px',
                textAlign: 'center',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10,
                fontWeight: 700,
                color: 'var(--muted)',
                letterSpacing: 1,
                textTransform: 'uppercase',
                background: 'var(--surface)',
                borderRadius: 4,
                marginBottom: 2,
              }}
            >
              Letra {h}
            </div>
          ))}

          {/* Linhas: CALL letter | Mês | PUT letter */}
          {MONTHS.flatMap((m, i) => [
            <div
              key={`${m}-call`}
              style={{
                padding: '6px 4px',
                textAlign: 'center',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--green)',
                background: '#00e67608',
                borderRadius: 4,
              }}
            >
              {CALL_LETTERS[i]}
            </div>,
            <div
              key={`${m}-month`}
              style={{
                padding: '6px 4px',
                textAlign: 'center',
                color: 'var(--text)',
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: 13,
              }}
            >
              {m}
            </div>,
            <div
              key={`${m}-put`}
              style={{
                padding: '6px 4px',
                textAlign: 'center',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--red)',
                background: '#ff3d5708',
                borderRadius: 4,
              }}
            >
              {PUT_LETTERS[i]}
            </div>,
          ])}
        </div>
      </div>

      {/* ── Card 3: Como funciona o código B3 ── */}
      <div className="card">
        <div className="card-header">
          💡 Como funciona o código B3
        </div>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.8,
            color: '#94a3b8',
            marginBottom: 12,
          }}
        >
          O código de uma opção na B3 segue o formato{' '}
          <strong style={{ color: 'var(--text)' }}>AAAA B NNN</strong>:
        </p>
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 12,
            padding: 14,
            marginBottom: 12,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            lineHeight: 1.8,
          }}
        >
          <div>
            <span style={{ color: 'var(--accent)' }}>AAAA</span>{' '}
            <span style={{ color: 'var(--muted)' }}>
              — código do ativo (4 letras, ex: PETR, VALE)
            </span>
          </div>
          <div>
            <span style={{ color: 'var(--green)' }}>B</span>{' '}
            <span style={{ color: 'var(--muted)' }}>
              — letra da série: A–L para CALL, M–X para PUT
            </span>
          </div>
          <div>
            <span style={{ color: 'var(--yellow)' }}>NNN</span>{' '}
            <span style={{ color: 'var(--muted)' }}>
              — número identificador do strike
            </span>
          </div>
          <div style={{ marginTop: 8, color: '#4a9eff88' }}>
            <span className="comment">// Exemplo: PETRH21</span>
          </div>
          <div>
            PETR <span style={{ color: 'var(--green)', fontWeight: 700 }}>H</span>
            {' '}21 → Petrobras{' '}
            <span style={{ color: 'var(--green)', fontWeight: 700 }}>CALL</span>{' '}
            Agosto, strike ≈ R$ 21
          </div>
        </div>
        <div
          style={{
            background: '#ffd54f11',
            border: '1px solid #ffd54f22',
            borderRadius: 8,
            padding: 10,
            fontSize: 12,
            color: '#94a3b8',
            lineHeight: 1.7,
          }}
        >
          <strong style={{ color: 'var(--yellow)' }}>
            ⚠ O número no código NÃO é necessariamente o strike real{' '}
          </strong>
          — a B3 usa um identificador numérico que pode divergir do valor de
          exercício. Consulte sua plataforma para confirmar os dados.
        </div>
      </div>
    </>
  );
}

/* ── Componente auxiliar interno ── */

function DecodeField({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
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
          fontSize: 13,
          fontWeight: 700,
          color,
          fontFamily: '"JetBrains Mono", monospace',
        }}
      >
        {value}
      </div>
    </div>
  );
}
