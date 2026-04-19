-- Baseline schema for leaderboard data used by the app and later seed migrations.
-- Runs before 20260413120000_replace_benchmarks_bbh_l0_l1.sql (which DELETEs from these tables).

create extension if not exists "pgcrypto";

create table if not exists public.metrics (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  unit text,
  higher_is_better boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.benchmarks (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  level text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.benchmark_metrics (
  benchmark_id uuid not null references public.benchmarks (id) on delete cascade,
  metric_id uuid not null references public.metrics (id) on delete cascade,
  primary key (benchmark_id, metric_id)
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  team_name text not null,
  method_name text not null,
  description text,
  paper_url text,
  code_url text,
  benchmark_id uuid not null references public.benchmarks (id) on delete cascade,
  submitted_at timestamptz not null default now()
);

create table if not exists public.submission_scores (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions (id) on delete cascade,
  metric_id uuid not null references public.metrics (id) on delete cascade,
  score double precision not null
);

create index if not exists submissions_benchmark_id_idx on public.submissions (benchmark_id);
create index if not exists submission_scores_submission_id_idx on public.submission_scores (submission_id);
create index if not exists submission_scores_metric_id_idx on public.submission_scores (metric_id);

alter table public.metrics enable row level security;
alter table public.benchmarks enable row level security;
alter table public.benchmark_metrics enable row level security;
alter table public.submissions enable row level security;
alter table public.submission_scores enable row level security;

create policy "metrics_select_public"
  on public.metrics for select to anon, authenticated using (true);

create policy "benchmarks_select_public"
  on public.benchmarks for select to anon, authenticated using (true);

create policy "benchmark_metrics_select_public"
  on public.benchmark_metrics for select to anon, authenticated using (true);

create policy "submissions_select_public"
  on public.submissions for select to anon, authenticated using (true);

create policy "submission_scores_select_public"
  on public.submission_scores for select to anon, authenticated using (true);

grant usage on schema public to anon, authenticated;
grant select on public.metrics to anon, authenticated;
grant select on public.benchmarks to anon, authenticated;
grant select on public.benchmark_metrics to anon, authenticated;
grant select on public.submissions to anon, authenticated;
grant select on public.submission_scores to anon, authenticated;
