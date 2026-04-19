-- Reset benchmark rows and leaderboard links, then seed four tasks + evaluation metrics.
-- Clears submissions. Does not delete the metrics catalogue except via benchmark_metrics FK cleanup.

delete from submission_scores;
delete from submissions;
delete from benchmark_metrics;
delete from benchmarks;

-- Evaluation scalars only (no P–P / SBC rank column on the leaderboard).
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
where b.slug in ('lvk-bbh-l0', 'bbh-pe-l0', 'bbh-pe-l1', 'lisa-l0');
