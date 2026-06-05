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
      <div className="card">
        <div className="card-header">O que é uma opção?</div>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: '#94a3b8', marginBottom: 12 }}>
          Uma opção é um{' '}
          <strong style={{ color: 'var(--text)' }}>
            contrato que dá um direito, mas não uma obrigação
          </strong>
          , de comprar ou vender um ativo por um preço combinado até uma data
          específica.
        </p>
        <Formula>
          <div>
            <span className="eq">Opção</span>{' '}
            <span style={{ color: 'var(--muted)' }}>=</span>{' '}
            <span className="val">Direito</span>{' '}
            <span style={{ color: 'var(--muted)' }}>+</span>{' '}
            <span className="val">Preço Fixo</span>{' '}
            <span style={{ color: 'var(--muted)' }}>+</span>{' '}
            <span className="val">Data Limite</span>
          </div>
          <div style={{ marginTop: 6 }}>
            <span className="comment">
              // Você paga um prêmio por esse direito
            </span>
          </div>
        </Formula>
        <p style={{ fontSize: 12, lineHeight: 1.7, color: '#94a3b8' }}>
          O prêmio é o{' '}
          <strong style={{ color: 'var(--text)' }}>
            máximo que você pode perder
          </strong>{' '}
          como comprador. Não tem como perder mais do que pagou.
        </p>
      </div>

      <div className="card">
        <div className="card-header">Analogias interativas</div>
        <p style={{ fontSize: 13, lineHeight: 1.8, color: '#94a3b8', marginBottom: 12 }}>
          Cada analogia mostra o conceito financeiro (esquerda) lado a lado com
          o mundo real (direita). Clique para trocar:
        </p>
        <div
          style={{
            display: 'flex',
            gap: 4,
            marginBottom: 12,
            flexWrap: 'wrap',
          }}
        >
          {ANALOGIES.map((a) => (
            <button
              key={a.id}
              onClick={() => setAnalogyTab(a.id)}
              style={{
                flex: 1,
                minWidth: 80,
                padding: '8px 10px',
                background:
                  analogyTab === a.id
                    ? 'var(--accent)22'
                    : 'var(--surface)',
                border: `1px solid ${
                  analogyTab === a.id
                    ? 'var(--accent)44'
                    : 'var(--border)'
                }`,
                borderRadius: 8,
                cursor: 'pointer',
                color:
                  analogyTab === a.id ? 'var(--accent)' : 'var(--muted)',
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: 11,
                fontWeight: 700,
                transition: 'all 0.2s',
                textAlign: 'center',
              }}
            >
              {a.icon} {a.title}
            </button>
          ))}
        </div>
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 8,
            padding: '8px 12px',
            marginBottom: 12,
            fontSize: 12,
            color: 'var(--accent)',
            fontFamily: '"JetBrains Mono", monospace',
            border: '1px solid var(--border)',
          }}
        >
          💡 {current.conceito}
        </div>
        <div className="grid-2" style={{ gap: 10 }}>
          <div
            style={{
              background: '#00d4ff08',
              border: '1px solid #00d4ff22',
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: 'var(--accent)',
                fontWeight: 700,
                letterSpacing: 1,
                marginBottom: 8,
                fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase',
              }}
            >
              📊 Mercado financeiro
            </div>
            {current.financeiro.map((line, i) => (
              <div
                key={i}
                style={{
                  fontSize: 11,
                  color: '#94a3b8',
                  lineHeight: 1.7,
                  marginBottom: 4,
                  paddingLeft: i > 0 ? 12 : 0,
                }}
              >
                {line}
              </div>
            ))}
          </div>
          <div
            style={{
              background: '#ffd54f08',
              border: '1px solid #ffd54f22',
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: 'var(--yellow)',
                fontWeight: 700,
                letterSpacing: 1,
                marginBottom: 8,
                fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase',
              }}
            >
              🌎 Mundo real
            </div>
            {current.mundoReal.map((line, i) => (
              <div
                key={i}
                style={{
                  fontSize: 11,
                  color: '#94a3b8',
                  lineHeight: 1.7,
                  marginBottom: 4,
                  paddingLeft: i > 0 ? 12 : 0,
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Tipos de opção</div>
        <div className="grid-2">
          <div
            style={{
              background: '#00e67611',
              border: '1px solid #00e67633',
              borderRadius: 12,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: 'var(--green)',
                marginBottom: 4,
              }}
            >
              CALL
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
              Direito de COMPRAR
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.6 }}>
              Você ganha quando o ativo{' '}
              <strong style={{ color: 'var(--green)' }}>sobe</strong>. Aposta de
              alta.
            </div>
          </div>
          <div
            style={{
              background: '#ff3d5711',
              border: '1px solid #ff3d5733',
              borderRadius: 12,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: 'var(--red)',
                marginBottom: 4,
              }}
            >
              PUT
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
              Direito de VENDER
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.6 }}>
              Você ganha quando o ativo{' '}
              <strong style={{ color: 'var(--red)' }}>cai</strong>. Aposta de
              baixa ou proteção.
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">🔍 Decodificador de códigos B3</div>
        <p style={{ fontSize: 12, lineHeight: 1.7, color: '#94a3b8', marginBottom: 10 }}>
          Na B3, cada opção tem um código próprio. Digite ou clique em um
          exemplo para decodificar:
        </p>
        <CodeDecoder />
      </div>

      <div className="card">
        <div className="card-header">Opções vs outros mercados</div>
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
              <strong style={{ color: 'var(--red)' }}>
                dever mais do que colocou
              </strong>
              . Na opção comprada, você conhece o pior cenário antes de entrar.
            </>
          }
        />
      </div>

      <div className="card">
        <div className="card-header">Para que profissionais usam opções</div>
        <div className="grid-2">
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
