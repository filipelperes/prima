import { useState, useMemo } from 'react';
import { Tag } from '@/components/atoms/Tag';
import { SliderControl } from '@/components/atoms/SliderControl';
import { ToggleButton } from '@/components/atoms/ToggleButton';
import { WarningBox } from '@/components/atoms/WarningBox';
import { ScenarioGrid } from '@/components/molecules/ScenarioGrid';
import { ResultGrid } from '@/components/molecules/ResultGrid';
import { ResultBox } from '@/components/molecules/ResultBox';
import { usePutSimulation } from '@/hooks/usePutSimulation';
import { fmt, fmtInt, fmtPct } from '@/lib/formatters';

export function PutTab() {
  const { state, mode, result, updateField, setMode, setFinal } =
    usePutSimulation();
  const [activeScenario, setActiveScenario] = useState<number | undefined>(undefined);

  const scenarios = useMemo(() => [
    { label: 'Empresa faliu → R$ 0', onClick: () => { setFinal(0); setActiveScenario(0); } },
    { label: 'Crash → R$ 15', onClick: () => { setFinal(15); setActiveScenario(1); } },
    { label: 'Queda → R$ 28', onClick: () => { setFinal(28); setActiveScenario(2); } },
    { label: 'Fica igual → R$ 38', onClick: () => { setFinal(38); setActiveScenario(3); } },
    { label: 'Sobe → R$ 46', onClick: () => { setFinal(46); setActiveScenario(4); } },
    { label: 'Alta forte → R$ 60', onClick: () => { setFinal(60); setActiveScenario(5); } },
  ], [setFinal]);

  const resultadoLabel = mode === 'comprador' ? 'Prêmio pago' : 'Prêmio recebido';
  const resultadoSub = mode === 'comprador' ? 'risco máximo' : 'ganho máximo';

  return (
    <>
      <div className="flex gap-1.5 items-center mb-3 flex-wrap">
        <Tag variant="red">PUT</Tag>
        <span className="text-xs text-muted">
          direito de vender
        </span>
      </div>

      <div className="flex gap-1 bg-surface border border-border-custom rounded-[10px] p-[3px] mb-3.5 dark:border-border2">
        <ToggleButton
          label="COMPRADOR"
          active={mode === 'comprador'}
          variant="green"
          onClick={() => setMode('comprador')}
        />
        <ToggleButton
          label="VENDEDOR ⚠️"
          active={mode === 'vendedor'}
          variant="red"
          onClick={() => setMode('vendedor')}
        />
      </div>

      {mode === 'vendedor' && (
        <WarningBox title="⚠️ Zona de perigo — Vendedor de PUT">
          Você recebe o prêmio agora mas assume a obrigação de{' '}
          <strong>comprar as ações se despencarem</strong>. Se a empresa falir,
          você compra papéis que valem zero, pagando o preço do strike. Risco
          máximo ={' '}
          <strong className="text-red">
            Strike × Contratos × 100
          </strong>
          .
        </WarningBox>
      )}

      <div
        className={`${mode === 'comprador' ? 'block' : 'hidden'} bg-surface border border-blue/30 rounded-lg p-4 max-sm:p-3 mb-3 bg-blue/10`}
      >
        <div className="text-xs text-text-secondary leading-relaxed">
          Você paga o prêmio e ganha o direito de{' '}
          <strong className="text-text">
            vender as ações pelo preço do strike
          </strong>
          , mesmo que o mercado esteja pagando muito menos. É como um{' '}
          <strong className="text-blue">seguro de carro</strong>:
          você paga a anuidade e se o carro "bater" (ação cair), você aciona e
          garante a venda pelo preço combinado.
        </div>
      </div>

      <div
        className={`${mode === 'vendedor' ? 'block' : 'hidden'} bg-surface border border-red/30 rounded-lg p-4 max-sm:p-3 mb-3 bg-red/10`}
      >
        <div className="text-xs text-text-secondary leading-relaxed">
          Você é a <strong className="text-text">seguradora</strong>.
          Recebe o prêmio todo mês. Funciona bem enquanto não há "sinistro". Mas
          se a ação derreter — ou pior, a empresa falir — você é obrigado a
          comprar ações quase sem valor pagando o preço do strike.
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">⚙ Parâmetros</div>
        <SliderControl
          label="Ação atual (PETR4)"
          value={state.acao}
          min={10}
          max={70}
          step={0.5}
          color="var(--color-accent)"
          displayValue={fmt(state.acao)}
          onChange={(v) => updateField('acao', v)}
        />
        <SliderControl
          label="Strike da PUT"
          value={state.strike}
          min={10}
          max={70}
          step={0.5}
          color="var(--color-red)"
          displayValue={fmt(state.strike)}
          onChange={(v) => updateField('strike', v)}
        />
        <SliderControl
          label="Prêmio por opção"
          value={state.premio}
          min={0.1}
          max={8}
          step={0.1}
          color="var(--muted)"
          displayValue={fmt(state.premio)}
          onChange={(v) => updateField('premio', v)}
        />
        <SliderControl
          label="Contratos"
          value={state.contratos}
          min={1}
          max={50}
          step={1}
          color="var(--color-accent)"
          displayValue={String(state.contratos)}
          onChange={(v) => updateField('contratos', v)}
        />
        <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
          <div className="bg-surface rounded-lg p-3 text-center">
            <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-[3px]">{resultadoLabel}</div>
            <div
              className={`text-lg font-black ${mode === 'comprador' ? 'text-red' : 'text-green'}`}
            >
              {fmtInt(result.totalPago)}
            </div>
            <div className="text-[10px] text-muted mt-0.5">{resultadoSub}</div>
          </div>
          {mode === 'vendedor' && (
            <div className="bg-surface rounded-lg p-3 text-center">
              <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-[3px]">Risco máx. vendedor</div>
              <div className="text-lg font-black text-red">
                {fmtInt(result.riscoMax)}
              </div>
              <div className="text-[10px] text-muted mt-0.5">empresa vai a zero</div>
            </div>
          )}
          {mode === 'comprador' && (
            <div className="bg-surface rounded-lg p-3 text-center">
              <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-[3px]">Strike atual</div>
              <div className="text-lg font-black text-yellow">
                {fmt(state.strike)}
              </div>
              <div className="text-[10px] text-muted mt-0.5">preço de exercício</div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">🎯 Cenários</div>
        <ScenarioGrid scenarios={scenarios} activeIndex={activeScenario} />
        <SliderControl
          label="Ação no vencimento"
          value={state.final}
          min={0}
          max={80}
          step={0.5}
          color={state.final < state.strike ? 'var(--color-red)' : 'var(--color-green)'}
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
              label: 'PUT vale',
              value: fmt(result.vi),
              sub: result.vi > 0 ? 'ITM — exercida' : 'OTM — vira pó',
              valueColor:
                result.vi > 0 ? 'var(--color-green)' : 'var(--muted)',
            },
            {
              label: 'Resultado',
              value: result.isProfit
                ? `+${fmtInt(result.lucro)}`
                : `-${fmtInt(Math.abs(result.lucro))}`,
              valueColor: result.isProfit
                ? 'var(--color-green)'
                : 'var(--color-red)',
            },
            {
              label: 'Retorno',
              value: fmtPct(result.retornoPct),
              valueColor: result.isProfit
                ? 'var(--color-green)'
                : 'var(--color-red)',
            },
          ]}
        />
        <div className="bg-[var(--overlay)] rounded-lg p-3 text-xs leading-relaxed text-text-secondary">{result.descricao}</div>
      </ResultBox>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3 mt-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          PUT vendida — estratégia do investidor experiente
        </div>
        <p className="text-xs leading-relaxed text-text-secondary mb-2.5">
          PETR4 a R$ 30. Você gostaria de comprar se caísse para R$ 25. Em vez
          de deixar uma ordem de compra parada, você{' '}
          <strong className="text-text">
            vende uma PUT strike R$ 25
          </strong>{' '}
          e recebe o prêmio.
        </p>
        <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
          <div className="bg-green/10 border border-green/30 rounded-lg p-3">
            <div className="text-[10px] text-green font-bold mb-1.5">
              AÇÃO FICA ACIMA DE R$ 25
            </div>
            <div className="text-[11px] text-text-secondary leading-relaxed">
              PUT não exercida. Você fica com o prêmio no bolso. Ganhou dinheiro
              por nada acontecer.
            </div>
          </div>
          <div className="bg-blue/10 border border-blue/30 rounded-lg p-3">
            <div className="text-[10px] text-blue font-bold mb-1.5">
              AÇÃO CAI ABAIXO DE R$ 25
            </div>
            <div className="text-[11px] text-text-secondary leading-relaxed">
              Você compra a ação a R$ 25 — que já era o seu preço-alvo de
              qualquer jeito.
            </div>
          </div>
        </div>
        <p className="text-[11px] text-muted mt-2.5 leading-relaxed">
          Isso pressupõe que você TEM o caixa para comprar as ações. A PUT
          vendida descoberta (sem caixa para honrar) é que pode quebrar alguém.
        </p>
      </div>
    </>
  );
}
