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
      <div className="card">
        <div className="card-header">Formação do prêmio</div>
        <Formula>
          <div>
            <span className="eq">Prêmio</span>{' '}
            <span style={{ color: 'var(--muted)' }}>=</span>{' '}
            <span className="val">Valor Intrínseco</span>{' '}
            <span style={{ color: 'var(--muted)' }}>+</span>{' '}
            <span className="val">Valor Temporal</span>
          </div>
        </Formula>
        <PremioDiagram />
      </div>

      <div className="card">
        <div className="card-header">
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
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 12,
            padding: 16,
            marginTop: 4,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: 'var(--muted)',
              marginBottom: 10,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
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
          <div
            style={{
              borderTop: '1px solid var(--border)',
              marginTop: 10,
              paddingTop: 10,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>
              Prêmio estimado
            </span>
            <span
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: 'var(--accent)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {fmt(breakdown.total)}
            </span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          Black-Scholes — a fórmula por trás
        </div>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.8,
            color: '#94a3b8',
            marginBottom: 10,
          }}
        >
          A fórmula de Black-Scholes (1973) calcula o "preço justo" de uma
          opção com base em 5 variáveis:
        </p>
        <Formula>
          <div>
            <span className="comment">// Inputs do modelo</span>
          </div>
          <div>
            <span className="val">S</span>{' '}
            <span style={{ color: 'var(--muted)' }}>=</span> Preço atual da ação
          </div>
          <div>
            <span className="val">K</span>{' '}
            <span style={{ color: 'var(--muted)' }}>=</span> Strike (preço de
            exercício)
          </div>
          <div>
            <span className="val">T</span>{' '}
            <span style={{ color: 'var(--muted)' }}>=</span> Tempo até
            vencimento (em anos)
          </div>
          <div>
            <span className="val">r</span>{' '}
            <span style={{ color: 'var(--muted)' }}>=</span> Taxa de juros livre
            de risco
          </div>
          <div>
            <span className="val">σ</span>{' '}
            <span style={{ color: 'var(--muted)' }}>=</span> Volatilidade (o
            fator mais disputado)
          </div>
        </Formula>
        <div
          style={{
            background: '#ffd54f11',
            border: '1px solid #ffd54f33',
            borderRadius: 10,
            padding: 12,
            marginTop: 4,
          }}
        >
          <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.6 }}>
            As gregas (Delta, Theta, Vega, Gamma) são as{' '}
            <strong style={{ color: 'var(--yellow)' }}>
              derivadas parciais
            </strong>{' '}
            dessa fórmula — medem como o prêmio muda quando cada variável se
            altera, mantendo as outras fixas.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          Volatilidade implícita vs realizada
        </div>
        <div className="grid-2">
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 10,
              padding: 12,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'var(--blue)',
                marginBottom: 6,
                letterSpacing: 0.5,
              }}
            >
              IMPLÍCITA (IV)
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.6 }}>
              O que o mercado <em>espera</em> que aconteça. Está embutida no
              prêmio. Alta antes de eventos (balanços, eleições).
            </div>
          </div>
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 10,
              padding: 12,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'var(--green)',
                marginBottom: 6,
                letterSpacing: 0.5,
              }}
            >
              REALIZADA (HV)
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.6 }}>
              O que de fato <em>aconteceu</em> no mercado. Calculada com base no
              histórico de preços.
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 12,
            color: '#94a3b8',
            marginTop: 10,
            lineHeight: 1.6,
            padding: 10,
            background: 'var(--surface)',
            borderRadius: 8,
          }}
        >
          Quando o balanço sai e a ação se move menos do que o mercado esperava,
          a IV despenca — o "esmagamento de volatilidade". Compradores podem
          perder dinheiro mesmo com a ação andando na direção certa.
        </div>
      </div>
    </>
  );
}
