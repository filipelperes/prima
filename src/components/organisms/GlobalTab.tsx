export default function GlobalTab() {
  return (
    <>
      <div className="card">
        <div className="card-header">🌎 Opções pelo Mundo</div>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.8,
            color: '#94a3b8',
            marginBottom: 0,
          }}
        >
          Mercado de opções não existe só no Brasil! Opções são negociadas em
          bolsas do mundo inteiro. Cada mercado tem suas próprias regras,
          horários e particularidades. Conheça os principais:
        </p>
      </div>

      <div className="card">
        <div className="card-header">Principais mercados</div>
        <div className="grid-2">
          {/* 🇺🇸 Estados Unidos */}
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 6,
                color: 'var(--text)',
              }}
            >
              🇺🇸 Estados Unidos — CBOE / NYSE / NASDAQ
            </div>
            <div
              style={{
                fontSize: 11,
                color: '#94a3b8',
                lineHeight: 1.7,
                marginBottom: 8,
              }}
            >
              Maior mercado de opções do mundo. Casa do VIX, SPX, e das opções
              mais líquidas do planeta. Regulado pela SEC e CFTC.
            </div>
            <span className="tag tag-blue">MAIOR MERCADO</span>
          </div>

          {/* 🇪🇺 Europa */}
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 6,
                color: 'var(--text)',
              }}
            >
              🇪🇺 Europa — Eurex / Euronext
            </div>
            <div
              style={{
                fontSize: 11,
                color: '#94a3b8',
                lineHeight: 1.7,
                marginBottom: 8,
              }}
            >
              Alemanha (Eurex), França, Holanda, Bélgica, Portugal (Euronext).
              Mais de 500 ações europeias com opções.
            </div>
            <span className="tag tag-yellow">PAN-EUROPEU</span>
          </div>

          {/* 🇬🇧 Reino Unido */}
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 6,
                color: 'var(--text)',
              }}
            >
              🇬🇧 Reino Unido — LSE
            </div>
            <div
              style={{
                fontSize: 11,
                color: '#94a3b8',
                lineHeight: 1.7,
                marginBottom: 8,
              }}
            >
              London Stock Exchange. Opções sobre ações do FTSE 100. Foco
              institucional.
            </div>
            <span className="tag tag-purple">LONDRES</span>
          </div>

          {/* 🇯🇵 Japão */}
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 6,
                color: 'var(--text)',
              }}
            >
              🇯🇵 Japão — Osaka Exchange (OSE)
            </div>
            <div
              style={{
                fontSize: 11,
                color: '#94a3b8',
                lineHeight: 1.7,
                marginBottom: 8,
              }}
            >
              Opções sobre Nikkei 225 e TOPIX. Fuso horário asiático.
            </div>
            <span className="tag tag-green">ÁSIA</span>
          </div>

          {/* 🇮🇳 Índia */}
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 6,
                color: 'var(--text)',
              }}
            >
              🇮🇳 Índia — NSE / BSE
            </div>
            <div
              style={{
                fontSize: 11,
                color: '#94a3b8',
                lineHeight: 1.7,
                marginBottom: 8,
              }}
            >
              Maior volume de opções do mundo em contratos. Crescimento
              explosivo.
            </div>
            <span className="tag tag-accent">MAIOR VOLUME</span>
          </div>

          {/* 🇨🇳 China */}
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 6,
                color: 'var(--text)',
              }}
            >
              🇨🇳 China — CFFEX / HKEX
            </div>
            <div
              style={{
                fontSize: 11,
                color: '#94a3b8',
                lineHeight: 1.7,
                marginBottom: 8,
              }}
            >
              China Financial Futures Exchange + Hong Kong. Crescendo
              rapidamente.
            </div>
            <span className="tag tag-yellow">CRESCENDO</span>
          </div>

          {/* 🇦🇺 Austrália */}
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 6,
                color: 'var(--text)',
              }}
            >
              🇦🇺 Austrália — ASX
            </div>
            <div
              style={{
                fontSize: 11,
                color: '#94a3b8',
                lineHeight: 1.7,
                marginBottom: 8,
              }}
            >
              Australian Securities Exchange. Mercado maduro com boas opções
              sobre ações e índices.
            </div>
            <span className="tag tag-green">MADURO</span>
          </div>

          {/* 🇸🇬 Singapura */}
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 6,
                color: 'var(--text)',
              }}
            >
              🇸🇬 Singapura — SGX
            </div>
            <div
              style={{
                fontSize: 11,
                color: '#94a3b8',
                lineHeight: 1.7,
                marginBottom: 8,
              }}
            >
              Singapore Exchange. Opções sobre índices MSCI. Hub asiático de
              derivatives.
            </div>
            <span className="tag tag-blue">HUB</span>
          </div>

          {/* 🇨🇦 Canadá */}
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 6,
                color: 'var(--text)',
              }}
            >
              🇨🇦 Canadá — TMX / Montreal Exchange
            </div>
            <div
              style={{
                fontSize: 11,
                color: '#94a3b8',
                lineHeight: 1.7,
                marginBottom: 8,
              }}
            >
              Opções sobre ações canadenses e commodities. Forte em energia e
              mineração.
            </div>
            <span className="tag tag-yellow">COMMODITIES</span>
          </div>

          {/* 🇿🇦 África do Sul */}
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 6,
                color: 'var(--text)',
              }}
            >
              🇿🇦 África do Sul — JSE
            </div>
            <div
              style={{
                fontSize: 11,
                color: '#94a3b8',
                lineHeight: 1.7,
                marginBottom: 8,
              }}
            >
              Johannesburg Stock Exchange. Maior mercado de derivatives da
              África.
            </div>
            <span className="tag tag-purple">ÁFRICA</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">📊 Você sabia?</div>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.8,
            color: '#94a3b8',
            marginBottom: 0,
          }}
        >
          O mercado de opções GLOBAL movimentou mais de 119 BILHÕES de
          contratos em 2025. O Brasil (B3) é um dos maiores mercados da América
          Latina, mas representa uma fração do volume global. Enquanto isso, a
          Índia disparou e hoje responde pela maior parte do volume de opções do
          mundo, com mais de 70 bilhões de contratos negociados em 2025.
        </p>
      </div>

      <div className="card">
        <div className="card-header">🇧🇷 O Brasil no Contexto Global</div>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.8,
            color: '#94a3b8',
            marginBottom: 0,
          }}
        >
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
