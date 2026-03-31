import type { Metadata } from 'next';
import { LeaderboardTabs } from '@/components/leaderboard-tabs';
import { getBenchmarks, getLeaderboard } from '@/lib/supabase/queries';

export const metadata: Metadata = {
  title: 'Leaderboards',
  description: 'Benchmark results and rankings for GW-SBI methods.',
};

export default async function LeaderboardsPage() {
  const benchmarks = await getBenchmarks();

  const data = await Promise.all(
    benchmarks.map(async (benchmark) => {
      const { entries, metrics } = await getLeaderboard(benchmark.id);
      return { benchmark, entries, metrics };
    })
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Leaderboards
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Compare methods across benchmarks. Click column headers to sort.
        </p>
      </div>

      <LeaderboardTabs data={data} />
    </div>
  );
}
