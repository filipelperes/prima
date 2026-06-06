import { cn } from '@/lib/utils';
import { Tag } from '@/components/atoms/Tag';

export default function GlobalTab() {
  return (
    <>
      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          🌎 Opções pelo Mundo
        </div>
        <p className="text-[13px] leading-[1.8] text-muted mb-0">
          Mercado de opções não existe só no Brasil! Opções são negociadas em
          bolsas do mundo inteiro. Cada mercado tem suas próprias regras,
          horários e particularidades. Conheça os principais:
        </p>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          Principais mercados
        </div>
        <div className="grid grid-cols-2 gap-2">
          {/* 🇺🇸 Estados Unidos */}
          <div className="bg-surface rounded-[10px] p-3.5">
            <div className="text-[13px] font-bold mb-1.5 text-text">
              🇺🇸 Estados Unidos — CBOE / NYSE / NASDAQ
            </div>
            <div className="text-[11px] text-muted leading-[1.7] mb-2">
              Maior mercado de opções do mundo. Casa do VIX, SPX, e das opções
              mais líquidas do planeta. Regulado pela SEC e CFTC.
            </div>
            <Tag variant="blue">MAIOR MERCADO</Tag>
            <div className="text-[10px] text-soft mt-1.5 border-t border-border-custom pt-1.5">
              📎 Ref: SEC + CBOE Rule Book (atualizado mai/2026). Regulação: SEC e CFTC. Clearing: OCC.
            </div>
          </div>

          {/* 🇪🇺 Europa */}
          <div className="bg-surface rounded-[10px] p-3.5">
            <div className="text-[13px] font-bold mb-1.5 text-text">
              🇪🇺 Europa — Eurex / Euronext
            </div>
            <div className="text-[11px] text-muted leading-[1.7] mb-2">
              Alemanha (Eurex), França, Holanda, Bélgica, Portugal (Euronext).
              Mais de 500 ações europeias com opções.
            </div>
            <Tag variant="yellow">PAN-EUROPEU</Tag>
            <div className="text-[10px] text-soft mt-1.5 border-t border-border-custom pt-1.5">
              📎 Ref: ESMA. Eurex Contract Specifications (mai/2026). Euronext Rule Book Book I (jun/2025).
            </div>
          </div>

          {/* 🇬🇧 Reino Unido */}
          <div className="bg-surface rounded-[10px] p-3.5">
            <div className="text-[13px] font-bold mb-1.5 text-text">
              🇬🇧 Reino Unido — LSE
            </div>
            <div className="text-[11px] text-muted leading-[1.7] mb-2">
              London Stock Exchange. Opções sobre ações do FTSE 100. Foco
              institucional.
            </div>
            <Tag variant="purple">LONDRES</Tag>
            <div className="text-[10px] text-soft mt-1.5 border-t border-border-custom pt-1.5">
              📎 Ref: FCA. IDEM Trading Procedures. LSE Derivatives Documentation.
            </div>
          </div>

          {/* 🇯🇵 Japão */}
          <div className="bg-surface rounded-[10px] p-3.5">
            <div className="text-[13px] font-bold mb-1.5 text-text">
              🇯🇵 Japão — Osaka Exchange (OSE)
            </div>
            <div className="text-[11px] text-muted leading-[1.7] mb-2">
              Opções sobre Nikkei 225 e TOPIX. Fuso horário asiático.
            </div>
            <Tag variant="green">ÁSIA</Tag>
            <div className="text-[10px] text-soft mt-1.5 border-t border-border-custom pt-1.5">
              📎 Ref: JFSA. Osaka Exchange Nikkei 225 Options Contract Specs. JPX Rulebook.
            </div>
          </div>

          {/* 🇮🇳 Índia */}
          <div className="bg-surface rounded-[10px] p-3.5">
            <div className="text-[13px] font-bold mb-1.5 text-text">
              🇮🇳 Índia — NSE / BSE
            </div>
            <div className="text-[11px] text-muted leading-[1.7] mb-2">
              Maior volume de opções do mundo em contratos. Crescimento
              explosivo.
            </div>
            <Tag variant="accent">MAIOR VOLUME</Tag>
            <div className="text-[10px] text-soft mt-1.5 border-t border-border-custom pt-1.5">
              📎 Ref: SEBI. NSE Options Trading Manual. BSE Derivatives Rules & Regulations.
            </div>
          </div>

          {/* 🇨🇳 China */}
          <div className="bg-surface rounded-[10px] p-3.5">
            <div className="text-[13px] font-bold mb-1.5 text-text">
              🇨🇳 China — CFFEX / HKEX
            </div>
            <div className="text-[11px] text-muted leading-[1.7] mb-2">
              China Financial Futures Exchange + Hong Kong. Crescendo
              rapidamente.
            </div>
            <Tag variant="yellow">CRESCENDO</Tag>
            <div className="text-[10px] text-soft mt-1.5 border-t border-border-custom pt-1.5">
              📎 Ref: CSRC. CFFEX Trading Rules. HKEX Derivatives Market Rules.
            </div>
          </div>

          {/* 🇦🇺 Austrália */}
          <div className="bg-surface rounded-[10px] p-3.5">
            <div className="text-[13px] font-bold mb-1.5 text-text">
              🇦🇺 Austrália — ASX
            </div>
            <div className="text-[11px] text-muted leading-[1.7] mb-2">
              Australian Securities Exchange. Mercado maduro com boas opções
              sobre ações e índices.
            </div>
            <Tag variant="green">MADURO</Tag>
            <div className="text-[10px] text-soft mt-1.5 border-t border-border-custom pt-1.5">
              📎 Ref: ASIC. ASX Derivatives Trading Procedures. ASX Clear.
            </div>
          </div>

          {/* 🇸🇬 Singapura */}
          <div className="bg-surface rounded-[10px] p-3.5">
            <div className="text-[13px] font-bold mb-1.5 text-text">
              🇸🇬 Singapura — SGX
            </div>
            <div className="text-[11px] text-muted leading-[1.7] mb-2">
              Singapore Exchange. Opções sobre índices MSCI. Hub asiático de
              derivatives.
            </div>
            <Tag variant="blue">HUB</Tag>
            <div className="text-[10px] text-soft mt-1.5 border-t border-border-custom pt-1.5">
              📎 Ref: MAS. SGX Derivatives Trading Rules. SGX FTSE Index Options Specs.
            </div>
          </div>

          {/* 🇨🇦 Canadá */}
          <div className="bg-surface rounded-[10px] p-3.5">
            <div className="text-[13px] font-bold mb-1.5 text-text">
              🇨🇦 Canadá — TMX / Montreal Exchange
            </div>
            <div className="text-[11px] text-muted leading-[1.7] mb-2">
              Opções sobre ações canadenses e commodities. Forte em energia e
              mineração.
            </div>
            <Tag variant="yellow">COMMODITIES</Tag>
            <div className="text-[10px] text-soft mt-1.5 border-t border-border-custom pt-1.5">
              📎 Ref: CSA. Montreal Exchange Options Rules. TMX Derivatives Manual.
            </div>
          </div>

          {/* 🇿🇦 África do Sul */}
          <div className="bg-surface rounded-[10px] p-3.5">
            <div className="text-[13px] font-bold mb-1.5 text-text">
              🇿🇦 África do Sul — JSE
            </div>
            <div className="text-[11px] text-muted leading-[1.7] mb-2">
              Johannesburg Stock Exchange. Maior mercado de derivatives da
              África.
            </div>
            <Tag variant="purple">ÁFRICA</Tag>
            <div className="text-[10px] text-soft mt-1.5 border-t border-border-custom pt-1.5">
              📎 Ref: FSCA. JSE Equity Derivatives Rules. JSE Clear.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          📊 Você sabia?
        </div>
        <p className="text-[13px] leading-[1.8] text-muted mb-0">
          O mercado de opções GLOBAL movimentou mais de 119 BILHÕES de
          contratos em 2025. O Brasil (B3) é um dos maiores mercados da América
          Latina, mas representa uma fração do volume global. Enquanto isso, a
          Índia disparou e hoje responde pela maior parte do volume de opções do
          mundo, com mais de 70 bilhões de contratos negociados em 2025.
        </p>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          📚 Onde estudar opções no mundo
        </div>
        <div className="text-[12px] text-muted leading-[1.8]">
          <p className="mb-2">
            <strong className="text-text">Documentação oficial:</strong>
          </p>
          <ul className="pl-4 m-0 list-none">
            <li className="mb-1.5">
              • <strong className="text-accent">CBOE</strong> — cboe.com (Rule Books, especificações FIX/BOE, FAQ)
            </li>
            <li className="mb-1.5">
              • <strong className="text-accent">Eurex</strong> — eurex.com (Contract Specs, Trading Conditions, Circulars)
            </li>
            <li className="mb-1.5">
              • <strong className="text-accent">Euronext</strong> — euronext.com (Rule Book, Trading Procedures, Notices)
            </li>
            <li className="mb-1.5">
              • <strong className="text-accent">B3</strong> — b3.com.br (Regulamento de Negociação, Manual de Apreçamento, MPO)
            </li>
            <li className="mb-1.5">
              • <strong className="text-accent">OIC</strong> — optionseducation.org (Guia de Estratégias, calculadoras, cursos gratuitos)
            </li>
            <li className="mb-1.5">
              • <strong className="text-accent">FIA</strong> — fia.org (Estatísticas globais de derivativos, volumes mensais)
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          🌐 Termos internacionais vs Brasil
        </div>
        <div className="text-[12px] text-muted leading-[1.8]">
          <p className="mb-2.5">Cada mercado usa termos diferentes para o mesmo conceito:</p>
          <div className="rounded-[10px] overflow-hidden border border-border-custom">
            {/* header grid */}
            <div className="grid grid-cols-3 bg-surface border-b border-border-custom">
              <div className="px-2.5 py-2 font-bold text-[10px] text-muted font-mono">CONCEITO</div>
              <div className="px-2.5 py-2 font-bold text-[10px] text-muted font-mono">BRASIL (B3)</div>
              <div className="px-2.5 py-2 font-bold text-[10px] text-muted font-mono">EUA / EUROPA</div>
            </div>
            {[
              ['Opção de Compra', 'CALL', 'Call Option'],
              ['Opção de Venda', 'PUT', 'Put Option'],
              ['Prêmio', 'Prêmio', 'Premium'],
              ['Preço de Exercício', 'Strike', 'Strike Price'],
              ['Lançador/Vendedor', 'Lançador', 'Writer / Seller'],
              ['Titular/Comprador', 'Titular', 'Holder / Buyer'],
              ['Lote Padrão', '100 ações', '100 shares'],
              ['Fora do Dinheiro', 'OTM', 'Out of the Money'],
              ['No Dinheiro', 'ITM', 'In the Money'],
              ['No Preço', 'ATM', 'At the Money'],
              ['Corretora', 'Corretora', 'Broker'],
              ['Bolsa', 'B3', 'Exchange (CBOE/NYSE)'],
            ].map((row, i) => (
              <div
                key={i}
                className={cn(
                  'grid grid-cols-3',
                  i < 11 && 'border-b border-border-custom',
                  i % 2 === 0 ? 'bg-card-custom' : 'bg-surface',
                )}
              >
                <div className="px-2.5 py-1.5 text-[11px] text-text">{row[0]}</div>
                <div className="px-2.5 py-1.5 text-[11px] text-accent font-mono">{row[1]}</div>
                <div className="px-2.5 py-1.5 text-[11px] text-yellow font-mono">{row[2]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card-custom border border-border-custom rounded-xl p-4 max-sm:p-3 mb-3">
        <div className="text-[10px] tracking-[1.5px] text-muted uppercase font-mono mb-3.5">
          🇧🇷 O Brasil no Contexto Global
        </div>
        <p className="text-[13px] leading-[1.8] text-muted mb-0">
          A B3 é a bolsa oficial do Brasil e uma das maiores do mundo em valor
          de mercado. O mercado de opções brasileiro é sofisticado, com liquidez
          em PETR4, VALE3, ITUB4, BBDC4 e BOVA11. Tem regulação da CVM, margem
          via sistema CORE, e um dos sistemas de clearing mais robustos do
          mundo. Não, o mercado de opções não existe só no Brasil — mas o
          brasileiro tem um dos mercados mais organizados e acessíveis do mundo.
        </p>
      </div>
    </>
  );
}
