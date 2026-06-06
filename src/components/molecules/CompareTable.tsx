import type { ReactNode } from 'react';

interface Column {
  key: string;
  label: string;
}

interface Row {
  cells: Array<{
    value: string;
    color?: string;
    isBold?: boolean;
  }>;
}

interface CompareTableProps {
  columns: Column[];
  rows: Row[];
  caption?: ReactNode;
}

export function CompareTable({ columns, rows, caption }: CompareTableProps) {
  return (
    <>
      <table className="w-full border-collapse text-xs max-sm:text-[10px]">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-2.5 py-2 text-[10px] tracking-[1px] uppercase text-muted border-b border-border-custom font-mono font-normal max-sm:px-1.5 max-sm:py-1"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.cells.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-2.5 py-[9px] border-b border-border-custom align-middle last:border-b-0 max-sm:px-1.5 max-sm:py-1"
                  style={cell.color ? { color: cell.color } : undefined}
                >
                  {cell.isBold ? <strong>{cell.value}</strong> : cell.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <div className="text-[11px] text-muted mt-2.5 p-2.5 bg-surface rounded-lg leading-relaxed">
          {caption}
        </div>
      )}
    </>
  );
}
