import { WarningBox } from '@/components/atoms/WarningBox';
import { Formula } from '@/components/atoms/Formula';
import { UsoCard } from '@/components/atoms/UsoCard';
import { HierarchyRow } from '@/components/atoms/HierarchyRow';
import { HIERARCHY } from '@/data/hierarchy';

export function RiscosTab() {
  return (
    <>
      <WarningBox title="⚠️ NAKED CALL — O mais perigoso do mercado">
        PETR4 = R$ 30. Você vende CALL strike R$ 35, recebe R$ 1. A Petrobras
        anuncia algo extraordinário. Ação vai a R$ 100. Você é obrigado a
        entregar ações a R$ 35.{' '}
        <strong>Perda teórica ilimitada</strong> — não existe teto para quanto
        uma ação pode subir.
      </WarningBox>

      <div className="card">
        <div className="card-header">
          Hierarquia de risco — do mais ao menos seguro
        </div>
        {HIERARCHY.map((item, i) => (
          <HierarchyRow key={i} {...item} rank={i + 1} />
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          Margem de garantia (para vendedores)
        </div>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.8,
            color: '#94a3b8',
            marginBottom: 10,
          }}
        >
          Quem vende opção assume risco, então a B3 exige garantia depositada.
        </p>
        <div className="grid-2" style={{ marginBottom: 10 }}>
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
                color: 'var(--blue)',
                fontWeight: 700,
                marginBottom: 6,
                letterSpacing: 0.5,
              }}
            >
              ACEITO COMO MARGEM
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.7 }}>
              Dinheiro, Títulos do Tesouro, Ações, BDRs, FIIs. A B3 usa o
              sistema CORE para calcular.
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
                color: 'var(--yellow)',
                fontWeight: 700,
                marginBottom: 6,
                letterSpacing: 0.5,
              }}
            >
              QUANTO EXIGE
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.7 }}>
              Varia: 10% a 40% do valor do ativo. Depende de volatilidade,
              prazo, distância do strike.
            </div>
          </div>
        </div>
        <div
          style={{
            background: '#ff3d5711',
            border: '1px solid #ff3d5733',
            borderRadius: 10,
            padding: 12,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: 'var(--red)',
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            Chamada de Margem (Margin Call)
          </div>
          <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.7 }}>
            O mercado se move contra o vendedor. A corretora exige mais depósito
            até um horário. Se não depositar,{' '}
            <strong>
              fecha a posição compulsoriamente com o prejuízo do dia
            </strong>
            . Isso nunca acontece com o comprador.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          O seguro que quebra a seguradora
        </div>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.8,
            color: '#94a3b8',
            marginBottom: 12,
          }}
        >
          A analogia perfeita para entender vender opções:
        </p>
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 12,
            padding: 14,
            marginBottom: 8,
          }}
        >
          <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.8 }}>
            Você oferece seguro de carro. R$ 100/mês. Por anos:
            <br />
            Recebe R$ 100 ✅ Recebe R$ 100 ✅ Recebe R$ 100 ✅
            <br />
            <br />
            Parece incrível. Até que um dia:
            <br />
            <strong style={{ color: 'var(--red)' }}>
              O carro é roubado. Você paga R$ 80.000.
            </strong>
          </div>
        </div>
        <div
          style={{
            fontSize: 12,
            color: '#94a3b8',
            lineHeight: 1.7,
            padding: 10,
            background: '#ffd54f11',
            borderRadius: 8,
            border: '1px solid #ffd54f22',
          }}
        >
          Vender opções = muitos ganhos pequenos + poucas perdas enormes.
          Funciona bem na maioria do tempo. Mas o "tail risk" pode ser
          devastador se não houver gestão adequada de risco.
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          Os 3 lados para lucrar com opções
        </div>
        <UsoCard
          icon=""
          name="1. Direção ✓"
          desc="Acertar para onde a ação vai. Alta para CALL, baixa para PUT. O mais óbvio — e o que a maioria foca."
        />
        <UsoCard
          icon=""
          name="2. Tempo ✓"
          desc="A ação precisa se mover na direção certa E rápido o suficiente. Uma CALL que acerta a direção mas demora demais ainda perde para o Theta."
        />
        <UsoCard
          icon=""
          name="3. Volatilidade ✓"
          desc="Comprar com IV baixa e segurar quando a IV sobe (antes de eventos) pode ser lucrativo mesmo sem a ação andar."
        />
        <p
          style={{
            fontSize: 12,
            color: 'var(--muted)',
            marginTop: 10,
            lineHeight: 1.6,
          }}
        >
          Comprador luta contra os três. É por isso que poucos ganham
          consistentemente comprando opções — você precisa acertar quase tudo ao
          mesmo tempo.
        </p>
      </div>

      <div className="card">
        <div className="card-header">Ciclo de vida de uma opção</div>
        <Formula>
          <div style={{ color: 'var(--green)' }}>// Cenário bom</div>
          <div>Compra → ação sobe forte → vira ITM</div>
          <div style={{ color: 'var(--muted)' }}>
            → prêmio explode
          </div>
          <div style={{ color: 'var(--muted)' }}>
            → vende antes do vencimento (realiza lucro)
          </div>
          <div style={{ color: 'var(--muted)' }}>
            → ou exerce e compra pelo strike
          </div>
          <div style={{ marginTop: 10, color: 'var(--red)' }}>
            // Cenário comum
          </div>
          <div>Compra → ação fica parada ou cai</div>
          <div style={{ color: 'var(--muted)' }}>
            → Theta corrói o prêmio dia a dia
          </div>
          <div style={{ color: 'var(--muted)' }}>
            → opção "vira pó" no vencimento
          </div>
          <div style={{ color: 'var(--muted)' }}>
            → perde 100% do prêmio
          </div>
        </Formula>
        <div
          style={{
            fontSize: 11,
            color: 'var(--muted)',
            marginTop: 10,
            lineHeight: 1.6,
          }}
        >
          Na B3, vencimento é sempre na terceira segunda-feira do mês. Após
          essa data, o contrato desaparece.
        </div>
      </div>
    </>
  );
}
