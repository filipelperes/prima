import { useState, useCallback } from 'react';
import { CodeDecoder } from '@/components/molecules/CodeDecoder';
import { Tag } from '@/components/atoms/Tag';
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

  return (
    <>
      {/* ── Card 1: Montador de Opções B3 ── */}
      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">🧩 Montador de Opções B3</div>

        {/* Exemplos rápidos */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {EXAMPLES_RAPIDOS.map((ex) => (
            <button
              key={ex.code}
              onClick={() => handleExample(ex)}
              className="bg-surface border border-border-custom rounded-sm px-2.5 py-1 cursor-pointer text-accent font-mono text-xs transition-all duration-200"
            >
              {ex.code}
            </button>
          ))}
        </div>

        {/* Grid 2 colunas: Codificador | Decodificador */}
        <div className="grid grid-cols-2 gap-2">
          {/* ── CODIFICADOR ── */}
          <div className="bg-surface rounded-[10px] p-3.5">
            <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-3">CODIFICADOR</div>

            {/* Ativo */}
            <div className="mb-2.5">
              <div className="text-[10px] text-muted mb-1">Ativo</div>
              <input
                list="asset-list"
                value={asset}
                onChange={(e) => setAsset(e.target.value.toUpperCase())}
                placeholder="Ex: PETR"
                className="w-full bg-card-custom border border-border-custom rounded-sm px-2.5 py-2 text-text font-mono text-xs outline-none"
              />
              <datalist id="asset-list">
                {Object.keys(ASSET_NAMES).map((code) => (
                  <option key={code} value={code} label={ASSET_NAMES[code]} />
                ))}
              </datalist>
            </div>

            {/* Tipo */}
            <div className="mb-2.5">
              <div className="text-[10px] text-muted mb-1">Tipo</div>
              <div className="flex gap-1.5">
                {(['CALL', 'PUT'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`flex-1 py-[7px] rounded-sm border font-mono text-xs font-bold cursor-pointer transition-all duration-200 ${
                      type === t
                        ? t === 'CALL'
                          ? 'bg-[#00e67611] border-green text-green'
                          : 'bg-[#ff3d5711] border-red text-red'
                        : 'border-border-custom text-muted bg-transparent'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Mês */}
            <div className="mb-2.5">
              <div className="text-[10px] text-muted mb-1">Mês de vencimento</div>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full bg-card-custom border border-border-custom rounded-sm px-2.5 py-2 text-text font-sans text-xs outline-none cursor-pointer"
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
            <div className="mb-2.5">
              <div className="text-[10px] text-muted mb-1">Strike (R$)</div>
              <input
                type="number"
                value={strike}
                onChange={(e) => setStrike(e.target.value)}
                placeholder="Ex: 21"
                min="0"
                step="0.01"
                className="w-full bg-card-custom border border-border-custom rounded-sm px-2.5 py-2 text-text font-mono text-xs outline-none"
              />
            </div>

            {/* Botão Gerar */}
            <button
              onClick={generateCode}
              disabled={!allFilled}
              className={`w-full py-2.5 rounded-md border-none font-mono text-xs font-bold transition-all duration-200 ${
                allFilled
                  ? 'bg-accent text-white cursor-pointer'
                  : 'bg-border-custom text-muted cursor-not-allowed'
              }`}
            >
              Gerar Código
            </button>

            {/* Código gerado */}
            {generatedCode && (
              <div className="mt-3 bg-card-custom border border-accent rounded-[10px] p-3.5 text-center">
                <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-1.5">
                  Código Gerado
                </div>
                <div className="text-[22px] font-bold text-accent font-mono tracking-[2px]">
                  {generatedCode}
                </div>
                <div className="text-[11px] text-slate-400 mt-1.5">
                  {asset} · {type} · {month}
                </div>
              </div>
            )}
          </div>

          {/* ── DECODIFICADOR ── */}
          <div className="bg-surface rounded-[10px] p-3.5">
            <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-3">DECODIFICADOR</div>
            <CodeDecoder />

            {/* Resultado decodificado (via exemplo ou código gerado) */}
            {decodedExample && generatedCode && (
              <div className="mt-3 bg-card-custom border border-border-custom rounded-[10px] p-3">
                <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-2">
                  Decodificação de {generatedCode}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <DecodeField
                    label="Ativo"
                    value={decodedExample.asset}
                    color="text-accent"
                  />
                  <div>
                    <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-1">
                      Tipo
                    </div>
                    <Tag
                      variant={
                        decodedExample.type === 'CALL' ? 'green' : 'red'
                      }
                    >
                      {decodedExample.type}
                    </Tag>
                  </div>
                  <DecodeField
                    label="Strike"
                    value={`R$ ${decodedExample.strike.toFixed(1)}`}
                    color="text-yellow"
                  />
                  <DecodeField
                    label="Vencimento"
                    value={
                      decodedExample.week !== undefined
                        ? `${decodedExample.month} — Semana ${decodedExample.week}`
                        : decodedExample.month
                    }
                    color="text-purple"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Card 2: Tabela de Referência das Séries ── */}
      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">📋 Tabela de Referência das Séries</div>
        <div className="grid grid-cols-3 gap-0.5 text-xs">
          {/* Cabeçalho */}
          {['CALL', 'Mês', 'PUT'].map((h) => (
            <div
              key={h}
              className="px-1 py-1.5 text-center font-mono text-[10px] font-bold text-muted tracking-[1px] uppercase bg-surface rounded mb-0.5"
            >
              Letra {h}
            </div>
          ))}

          {/* Linhas: CALL letter | Mês | PUT letter */}
          {MONTHS.flatMap((m, i) => [
            <div
              key={`${m}-call`}
              className="px-1 py-1.5 text-center font-mono text-sm font-bold text-green bg-[#00e67608] rounded"
            >
              {CALL_LETTERS[i]}
            </div>,
            <div
              key={`${m}-month`}
              className="px-1 py-1.5 text-center text-text font-sans text-xs"
            >
              {m}
            </div>,
            <div
              key={`${m}-put`}
              className="px-1 py-1.5 text-center font-mono text-sm font-bold text-red bg-[#ff3d5708] rounded"
            >
              {PUT_LETTERS[i]}
            </div>,
          ])}
        </div>
      </div>

      {/* ── Card 3: Como funciona o código B3 ── */}
      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          💡 Como funciona o código B3
        </div>
        <p className="text-[13px] leading-[1.8] text-slate-400 mb-3">
          O código de uma opção na B3 segue o formato{' '}
          <strong className="text-text">AAAA B NNN</strong>:
        </p>
        <div className="bg-surface rounded-lg p-3.5 mb-3 font-mono text-xs leading-[1.8]">
          <div>
            <span className="text-accent">AAAA</span>{' '}
            <span className="text-muted">
              — código do ativo (4 letras, ex: PETR, VALE)
            </span>
          </div>
          <div>
            <span className="text-green">B</span>{' '}
            <span className="text-muted">
              — letra da série: A–L para CALL, M–X para PUT
            </span>
          </div>
          <div>
            <span className="text-yellow">NNN</span>{' '}
            <span className="text-muted">
              — número identificador do strike
            </span>
          </div>
          <div className="mt-2 text-[11px] text-[#4a9eff88]">
            <span>// Exemplo: PETRH21</span>
          </div>
          <div>
            PETR <span className="text-green font-bold">H</span>
            {' '}21 → Petrobras{' '}
            <span className="text-green font-bold">CALL</span>{' '}
            Agosto, strike ≈ R$ 21
          </div>
        </div>
        <div className="bg-[#ffd54f11] border border-[#ffd54f22] rounded-md p-2.5 text-xs text-slate-400 leading-[1.7]">
          <strong className="text-yellow">
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
      <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-1">
        {label}
      </div>
      <div className={`text-[13px] font-bold font-mono ${color}`}>
        {value}
      </div>
    </div>
  );
}
