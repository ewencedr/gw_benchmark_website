-- Upgrade path if an older revision of 20260413120000 already ran (two benchmarks only).
-- Safe to run after the newer 20260413120000 seed: uses NOT EXISTS / DELETE scoped to known slugs.

insert into metrics (name, slug, description, unit, higher_is_better)
select 'C2ST', 'c2st', 'Classifier two-sample test; chance-level accuracy (~0.5) means your samples are hard to distinguish from the reference.', null, false
where not exists (select 1 from metrics where slug = 'c2st');

insert into metrics (name, slug, description, unit, higher_is_better)
select 'Expected coverage', 'expected_coverage', 'Calibration of credible regions vs nominal levels; lower deviation from nominal is better.', null, false
where not exists (select 1 from metrics where slug = 'expected_coverage');

insert into metrics (name, slug, description, unit, higher_is_better)
select 'KL divergence', 'kl_divergence', 'Directed KL from the reference toward the approximate posterior; lower is better.', null, false
where not exists (select 1 from metrics where slug = 'kl_divergence');

insert into metrics (name, slug, description, unit, higher_is_better)
select 'JSD', 'jsd', 'Jensen–Shannon divergence between reference and approximate; lower is better.', null, false
where not exists (select 1 from metrics where slug = 'jsd');

insert into metrics (name, slug, description, unit, higher_is_better)
select 'IS-ESS', 'is_ess', 'Effective sample size under importance reweighting to the reference; higher is better.', null, true
where not exists (select 1 from metrics where slug = 'is_ess');

insert into benchmarks (name, slug, description, level)
select
  'LVK — aligned-spin BBH (Level 0)',
  'lvk-bbh-l0',
  'LIGO–Virgo–KAGRA-style three-detector aligned-spin BBH, fixed extrinsic (sky and arrival times fixed), fixed PSD Gaussian noise, intrinsic parameters, standard Bilby BBH prior, maintainer-provided simulator; blind or unblind splits.',
  'LVK · Level 0'
where not exists (select 1 from benchmarks where slug = 'lvk-bbh-l0');

insert into benchmarks (name, slug, description, level)
select
  'LISA — Level 0 (preview)',
  'lisa-l0',
  'Space-based LISA track, Level 0 definition in preparation; the public leaderboard will populate after the first evaluation window.',
  'LISA · Level 0'
where not exists (select 1 from benchmarks where slug = 'lisa-l0');

-- Drop leaderboard links that are not the five evaluation scalars (e.g. legacy P–P columns).
delete from benchmark_metrics bm
using benchmarks b, metrics m
where bm.benchmark_id = b.id
  and bm.metric_id = m.id
  and b.slug in ('lvk-bbh-l0', 'bbh-pe-l0', 'bbh-pe-l1', 'lisa-l0')
  and m.slug not in (
    'c2st',
    'expected_coverage',
    'kl_divergence',
    'jsd',
    'is_ess'
  );

insert into benchmark_metrics (benchmark_id, metric_id)
select b.id, m.id
from benchmarks b
join metrics m on m.slug in (
  'c2st',
  'expected_coverage',
  'kl_divergence',
  'jsd',
  'is_ess'
)
where b.slug in ('lvk-bbh-l0', 'bbh-pe-l0', 'bbh-pe-l1', 'lisa-l0')
  and not exists (
    select 1
    from benchmark_metrics x
    where x.benchmark_id = b.id
      and x.metric_id = m.id
  );
