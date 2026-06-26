interface PremioBlockData {
  label: string;
  name: string;
  nameColor: string;
  bg: string;
  desc: string;
}

const blocks: PremioBlockData[] = [
  {
    label: 'Componente 1',
    name: 'Valor Intrínseco',
    nameColor: 'var(--color-green)',
    bg: '#00e67611',
    desc: `O quanto a opção já vale agora mesmo se exercida imediatamente. Só existe quando a opção está ITM.\n\nCALL: max(ação − strike, 0)\nPUT: max(strike − ação, 0)\n\nPETR4 = R$ 38, strike R$ 35 → Valor intrínseco = R$ 3,00\nPETR4 = R$ 38, strike R$ 45 → Valor intrínseco = R$ 0,00 (OTM)`,
  },
  {
    label: 'Componente 2',
    name: 'Valor Temporal',
    nameColor: 'var(--color-blue)',
    bg: '#4fc3f711',
    desc: `A esperança de que o mercado se mova até o vencimento. Presente em todas as opções — ITM, ATM e OTM.\n\nMaior quando: ATM + muito tempo + alta volatilidade.\n\nDerrete todo dia com o Theta. No vencimento, chega a zero.`,
  },
];

export function PremioDiagram() {
  return (
    <div className="border border-border-custom rounded-lg overflow-hidden mb-3">
      {blocks.map((b, i) => (
        <div key={i}>
          <div className="px-4 py-3.5" style={{ background: b.bg }}>
            <div className="text-[10px] tracking-[1px] text-muted uppercase font-mono mb-1">
              {b.label}
            </div>
            <div className="text-[15px] font-bold mb-1.5" style={{ color: b.nameColor }}>
              {b.name}
            </div>
            <div className="text-xs leading-relaxed text-text-secondary whitespace-pre-line">
              {b.desc}
            </div>
          </div>
          {i < blocks.length - 1 && (
            <div className="text-center py-1.5 text-xl text-muted font-black bg-surface">
              +
            </div>
          )}
        </div>
      ))}
      <div className="bg-accent/5 border-t border-accent/20 px-4 py-3.5">
        <div className="text-[10px] tracking-[1px] text-accent uppercase font-mono mb-1">
          Total
        </div>
        <div className="text-[15px] font-bold text-accent mb-1.5">
          Prêmio = soma dos dois
        </div>
        <div className="text-xs leading-relaxed text-text-secondary">
          Uma OTM tem apenas valor temporal (pura esperança). Uma ITM profunda
          tem principalmente valor intrínseco com pouco temporal. ATM tem o
          maior valor temporal absoluto.
        </div>
      </div>
    </div>
  );
}
