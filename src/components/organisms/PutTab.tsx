import { useState } from 'react';
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

  const scenarios = [
    { label: 'Empresa faliu → R$ 0', onClick: () => { setFinal(0); setActiveScenario(0); } },
    { label: 'Crash → R$ 15', onClick: () => { setFinal(15); setActiveScenario(1); } },
    { label: 'Queda → R$ 28', onClick: () => { setFinal(28); setActiveScenario(2); } },
    { label: 'Fica igual → R$ 38', onClick: () => { setFinal(38); setActiveScenario(3); } },
    { label: 'Sobe → R$ 46', onClick: () => { setFinal(46); setActiveScenario(4); } },
    { label: 'Alta forte → R$ 60', onClick: () => { setFinal(60); setActiveScenario(5); } },
  ];

  const resultadoLabel = mode === 'comprador' ? 'Prêmio pago' : 'Prêmio recebido';
  const resultadoSub = mode === 'comprador' ? 'risco máximo' : 'ganho máximo';

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: 6,
          alignItems: 'center',
          marginBottom: 12,
          flexWrap: 'wrap',
        }}
      >
        <Tag variant="red">PUT</Tag>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
          direito de vender
        </span>
      </div>

      <div className="toggle-group">
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
          <strong style={{ color: 'var(--red)' }}>
            Strike × Contratos × 100
          </strong>
          .
        </WarningBox>
      )}

      <div
        className="card"
        style={{
          display: mode === 'comprador' ? 'block' : 'none',
          background: '#4fc3f711',
          borderColor: '#4fc3f733',
        }}
      >
        <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.7 }}>
          Você paga o prêmio e ganha o direito de{' '}
          <strong style={{ color: 'var(--text)' }}>
            vender as ações pelo preço do strike
          </strong>
          , mesmo que o mercado esteja pagando muito menos. É como um{' '}
          <strong style={{ color: 'var(--blue)' }}>seguro de carro</strong>:
          você paga a anuidade e se o carro "bater" (ação cair), você aciona e
          garante a venda pelo preço combinado.
        </div>
      </div>

      <div
        className="card"
        style={{
          display: mode === 'vendedor' ? 'block' : 'none',
          background: '#ff3d5711',
          borderColor: '#ff3d5744',
        }}
      >
        <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.7 }}>
          Você é a <strong style={{ color: 'var(--text)' }}>seguradora</strong>.
          Recebe o prêmio todo mês. Funciona bem enquanto não há "sinistro". Mas
          se a ação derreter — ou pior, a empresa falir — você é obrigado a
          comprar ações quase sem valor pagando o preço do strike.
        </div>
      </div>

      <div className="card">
        <div className="card-header">⚙ Parâmetros</div>
        <SliderControl
          label="Ação atual (PETR4)"
          value={state.acao}
          min={10}
          max={70}
          step={0.5}
          color="var(--accent)"
          displayValue={fmt(state.acao)}
          onChange={(v) => updateField('acao', v)}
        />
        <SliderControl
          label="Strike da PUT"
          value={state.strike}
          min={10}
          max={70}
          step={0.5}
          color="var(--red)"
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
          color="var(--accent)"
          displayValue={String(state.contratos)}
          onChange={(v) => updateField('contratos', v)}
        />
        <div className="grid-2">
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 10,
              padding: 12,
              textAlign: 'center',
            }}
          >
            <div className="stat-label">{resultadoLabel}</div>
            <div
              className="stat-val"
              style={{
                color:
                  mode === 'comprador' ? 'var(--red)' : 'var(--green)',
              }}
            >
              {fmtInt(result.totalPago)}
            </div>
            <div className="stat-sub">{resultadoSub}</div>
          </div>
          {mode === 'vendedor' && (
            <div
              style={{
                background: 'var(--surface)',
                borderRadius: 10,
                padding: 12,
                textAlign: 'center',
              }}
            >
              <div className="stat-label">Risco máx. vendedor</div>
              <div className="stat-val" style={{ color: 'var(--red)' }}>
                {fmtInt(result.riscoMax)}
              </div>
              <div className="stat-sub">empresa vai a zero</div>
            </div>
          )}
          {mode === 'comprador' && (
            <div
              style={{
                background: 'var(--surface)',
                borderRadius: 10,
                padding: 12,
                textAlign: 'center',
              }}
            >
              <div className="stat-label">Strike atual</div>
              <div className="stat-val" style={{ color: 'var(--yellow)' }}>
                {fmt(state.strike)}
              </div>
              <div className="stat-sub">preço de exercício</div>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">🎯 Cenários</div>
        <ScenarioGrid scenarios={scenarios} activeIndex={activeScenario} />
        <SliderControl
          label="Ação no vencimento"
          value={state.final}
          min={0}
          max={80}
          step={0.5}
          color={state.final < state.strike ? 'var(--red)' : 'var(--green)'}
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
              value: fmtPct(result.retornoPct),
              valueColor: result.isProfit
                ? 'var(--green)'
                : 'var(--red)',
            },
          ]}
        />
        <div className="result-text">{result.descricao}</div>
      </ResultBox>

      <div className="card" style={{ marginTop: 12 }}>
        <div className="card-header">
          PUT vendida — estratégia do investidor experiente
        </div>
        <p
          style={{
            fontSize: 12,
            lineHeight: 1.7,
            color: '#94a3b8',
            marginBottom: 10,
          }}
        >
          PETR4 a R$ 30. Você gostaria de comprar se caísse para R$ 25. Em vez
          de deixar uma ordem de compra parada, você{' '}
          <strong style={{ color: 'var(--text)' }}>
            vende uma PUT strike R$ 25
          </strong>{' '}
          e recebe o prêmio.
        </p>
        <div className="grid-2">
          <div
            style={{
              background: '#00e67611',
              border: '1px solid #00e67633',
              borderRadius: 10,
              padding: 12,
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: 'var(--green)',
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              AÇÃO FICA ACIMA DE R$ 25
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.6 }}>
              PUT não exercida. Você fica com o prêmio no bolso. Ganhou dinheiro
              por nada acontecer.
            </div>
          </div>
          <div
            style={{
              background: '#4fc3f711',
              border: '1px solid #4fc3f733',
              borderRadius: 10,
              padding: 12,
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: 'var(--blue)',
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              AÇÃO CAI ABAIXO DE R$ 25
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.6 }}>
              Você compra a ação a R$ 25 — que já era o seu preço-alvo de
              qualquer jeito.
            </div>
          </div>
        </div>
        <p
          style={{
            fontSize: 11,
            color: 'var(--muted)',
            marginTop: 10,
            lineHeight: 1.6,
          }}
        >
          Isso pressupõe que você TEM o caixa para comprar as ações. A PUT
          vendida descoberta (sem caixa para honrar) é que pode quebrar alguém.
        </p>
      </div>
    </>
  );
}
