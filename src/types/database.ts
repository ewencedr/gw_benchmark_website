export interface Benchmark {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  level: string;
  created_at: string;
}

export interface Metric {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  unit: string | null;
  higher_is_better: boolean;
  created_at: string;
}

export interface BenchmarkMetric {
  benchmark_id: string;
  metric_id: string;
}

export interface Submission {
  id: string;
  team_name: string;
  method_name: string;
  description: string | null;
  paper_url: string | null;
  code_url: string | null;
  benchmark_id: string;
  submitted_at: string;
}

export interface SubmissionScore {
  id: string;
  submission_id: string;
  metric_id: string;
  score: number;
}

export interface LeaderboardEntry extends Submission {
  scores: Record<string, number>;
}
