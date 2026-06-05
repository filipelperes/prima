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
            <div style={{fontSize:10, color:'var(--soft)', marginTop:6, borderTop:'1px solid var(--border)', paddingTop:6}}>
              📎 Ref: SEC + CBOE Rule Book (atualizado mai/2026). Regulação: SEC e CFTC. Clearing: OCC.
            </div>
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
            <div style={{fontSize:10, color:'var(--soft)', marginTop:6, borderTop:'1px solid var(--border)', paddingTop:6}}>
              📎 Ref: ESMA. Eurex Contract Specifications (mai/2026). Euronext Rule Book Book I (jun/2025).
            </div>
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
            <div style={{fontSize:10, color:'var(--soft)', marginTop:6, borderTop:'1px solid var(--border)', paddingTop:6}}>
              📎 Ref: FCA. IDEM Trading Procedures. LSE Derivatives Documentation.
            </div>
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
            <div style={{fontSize:10, color:'var(--soft)', marginTop:6, borderTop:'1px solid var(--border)', paddingTop:6}}>
              📎 Ref: JFSA. Osaka Exchange Nikkei 225 Options Contract Specs. JPX Rulebook.
            </div>
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
            <div style={{fontSize:10, color:'var(--soft)', marginTop:6, borderTop:'1px solid var(--border)', paddingTop:6}}>
              📎 Ref: SEBI. NSE Options Trading Manual. BSE Derivatives Rules & Regulations.
            </div>
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
            <div style={{fontSize:10, color:'var(--soft)', marginTop:6, borderTop:'1px solid var(--border)', paddingTop:6}}>
              📎 Ref: CSRC. CFFEX Trading Rules. HKEX Derivatives Market Rules.
            </div>
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
            <div style={{fontSize:10, color:'var(--soft)', marginTop:6, borderTop:'1px solid var(--border)', paddingTop:6}}>
              📎 Ref: ASIC. ASX Derivatives Trading Procedures. ASX Clear.
            </div>
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
            <div style={{fontSize:10, color:'var(--soft)', marginTop:6, borderTop:'1px solid var(--border)', paddingTop:6}}>
              📎 Ref: MAS. SGX Derivatives Trading Rules. SGX FTSE Index Options Specs.
            </div>
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
            <div style={{fontSize:10, color:'var(--soft)', marginTop:6, borderTop:'1px solid var(--border)', paddingTop:6}}>
              📎 Ref: CSA. Montreal Exchange Options Rules. TMX Derivatives Manual.
            </div>
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
            <div style={{fontSize:10, color:'var(--soft)', marginTop:6, borderTop:'1px solid var(--border)', paddingTop:6}}>
              📎 Ref: FSCA. JSE Equity Derivatives Rules. JSE Clear.
            </div>
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
  <div className="card-header">📚 Onde estudar opções no mundo</div>
  <div style={{fontSize: 12, color: '#94a3b8', lineHeight: 1.8}}>
    <p style={{marginBottom: 8}}><strong style={{color:'var(--text)'}}>Documentação oficial:</strong></p>
    <ul style={{paddingLeft: 16, margin: 0, listStyle: 'none'}}>
      <li style={{marginBottom: 6}}>• <strong style={{color:'var(--accent)'}}>CBOE</strong> — cboe.com (Rule Books, especificações FIX/BOE, FAQ)</li>
      <li style={{marginBottom: 6}}>• <strong style={{color:'var(--accent)'}}>Eurex</strong> — eurex.com (Contract Specs, Trading Conditions, Circulars)</li>
      <li style={{marginBottom: 6}}>• <strong style={{color:'var(--accent)'}}>Euronext</strong> — euronext.com (Rule Book, Trading Procedures, Notices)</li>
      <li style={{marginBottom: 6}}>• <strong style={{color:'var(--accent)'}}>B3</strong> — b3.com.br (Regulamento de Negociação, Manual de Apreçamento, MPO)</li>
      <li style={{marginBottom: 6}}>• <strong style={{color:'var(--accent)'}}>OIC</strong> — optionseducation.org (Guia de Estratégias, calculadoras, cursos gratuitos)</li>
      <li style={{marginBottom: 6}}>• <strong style={{color:'var(--accent)'}}>FIA</strong> — fia.org (Estatísticas globais de derivativos, volumes mensais)</li>
    </ul>
  </div>
</div>

<div className="card">
  <div className="card-header">🌐 Termos internacionais vs Brasil</div>
  <div style={{fontSize: 12, color: '#94a3b8', lineHeight: 1.8}}>
    <p style={{marginBottom: 10}}>Cada mercado usa termos diferentes para o mesmo conceito:</p>
    <div style={{
      borderRadius: 10,
      overflow: 'hidden',
      border: '1px solid var(--border)',
    }}>
      {/* header grid */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', background:'var(--surface)', borderBottom:'1px solid var(--border)'}}>
        <div style={{padding:'8px 10px', fontWeight:700, fontSize:10, color:'var(--muted)', fontFamily:'JetBrains Mono'}}>CONCEITO</div>
        <div style={{padding:'8px 10px', fontWeight:700, fontSize:10, color:'var(--muted)', fontFamily:'JetBrains Mono'}}>BRASIL (B3)</div>
        <div style={{padding:'8px 10px', fontWeight:700, fontSize:10, color:'var(--muted)', fontFamily:'JetBrains Mono'}}>EUA / EUROPA</div>
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
        <div key={i} style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', borderBottom:i<11?'1px solid var(--border)':'none', background:i%2===0?'var(--card)':'var(--surface)'}}>
          <div style={{padding:'6px 10px', fontSize:11, color:'var(--text)'}}>{row[0]}</div>
          <div style={{padding:'6px 10px', fontSize:11, color:'var(--accent)', fontFamily:'JetBrains Mono'}}>{row[1]}</div>
          <div style={{padding:'6px 10px', fontSize:11, color:'var(--yellow)', fontFamily:'JetBrains Mono'}}>{row[2]}</div>
        </div>
      ))}
    </div>
  </div>
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
