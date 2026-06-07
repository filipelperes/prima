import { CALL_LETTERS, MONTHS, PUT_LETTERS, type OptionType, getSeriesLetter } from '@/components/organisms/montadorData';

export function MontadorReferenceCards() {
  return (
    <>
      <SeriesReferenceCard />
      <B3CodeGuideCard />
    </>
  );
}

function SeriesReferenceCard() {
  return (
    <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
      <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">📋 Tabela de Referência das Séries</div>
      <div className="grid grid-cols-3 gap-0.5 text-xs">
        {['CALL', 'Mês', 'PUT'].map((heading) => (
          <div key={heading} className="px-1 py-1.5 text-center font-mono text-[10px] font-bold text-muted tracking-[1px] uppercase bg-surface rounded mb-0.5">
            Letra {heading}
          </div>
        ))}
        {MONTHS.flatMap((month, index) => [
          <ReferenceCell key={`${month}-call`} color="text-green" bg="bg-[#00e67608]">
            {CALL_LETTERS[index]}
          </ReferenceCell>,
          <div key={`${month}-month`} className="px-1 py-1.5 text-center text-text font-sans text-xs">
            {month}
          </div>,
          <ReferenceCell key={`${month}-put`} color="text-red" bg="bg-[#ff3d5708]">
            {PUT_LETTERS[index]}
          </ReferenceCell>,
        ])}
      </div>
    </div>
  );
}

function ReferenceCell({ children, color, bg }: { readonly children: string; readonly color: string; readonly bg: string }) {
  return (
    <div className={`px-1 py-1.5 text-center font-mono text-sm font-bold rounded ${color} ${bg}`}>
      {children}
    </div>
  );
}

function B3CodeGuideCard() {
  return (
    <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
      <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
        💡 Como funciona o código B3
      </div>
      <p className="text-[13px] leading-[1.8] text-slate-400 mb-3">
        O código de uma opção na B3 segue o formato <strong className="text-text">AAAA B NNN</strong>:
      </p>
      <CodeFormula />
      <div className="bg-[#ffd54f11] border border-[#ffd54f22] rounded-md p-2.5 text-xs text-slate-400 leading-[1.7]">
        <strong className="text-yellow">⚠ O número no código NÃO é necessariamente o strike real </strong>
        — a B3 usa um identificador numérico que pode divergir do valor de exercício. Consulte sua plataforma para confirmar os dados.
      </div>
    </div>
  );
}

function CodeFormula() {
  return (
    <div className="bg-surface rounded-lg p-3.5 mb-3 font-mono text-xs leading-[1.8]">
      <FormulaLine token="AAAA" color="text-accent" text="— código do ativo (4 letras, ex: PETR, VALE)" />
      <FormulaLine token="B" color="text-green" text="— letra da série: A–L para CALL, M–X para PUT" />
      <FormulaLine token="NNN" color="text-yellow" text="— número identificador do strike" />
      <div className="mt-2 text-[11px] text-[#4a9eff88]">
        <span>// Exemplo: PETRH21</span>
      </div>
      <div>
        PETR <span className="text-green font-bold">{getSeriesLetter('CALL' satisfies OptionType, 'Agosto')}</span> 21 → Petrobras{' '}
        <span className="text-green font-bold">CALL</span> Agosto, strike ≈ R$ 21
      </div>
    </div>
  );
}

function FormulaLine({ token, color, text }: { readonly token: string; readonly color: string; readonly text: string }) {
  return (
    <div>
      <span className={color}>{token}</span> <span className="text-muted">{text}</span>
    </div>
  );
}
