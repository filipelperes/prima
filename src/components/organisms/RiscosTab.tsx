import { memo } from 'react';
import { WarningBox } from '@/components/atoms/WarningBox';
import { Formula } from '@/components/atoms/Formula';
import { UsoCard } from '@/components/atoms/UsoCard';
import { HierarchyRow } from '@/components/atoms/HierarchyRow';
import { HIERARCHY } from '@/data/hierarchy';

export const RiscosTab = memo(function RiscosTab() {
  return (
    <>
      <WarningBox title="⚠️ NAKED CALL — O mais perigoso do mercado">
        PETR4 = R$ 30. Você vende CALL strike R$ 35, recebe R$ 1. A Petrobras
        anuncia algo extraordinário. Ação vai a R$ 100. Você é obrigado a
        entregar ações a R$ 35.{' '}
        <strong>Perda teórica ilimitada</strong> — não existe teto para quanto
        uma ação pode subir.
      </WarningBox>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          Hierarquia de risco — do mais ao menos seguro
        </div>
        {HIERARCHY.map((item, i) => (
          <HierarchyRow key={i} {...item} rank={i + 1} />
        ))}
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          Margem de garantia (para vendedores)
        </div>
        <p className="text-[13px] leading-[1.8] text-text-secondary mb-2.5">
          Quem vende opção assume risco, então a B3 exige garantia depositada.
        </p>
        <div className="grid grid-cols-2 gap-2 mb-2.5 max-sm:grid-cols-1">
          <div className="bg-surface rounded-[10px] p-3">
            <div className="text-[10px] text-blue font-bold mb-1.5 tracking-[0.5px]">
              ACEITO COMO MARGEM
            </div>
            <div className="text-[11px] text-text-secondary leading-[1.7]">
              Dinheiro, Títulos do Tesouro, Ações, BDRs, FIIs. A B3 usa o
              sistema CORE para calcular.
            </div>
          </div>
          <div className="bg-surface rounded-[10px] p-3">
            <div className="text-[10px] text-yellow font-bold mb-1.5 tracking-[0.5px]">
              QUANTO EXIGE
            </div>
            <div className="text-[11px] text-text-secondary leading-[1.7]">
              Varia: 10% a 40% do valor do ativo. Depende de volatilidade,
              prazo, distância do strike.
            </div>
          </div>
        </div>
        <div className="bg-red/[0.07] border border-red/[0.20] rounded-[10px] p-3">
          <div className="text-xs text-red font-bold mb-1.5">
            Chamada de Margem (Margin Call)
          </div>
          <div className="text-xs text-text-secondary leading-[1.7]">
            O mercado se move contra o vendedor. A corretora exige mais depósito
            até um horário. Se não depositar,{' '}
            <strong>
              fecha a posição compulsoriamente com o prejuízo do dia
            </strong>
            . Isso nunca acontece com o comprador.
          </div>
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          O seguro que quebra a seguradora
        </div>
        <p className="text-[13px] leading-[1.8] text-text-secondary mb-3">
          A analogia perfeita para entender vender opções:
        </p>
        <div className="bg-surface rounded-lg p-3.5 mb-2">
          <div className="text-xs text-text-secondary leading-[1.8]">
            Você oferece seguro de carro. R$ 100/mês. Por anos:
            <br />
            Recebe R$ 100 ✅ Recebe R$ 100 ✅ Recebe R$ 100 ✅
            <br />
            <br />
            Parece incrível. Até que um dia:
            <br />
            <strong className="text-red">
              O carro é roubado. Você paga R$ 80.000.
            </strong>
          </div>
        </div>
        <div className="text-xs text-text-secondary leading-[1.7] p-2.5 bg-yellow/[0.07] rounded-lg border border-yellow/[0.13]">
          Vender opções = muitos ganhos pequenos + poucas perdas enormes.
          Funciona bem na maioria do tempo. Mas o "tail risk" pode ser
          devastador se não houver gestão adequada de risco.
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
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
        <p className="text-xs text-muted mt-2.5 leading-[1.6]">
          Comprador luta contra os três. É por isso que poucos ganham
          consistentemente comprando opções — você precisa acertar quase tudo ao
          mesmo tempo.
        </p>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          Ciclo de vida de uma opção
        </div>
        <Formula>
          <div className="text-green">// Cenário bom</div>
          <div>Compra → ação sobe forte → vira ITM</div>
          <div className="text-muted">→ prêmio explode</div>
          <div className="text-muted">→ vende antes do vencimento (realiza lucro)</div>
          <div className="text-muted">→ ou exerce e compra pelo strike</div>
          <div className="mt-2.5 text-red">// Cenário comum</div>
          <div>Compra → ação fica parada ou cai</div>
          <div className="text-muted">→ Theta corrói o prêmio dia a dia</div>
          <div className="text-muted">→ opção "vira pó" no vencimento</div>
          <div className="text-muted">→ perde 100% do prêmio</div>
        </Formula>
        <div className="text-[11px] text-muted mt-2.5 leading-[1.6]">
          Na B3, vencimento é sempre na terceira segunda-feira do mês. Após
          essa data, o contrato desaparece.
        </div>
      </div>
    </>
  );
});
