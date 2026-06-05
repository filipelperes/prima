import { useState } from 'react';
import { Tag } from '@/components/atoms/Tag';
import { SliderControl } from '@/components/atoms/SliderControl';
import { ScenarioGrid } from '@/components/molecules/ScenarioGrid';
import { ResultGrid } from '@/components/molecules/ResultGrid';
import { ResultBox } from '@/components/molecules/ResultBox';
import { OtmBlock } from '@/components/atoms/OtmBlock';
import { useCallSimulation } from '@/hooks/useCallSimulation';
import { fmt, fmtInt, fmtPct } from '@/lib/formatters';

export function CallTab() {
  const { state, result, updateField, setFinal } = useCallSimulation();
  const [activeScenario, setActiveScenario] = useState<number | undefined>(undefined);

  const statusColor =
    state.acao > state.strike
      ? 'var(--green)'
      : state.acao < state.strike
        ? 'var(--red)'
        : 'var(--yellow)';

  const statusSub =
    state.acao > state.strike
      ? `valor intrínseco: ${fmt(state.acao - state.strike)}`
      : state.acao < state.strike
        ? 'fora do dinheiro'
        : 'no limite';

  const scenarios = [
    { label: 'PETR4 cai → R$ 28', onClick: () => { setFinal(28); setActiveScenario(0); } },
    { label: 'Fica igual → R$ 38', onClick: () => { setFinal(38); setActiveScenario(1); } },
    { label: 'Toca o strike → R$ 40', onClick: () => { setFinal(40); setActiveScenario(2); } },
    { label: 'Dispara → R$ 46', onClick: () => { setFinal(46); setActiveScenario(3); } },
    { label: 'Explode → R$ 54', onClick: () => { setFinal(54); setActiveScenario(4); } },
    { label: 'Lua 🚀 → R$ 100', onClick: () => { setFinal(100); setActiveScenario(5); } },
  ];

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: 6,
          alignItems: 'center',
          marginBottom: 14,
          flexWrap: 'wrap',
        }}
      >
        <Tag variant="green">CALL</Tag>
        <Tag variant="accent">COMPRADOR</Tag>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
          direito de comprar
        </span>
      </div>

      <div className="card">
        <div className="card-header">⚙ Parâmetros</div>
        <SliderControl
          label="Ação atual (PETR4)"
          value={state.acao}
          min={20}
          max={60}
          step={0.5}
          color="var(--accent)"
          displayValue={fmt(state.acao)}
          onChange={(v) => updateField('acao', v)}
          minLabel="R$ 20"
          maxLabel="R$ 60"
        />
        <SliderControl
          label="Strike (preço combinado)"
          value={state.strike}
          min={20}
          max={65}
          step={0.5}
          color="var(--yellow)"
          displayValue={fmt(state.strike)}
          onChange={(v) => updateField('strike', v)}
          minLabel="R$ 20"
          maxLabel="R$ 65"
        />
        <SliderControl
          label="Prêmio por opção"
          value={state.premio}
          min={0.1}
          max={6}
          step={0.1}
          color="var(--muted)"
          displayValue={fmt(state.premio)}
          onChange={(v) => updateField('premio', v)}
          minLabel="R$ 0,10"
          maxLabel="R$ 6,00"
        />
        <SliderControl
          label="Contratos (100 opções cada)"
          value={state.contratos}
          min={1}
          max={50}
          step={1}
          color="var(--accent)"
          displayValue={String(state.contratos)}
          onChange={(v) => updateField('contratos', v)}
          minLabel="1"
          maxLabel="50"
        />
        <div className="grid-2" style={{ marginTop: 4 }}>
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 10,
              padding: 12,
              textAlign: 'center',
            }}
          >
            <div className="stat-label">Total pago</div>
            <div className="stat-val" style={{ color: 'var(--red)' }}>
              {fmtInt(result.totalPago)}
            </div>
            <div className="stat-sub">risco máximo</div>
          </div>
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 10,
              padding: 12,
              textAlign: 'center',
            }}
          >
            <div className="stat-label">Status agora</div>
            <div className="stat-val" style={{ color: statusColor }}>
              {result.status}
            </div>
            <div className="stat-sub">{statusSub}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">🎯 Cenários rápidos</div>
        <ScenarioGrid scenarios={scenarios} activeIndex={activeScenario} />
        <SliderControl
          label="Ação no vencimento"
          value={state.final}
          min={0}
          max={120}
          step={0.5}
          color={state.final >= state.strike ? 'var(--green)' : 'var(--red)'}
          displayValue={fmt(state.final)}
          onChange={(v) => setFinal(v)}
        />
      </div>

      <ResultBox isProfit={result.isProfit}>
        <ResultGrid
          stats={[
            {
              label: 'Ação final',
              value: fmt(state.final),
            },
            {
              label: 'Opção vale',
              value: fmt(result.vi),
              sub: result.vi > 0 ? 'ITM ✓' : 'OTM',
              valueColor:
                result.vi > 0 ? 'var(--green)' : 'var(--muted)',
            },
            {
              label: 'Resultado',
              value: result.isProfit
                ? `+${fmtInt(result.lucro)}`
                : `-${fmtInt(Math.abs(result.lucro))}`,
              valueColor: result.isProfit
                ? 'var(--green)'
                : 'var(--red)',
            },
            {
              label: 'Retorno',
              value: result.isProfit
                ? fmtPct(result.retornoPct)
                : '-100%',
              valueColor: result.isProfit
                ? 'var(--green)'
                : 'var(--red)',
            },
          ]}
        />
        <div className="result-text">{result.descricao}</div>
      </ResultBox>

      <div className="card" style={{ marginTop: 12 }}>
        <div className="card-header">ITM / ATM / OTM — comparador dinâmico</div>
        <p style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 10, lineHeight: 1.6 }}>
          Com PETR4 a <strong style={{ color: 'var(--text)' }}>{fmt(state.acao)}</strong>,
          veja como a mesma CALL se comporta em 3 strikes diferentes:
        </p>
        <OtmBlock
          label="ITM — In The Money ✓"
          labelColor="var(--green)"
          bgColor="#00e67611"
          borderColor="#00e67633"
        >
          Strike{' '}
          <strong style={{ color: 'var(--green)' }}>
            R$ {(state.acao - 5).toFixed(1)}
          </strong>{' '}
          (abaixo da ação). Valor intrínseco ={' '}
          <strong style={{ color: 'var(--green)' }}>
            R$ {Math.max(0, state.acao - (state.acao - 5)).toFixed(1)}
          </strong>
          . Já vale algo hoje. Contrato mais caro, mas qualquer alta vira lucro
          imediato.
        </OtmBlock>
        <OtmBlock
          label="ATM — At The Money ⚡"
          labelColor="var(--yellow)"
          bgColor="#ffd54f11"
          borderColor="#ffd54f33"
        >
          Strike{' '}
          <strong style={{ color: 'var(--yellow)' }}>
            R$ {state.acao.toFixed(1)}
          </strong>{' '}
          (igual à ação). Valor intrínseco zero. Maior valor temporal. Qualquer
          movimento decide o lado. É onde o Gamma explode.
        </OtmBlock>
        <OtmBlock
          label="OTM — Out of The Money ✨"
          labelColor="var(--red)"
          bgColor="#ff3d5711"
          borderColor="#ff3d5733"
        >
          Strike{' '}
          <strong style={{ color: 'var(--red)' }}>
            R$ {(state.acao + 7).toFixed(1)}
          </strong>{' '}
          (acima da ação). Pura esperança — barata, mas precisa de explosão.
          Quando o mercado dispara, são essas que pagam 5x, 10x, 50x.
        </OtmBlock>
      </div>
    </>
  );
}
