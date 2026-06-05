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
    nameColor: 'var(--green)',
    bg: '#00e67611',
    desc: `O quanto a opção já vale agora mesmo se exercida imediatamente. Só existe quando a opção está ITM.\n\nCALL: max(ação − strike, 0)\nPUT: max(strike − ação, 0)\n\nPETR4 = R$ 38, strike R$ 35 → Valor intrínseco = R$ 3,00\nPETR4 = R$ 38, strike R$ 45 → Valor intrínseco = R$ 0,00 (OTM)`,
  },
  {
    label: 'Componente 2',
    name: 'Valor Temporal',
    nameColor: 'var(--blue)',
    bg: '#4fc3f711',
    desc: `A esperança de que o mercado se mova até o vencimento. Presente em todas as opções — ITM, ATM e OTM.\n\nMaior quando: ATM + muito tempo + alta volatilidade.\n\nDerrete todo dia com o Theta. No vencimento, chega a zero.`,
  },
];

export function PremioDiagram() {
  return (
    <div className="premio-diagram">
      {blocks.map((b, i) => (
        <div key={i}>
          <div className="premio-block" style={{ background: b.bg }}>
            <div className="premio-block-label">{b.label}</div>
            <div className="premio-block-name" style={{ color: b.nameColor }}>
              {b.name}
            </div>
            <div className="premio-block-desc">
              {b.desc.split('\n').map((line, li) => (
                <span key={li}>
                  {line}
                  {li < b.desc.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
          {i < blocks.length - 1 && <div className="premio-plus">+</div>}
        </div>
      ))}
      <div className="premio-total">
        <div className="premio-block-label" style={{ color: 'var(--accent)' }}>
          Total
        </div>
        <div
          className="premio-block-name"
          style={{ color: 'var(--accent)' }}
        >
          Prêmio = soma dos dois
        </div>
        <div className="premio-block-desc">
          Uma OTM tem apenas valor temporal (pura esperança). Uma ITM profunda
          tem principalmente valor intrínseco com pouco temporal. ATM tem o
          maior valor temporal absoluto.
        </div>
      </div>
    </div>
  );
}
