import { UsoCard } from '@/components/atoms/UsoCard';
import { WarningBox } from '@/components/atoms/WarningBox';

export default function EstrategiasTab() {
  return (
    <>
      <WarningBox title="⚠️ NAKED CALL — Risco Ilimitado">
        Vender CALL sem ter a ação é a operação mais perigosa do mercado.
        Exemplo: PETR4 de R$ 30 sobe para R$ 100. Você vendeu strike R$ 35,
        recebeu R$ 1 de prêmio. Perda por ação:{' '}
        <strong>
          R$ 65 — e não há limite para o prejuízo
        </strong>{' '}
        se a ação continuar subindo.
      </WarningBox>

      <div className="card">
        <div className="card-header">
          📋 Covered Call — Venda Coberta
        </div>
        <UsoCard
          icon=""
          name="O que é"
          desc="Você TEM as ações e vende CALL contra elas. Embolsa o prêmio todo mês. Se a ação subir além do strike, ela 'é chamada' e você entrega pelo preço combinado."
        />
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 10,
            padding: 12,
            marginTop: 10,
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
            EXEMPLO PRÁTICO
          </div>
          <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.7 }}>
            Você tem 1.000 PETR4 a R$ 38. Vende{' '}
            <strong style={{ color: 'var(--text)' }}>CALL strike R$ 42</strong>{' '}
            por <strong style={{ color: 'var(--text)' }}>R$ 0,60</strong> de
            prêmio. Recebe R$ 600. Se PETR4 fechar abaixo de R$ 42, o prêmio é
            seu. Se subir acima, entrega as ações a R$ 42 e lucra R$ 4 por ação
            + o prêmio.
          </div>
        </div>
        <div
          style={{
            background: '#ffd54f11',
            border: '1px solid #ffd54f22',
            borderRadius: 8,
            padding: 12,
            marginTop: 8,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: 'var(--yellow)',
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            ⏱ O tempo (Theta) trabalha A SEU FAVOR como vendedor
          </div>
          <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>
            A cada dia que passa, a opção vale menos. Como você vendeu, o
            decaimento temporal é lucro para você. Diferente do comprador, que
            luta contra o relógio.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          🛡️ Protective Put — Seguro de Carteira
        </div>
        <UsoCard
          icon=""
          name="O que é"
          desc="Você já tem as ações e compra PUTs como seguro. Se o mercado cair forte, as PUTs valorizam e compensam as perdas da carteira. É como um seguro de carro: paga o prêmio, nunca quer usar."
        />
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 10,
            padding: 12,
            marginTop: 10,
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
            EXEMPLO PRÁTICO
          </div>
          <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.7 }}>
            Carteira de R$ 10M em ações. Compra PUTs de 1% do valor (R$ 100k em
            prêmio). Se o mercado cai 20%, a carteira perde R$ 2M, mas as PUTs
            valorizam ~R$ 1,5M. O seguro{' '}
            <strong style={{ color: 'var(--green)' }}>reduziu a perda</strong> de
            20% para 5-6%.
          </div>
        </div>
        <div className="grid-2" style={{ marginTop: 10 }}>
          <div
            style={{
              background: '#ff3d5711',
              border: '1px solid #ff3d5733',
              borderRadius: 10,
              padding: 12,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: 'var(--red)',
                fontWeight: 700,
                marginBottom: 4,
                letterSpacing: 0.5,
              }}
            >
              SEM SEGURO
            </div>
            <div
              style={{
                fontSize: 18,
                color: 'var(--red)',
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              -20%
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>
              Perda total de R$ 2M
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
            <div
              style={{
                fontSize: 10,
                color: 'var(--green)',
                fontWeight: 700,
                marginBottom: 4,
                letterSpacing: 0.5,
              }}
            >
              COM SEGURO
            </div>
            <div
              style={{
                fontSize: 18,
                color: 'var(--green)',
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              -5,5%
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>
              Perda reduzida para ~R$ 550k
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          🔒 Collar — A Estratégia dos Profissionais
        </div>
        <UsoCard
          icon=""
          name="O que é"
          desc="Comprar uma PUT (proteção) e vender uma CALL (financiamento) ao mesmo tempo sobre a mesma ação. O prêmio recebido da CALL pode pagar parcial ou totalmente a PUT."
        />
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 10,
            padding: 12,
            marginTop: 10,
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
            EXEMPLO PRÁTICO
          </div>
          <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.7 }}>
            PETR4 a R$ 38. Compra PUT strike R$ 35 (R$ 0,50). Vende CALL strike
            R$ 42 (R$ 0,50). Prêmio pago líquido = <strong>R$ 0</strong>. Sua
            carteira está protegida entre R$ 35 e R$ 42. Se a ação despencar,
            a PUT garante venda a R$ 35. Se disparar, você entrega a R$ 42 mas
            ainda lucrou até lá.
          </div>
        </div>
        <div
          style={{
            background: '#ffd54f11',
            border: '1px solid #ffd54f22',
            borderRadius: 8,
            padding: 12,
            marginTop: 8,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: 'var(--yellow)',
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            💡 Custo zero? Sim, se os prêmios se equilibrarem
          </div>
          <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>
            Quando a CALL vendida paga exatamente o que a PUT comprada custa, o
            resultado é uma proteção completa sem desembolso. Profissionais de
            mercado montam collars para dormir tranquilos.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          💰 Cash Secured Put — Comprar com Desconto
        </div>
        <UsoCard
          icon=""
          name="O que é"
          desc="Vender uma PUT com caixa garantido — você deixa dinheiro separado para comprar a ação se for exercido. Se a PUT expirar OTM, fica com o prêmio. Se for exercido, compra a ação pelo strike (que já era um preço desejado)."
        />
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 10,
            padding: 12,
            marginTop: 10,
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
            EXEMPLO PRÁTICO
          </div>
          <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.7 }}>
            PETR4 a R$ 38. Você quer comprar por R$ 35. Vende{' '}
            <strong style={{ color: 'var(--text)' }}>PUT strike R$ 35</strong>{' '}
            por <strong style={{ color: 'var(--text)' }}>R$ 0,70</strong> de
            prêmio. Garante R$ 35 x 100 = R$ 3.500 por opção na conta. Se a PUT
            expirar OTM, você embolsa R$ 70 por lote. Se for exercido, compra
            a PETR4 efetivamente a R$ 34,30 (R$ 35 - R$ 0,70).
          </div>
        </div>
        <div
          style={{
            fontSize: 12,
            color: '#94a3b8',
            lineHeight: 1.7,
            padding: 10,
            marginTop: 8,
            background: '#00e67611',
            borderRadius: 8,
            border: '1px solid #00e67622',
          }}
        >
          <strong style={{ color: 'var(--green)' }}>Resultado:</strong> Se a ação
          não caiu abaixo de R$ 35, você lucra o prêmio. Se caiu, compra a ação
          com desconto — exatamente o que queria. É uma{' '}
          <strong style={{ color: 'var(--text)' }}>
            operação ganha-ganha
          </strong>{' '}
          quando você realmente quer ser acionista.
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          📊 Tabela Comparativa de Estratégias
        </div>
        <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6, marginBottom: 10 }}>
          Resumo das quatro estratégias abordadas:
        </div>
        <div
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            border: '1px solid var(--border)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 0.8fr 0.8fr 1.2fr',
              background: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div style={{ padding: '8px 10px', fontWeight: 700, fontSize: 10, color: 'var(--muted)', letterSpacing: 0.5, fontFamily: "'JetBrains Mono', monospace" }}>
              ESTRATÉGIA
            </div>
            <div style={{ padding: '8px 10px', fontWeight: 700, fontSize: 10, color: 'var(--muted)', letterSpacing: 0.5, fontFamily: "'JetBrains Mono', monospace" }}>
              RISCO
            </div>
            <div style={{ padding: '8px 10px', fontWeight: 700, fontSize: 10, color: 'var(--muted)', letterSpacing: 0.5, fontFamily: "'JetBrains Mono', monospace" }}>
              THETA
            </div>
            <div style={{ padding: '8px 10px', fontWeight: 700, fontSize: 10, color: 'var(--muted)', letterSpacing: 0.5, fontFamily: "'JetBrains Mono', monospace" }}>
              IDEAL PARA
            </div>
          </div>
          {/* Linha 1 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 0.8fr 0.8fr 1.2fr',
              borderBottom: '1px solid var(--border)',
              background: 'var(--card)',
            }}
          >
            <div style={{ padding: '8px 10px', fontSize: 11, color: 'var(--text)' }}>Covered Call</div>
            <div style={{ padding: '8px 10px', fontSize: 11, color: 'var(--green)' }}>Baixo</div>
            <div style={{ padding: '8px 10px', fontSize: 11, color: 'var(--green)' }}>A favor</div>
            <div style={{ padding: '8px 10px', fontSize: 11, color: '#94a3b8' }}>Renda mensal</div>
          </div>
          {/* Linha 2 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 0.8fr 0.8fr 1.2fr',
              borderBottom: '1px solid var(--border)',
              background: 'var(--surface)',
            }}
          >
            <div style={{ padding: '8px 10px', fontSize: 11, color: 'var(--text)' }}>Protective Put</div>
            <div style={{ padding: '8px 10px', fontSize: 11, color: 'var(--yellow)' }}>Prêmio pago</div>
            <div style={{ padding: '8px 10px', fontSize: 11, color: 'var(--red)' }}>Contra</div>
            <div style={{ padding: '8px 10px', fontSize: 11, color: '#94a3b8' }}>Proteger carteira</div>
          </div>
          {/* Linha 3 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 0.8fr 0.8fr 1.2fr',
              borderBottom: '1px solid var(--border)',
              background: 'var(--card)',
            }}
          >
            <div style={{ padding: '8px 10px', fontSize: 11, color: 'var(--text)' }}>Collar</div>
            <div style={{ padding: '8px 10px', fontSize: 11, color: 'var(--green)' }}>Limitado</div>
            <div style={{ padding: '8px 10px', fontSize: 11, color: '#94a3b8' }}>Neutro</div>
            <div style={{ padding: '8px 10px', fontSize: 11, color: '#94a3b8' }}>Proteção zero-custo</div>
          </div>
          {/* Linha 4 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 0.8fr 0.8fr 1.2fr',
              background: 'var(--surface)',
            }}
          >
            <div style={{ padding: '8px 10px', fontSize: 11, color: 'var(--text)' }}>Cash Secured Put</div>
            <div style={{ padding: '8px 10px', fontSize: 11, color: 'var(--yellow)' }}>Strike</div>
            <div style={{ padding: '8px 10px', fontSize: 11, color: 'var(--green)' }}>A favor</div>
            <div style={{ padding: '8px 10px', fontSize: 11, color: '#94a3b8' }}>Comprar com desconto</div>
          </div>
        </div>
      </div>
    </>
  );
}
