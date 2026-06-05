/* ───────── Interactive Analogies ─────────
 *
 * Cada analogia mostra um conceito de opções lado a lado
 * com uma situação do mundo real para facilitar o entendimento.
 */

export interface Analogy {
  id: string;
  icon: string;
  title: string;
  conceito: string; // qual conceito de opções esta analogia explica
  financeiro: string[];
  mundoReal: string[];
}

export const ANALOGIES: Analogy[] = [
  {
    id: 'apartamento',
    icon: '🏠',
    title: 'Apartamento',
    conceito: 'CALL — Direito de comprar com risco limitado',
    financeiro: [
      'Você compra uma CALL de PETR4 strike R$ 30, pagando R$ 2 de prêmio.',
      'Se PETR4 sobe para R$ 45, você exerce — compra por R$ 30, vende por R$ 45.',
      'Lucro: R$ 13 por ação (R$ 45 - R$ 30 - R$ 2).',
      'Se PETR4 cai para R$ 25, você não exerce. Perde apenas os R$ 2.',
    ],
    mundoReal: [
      'Você vê um apto por R$ 500k. Não tem o dinheiro agora, mas acredita na valorização.',
      'Propõe ao dono: "Me vende o direito de comprar por R$ 500k nos próximos 6 meses, te pago R$ 10k agora."',
      'Se o bairro valoriza e o apto vale R$ 800k, você exerce — compra por R$ 500k.',
      'Se desvaloriza, você ignora o contrato. Perde só os R$ 10k do sinal.',
    ],
  },
  {
    id: 'videogame',
    icon: '🎮',
    title: 'Videogame',
    conceito: 'CALL — Reserva de preço (prêmio)',
    financeiro: [
      'Você paga R$ 2 por uma CALL de VALE strike R$ 60.',
      'É o direito de comprar VALE por R$ 60 até o vencimento.',
      'Se VALE dispara para R$ 90, o direito vale R$ 30. Lucro enorme.',
      'Se VALE fica abaixo de R$ 60, o direito vira pó. Perde só o prêmio.',
    ],
    mundoReal: [
      'Um videogame novo custa R$ 4.000. Você paga R$ 200 para a loja garantir esse preço por 3 meses.',
      'Se o videogame esgota e passa a custar R$ 6.000, você compra pelo preço reservado.',
      'Se o preço cai para R$ 3.000, você compra no mercado. Perdeu só R$ 200.',
      'Você só paga se exercer — igual CALL.',
    ],
  },
  {
    id: 'ingresso',
    icon: '🎟️',
    title: 'Ingresso',
    conceito: 'ITM / ATM / OTM — Valor intrínseco e temporal',
    financeiro: [
      'CALL ITM = ingresso para show que já está esgotado. Já vale mais do que você pagou.',
      'Você pode revender o ingresso (a opção) por mais do que pagou — lucro imediato.',
      'CALL OTM = ingresso para show de banda desconhecida. Barato, mas só vale se estourar.',
      'ATM = o show não esgotou ainda. Maior "esperança" (valor temporal) de lotar.',
      'Valor temporal = a chance de o artista viralizar até a data do show.',
    ],
    mundoReal: [
      'Você compra ingresso para um show a R$ 100. O artista viraliza no TikTok.',
      'O show esgota. Ingresso revendido a R$ 500. Você tem uma CALL ITM.',
      'Se o artista não emplaca, o ingresso vale o valor de face (ATM) ou nada (OTM).',
      'Quanto mais perto do show, menor a chance de viralizar — o "theta" corrói o valor.',
      'Resumo: ITM = lucro agora. ATM = esperança. OTM = loteria.',
    ],
  },
  {
    id: 'sinal',
    icon: '🔑',
    title: 'Sinal',
    conceito: 'Prêmio — Risco máximo do comprador',
    financeiro: [
      'Prêmio = o sinal que você paga pelo direito de comprar/vender.',
      'É o risco máximo do comprador. Nunca perde mais que isso.',
      'Para o vendedor, o prêmio é a receita máxima (em venda coberta).',
      'Quanto maior a volatilidade, maior o "sinal" exigido.',
    ],
    mundoReal: [
      'Alugar um imóvel exige: sinal + caução + primeiros meses.',
      'O sinal é devolvido se tudo correr bem. É como colateral.',
      'Se você desiste, perde o sinal — igual ao comprador de opção.',
      'O valor do sinal reflete o risco do proprietário em ficar sem inquilino.',
    ],
  },
  {
    id: 'seguro',
    icon: '🚗',
    title: 'Seguro de Carro',
    conceito: 'PUT — Proteção (hedge) com risco limitado',
    financeiro: [
      'Você TEM ações e compra PUTs como seguro. Paga o prêmio, nunca quer usar.',
      'Se a ação cai 20%, a PUT valoriza e compensa parte da perda — igual o seguro cobre o estrago.',
      'Se a ação sobe, a PUT vira pó. Você "perdeu" o prêmio, mas suas ações valorizaram mais.',
      'Assimetria: perde pouco (prêmio), protege muito (valor da carteira).',
    ],
    mundoReal: [
      'Você paga R$ 3.000/ano de seguro do carro. Odds de bater: baixas. Mas se bater, a seguradora paga R$ 80.000.',
      'Ano sem acidente? Perdeu os R$ 3.000. Mas seu carro está intacto — você não precisou do seguro.',
      'Ano com acidente? A seguradora paga o concerto. Você trocou R$ 3.000 por R$ 80.000 de proteção.',
      'É exatamente assim que a PUT funciona: você paga o prêmio para se proteger de quedas fortes.',
    ],
  },
];
