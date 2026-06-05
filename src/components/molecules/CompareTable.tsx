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
      <table className="compare-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.cells.map((cell, ci) => (
                <td
                  key={ci}
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
        <div
          style={{
            fontSize: 11,
            color: 'var(--muted)',
            marginTop: 10,
            padding: 10,
            background: 'var(--surface)',
            borderRadius: 8,
            lineHeight: 1.6,
          }}
        >
          {caption}
        </div>
      )}
    </>
  );
}
