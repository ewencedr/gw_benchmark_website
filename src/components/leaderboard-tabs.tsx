'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeaderboardTable } from '@/components/leaderboard-table';
import type { Benchmark, LeaderboardEntry, Metric } from '@/types/database';

interface BenchmarkLeaderboard {
  benchmark: Benchmark;
  entries: LeaderboardEntry[];
  metrics: Metric[];
}

interface LeaderboardTabsProps {
  data: BenchmarkLeaderboard[];
}

export function LeaderboardTabs({ data }: LeaderboardTabsProps) {
  if (data.length === 0) {
    return (
      <p className="text-muted-foreground text-center">
        No benchmarks available yet.
      </p>
    );
  }

  return (
    <Tabs defaultValue={data[0].benchmark.slug}>
      <TabsList className="bg-muted/30 mb-8">
        {data.map(({ benchmark }) => (
          <TabsTrigger
            key={benchmark.slug}
            value={benchmark.slug}
            className="data-[state=active]:bg-gw-orange/10 data-[state=active]:text-gw-orange"
          >
            {benchmark.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {data.map(({ benchmark, entries, metrics }) => (
        <TabsContent key={benchmark.slug} value={benchmark.slug}>
          {benchmark.description && (
            <p className="text-muted-foreground mb-6 text-sm">
              {benchmark.description}
            </p>
          )}
          <LeaderboardTable entries={entries} metrics={metrics} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
