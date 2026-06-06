import { SliderControl } from '@/components/atoms/SliderControl';
import { Formula } from '@/components/atoms/Formula';
import { ProgressRow } from '@/components/atoms/ProgressRow';
import { PremioDiagram } from '@/components/molecules/PremioDiagram';
import { usePremiumSimulation } from '@/hooks/usePremiumSimulation';
import { fmt } from '@/lib/formatters';

export function PremioTab() {
  const { state, breakdown, updateField } = usePremiumSimulation();

  const distText =
    state.dist > 0
      ? `+${fmt(state.dist)} ITM`
      : state.dist < 0
        ? `${fmt(Math.abs(state.dist))} OTM`
        : 'ATM';

  return (
    <>
      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          Formação do prêmio
        </div>
        <Formula>
          <div>
            <span className="text-accent font-bold">Prêmio</span>{' '}
            <span className="text-muted">=</span>{' '}
            <span className="text-yellow">Valor Intrínseco</span>{' '}
            <span className="text-muted">+</span>{' '}
            <span className="text-yellow">Valor Temporal</span>
          </div>
        </Formula>
        <PremioDiagram />
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          O que afeta o prêmio — simulador
        </div>
        <SliderControl
          label="Dias até vencimento"
          value={state.dias}
          min={1}
          max={90}
          step={1}
          color="var(--blue)"
          displayValue={`${state.dias} dias`}
          onChange={(v) => updateField('dias', v)}
        />
        <SliderControl
          label="Volatilidade implícita"
          value={state.vol}
          min={10}
          max={80}
          step={1}
          color="var(--yellow)"
          displayValue={`${state.vol}%`}
          onChange={(v) => updateField('vol', v)}
        />
        <SliderControl
          label="Distância ao strike (OTM → ITM)"
          value={state.dist}
          min={-15}
          max={15}
          step={0.5}
          color={
            state.dist > 0
              ? 'var(--green)'
              : state.dist < 0
                ? 'var(--red)'
                : 'var(--yellow)'
          }
          displayValue={distText}
          onChange={(v) => updateField('dist', v)}
          minLabel="-15 OTM fundo"
          maxLabel="+15 ITM fundo"
        />
        <div className="bg-surface rounded-lg px-4 py-3 mt-1">
          <div className="text-[11px] text-muted mb-2.5 tracking-wide uppercase font-mono">
            Decomposição estimada do prêmio
          </div>
          <ProgressRow
            label="Intrínseco"
            value={breakdown.intrinseco}
            color="var(--green)"
            displayValue={fmt(breakdown.intrinseco)}
          />
          <ProgressRow
            label="Temporal"
            value={breakdown.temporal}
            color="var(--blue)"
            displayValue={fmt(breakdown.temporal)}
          />
          <div className="border-t border-[var(--border)] mt-2.5 pt-2.5 flex justify-between items-center">
            <span className="text-xs text-muted">
              Prêmio estimado
            </span>
            <span className="text-xl font-black text-accent font-mono">
              {fmt(breakdown.total)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          Black-Scholes — a fórmula por trás
        </div>
        <p className="text-[13px] leading-relaxed text-muted mb-2.5">
          A fórmula de Black-Scholes (1973) calcula o "preço justo" de uma
          opção com base em 5 variáveis:
        </p>
        <Formula>
          <div>
            <span className="text-muted text-[11px]">// Inputs do modelo</span>
          </div>
          <div>
            <span className="text-yellow">S</span>{' '}
            <span className="text-muted">=</span> Preço atual da ação
          </div>
          <div>
            <span className="text-yellow">K</span>{' '}
            <span className="text-muted">=</span> Strike (preço de
            exercício)
          </div>
          <div>
            <span className="text-yellow">T</span>{' '}
            <span className="text-muted">=</span> Tempo até
            vencimento (em anos)
          </div>
          <div>
            <span className="text-yellow">r</span>{' '}
            <span className="text-muted">=</span> Taxa de juros livre
            de risco
          </div>
          <div>
            <span className="text-yellow">σ</span>{' '}
            <span className="text-muted">=</span> Volatilidade (o
            fator mais disputado)
          </div>
        </Formula>
        <div className="bg-[#ffd54f11] border border-[#ffd54f33] rounded-lg p-3 mt-1">
          <div className="text-[11px] text-muted leading-relaxed">
            As gregas (Delta, Theta, Vega, Gamma) são as{' '}
            <strong className="text-yellow">
              derivadas parciais
            </strong>{' '}
            dessa fórmula — medem como o prêmio muda quando cada variável se
            altera, mantendo as outras fixas.
          </div>
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          Volatilidade implícita vs realizada
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-surface rounded-lg p-3">
            <div className="text-[10px] font-bold text-blue mb-1.5 tracking-wide">
              IMPLÍCITA (IV)
            </div>
            <div className="text-[11px] text-muted leading-relaxed">
              O que o mercado <em>espera</em> que aconteça. Está embutida no
              prêmio. Alta antes de eventos (balanços, eleições).
            </div>
          </div>
          <div className="bg-surface rounded-lg p-3">
            <div className="text-[10px] font-bold text-green mb-1.5 tracking-wide">
              REALIZADA (HV)
            </div>
            <div className="text-[11px] text-muted leading-relaxed">
              O que de fato <em>aconteceu</em> no mercado. Calculada com base no
              histórico de preços.
            </div>
          </div>
        </div>
        <div className="text-xs text-muted mt-2.5 leading-relaxed p-2.5 bg-surface rounded-lg">
          Quando o balanço sai e a ação se move menos do que o mercado esperava,
          a IV despenca — o "esmagamento de volatilidade". Compradores podem
          perder dinheiro mesmo com a ação andando na direção certa.
        </div>
      </div>
    </>
  );
}
