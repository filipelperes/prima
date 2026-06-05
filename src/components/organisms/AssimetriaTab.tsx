import { SliderControl } from '@/components/atoms/SliderControl';
import { Formula } from '@/components/atoms/Formula';
import { OpsGridDisplay } from '@/components/molecules/OpsGridDisplay';
import { UsoCard } from '@/components/atoms/UsoCard';
import { useAssimetriaSimulation } from '@/hooks/useAssimetriaSimulation';
import { fmtInt } from '@/lib/formatters';

export function AssimetriaTab() {
  const { state, result, updateField } = useAssimetriaSimulation();

  return (
    <>
      <div
        className="card"
        style={{
          background: '#00e67609',
          borderColor: '#00e67622',
        }}
      >
        <div style={{ fontSize: 13, lineHeight: 1.8, color: '#94a3b8' }}>
          O modelo do Tio Huli:{' '}
          <strong style={{ color: 'var(--text)' }}>
            não precisa acertar sempre
          </strong>{' '}
          — basta que os acertos sejam grandes o suficiente para pagar as perdas
          e sobrar lucro. É como um fundo de venture capital: muitas apostas
          morrem, poucas explodem.
        </div>
      </div>

      <div className="card">
        <div className="card-header">⚙ Monte sua estratégia</div>
        <SliderControl
          label="Prêmio por operação (R$)"
          value={state.premio}
          min={50}
          max={2000}
          step={50}
          color="var(--red)"
          displayValue={`R$ ${state.premio}`}
          onChange={(v) => updateField('premio', v)}
          minLabel="R$ 50"
          maxLabel="R$ 2.000"
        />
        <SliderControl
          label="Total de operações"
          value={state.ops}
          min={3}
          max={20}
          step={1}
          color="var(--muted)"
          displayValue={String(state.ops)}
          onChange={(v) => updateField('ops', v)}
          minLabel="3"
          maxLabel="20"
        />
        <SliderControl
          label="Quantas explodem (acertos)"
          value={state.acertos}
          min={1}
          max={state.ops}
          step={1}
          color="var(--green)"
          displayValue={`${state.acertos} de ${state.ops} (${Math.round((state.acertos / state.ops) * 100)}%)`}
          onChange={(v) => updateField('acertos', v)}
        />
        <SliderControl
          label="Multiplicador dos acertos"
          value={state.mult}
          min={2}
          max={30}
          step={1}
          color="var(--accent)"
          displayValue={`${state.mult}x`}
          onChange={(v) => updateField('mult', v)}
          minLabel="2x"
          maxLabel="30x"
        />
      </div>

      <div className="card">
        <div className="card-header">📊 Resultado</div>
        <div className="grid-2" style={{ marginBottom: 12 }}>
          <div
            style={{
              background: '#ff3d5711',
              border: '1px solid #ff3d5733',
              borderRadius: 10,
              padding: 12,
              textAlign: 'center',
            }}
          >
            <div className="stat-label">Total perdido</div>
            <div className="stat-val" style={{ color: 'var(--red)' }}>
              -{fmtInt(result.perdas)}
            </div>
            <div className="stat-sub">
              {state.ops - state.acertos} viraram pó
            </div>
          </div>
          <div
            style={{
              background: '#00e67611',
              border: '1px solid #00e67633',
              borderRadius: 10,
              padding: 12,
              textAlign: 'center',
            }}
          >
            <div className="stat-label">Total ganho</div>
            <div className="stat-val" style={{ color: 'var(--green)' }}>
              +{fmtInt(result.ganhos)}
            </div>
            <div className="stat-sub">
              {state.acertos} explodiram ({state.mult}x)
            </div>
          </div>
        </div>
        <div
          className="total-result"
          style={{
            background: result.isProfit ? '#00e67611' : '#ff3d5711',
            border: result.isProfit
              ? '1px solid #00e67633'
              : '1px solid #ff3d5733',
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: 'var(--muted)',
              letterSpacing: 1,
              textTransform: 'uppercase',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Resultado final
          </div>
          <div
            className="total-val"
            style={{
              color: result.isProfit ? 'var(--green)' : 'var(--red)',
            }}
          >
            {result.isProfit ? '+' : '-'}
            {fmtInt(Math.abs(result.resultado))}
          </div>
          <div className="total-sub" style={{ color: '#94a3b8' }}>
            {result.isProfit
              ? `Lucrativo com apenas ${Math.round((state.acertos / state.ops) * 100)}% de acerto`
              : 'Aumente o multiplicador ou o número de acertos'}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Visualização das operações</div>
        <OpsGridDisplay ops={result.opsArray} />
        <div className="result-text" style={{ marginTop: 0 }}>
          {result.descricao}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          Por que funciona matematicamente
        </div>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.8,
            color: '#94a3b8',
            marginBottom: 12,
          }}
        >
          Imagine um cassino onde:
        </p>
        <Formula>
          <div>
            <span className="comment">// O cassino assimétrico</span>
          </div>
          <div>
            Você aposta: <span className="val">R$ 100</span>
          </div>
          <div>
            Se perder: perde <span style={{ color: 'var(--red)' }}>R$ 100</span>
          </div>
          <div>
            Se ganhar: ganha{' '}
            <span style={{ color: 'var(--green)' }}>R$ 1.000</span>
          </div>
          <div style={{ marginTop: 6 }}>
            <span className="comment">// Mesmo ganhando 2 de 10:</span>
          </div>
          <div>
            10 × R$100 ={' '}
            <span style={{ color: 'var(--red)' }}>R$ 1.000</span> de risco
          </div>
          <div>
            2 × R$1.000 ={' '}
            <span style={{ color: 'var(--green)' }}>R$ 2.000</span> recebidos
          </div>
          <div>
            <span className="eq">Lucro: R$ 1.000</span> com 20% de acerto
          </div>
        </Formula>
        <div
          style={{
            fontSize: 12,
            color: '#94a3b8',
            marginTop: 10,
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: 'var(--text)' }}>Ponto crítico:</strong>{' '}
          tamanho de posição pequeno é o que mantém a estratégia viável. Nunca
          arrisque mais do que você aceita perder 100% — porque vai perder 100%
          na maioria das vezes.
        </div>
      </div>

      <div className="card">
        <div className="card-header">Estratégias populares</div>
        <UsoCard
          icon=""
          name="1. Compra simples de CALL (direcional)"
          desc="Aposta que a ação vai subir muito. Risco = prêmio. Muito usada em opções OTM baratas com potencial explosivo. É o 'ganha muito, perde pouco'."
        />
        <UsoCard
          icon=""
          name="2. Trava de Alta (Bull Call Spread)"
          desc="Reduz custo, mas limita o ganho. Bom quando você acredita em alta moderada, não explosiva."
        />
        <UsoCard
          icon=""
          name="3. Financiamento (venda coberta)"
          desc="Você TEM a ação e vende CALL contra ela. Embolsa o prêmio todo mês. Se a ação subir além do strike, ela 'é chamada'."
        />
        <UsoCard
          icon=""
          name="4. Compra de PUT (proteção)"
          desc="Você tem uma carteira e compra PUTs como seguro. Se o mercado cair forte, as PUTs valorizam e compensam as perdas."
        />
      </div>
    </>
  );
}
