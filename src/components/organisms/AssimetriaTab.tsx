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
      <div className="bg-[#00e67609] border border-[#00e67622] rounded-xl p-4 mb-3">
        <div className="text-[13px] leading-[1.8] text-[#94a3b8]">
          O modelo do Tio Huli:{' '}
          <strong className="text-text">
            não precisa acertar sempre
          </strong>{' '}
          — basta que os acertos sejam grandes o suficiente para pagar as perdas
          e sobrar lucro. É como um fundo de venture capital: muitas apostas
          morrem, poucas explodem.
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          ⚙ Monte sua estratégia
        </div>
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

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          📊 Resultado
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-[#ff3d5711] border border-[#ff3d5733] rounded-[10px] p-3 text-center">
            <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-[3px]">
              Total perdido
            </div>
            <div className="text-lg font-black text-red">
              -{fmtInt(result.perdas)}
            </div>
            <div className="text-[10px] text-muted mt-0.5">
              {state.ops - state.acertos} viraram pó
            </div>
          </div>
          <div className="bg-[#00e67611] border border-[#00e67633] rounded-[10px] p-3 text-center">
            <div className="text-[9px] tracking-[1px] text-muted uppercase font-mono mb-[3px]">
              Total ganho
            </div>
            <div className="text-lg font-black text-green">
              +{fmtInt(result.ganhos)}
            </div>
            <div className="text-[10px] text-muted mt-0.5">
              {state.acertos} explodiram ({state.mult}x)
            </div>
          </div>
        </div>
        <div
          className={`rounded-lg p-[18px] text-center mt-3 ${result.isProfit ? 'bg-[#00e67611] border border-[#00e67633]' : 'bg-[#ff3d5711] border border-[#ff3d5733]'}`}
        >
          <div className="text-[11px] tracking-[1px] text-muted uppercase font-mono">
            Resultado final
          </div>
          <div
            className={`text-[32px] font-black my-1.5 ${result.isProfit ? 'text-green' : 'text-red'}`}
          >
            {result.isProfit ? '+' : '-'}
            {fmtInt(Math.abs(result.resultado))}
          </div>
          <div className="text-xs text-[#94a3b8]">
            {result.isProfit
              ? `Lucrativo com apenas ${Math.round((state.acertos / state.ops) * 100)}% de acerto`
              : 'Aumente o multiplicador ou o número de acertos'}
          </div>
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          Visualização das operações
        </div>
        <OpsGridDisplay ops={result.opsArray} />
        <div className="bg-black/35 rounded-lg p-3 text-xs leading-relaxed text-[#94a3b8] mt-0">
          {result.descricao}
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          Por que funciona matematicamente
        </div>
        <p className="text-[13px] leading-[1.8] text-[#94a3b8] mb-3">
          Imagine um cassino onde:
        </p>
        <Formula>
          <div>
            <span className="text-muted text-[11px]">// O cassino assimétrico</span>
          </div>
          <div>
            Você aposta: <span className="text-yellow">R$ 100</span>
          </div>
          <div>
            Se perder: perde <span className="text-red">R$ 100</span>
          </div>
          <div>
            Se ganhar: ganha{' '}
            <span className="text-green">R$ 1.000</span>
          </div>
          <div className="mt-1.5">
            <span className="text-muted text-[11px]">// Mesmo ganhando 2 de 10:</span>
          </div>
          <div>
            10 × R$100 ={' '}
            <span className="text-red">R$ 1.000</span> de risco
          </div>
          <div>
            2 × R$1.000 ={' '}
            <span className="text-green">R$ 2.000</span> recebidos
          </div>
          <div>
            <span className="text-accent font-bold">Lucro: R$ 1.000</span> com 20% de acerto
          </div>
        </Formula>
        <div className="text-xs text-[#94a3b8] mt-2.5 leading-[1.6]">
          <strong className="text-text">Ponto crítico:</strong>{' '}
          tamanho de posição pequeno é o que mantém a estratégia viável. Nunca
          arrisque mais do que você aceita perder 100% — porque vai perder 100%
          na maioria das vezes.
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          Estratégias populares
        </div>
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
