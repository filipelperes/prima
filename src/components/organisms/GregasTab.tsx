import { SliderControl } from '@/components/atoms/SliderControl';
import { GreekGrid } from '@/components/molecules/GreekGrid';
import { ThetaBarsChart } from '@/components/molecules/ThetaBarsChart';
import { InimigosProgress } from '@/components/molecules/InimigosProgress';
import { useGreekSimulation } from '@/hooks/useGreekSimulation';
import { fmt } from '@/lib/formatters';
import type { Inimigo } from '@/lib/types';

export function GregasTab() {
  const { state, values, thetaBars, updateField } = useGreekSimulation();

  const daysColor =
    state.dias <= 7 ? 'var(--red)' : state.dias <= 14 ? 'var(--yellow)' : 'var(--green)';

  const distText =
    state.dist > 0
      ? `+${fmt(state.dist)} ITM`
      : state.dist < 0
        ? `${fmt(Math.abs(state.dist))} OTM`
        : 'ATM';

  const inimigos: Inimigo[] = [
    {
      label: 'Direção',
      val: 66,
      color: 'var(--accent)',
      desc: 'Necessidade de acertar para onde a ação vai',
    },
    {
      label: 'Tempo (Theta)',
      val: state.dias <= 7 ? 95 : state.dias <= 14 ? 75 : 55,
      color: 'var(--red)',
      desc: 'Quanto menos tempo, mais perigoso',
    },
    {
      label: 'Volatilidade',
      val: state.vol > 50 ? 80 : state.vol < 20 ? 30 : 50,
      color: 'var(--yellow)',
      desc: 'Comprar com IV alta = desvantagem estrutural',
    },
  ];

  const thetaStatus =
    state.dias <= 7
      ? `🔴 PERIGO: ${state.dias} dia(s). Theta devastando o prêmio. Mova ou saia agora.`
      : state.dias <= 14
        ? `🟡 ATENÇÃO: ${state.dias} dias. Theta acelerando. Ação precisa se mover em breve.`
        : `🟢 ${state.dias} dias restantes. Theta controlado, mas sempre corroendo.`;

  return (
    <>
      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">⏱ Controles</div>
        <SliderControl
          label="Dias até o vencimento"
          value={state.dias}
          min={1}
          max={60}
          step={1}
          color={daysColor}
          displayValue={`${state.dias} dias`}
          onChange={(v) => updateField('dias', v)}
          minLabel="1 dia"
          maxLabel="60 dias"
        />
        <SliderControl
          label="Volatilidade implícita"
          value={state.vol}
          min={10}
          max={80}
          step={1}
          color="var(--accent)"
          displayValue={`${state.vol}%`}
          onChange={(v) => updateField('vol', v)}
          minLabel="10%"
          maxLabel="80%"
        />
        <SliderControl
          label="Ação vs Strike"
          value={state.dist}
          min={-10}
          max={10}
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
          minLabel="-10 OTM"
          maxLabel="+10 ITM"
        />
      </div>

      <GreekGrid
        cards={[
          {
            name: 'Δ DELTA',
            nameColor: 'var(--accent)',
            value: values.delta.toFixed(2),
            icon: 'velocidade do carro',
            children: `Para cada R$ 1 que a ação sobe, o prêmio sobe R$ ${values.delta.toFixed(2)}. Delta ${values.delta > 0.7 ? 'alto — comporta-se quase como a ação' : values.delta < 0.3 ? 'baixo — OTM, responde pouco' : 'médio — ATM region'}.`,
          },
          {
            name: 'Θ THETA',
            nameColor: 'var(--red)',
            value: `-R$ ${values.theta.toFixed(2)}/dia`,
            icon: 'combustível vazando',
            children:
              state.dias <= 7
                ? `ZONA CRÍTICA: apenas ${state.dias} dia(s). Theta está destruindo o prêmio rapidamente — cada dia remove R$ ${values.theta.toFixed(2)}.`
                : `O prêmio perde R$ ${values.theta.toFixed(2)} por dia pela passagem do tempo, mesmo sem a ação se mover.`,
          },
          {
            name: 'V VEGA',
            nameColor: 'var(--yellow)',
            value: `×${values.vega.toFixed(2)}`,
            icon: 'sensibilidade ao caos',
            children:
              state.vol > 50
                ? 'Volatilidade muito alta — prêmios caros. Cuidado com o esmagamento de volatilidade após o evento.'
                : state.vol < 20
                  ? 'Volatilidade baixa — bom momento para comprar opções mais baratas.'
                  : 'Mercado em volatilidade normal. Vega sensível a eventos próximos.',
          },
          {
            name: 'Γ GAMMA',
            nameColor: 'var(--green)',
            value: values.gamma,
            icon: 'aceleração do carro',
            children: `Mede a velocidade de variação do Delta. ${values.gamma === 'máximo' ? 'ATM tem o maior Gamma. Quando explode ITM, o Delta acelera.' : values.gamma === 'alto' ? 'Gamma elevado — Delta muda rapidamente.' : 'Gamma baixo — Delta estável.'}`,
          },
        ]}
      />

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          ⏳ Theta decay — como o prêmio derrete
        </div>
        <ThetaBarsChart bars={thetaBars} currentDias={state.dias} />
        <div className="text-xs text-[#94a3b8] mt-3 p-2.5 bg-surface rounded-lg leading-relaxed text-center">
          {thetaStatus}
        </div>
        <p className="text-[11px] text-muted mt-2.5 leading-relaxed">
          O prêmio não derrete linearmente — derrete em forma de raiz quadrada.
          Os{' '}
          <strong className="text-red">últimos 7 dias</strong> são os
          mais devastadores. Comprador de opção está sempre correndo contra o
          relógio.
        </p>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">O que é volatilidade?</div>
        <p className="text-[13px] leading-relaxed text-[#94a3b8] mb-3">
          Volatilidade não é direção — é{' '}
          <strong className="text-text">
            intensidade esperada do movimento
          </strong>
          .
        </p>
        <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
          <div className="bg-surface rounded-lg p-3">
            <div className="text-[10px] text-green font-bold mb-1.5 tracking-[0.5px]">
              BAIXA VOLATILIDADE
            </div>
            <div className="text-[11px] text-[#94a3b8] leading-relaxed">
              Mercado espera PETR4 entre R$ 29 e R$ 31. Opções baratas. Pouca
              oportunidade para compradores.
            </div>
          </div>
          <div className="bg-surface rounded-lg p-3">
            <div className="text-[10px] text-red font-bold mb-1.5 tracking-[0.5px]">
              ALTA VOLATILIDADE
            </div>
            <div className="text-[11px] text-[#94a3b8] leading-relaxed">
              Mercado espera PETR4 entre R$ 20 e R$ 40. Opções caras. Antes de
              balanço, eleição, COPOM.
            </div>
          </div>
        </div>
        <div className="bg-yellow/10 border border-yellow/30 rounded-lg p-3 mt-2">
          <div className="text-[11px] text-[#94a3b8] leading-relaxed">
            Comprar opções com alta volatilidade implícita é caro — você paga
            pela expectativa de movimento. Compradores experientes tentam comprar
            com volatilidade baixa e vender quando ela sobe.
          </div>
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">Os 3 inimigos do comprador de opção</div>
        <InimigosProgress inimigos={inimigos} />
        <p className="text-xs text-muted leading-relaxed mt-2.5">
          Para ganhar como comprador, você precisa acertar direção, vencer o
          tempo E comprar com volatilidade favorável. É por isso que a maioria
          das opções compradas vira pó.
        </p>
      </div>
    </>
  );
}
