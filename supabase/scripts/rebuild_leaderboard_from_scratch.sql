-- =============================================================================
-- ONE-SCRIPT FULL STATE (schema + catalogue + demo leaderboard)
-- =============================================================================
-- Use this when you want everything in one go: paste the whole file in
-- Supabase Dashboard → SQL → Run. Drops and recreates public.* leaderboard
-- tables only (not auth/storage).
--
-- Minimum repo layout otherwise:
--   • supabase/migrations/*.sql — required for GitHub / CI (schema + catalogue,
--     no demo rows). Keeps production deploys reproducible.
--   • supabase/seed.sql — optional; runs after local `db reset` and adds only
--     demo rows (same teams as this file). Omit demo in prod by disabling
--     [db.seed] in config.toml if you ever need that.
-- =============================================================================

create extension if not exists "pgcrypto";

drop table if exists public.submission_scores cascade;
drop table if exists public.submissions cascade;
drop table if exists public.benchmark_metrics cascade;
drop table if exists public.benchmarks cascade;
drop table if exists public.metrics cascade;

create table public.metrics (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  unit text,
  higher_is_better boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.benchmarks (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  level text not null,
  created_at timestamptz not null default now()
);

create table public.benchmark_metrics (
  benchmark_id uuid not null references public.benchmarks (id) on delete cascade,
  metric_id uuid not null references public.metrics (id) on delete cascade,
  primary key (benchmark_id, metric_id)
);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  team_name text not null,
  method_name text not null,
  description text,
  paper_url text,
  code_url text,
  benchmark_id uuid not null references public.benchmarks (id) on delete cascade,
  submitted_at timestamptz not null default now()
);

create table public.submission_scores (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions (id) on delete cascade,
  metric_id uuid not null references public.metrics (id) on delete cascade,
  score double precision not null
);

create index submissions_benchmark_id_idx on public.submissions (benchmark_id);
create index submission_scores_submission_id_idx on public.submission_scores (submission_id);
create index submission_scores_metric_id_idx on public.submission_scores (metric_id);

alter table public.metrics enable row level security;
alter table public.benchmarks enable row level security;
alter table public.benchmark_metrics enable row level security;
alter table public.submissions enable row level security;
alter table public.submission_scores enable row level security;

drop policy if exists "metrics_select_public" on public.metrics;
create policy "metrics_select_public"
  on public.metrics for select to anon, authenticated using (true);

drop policy if exists "benchmarks_select_public" on public.benchmarks;
create policy "benchmarks_select_public"
  on public.benchmarks for select to anon, authenticated using (true);

drop policy if exists "benchmark_metrics_select_public" on public.benchmark_metrics;
create policy "benchmark_metrics_select_public"
  on public.benchmark_metrics for select to anon, authenticated using (true);

drop policy if exists "submissions_select_public" on public.submissions;
create policy "submissions_select_public"
  on public.submissions for select to anon, authenticated using (true);

drop policy if exists "submission_scores_select_public" on public.submission_scores;
create policy "submission_scores_select_public"
  on public.submission_scores for select to anon, authenticated using (true);

grant usage on schema public to anon, authenticated;
grant select on public.metrics to anon, authenticated;
grant select on public.benchmarks to anon, authenticated;
grant select on public.benchmark_metrics to anon, authenticated;
grant select on public.submissions to anon, authenticated;
grant select on public.submission_scores to anon, authenticated;

-- --- Reference data ----------------------------------------------------------------

insert into public.metrics (name, slug, description, unit, higher_is_better)
values
  ('C2ST', 'c2st', 'Classifier two-sample test; chance-level accuracy (~0.5) means your samples are hard to distinguish from the reference.', null, false),
  ('Expected coverage', 'expected_coverage', 'Calibration of credible regions vs nominal levels; lower deviation from nominal is better.', null, false),
  ('KL divergence', 'kl_divergence', 'Directed KL from the reference toward the approximate posterior; lower is better.', null, false),
  ('JSD', 'jsd', 'Jensen–Shannon divergence between reference and approximate; lower is better.', null, false),
  ('IS-ESS', 'is_ess', 'Effective sample size under importance reweighting to the reference; higher is better.', null, true);

insert into public.benchmarks (name, slug, description, level)
values
  (
    'LVK — aligned-spin BBH (Level 0)',
    'lvk-bbh-l0',
    'LIGO–Virgo–KAGRA-style three-detector aligned-spin BBH, fixed extrinsic (sky and arrival times fixed), fixed PSD Gaussian noise, intrinsic parameters, standard Bilby BBH prior, maintainer-provided simulator; blind or unblind splits.',
    'LVK · Level 0'
  ),
  (
    'Level 0 — aligned-spin BBH',
    'bbh-pe-l0',
    'Same Level-0 science target as the LVK board: five intrinsic BBH parameters with extrinsic quantities fixed by the benchmark; canonical ladder slug from release notes.',
    'Level 0'
  ),
  (
    'Level 1 — aligned-spin BBH',
    'bbh-pe-l1',
    'Same setting as Level 0 with free extrinsic parameters (11D). Higher reference-sampler cost.',
    'Level 1'
  ),
  (
    'LISA — Level 0 (preview)',
    'lisa-l0',
    'Space-based LISA track, Level 0 definition in preparation; the public leaderboard will populate after the first evaluation window.',
    'LISA · Level 0'
  );

insert into public.benchmark_metrics (benchmark_id, metric_id)
select b.id, m.id
from public.benchmarks b
join public.metrics m on m.slug in (
  'c2st',
  'expected_coverage',
  'kl_divergence',
  'jsd',
  'is_ess'
)
where b.slug in ('lvk-bbh-l0', 'bbh-pe-l0', 'bbh-pe-l1', 'lisa-l0');

-- --- Demo submissions (all four boards; fictional team names) ----------------------

-- bbh-pe-l0 — three rows
insert into public.submissions (team_name, method_name, description, paper_url, code_url, benchmark_id)
select 'Posterior Pioneers', 'Neural flow matching', 'DEMO_SEED', 'https://example.org/demo-paper-1', 'https://example.org/demo-code-1', b.id
from public.benchmarks b where b.slug = 'bbh-pe-l0';

insert into public.submission_scores (submission_id, metric_id, score)
select s.id, m.id, case m.slug when 'c2st' then 0.48 when 'expected_coverage' then 0.06 when 'kl_divergence' then 0.11 when 'jsd' then 0.035 when 'is_ess' then 940.0 end
from public.submissions s join public.benchmarks b on b.id = s.benchmark_id and b.slug = 'bbh-pe-l0'
join public.benchmark_metrics bm on bm.benchmark_id = b.id join public.metrics m on m.id = bm.metric_id
where s.description = 'DEMO_SEED' and s.team_name = 'Posterior Pioneers' and s.method_name = 'Neural flow matching';

insert into public.submissions (team_name, method_name, description, paper_url, code_url, benchmark_id)
select 'Nested Nebula Crew', 'MultiNest-style nested sampling', 'DEMO_SEED', null, 'https://example.org/demo-code-2', b.id
from public.benchmarks b where b.slug = 'bbh-pe-l0';

insert into public.submission_scores (submission_id, metric_id, score)
select s.id, m.id, case m.slug when 'c2st' then 0.55 when 'expected_coverage' then 0.11 when 'kl_divergence' then 0.28 when 'jsd' then 0.092 when 'is_ess' then 410.0 end
from public.submissions s join public.benchmarks b on b.id = s.benchmark_id and b.slug = 'bbh-pe-l0'
join public.benchmark_metrics bm on bm.benchmark_id = b.id join public.metrics m on m.id = bm.metric_id
where s.description = 'DEMO_SEED' and s.team_name = 'Nested Nebula Crew' and s.method_name = 'MultiNest-style nested sampling';

insert into public.submissions (team_name, method_name, description, paper_url, code_url, benchmark_id)
select 'Slice & Dice Inference', 'Mean-field VI + normalizing flow', 'DEMO_SEED', null, null, b.id
from public.benchmarks b where b.slug = 'bbh-pe-l0';

insert into public.submission_scores (submission_id, metric_id, score)
select s.id, m.id, case m.slug when 'c2st' then 0.62 when 'expected_coverage' then 0.18 when 'kl_divergence' then 0.45 when 'jsd' then 0.14 when 'is_ess' then 220.0 end
from public.submissions s join public.benchmarks b on b.id = s.benchmark_id and b.slug = 'bbh-pe-l0'
join public.benchmark_metrics bm on bm.benchmark_id = b.id join public.metrics m on m.id = bm.metric_id
where s.description = 'DEMO_SEED' and s.team_name = 'Slice & Dice Inference' and s.method_name = 'Mean-field VI + normalizing flow';

-- bbh-pe-l1 — two rows (11D track)
insert into public.submissions (team_name, method_name, description, paper_url, code_url, benchmark_id)
select 'Ten-Dimensional Den', 'Parallel-tempered ensemble MCMC', 'DEMO_SEED', null, 'https://example.org/demo-code-3', b.id
from public.benchmarks b where b.slug = 'bbh-pe-l1';

insert into public.submission_scores (submission_id, metric_id, score)
select s.id, m.id, case m.slug when 'c2st' then 0.52 when 'expected_coverage' then 0.09 when 'kl_divergence' then 0.21 when 'jsd' then 0.068 when 'is_ess' then 620.0 end
from public.submissions s join public.benchmarks b on b.id = s.benchmark_id and b.slug = 'bbh-pe-l1'
join public.benchmark_metrics bm on bm.benchmark_id = b.id join public.metrics m on m.id = bm.metric_id
where s.description = 'DEMO_SEED' and s.team_name = 'Ten-Dimensional Den' and s.method_name = 'Parallel-tempered ensemble MCMC';

insert into public.submissions (team_name, method_name, description, paper_url, code_url, benchmark_id)
select 'Trans-D Walkers', 'RJMCMC + surrogate likelihood', 'DEMO_SEED', 'https://example.org/demo-paper-4', null, b.id
from public.benchmarks b where b.slug = 'bbh-pe-l1';

insert into public.submission_scores (submission_id, metric_id, score)
select s.id, m.id, case m.slug when 'c2st' then 0.58 when 'expected_coverage' then 0.14 when 'kl_divergence' then 0.33 when 'jsd' then 0.11 when 'is_ess' then 380.0 end
from public.submissions s join public.benchmarks b on b.id = s.benchmark_id and b.slug = 'bbh-pe-l1'
join public.benchmark_metrics bm on bm.benchmark_id = b.id join public.metrics m on m.id = bm.metric_id
where s.description = 'DEMO_SEED' and s.team_name = 'Trans-D Walkers' and s.method_name = 'RJMCMC + surrogate likelihood';

-- lisa-l0 — two rows
insert into public.submissions (team_name, method_name, description, paper_url, code_url, benchmark_id)
select 'LISA Ladder League', 'Sky-marginalized normalizing flow', 'DEMO_SEED', null, 'https://example.org/demo-code-5', b.id
from public.benchmarks b where b.slug = 'lisa-l0';

insert into public.submission_scores (submission_id, metric_id, score)
select s.id, m.id, case m.slug when 'c2st' then 0.49 when 'expected_coverage' then 0.07 when 'kl_divergence' then 0.15 when 'jsd' then 0.048 when 'is_ess' then 710.0 end
from public.submissions s join public.benchmarks b on b.id = s.benchmark_id and b.slug = 'lisa-l0'
join public.benchmark_metrics bm on bm.benchmark_id = b.id join public.metrics m on m.id = bm.metric_id
where s.description = 'DEMO_SEED' and s.team_name = 'LISA Ladder League' and s.method_name = 'Sky-marginalized normalizing flow';

insert into public.submissions (team_name, method_name, description, paper_url, code_url, benchmark_id)
select 'Ringdown Randomistas', 'Hierarchical VB on MBHBs', 'DEMO_SEED', 'https://example.org/demo-paper-6', null, b.id
from public.benchmarks b where b.slug = 'lisa-l0';

insert into public.submission_scores (submission_id, metric_id, score)
select s.id, m.id, case m.slug when 'c2st' then 0.57 when 'expected_coverage' then 0.12 when 'kl_divergence' then 0.31 when 'jsd' then 0.10 when 'is_ess' then 340.0 end
from public.submissions s join public.benchmarks b on b.id = s.benchmark_id and b.slug = 'lisa-l0'
join public.benchmark_metrics bm on bm.benchmark_id = b.id join public.metrics m on m.id = bm.metric_id
where s.description = 'DEMO_SEED' and s.team_name = 'Ringdown Randomistas' and s.method_name = 'Hierarchical VB on MBHBs';

-- lvk-bbh-l0 — two rows
insert into public.submissions (team_name, method_name, description, paper_url, code_url, benchmark_id)
select 'Virgo Variance Vanquishers', 'Production sampler (mock)', 'DEMO_SEED', null, null, b.id
from public.benchmarks b where b.slug = 'lvk-bbh-l0';

insert into public.submission_scores (submission_id, metric_id, score)
select s.id, m.id, case m.slug when 'c2st' then 0.51 when 'expected_coverage' then 0.08 when 'kl_divergence' then 0.19 when 'jsd' then 0.055 when 'is_ess' then 560.0 end
from public.submissions s join public.benchmarks b on b.id = s.benchmark_id and b.slug = 'lvk-bbh-l0'
join public.benchmark_metrics bm on bm.benchmark_id = b.id join public.metrics m on m.id = bm.metric_id
where s.description = 'DEMO_SEED' and s.team_name = 'Virgo Variance Vanquishers' and s.method_name = 'Production sampler (mock)';

insert into public.submissions (team_name, method_name, description, paper_url, code_url, benchmark_id)
select 'Cosmic Bayes Brigade', 'Amortized NPE + calibration', 'DEMO_SEED', 'https://example.org/demo-paper-7', 'https://example.org/demo-code-7', b.id
from public.benchmarks b where b.slug = 'lvk-bbh-l0';

insert into public.submission_scores (submission_id, metric_id, score)
select s.id, m.id, case m.slug when 'c2st' then 0.46 when 'expected_coverage' then 0.05 when 'kl_divergence' then 0.10 when 'jsd' then 0.030 when 'is_ess' then 880.0 end
from public.submissions s join public.benchmarks b on b.id = s.benchmark_id and b.slug = 'lvk-bbh-l0'
join public.benchmark_metrics bm on bm.benchmark_id = b.id join public.metrics m on m.id = bm.metric_id
where s.description = 'DEMO_SEED' and s.team_name = 'Cosmic Bayes Brigade' and s.method_name = 'Amortized NPE + calibration';

-- --- Sanity check (you should see non-zero counts) ----------------------------------

select 'metrics' as tbl, count(*)::int as n from public.metrics
union all
select 'benchmarks', count(*)::int from public.benchmarks
union all
select 'benchmark_metrics', count(*)::int from public.benchmark_metrics
union all
select 'submissions', count(*)::int from public.submissions
union all
select 'submission_scores', count(*)::int from public.submission_scores;

-- Expect 9 demo submissions (3+2+2+2) and 9×5 = 45 scores
select b.slug, count(s.id)::int as demo_submissions
from public.benchmarks b
left join public.submissions s on s.benchmark_id = b.id and s.description = 'DEMO_SEED'
group by b.slug
order by b.slug;
