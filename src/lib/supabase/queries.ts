import type {
  Benchmark,
  LeaderboardEntry,
  Metric,
  SubmissionScore,
} from '@/types/database';
import { createClient } from './server';

export async function getBenchmarks(): Promise<Benchmark[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('benchmarks')
    .select('*')
    .order('created_at');

  if (error) throw error;
  return data as Benchmark[];
}

export async function getMetricsForBenchmark(
  benchmarkId: string
): Promise<Metric[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('benchmark_metrics')
    .select('metric_id, metrics(*)')
    .eq('benchmark_id', benchmarkId);

  if (error) throw error;

  return (data as unknown as { metric_id: string; metrics: Metric }[]).map(
    (row) => row.metrics
  );
}

export async function getLeaderboard(
  benchmarkId: string
): Promise<{ entries: LeaderboardEntry[]; metrics: Metric[] }> {
  const supabase = await createClient();

  const [submissionsResult, metricsResult, scoresResult] = await Promise.all([
    supabase
      .from('submissions')
      .select('*')
      .eq('benchmark_id', benchmarkId)
      .order('submitted_at', { ascending: false }),
    supabase
      .from('benchmark_metrics')
      .select('metric_id, metrics(*)')
      .eq('benchmark_id', benchmarkId),
    supabase
      .from('submission_scores')
      .select('*, submissions!inner(benchmark_id)')
      .eq('submissions.benchmark_id', benchmarkId),
  ]);

  if (submissionsResult.error) throw submissionsResult.error;
  if (metricsResult.error) throw metricsResult.error;
  if (scoresResult.error) throw scoresResult.error;

  const metrics = (
    metricsResult.data as unknown as { metric_id: string; metrics: Metric }[]
  ).map((row) => row.metrics);

  const scores = scoresResult.data as unknown as (SubmissionScore & {
    submissions: { benchmark_id: string };
  })[];

  const scoresBySubmission = new Map<string, Record<string, number>>();
  for (const score of scores) {
    const existing = scoresBySubmission.get(score.submission_id) ?? {};
    const metric = metrics.find((m) => m.id === score.metric_id);
    if (metric) {
      existing[metric.slug] = score.score;
    }
    scoresBySubmission.set(score.submission_id, existing);
  }

  const entries: LeaderboardEntry[] = (submissionsResult.data ?? []).map(
    (sub) => ({
      ...sub,
      scores: scoresBySubmission.get(sub.id) ?? {},
    })
  );

  return { entries, metrics };
}

export async function getAllMetrics(): Promise<Metric[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .order('name');

  if (error) throw error;
  return data as Metric[];
}
