import type { HierarchyItem } from '@/lib/types';

export const HIERARCHY: HierarchyItem[] = [
  {
    name: 'Comprar CALL',
    risk: 'Prêmio pago',
    riskPct: 15,
    color: 'var(--color-green)',
    desc: 'Risco 100% limitado ao prêmio. Comprador nunca perde mais do que pagou.',
  },
  {
    name: 'Comprar PUT',
    risk: 'Prêmio pago',
    riskPct: 15,
    color: 'var(--color-green)',
    desc: 'Mesma proteção da CALL. Aposta de baixa ou seguro de carteira.',
  },
  {
    name: 'Vender PUT com caixa',
    risk: 'Strike × qtd',
    riskPct: 45,
    color: 'var(--color-yellow)',
    desc: 'Você TEM o dinheiro para comprar se exercido. Estratégia do investidor experiente.',
  },
  {
    name: 'Vender CALL coberta',
    risk: 'Ação já possui',
    riskPct: 50,
    color: 'var(--color-yellow)',
    desc: 'Você já possui as ações. Se exercido, você as vende pelo strike — perdeu a valorização.',
  },
  {
    name: 'Vender PUT alavancada',
    risk: 'Muito alto',
    riskPct: 75,
    color: 'var(--color-red)',
    desc: 'Não tem caixa para honrar. Se a ação despencar, prejuízo pode ser enorme.',
  },
  {
    name: 'Naked CALL (descoberta)',
    risk: 'Ilimitado ⚠️',
    riskPct: 100,
    color: 'var(--color-red)',
    desc: 'O mais perigoso. Ação pode subir infinitamente. Sem limite de perda.',
  },
];
