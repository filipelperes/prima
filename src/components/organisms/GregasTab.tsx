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
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="card-header">⏱ Controles</div>
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

      <div className="card">
        <div className="card-header">
          ⏳ Theta decay — como o prêmio derrete
        </div>
        <ThetaBarsChart bars={thetaBars} currentDias={state.dias} />
        <div
          style={{
            fontSize: 12,
            color: '#94a3b8',
            marginTop: 12,
            padding: 10,
            background: 'var(--surface)',
            borderRadius: 8,
            lineHeight: 1.6,
            textAlign: 'center',
          }}
        >
          {thetaStatus}
        </div>
        <p
          style={{
            fontSize: 11,
            color: 'var(--muted)',
            marginTop: 10,
            lineHeight: 1.6,
          }}
        >
          O prêmio não derrete linearmente — derrete em forma de raiz quadrada.
          Os{' '}
          <strong style={{ color: 'var(--red)' }}>últimos 7 dias</strong> são os
          mais devastadores. Comprador de opção está sempre correndo contra o
          relógio.
        </p>
      </div>

      <div className="card">
        <div className="card-header">O que é volatilidade?</div>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.8,
            color: '#94a3b8',
            marginBottom: 12,
          }}
        >
          Volatilidade não é direção — é{' '}
          <strong style={{ color: 'var(--text)' }}>
            intensidade esperada do movimento
          </strong>
          .
        </p>
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
                color: 'var(--green)',
                fontWeight: 700,
                marginBottom: 6,
                letterSpacing: 0.5,
              }}
            >
              BAIXA VOLATILIDADE
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.6 }}>
              Mercado espera PETR4 entre R$ 29 e R$ 31. Opções baratas. Pouca
              oportunidade para compradores.
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
                color: 'var(--red)',
                fontWeight: 700,
                marginBottom: 6,
                letterSpacing: 0.5,
              }}
            >
              ALTA VOLATILIDADE
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.6 }}>
              Mercado espera PETR4 entre R$ 20 e R$ 40. Opções caras. Antes de
              balanço, eleição, COPOM.
            </div>
          </div>
        </div>
        <div
          style={{
            background: '#ffd54f11',
            border: '1px solid #ffd54f33',
            borderRadius: 10,
            padding: 12,
            marginTop: 8,
          }}
        >
          <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.6 }}>
            Comprar opções com alta volatilidade implícita é caro — você paga
            pela expectativa de movimento. Compradores experientes tentam comprar
            com volatilidade baixa e vender quando ela sobe.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Os 3 inimigos do comprador de opção</div>
        <InimigosProgress inimigos={inimigos} />
        <p
          style={{
            fontSize: 12,
            color: 'var(--muted)',
            lineHeight: 1.6,
            marginTop: 10,
          }}
        >
          Para ganhar como comprador, você precisa acertar direção, vencer o
          tempo E comprar com volatilidade favorável. É por isso que a maioria
          das opções compradas vira pó.
        </p>
      </div>
    </>
  );
}
