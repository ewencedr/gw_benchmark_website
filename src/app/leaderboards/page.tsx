import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { LeaderboardTable } from '@/components/leaderboard-table';
import { RippleDivider } from '@/components/ripple-divider';
import { SectionHero } from '@/components/section-hero';
import {
  pickBbhLevel1Benchmark,
  pickLisaLevel0Benchmark,
  pickPrimaryLevel0Benchmark,
} from '@/lib/benchmark-picks';
import { getBenchmarks, getLeaderboard } from '@/lib/supabase/queries';
import type { Benchmark, LeaderboardEntry, Metric } from '@/types/database';

export const metadata: Metadata = {
  title: 'Leaderboards',
  description: 'Benchmark results and rankings for GW-SBI methods.',
};

const linkClass =
  'text-gw-orange hover:text-gw-orange-light underline underline-offset-4';

type BoardPayload = {
  benchmark: Benchmark;
  entries: LeaderboardEntry[];
  metrics: Metric[];
};

function payloadFor(
  rows: BoardPayload[],
  benchmark: Benchmark | undefined
): BoardPayload | undefined {
  if (!benchmark) return undefined;
  return rows.find((r) => r.benchmark.id === benchmark.id);
}

export default async function LeaderboardsPage() {
  const benchmarks = await getBenchmarks();

  const rows: BoardPayload[] = await Promise.all(
    benchmarks.map(async (benchmark) => {
      const { entries, metrics } = await getLeaderboard(benchmark.id);
      return { benchmark, entries, metrics };
    })
  );

  const level0Bench = pickPrimaryLevel0Benchmark(benchmarks);
  const l1Bench = pickBbhLevel1Benchmark(benchmarks);
  const lisaBench = pickLisaLevel0Benchmark(benchmarks);

  const level0 = payloadFor(rows, level0Bench);
  const level1 = payloadFor(rows, l1Bench);
  const lisaL0 = payloadFor(rows, lisaBench);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SectionHero
        title="Leaderboards"
        subtitle="Public rankings by benchmark task. Sort any column — hover a metric header for a short description."
      />

      <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-white/70">
        See{' '}
        <Link href="/benchmarks" className={linkClass}>
          Benchmarks
        </Link>{' '}
        for task definitions and{' '}
        <Link href="/evaluation" className={linkClass}>
          Evaluation
        </Link>{' '}
        for metric definitions (tables list the scalar scores used here; P–P
        style diagnostics are on the Evaluation page as plots).
      </p>

      <div
        role="note"
        className="mx-auto mt-8 max-w-3xl rounded-xl border border-amber-500/35 bg-amber-500/8 px-4 py-3 text-center text-sm leading-relaxed text-white/80"
      >
        <span className="font-medium text-amber-100/95">
          Illustrative rows only.
        </span>{' '}
        Entries whose team name starts with{' '}
        <span className="font-mono text-white/90">[Demo]</span> are seeded with
        placeholder scores so the layout is easy to review — they are{' '}
        <strong className="text-white/95">not</strong> official benchmark
        submissions.
      </div>

      <div className="mt-10 space-y-14">
        <LeaderboardTrackSection
          title="LVK — Level 0"
          badges={
            <>
              <Badge
                variant="outline"
                className="border-gw-orange/40 text-gw-orange"
              >
                ground network
              </Badge>
              <Badge
                variant="outline"
                className="border-gw-purple/40 text-gw-purple w-fit"
              >
                intrinsic PE · fixed extrinsic
              </Badge>
              {level0Bench?.slug && (
                <Badge
                  variant="outline"
                  className="w-fit border-white/20 font-mono text-xs text-white/60"
                >
                  {level0Bench.slug}
                </Badge>
              )}
            </>
          }
          payload={level0}
        />

        <RippleDivider />

        <LeaderboardTrackSection
          title="LVK — Level 1"
          badges={
            <>
              <Badge
                variant="outline"
                className="border-gw-orange/40 text-gw-orange"
              >
                ground network
              </Badge>
              <Badge
                variant="outline"
                className="border-gw-purple/40 text-gw-purple"
              >
                full extrinsic (11D)
              </Badge>
            </>
          }
          payload={level1}
        />

        <RippleDivider />

        <LeaderboardTrackSection
          title="LISA — Level 0"
          badges={
            <Badge
              variant="outline"
              className="border-emerald-400/40 text-emerald-300"
            >
              preview · roadmap
            </Badge>
          }
          payload={lisaL0}
        />
      </div>
    </div>
  );
}

function LeaderboardTrackSection({
  title,
  badges,
  payload,
}: {
  title: string;
  badges: ReactNode;
  payload: BoardPayload | undefined;
}) {
  return (
    <section>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {badges}
      </div>
      {payload ? (
        <div className="space-y-3">
          {payload.benchmark.description && (
            <p className="text-sm text-white/70">
              {payload.benchmark.description}
            </p>
          )}
          <LeaderboardTable
            entries={payload.entries}
            metrics={payload.metrics}
          />
        </div>
      ) : (
        <p className="text-muted-foreground">
          No benchmark configured for this track yet.
        </p>
      )}
    </section>
  );
}
