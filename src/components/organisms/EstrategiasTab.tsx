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

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          📋 Covered Call — Venda Coberta
        </div>
        <UsoCard
          icon=""
          name="O que é"
          desc="Você TEM as ações e vende CALL contra elas. Embolsa o prêmio todo mês. Se a ação subir além do strike, ela 'é chamada' e você entrega pelo preço combinado."
        />
        <div className="bg-surface rounded-[10px] p-3 mt-2.5">
          <div className="text-[10px] text-blue font-bold mb-1.5 tracking-[0.5px]">
            EXEMPLO PRÁTICO
          </div>
          <div className="text-[12px] text-text-secondary leading-[1.7]">
            Você tem 1.000 PETR4 a R$ 38. Vende{' '}
            <strong className="text-text">CALL strike R$ 42</strong>{' '}
            por <strong className="text-text">R$ 0,60</strong> de
            prêmio. Recebe R$ 600. Se PETR4 fechar abaixo de R$ 42, o prêmio é
            seu. Se subir acima, entrega as ações a R$ 42 e lucra R$ 4 por ação
            + o prêmio.
          </div>
        </div>
        <div className="bg-yellow/5 border border-yellow/15 dark:bg-yellow/[0.04] dark:border-yellow/[0.1] rounded-md p-3 mt-2">
          <div className="text-[11px] text-yellow font-bold mb-1">
            ⏱ O tempo (Theta) trabalha A SEU FAVOR como vendedor
          </div>
          <div className="text-[12px] text-text-secondary leading-[1.6]">
            A cada dia que passa, a opção vale menos. Como você vendeu, o
            decaimento temporal é lucro para você. Diferente do comprador, que
            luta contra o relógio.
          </div>
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          🛡️ Protective Put — Seguro de Carteira
        </div>
        <UsoCard
          icon=""
          name="O que é"
          desc="Você já tem as ações e compra PUTs como seguro. Se o mercado cair forte, as PUTs valorizam e compensam as perdas da carteira. É como um seguro de carro: paga o prêmio, nunca quer usar."
        />
        <div className="bg-surface rounded-[10px] p-3 mt-2.5">
          <div className="text-[10px] text-blue font-bold mb-1.5 tracking-[0.5px]">
            EXEMPLO PRÁTICO
          </div>
          <div className="text-[12px] text-text-secondary leading-[1.7]">
            Carteira de R$ 10M em ações. Compra PUTs de 1% do valor (R$ 100k em
            prêmio). Se o mercado cai 20%, a carteira perde R$ 2M, mas as PUTs
            valorizam ~R$ 1,5M. O seguro{' '}
            <strong className="text-green">reduziu a perda</strong> de
            20% para 5-6%.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2.5 max-sm:grid-cols-1">
          <div className="bg-red/5 border border-red/20 rounded-[10px] p-3 text-center">
            <div className="text-[10px] text-red font-bold mb-1 tracking-[0.5px]">
              SEM SEGURO
            </div>
            <div className="text-lg text-red font-bold font-mono">
              -20%
            </div>
            <div className="text-[11px] text-text-secondary">
              Perda total de R$ 2M
            </div>
          </div>
          <div className="bg-green/5 border border-green/20 rounded-[10px] p-3 text-center">
            <div className="text-[10px] text-green font-bold mb-1 tracking-[0.5px]">
              COM SEGURO
            </div>
            <div className="text-lg text-green font-bold font-mono">
              -5,5%
            </div>
            <div className="text-[11px] text-text-secondary">
              Perda reduzida para ~R$ 550k
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          🔒 Collar — A Estratégia dos Profissionais
        </div>
        <UsoCard
          icon=""
          name="O que é"
          desc="Comprar uma PUT (proteção) e vender uma CALL (financiamento) ao mesmo tempo sobre a mesma ação. O prêmio recebido da CALL pode pagar parcial ou totalmente a PUT."
        />
        <div className="bg-surface rounded-[10px] p-3 mt-2.5">
          <div className="text-[10px] text-blue font-bold mb-1.5 tracking-[0.5px]">
            EXEMPLO PRÁTICO
          </div>
          <div className="text-[12px] text-text-secondary leading-[1.7]">
            PETR4 a R$ 38. Compra PUT strike R$ 35 (R$ 0,50). Vende CALL strike
            R$ 42 (R$ 0,50). Prêmio pago líquido = <strong>R$ 0</strong>. Sua
            carteira está protegida entre R$ 35 e R$ 42. Se a ação despencar,
            a PUT garante venda a R$ 35. Se disparar, você entrega a R$ 42 mas
            ainda lucrou até lá.
          </div>
        </div>
        <div className="bg-yellow/5 border border-yellow/15 dark:bg-yellow/[0.04] dark:border-yellow/[0.1] rounded-md p-3 mt-2">
          <div className="text-[11px] text-yellow font-bold mb-1">
            💡 Custo zero? Sim, se os prêmios se equilibrarem
          </div>
          <div className="text-[12px] text-text-secondary leading-[1.6]">
            Quando a CALL vendida paga exatamente o que a PUT comprada custa, o
            resultado é uma proteção completa sem desembolso. Profissionais de
            mercado montam collars para dormir tranquilos.
          </div>
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          💰 Cash Secured Put — Comprar com Desconto
        </div>
        <UsoCard
          icon=""
          name="O que é"
          desc="Vender uma PUT com caixa garantido — você deixa dinheiro separado para comprar a ação se for exercido. Se a PUT expirar OTM, fica com o prêmio. Se for exercido, compra a ação pelo strike (que já era um preço desejado)."
        />
        <div className="bg-surface rounded-[10px] p-3 mt-2.5">
          <div className="text-[10px] text-blue font-bold mb-1.5 tracking-[0.5px]">
            EXEMPLO PRÁTICO
          </div>
          <div className="text-[12px] text-text-secondary leading-[1.7]">
            PETR4 a R$ 38. Você quer comprar por R$ 35. Vende{' '}
            <strong className="text-text">PUT strike R$ 35</strong>{' '}
            por <strong className="text-text">R$ 0,70</strong> de
            prêmio. Garante R$ 35 x 100 = R$ 3.500 por opção na conta. Se a PUT
            expirar OTM, você embolsa R$ 70 por lote. Se for exercido, compra
            a PETR4 efetivamente a R$ 34,30 (R$ 35 - R$ 0,70).
          </div>
        </div>
        <div className="text-[12px] text-text-secondary leading-[1.7] p-2.5 mt-2 bg-green/5 rounded-md border border-green/15 dark:bg-green/[0.04] dark:border-green/[0.1]">
          <strong className="text-green">Resultado:</strong> Se a ação
          não caiu abaixo de R$ 35, você lucra o prêmio. Se caiu, compra a ação
          com desconto — exatamente o que queria. É uma{' '}
          <strong className="text-text">
            operação ganha-ganha
          </strong>{' '}
          quando você realmente quer ser acionista.
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          📊 Tabela Comparativa de Estratégias
        </div>
        <div className="text-[12px] text-text-secondary leading-[1.6] mb-2.5">
          Resumo das quatro estratégias abordadas:
        </div>
        <div className="rounded-[10px] overflow-hidden border border-border-custom">
          {/* Header */}
          <div className="grid grid-cols-[1.5fr_0.8fr_0.8fr_1.2fr] bg-surface border-b border-border-custom">
            <div className="p-[8px_10px] font-bold text-[10px] text-muted tracking-[0.5px] font-mono">
              ESTRATÉGIA
            </div>
            <div className="p-[8px_10px] font-bold text-[10px] text-muted tracking-[0.5px] font-mono">
              RISCO
            </div>
            <div className="p-[8px_10px] font-bold text-[10px] text-muted tracking-[0.5px] font-mono">
              THETA
            </div>
            <div className="p-[8px_10px] font-bold text-[10px] text-muted tracking-[0.5px] font-mono">
              IDEAL PARA
            </div>
          </div>
          {/* Linha 1 */}
          <div className="grid grid-cols-[1.5fr_0.8fr_0.8fr_1.2fr] border-b border-border-custom bg-card-custom">
            <div className="p-[8px_10px] text-[11px] text-text">Covered Call</div>
            <div className="p-[8px_10px] text-[11px] text-green">Baixo</div>
            <div className="p-[8px_10px] text-[11px] text-green">A favor</div>
            <div className="p-[8px_10px] text-[11px] text-text-secondary">Renda mensal</div>
          </div>
          {/* Linha 2 */}
          <div className="grid grid-cols-[1.5fr_0.8fr_0.8fr_1.2fr] border-b border-border-custom bg-surface">
            <div className="p-[8px_10px] text-[11px] text-text">Protective Put</div>
            <div className="p-[8px_10px] text-[11px] text-yellow">Prêmio pago</div>
            <div className="p-[8px_10px] text-[11px] text-red">Contra</div>
            <div className="p-[8px_10px] text-[11px] text-text-secondary">Proteger carteira</div>
          </div>
          {/* Linha 3 */}
          <div className="grid grid-cols-[1.5fr_0.8fr_0.8fr_1.2fr] border-b border-border-custom bg-card-custom">
            <div className="p-[8px_10px] text-[11px] text-text">Collar</div>
            <div className="p-[8px_10px] text-[11px] text-green">Limitado</div>
            <div className="p-[8px_10px] text-[11px] text-text-secondary">Neutro</div>
            <div className="p-[8px_10px] text-[11px] text-text-secondary">Proteção zero-custo</div>
          </div>
          {/* Linha 4 */}
          <div className="grid grid-cols-[1.5fr_0.8fr_0.8fr_1.2fr] bg-surface">
            <div className="p-[8px_10px] text-[11px] text-text">Cash Secured Put</div>
            <div className="p-[8px_10px] text-[11px] text-yellow">Strike</div>
            <div className="p-[8px_10px] text-[11px] text-green">A favor</div>
            <div className="p-[8px_10px] text-[11px] text-text-secondary">Comprar com desconto</div>
          </div>
        </div>
      </div>
    </>
  );
}
