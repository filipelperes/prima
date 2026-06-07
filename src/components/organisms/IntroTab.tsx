import { useState } from 'react';
import { Formula } from '@/components/atoms/Formula';
import { CompareTable } from '@/components/molecules/CompareTable';
import { UsoCard } from '@/components/atoms/UsoCard';
import { CodeDecoder } from '@/components/molecules/CodeDecoder';
import { ANALOGIES } from '@/data/analogies';

export function IntroTab() {
  const [analogyTab, setAnalogyTab] = useState('apartamento');
  const current = ANALOGIES.find((a) => a.id === analogyTab) ?? ANALOGIES[0];
  return (
    <>
      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">O que é uma opção?</div>
        <p className="text-sm leading-relaxed text-[#94a3b8] mb-3">
          Uma opção é um{' '}
          <strong className="text-text">
            contrato que dá um direito, mas não uma obrigação
          </strong>
          , de comprar ou vender um ativo por um preço combinado até uma data
          específica.
        </p>
        <Formula>
          <div>
            <span className="text-accent font-bold">Opção</span>{' '}
            <span className="text-muted">=</span>{' '}
            <span className="text-yellow">Direito</span>{' '}
            <span className="text-muted">+</span>{' '}
            <span className="text-yellow">Preço Fixo</span>{' '}
            <span className="text-muted">+</span>{' '}
            <span className="text-yellow">Data Limite</span>
          </div>
          <div className="mt-1.5">
            <span className="text-muted text-[11px]">
              // Você paga um prêmio por esse direito
            </span>
          </div>
        </Formula>
        <p className="text-xs leading-relaxed text-[#94a3b8]">
          O prêmio é o{' '}
          <strong className="text-text">
            máximo que você pode perder
          </strong>{' '}
          como comprador. Não tem como perder mais do que pagou.
        </p>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">Analogias interativas</div>
        <p className="text-[13px] leading-relaxed text-[#94a3b8] mb-3">
          Cada analogia mostra o conceito financeiro (esquerda) lado a lado com
          o mundo real (direita). Clique para trocar:
        </p>
        <div className="flex gap-1 mb-3 flex-wrap">
          {ANALOGIES.map((a) => (
            <button
              key={a.id}
              onClick={() => setAnalogyTab(a.id)}
              className={`flex-1 min-w-[80px] px-2.5 py-2 rounded-lg cursor-pointer text-[11px] font-bold font-sans transition-all duration-200 text-center border ${
                analogyTab === a.id
                  ? 'bg-accent/15 border-accent/30 text-accent'
                  : 'bg-surface border-border-custom text-muted'
              }`}
            >
              {a.icon} {a.title}
            </button>
          ))}
        </div>
        <div className="bg-surface rounded-lg px-3 py-2 mb-3 text-xs text-accent font-mono border border-border-custom">
          💡 {current.conceito}
        </div>
        <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
          <div className="bg-accent/5 border border-accent/10 rounded-lg p-3.5">
            <div className="text-[9px] text-accent font-bold tracking-[1px] mb-2 font-mono uppercase">
              📊 Mercado financeiro
            </div>
            {current.financeiro.map((line, i) => (
              <div
                key={i}
                className={`text-[11px] text-[#94a3b8] leading-relaxed mb-1 ${i > 0 ? 'pl-3' : ''}`}
              >
                {line}
              </div>
            ))}
          </div>
          <div className="bg-yellow/5 border border-yellow/10 rounded-lg p-3.5">
            <div className="text-[9px] text-yellow font-bold tracking-[1px] mb-2 font-mono uppercase">
              🌎 Mundo real
            </div>
            {current.mundoReal.map((line, i) => (
              <div
                key={i}
                className={`text-[11px] text-[#94a3b8] leading-relaxed mb-1 ${i > 0 ? 'pl-3' : ''}`}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">Tipos de opção</div>
        <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
          <div className="bg-green/5 border border-green/20 rounded-lg p-3.5">
            <div className="text-[22px] font-black text-green mb-1">
              CALL
            </div>
            <div className="text-xs font-bold mb-1.5">
              Direito de COMPRAR
            </div>
            <div className="text-[11px] text-[#94a3b8] leading-relaxed">
              Você ganha quando o ativo{' '}
              <strong className="text-green">sobe</strong>. Aposta de
              alta.
            </div>
          </div>
          <div className="bg-red/5 border border-red/20 rounded-lg p-3.5">
            <div className="text-[22px] font-black text-red mb-1">
              PUT
            </div>
            <div className="text-xs font-bold mb-1.5">
              Direito de VENDER
            </div>
            <div className="text-[11px] text-[#94a3b8] leading-relaxed">
              Você ganha quando o ativo{' '}
              <strong className="text-red">cai</strong>. Aposta de
              baixa ou proteção.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">🔍 Decodificador de códigos B3</div>
        <p className="text-xs leading-relaxed text-[#94a3b8] mb-2.5">
          Na B3, cada opção tem um código próprio. Digite ou clique em um
          exemplo para decodificar:
        </p>
        <CodeDecoder />
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">Opções vs outros mercados</div>
        <CompareTable
          columns={[
            { key: 'mercado', label: 'Mercado' },
            { key: 'perda', label: 'Perda máx.' },
            { key: 'obrigacao', label: 'Obrigação' },
            { key: 'alavancagem', label: 'Alavancagem' },
          ]}
          rows={[
            {
              cells: [
                { value: 'Ações', isBold: true },
                { value: '100%', color: 'var(--yellow)' },
                { value: 'Nenhuma', color: 'var(--green)' },
                { value: 'Nenhuma', color: 'var(--muted)' },
              ],
            },
            {
              cells: [
                { value: 'Futuros', isBold: true },
                { value: 'Ilimitada', color: 'var(--red)' },
                { value: 'Sim ⚠️', color: 'var(--red)' },
                { value: 'Alta', color: 'var(--red)' },
              ],
            },
            {
              cells: [
                { value: 'Opção (compra)', isBold: true },
                { value: 'Só o prêmio', color: 'var(--green)' },
                { value: 'Nenhuma', color: 'var(--green)' },
                { value: 'Altíssima', color: 'var(--green)' },
              ],
            },
            {
              cells: [
                { value: 'Opção (venda)', isBold: true },
                { value: 'Ilimitada', color: 'var(--red)' },
                { value: 'Sim ⚠️', color: 'var(--red)' },
                { value: 'Alta', color: 'var(--red)' },
              ],
            },
          ]}
          caption={
            <>
              No futuro, se o mercado vai contra você, você pode{' '}
              <strong className="text-red">
                dever mais do que colocou
              </strong>
              . Na opção comprada, você conhece o pior cenário antes de entrar.
            </>
          }
        />
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">Para que profissionais usam opções</div>
        <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
          <UsoCard
            icon="🛡️"
            name="Proteção (Hedge)"
            desc="Um gestor com R$ 10M em ações compra PUTs para se proteger de uma queda forte. É como um seguro de carteira."
            details="Funciona assim: o gestor compra PUTs de um índice ou das ações que tem na carteira. Se o mercado cai 10%, as ações perdem R$ 1M mas as PUTs valorizam — compensando parte da perda. O custo é o prêmio pago, que sai como despesa do fundo."
          />
          <UsoCard
            icon="💵"
            name="Geração de renda"
            desc="Quem já tem ações vende CALLs contra elas todo mês, embolsando o prêmio. Chama-se financiamento ou venda coberta."
            details="Na prática: você tem 1.000 PETR4 que custaram R$ 30 cada. Vende 10 CALLs strike R$ 35 por R$ 1 cada (= R$ 1.000 de prêmio). Se PETR4 não passar de R$ 35 até o vencimento, você embolsa os R$ 1.000. Se passar, vende as ações por R$ 35 — ainda lucrou R$ 5 por ação + o prêmio."
          />
          <UsoCard
            icon="🚀"
            name="Alavancagem controlada"
            desc="Controlar R$ 3.000 em ações arriscando apenas R$ 80 de prêmio. A assimetria do comprador."
            details="PETR4 a R$ 30. Você compra CALL de strike R$ 33 por R$ 0,80. Com R$ 80 você controla 1 contrato (= 100 ações = R$ 3.000 em exposição). Se PETR4 vai a R$ 40, sua CALL vale R$ 7 — lucro de R$ 620 sobre R$ 80 investidos = 775%. Se cai, perde só os R$ 80."
          />
          <UsoCard
            icon="📊"
            name="Arbitragem e volatilidade"
            desc="Traders profissionais operam a diferença entre volatilidade implícita e realizada, sem necessariamente ter opinião sobre direção."
            details="Exemplo: se a IV está em 40% mas a volatilidade realizada histórica é 25%, o trader vende opções (coletando prêmio caro) e faz hedge com ações ou futuros. O lucro vem da diferença entre o que o mercado precificou e o que realmente aconteceu — não da direção."
          />
        </div>
      </div>
    </>
  );
}
