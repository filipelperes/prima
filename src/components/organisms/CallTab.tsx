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

  const statusColorClass =
    state.acao > state.strike
      ? 'text-green'
      : state.acao < state.strike
        ? 'text-red'
        : 'text-yellow';

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
      <div className="flex gap-1.5 items-center mb-3.5 flex-wrap">
        <Tag variant="green">CALL</Tag>
        <Tag variant="accent">COMPRADOR</Tag>
        <span className="text-xs text-muted">
          direito de comprar
        </span>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">⚙ Parâmetros</div>
        <SliderControl
          label="Ação atual (PETR4)"
          value={state.acao}
          min={20}
          max={60}
          step={0.5}
          color="#00d4ff"
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
          color="#ffd54f"
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
          color="#6b7a94"
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
          color="#00d4ff"
          displayValue={String(state.contratos)}
          onChange={(v) => updateField('contratos', v)}
          minLabel="1"
          maxLabel="50"
        />
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="bg-surface rounded-lg p-3 text-center">
            <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-[3px]">Total pago</div>
            <div className="text-lg font-black text-red">
              {fmtInt(result.totalPago)}
            </div>
            <div className="text-[10px] text-muted mt-0.5">risco máximo</div>
          </div>
          <div className="bg-surface rounded-lg p-3 text-center">
            <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-[3px]">Status agora</div>
            <div className={`text-lg font-black ${statusColorClass}`}>
              {result.status}
            </div>
            <div className="text-[10px] text-muted mt-0.5">{statusSub}</div>
          </div>
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">🎯 Cenários rápidos</div>
        <ScenarioGrid scenarios={scenarios} activeIndex={activeScenario} />
        <SliderControl
          label="Ação no vencimento"
          value={state.final}
          min={0}
          max={120}
          step={0.5}
          color={state.final >= state.strike ? '#00e676' : '#ff3d57'}
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
                result.vi > 0 ? '#00e676' : '#6b7a94',
            },
            {
              label: 'Resultado',
              value: result.isProfit
                ? `+${fmtInt(result.lucro)}`
                : `-${fmtInt(Math.abs(result.lucro))}`,
              valueColor: result.isProfit
                ? '#00e676'
                : '#ff3d57',
            },
            {
              label: 'Retorno',
              value: result.isProfit
                ? fmtPct(result.retornoPct)
                : '-100%',
              valueColor: result.isProfit
                ? '#00e676'
                : '#ff3d57',
            },
          ]}
        />
        <div className="bg-black/35 rounded-lg p-3 text-xs leading-relaxed text-[#94a3b8]">{result.descricao}</div>
      </ResultBox>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3 mt-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">ITM / ATM / OTM — comparador dinâmico</div>
        <p className="text-[11px] text-muted mb-2.5 leading-relaxed">
          Com PETR4 a <strong className="text-text">{fmt(state.acao)}</strong>,
          veja como a mesma CALL se comporta em 3 strikes diferentes:
        </p>
        <OtmBlock
          label="ITM — In The Money ✓"
          labelColor="#00e676"
          bgColor="#00e67611"
          borderColor="#00e67633"
        >
          Strike{' '}
          <strong className="text-green">
            R$ {(state.acao - 5).toFixed(1)}
          </strong>{' '}
          (abaixo da ação). Valor intrínseco ={' '}
          <strong className="text-green">
            R$ {Math.max(0, state.acao - (state.acao - 5)).toFixed(1)}
          </strong>
          . Já vale algo hoje. Contrato mais caro, mas qualquer alta vira lucro
          imediato.
        </OtmBlock>
        <OtmBlock
          label="ATM — At The Money ⚡"
          labelColor="#ffd54f"
          bgColor="#ffd54f11"
          borderColor="#ffd54f33"
        >
          Strike{' '}
          <strong className="text-yellow">
            R$ {state.acao.toFixed(1)}
          </strong>{' '}
          (igual à ação). Valor intrínseco zero. Maior valor temporal. Qualquer
          movimento decide o lado. É onde o Gamma explode.
        </OtmBlock>
        <OtmBlock
          label="OTM — Out of The Money ✨"
          labelColor="#ff3d57"
          bgColor="#ff3d5711"
          borderColor="#ff3d5733"
        >
          Strike{' '}
          <strong className="text-red">
            R$ {(state.acao + 7).toFixed(1)}
          </strong>{' '}
          (acima da ação). Pura esperança — barata, mas precisa de explosão.
          Quando o mercado dispara, são essas que pagam 5x, 10x, 50x.
        </OtmBlock>
      </div>
    </>
  );
}
