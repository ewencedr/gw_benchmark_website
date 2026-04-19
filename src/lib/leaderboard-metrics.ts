import type { Metric } from '@/types/database';

/**
 * Leaderboard columns aligned with `/evaluation`, excluding P–P / SBC plots
 * (those need a figure, not a single sortable scalar per submission).
 */
export const LEADERBOARD_METRIC_SLUGS = [
  'c2st',
  'expected_coverage',
  'kl_divergence',
  'jsd',
  'is_ess',
] as const;

export function evaluationOrderLeaderboardMetrics(metrics: Metric[]): Metric[] {
  const bySlug = new Map(metrics.map((m) => [m.slug, m]));
  const ordered: Metric[] = [];
  for (const slug of LEADERBOARD_METRIC_SLUGS) {
    const m = bySlug.get(slug);
    if (m) ordered.push(m);
  }
  return ordered;
}
