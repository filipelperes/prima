/* ───────── Formatting utilities ───────── */

export function fmt(valor: number): string {
  return (
    'R$ ' +
    valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

export function fmtInt(valor: number): string {
  return (
    'R$ ' +
    valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
}

export function fmtPct(valor: number): string {
  return (valor >= 0 ? '+' : '') + valor.toFixed(1) + '%';
}

export function fmtK(valor: number): string {
  const abs = Math.abs(valor);
  const sign = valor >= 0 ? '+' : '-';
  if (abs >= 1000) {
    return sign + 'R$ ' + (abs / 1000).toFixed(1).replace('.', ',') + 'k';
  }
  return (
    (valor >= 0 ? '' : '-') +
    'R$ ' +
    abs.toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
}

export function pct(val: number, min: number, max: number): number {
  return Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
}
