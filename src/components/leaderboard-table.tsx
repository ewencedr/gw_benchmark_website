'use client';

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { LeaderboardEntry, Metric } from '@/types/database';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  metrics: Metric[];
  compact?: boolean;
}

function formatScore(score: number): string {
  if (Math.abs(score) < 0.01 || Math.abs(score) >= 100) {
    return score.toExponential(2);
  }
  return score.toFixed(3);
}

export function LeaderboardTable({
  entries,
  metrics,
  compact = false,
}: LeaderboardTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<LeaderboardEntry>[] = [
    {
      id: 'rank',
      header: '#',
      cell: ({ row }) => (
        <span className="text-muted-foreground font-mono">{row.index + 1}</span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'team_name',
      header: 'Team',
      cell: ({ getValue }) => (
        <span className="font-medium">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: 'method_name',
      header: 'Method',
      cell: ({ getValue }) => (
        <Badge variant="secondary" className="font-mono text-xs">
          {getValue<string>()}
        </Badge>
      ),
    },
    ...metrics.map(
      (metric): ColumnDef<LeaderboardEntry> => ({
        id: metric.slug,
        header: () => (
          <span title={metric.description ?? undefined}>
            {metric.name}
            <span className="text-muted-foreground ml-1 text-xs">
              {metric.higher_is_better ? '↑' : '↓'}
            </span>
          </span>
        ),
        accessorFn: (row) => row.scores[metric.slug],
        cell: ({ getValue }) => {
          const val = getValue<number | undefined>();
          return (
            <span className="font-mono text-sm">
              {val !== undefined ? formatScore(val) : '—'}
            </span>
          );
        },
        sortingFn: (rowA, rowB) => {
          const a = rowA.original.scores[metric.slug] ?? 0;
          const b = rowB.original.scores[metric.slug] ?? 0;
          return a - b;
        },
      })
    ),
    ...(compact
      ? []
      : [
          {
            accessorKey: 'submitted_at',
            header: 'Date',
            cell: ({ getValue }: { getValue: () => string }) => (
              <span className="text-muted-foreground text-sm">
                {new Date(getValue()).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                })}
              </span>
            ),
          } as ColumnDef<LeaderboardEntry>,
        ]),
  ];

  const table = useReactTable({
    data: entries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <div className="border-border/50 bg-card/50 rounded-lg border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-border/50">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={
                    header.column.getCanSort()
                      ? 'hover:text-foreground cursor-pointer select-none'
                      : ''
                  }
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="border-border/30 hover:bg-muted/30 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-muted-foreground h-24 text-center"
              >
                No submissions yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
