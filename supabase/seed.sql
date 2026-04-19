-- Local-only demo rows after `supabase db reset` (migrations already applied).
-- For an empty / broken hosted DB in one shot, use instead:
--   supabase/scripts/rebuild_leaderboard_from_scratch.sql
-- Demo rows use description = 'DEMO_SEED' (keep in sync with that script).

-- --- Remove old demo submissions ---------------------------------------------------

delete from submission_scores
where submission_id in (select id from submissions where description = 'DEMO_SEED');

delete from submissions
where description = 'DEMO_SEED';

-- --- Demo rows: all four boards (keep in sync with scripts/rebuild_leaderboard_from_scratch.sql)

-- bbh-pe-l0
insert into submissions (team_name, method_name, description, paper_url, code_url, benchmark_id)
select 'Posterior Pioneers', 'Neural flow matching', 'DEMO_SEED', 'https://example.org/demo-paper-1', 'https://example.org/demo-code-1', b.id from benchmarks b where b.slug = 'bbh-pe-l0';
insert into submission_scores (submission_id, metric_id, score)
select s.id, m.id, case m.slug when 'c2st' then 0.48 when 'expected_coverage' then 0.06 when 'kl_divergence' then 0.11 when 'jsd' then 0.035 when 'is_ess' then 940.0 end
from submissions s join benchmarks b on b.id = s.benchmark_id and b.slug = 'bbh-pe-l0' join benchmark_metrics bm on bm.benchmark_id = b.id join metrics m on m.id = bm.metric_id
where s.description = 'DEMO_SEED' and s.team_name = 'Posterior Pioneers' and s.method_name = 'Neural flow matching';

insert into submissions (team_name, method_name, description, paper_url, code_url, benchmark_id)
select 'Nested Nebula Crew', 'MultiNest-style nested sampling', 'DEMO_SEED', null, 'https://example.org/demo-code-2', b.id from benchmarks b where b.slug = 'bbh-pe-l0';
insert into submission_scores (submission_id, metric_id, score)
select s.id, m.id, case m.slug when 'c2st' then 0.55 when 'expected_coverage' then 0.11 when 'kl_divergence' then 0.28 when 'jsd' then 0.092 when 'is_ess' then 410.0 end
from submissions s join benchmarks b on b.id = s.benchmark_id and b.slug = 'bbh-pe-l0' join benchmark_metrics bm on bm.benchmark_id = b.id join metrics m on m.id = bm.metric_id
where s.description = 'DEMO_SEED' and s.team_name = 'Nested Nebula Crew' and s.method_name = 'MultiNest-style nested sampling';

insert into submissions (team_name, method_name, description, paper_url, code_url, benchmark_id)
select 'Slice & Dice Inference', 'Mean-field VI + normalizing flow', 'DEMO_SEED', null, null, b.id from benchmarks b where b.slug = 'bbh-pe-l0';
insert into submission_scores (submission_id, metric_id, score)
select s.id, m.id, case m.slug when 'c2st' then 0.62 when 'expected_coverage' then 0.18 when 'kl_divergence' then 0.45 when 'jsd' then 0.14 when 'is_ess' then 220.0 end
from submissions s join benchmarks b on b.id = s.benchmark_id and b.slug = 'bbh-pe-l0' join benchmark_metrics bm on bm.benchmark_id = b.id join metrics m on m.id = bm.metric_id
where s.description = 'DEMO_SEED' and s.team_name = 'Slice & Dice Inference' and s.method_name = 'Mean-field VI + normalizing flow';

-- bbh-pe-l1
insert into submissions (team_name, method_name, description, paper_url, code_url, benchmark_id)
select 'Ten-Dimensional Den', 'Parallel-tempered ensemble MCMC', 'DEMO_SEED', null, 'https://example.org/demo-code-3', b.id from benchmarks b where b.slug = 'bbh-pe-l1';
insert into submission_scores (submission_id, metric_id, score)
select s.id, m.id, case m.slug when 'c2st' then 0.52 when 'expected_coverage' then 0.09 when 'kl_divergence' then 0.21 when 'jsd' then 0.068 when 'is_ess' then 620.0 end
from submissions s join benchmarks b on b.id = s.benchmark_id and b.slug = 'bbh-pe-l1' join benchmark_metrics bm on bm.benchmark_id = b.id join metrics m on m.id = bm.metric_id
where s.description = 'DEMO_SEED' and s.team_name = 'Ten-Dimensional Den' and s.method_name = 'Parallel-tempered ensemble MCMC';

insert into submissions (team_name, method_name, description, paper_url, code_url, benchmark_id)
select 'Trans-D Walkers', 'RJMCMC + surrogate likelihood', 'DEMO_SEED', 'https://example.org/demo-paper-4', null, b.id from benchmarks b where b.slug = 'bbh-pe-l1';
insert into submission_scores (submission_id, metric_id, score)
select s.id, m.id, case m.slug when 'c2st' then 0.58 when 'expected_coverage' then 0.14 when 'kl_divergence' then 0.33 when 'jsd' then 0.11 when 'is_ess' then 380.0 end
from submissions s join benchmarks b on b.id = s.benchmark_id and b.slug = 'bbh-pe-l1' join benchmark_metrics bm on bm.benchmark_id = b.id join metrics m on m.id = bm.metric_id
where s.description = 'DEMO_SEED' and s.team_name = 'Trans-D Walkers' and s.method_name = 'RJMCMC + surrogate likelihood';

-- lisa-l0
insert into submissions (team_name, method_name, description, paper_url, code_url, benchmark_id)
select 'LISA Ladder League', 'Sky-marginalized normalizing flow', 'DEMO_SEED', null, 'https://example.org/demo-code-5', b.id from benchmarks b where b.slug = 'lisa-l0';
insert into submission_scores (submission_id, metric_id, score)
select s.id, m.id, case m.slug when 'c2st' then 0.49 when 'expected_coverage' then 0.07 when 'kl_divergence' then 0.15 when 'jsd' then 0.048 when 'is_ess' then 710.0 end
from submissions s join benchmarks b on b.id = s.benchmark_id and b.slug = 'lisa-l0' join benchmark_metrics bm on bm.benchmark_id = b.id join metrics m on m.id = bm.metric_id
where s.description = 'DEMO_SEED' and s.team_name = 'LISA Ladder League' and s.method_name = 'Sky-marginalized normalizing flow';

insert into submissions (team_name, method_name, description, paper_url, code_url, benchmark_id)
select 'Ringdown Randomistas', 'Hierarchical VB on MBHBs', 'DEMO_SEED', 'https://example.org/demo-paper-6', null, b.id from benchmarks b where b.slug = 'lisa-l0';
insert into submission_scores (submission_id, metric_id, score)
select s.id, m.id, case m.slug when 'c2st' then 0.57 when 'expected_coverage' then 0.12 when 'kl_divergence' then 0.31 when 'jsd' then 0.10 when 'is_ess' then 340.0 end
from submissions s join benchmarks b on b.id = s.benchmark_id and b.slug = 'lisa-l0' join benchmark_metrics bm on bm.benchmark_id = b.id join metrics m on m.id = bm.metric_id
where s.description = 'DEMO_SEED' and s.team_name = 'Ringdown Randomistas' and s.method_name = 'Hierarchical VB on MBHBs';

-- lvk-bbh-l0
insert into submissions (team_name, method_name, description, paper_url, code_url, benchmark_id)
select 'Virgo Variance Vanquishers', 'Production sampler (mock)', 'DEMO_SEED', null, null, b.id from benchmarks b where b.slug = 'lvk-bbh-l0';
insert into submission_scores (submission_id, metric_id, score)
select s.id, m.id, case m.slug when 'c2st' then 0.51 when 'expected_coverage' then 0.08 when 'kl_divergence' then 0.19 when 'jsd' then 0.055 when 'is_ess' then 560.0 end
from submissions s join benchmarks b on b.id = s.benchmark_id and b.slug = 'lvk-bbh-l0' join benchmark_metrics bm on bm.benchmark_id = b.id join metrics m on m.id = bm.metric_id
where s.description = 'DEMO_SEED' and s.team_name = 'Virgo Variance Vanquishers' and s.method_name = 'Production sampler (mock)';

insert into submissions (team_name, method_name, description, paper_url, code_url, benchmark_id)
select 'Cosmic Bayes Brigade', 'Amortized NPE + calibration', 'DEMO_SEED', 'https://example.org/demo-paper-7', 'https://example.org/demo-code-7', b.id from benchmarks b where b.slug = 'lvk-bbh-l0';
insert into submission_scores (submission_id, metric_id, score)
select s.id, m.id, case m.slug when 'c2st' then 0.46 when 'expected_coverage' then 0.05 when 'kl_divergence' then 0.10 when 'jsd' then 0.030 when 'is_ess' then 880.0 end
from submissions s join benchmarks b on b.id = s.benchmark_id and b.slug = 'lvk-bbh-l0' join benchmark_metrics bm on bm.benchmark_id = b.id join metrics m on m.id = bm.metric_id
where s.description = 'DEMO_SEED' and s.team_name = 'Cosmic Bayes Brigade' and s.method_name = 'Amortized NPE + calibration';
