export const externalLinks = {
  gwFreerideWorkshop: 'https://sites.google.com/unimib.it/gwfreeride/home',
  githubOrg: 'https://github.com/gwbenchmark?view_as=public',
};

/** Plain text runs and `{ href, label }` links in reading order — edit as one paragraph. */
export type InlineLink = { href: string; label: string };
export type InlineSegment = string | InlineLink;

export const homeCopy = {
  subtitle:
    'Standardised benchmarks for simulation-based inference on gravitational-wave parameter estimation — with automated blind evaluation, purpose-built metrics, and a clear level ladder from easy on-ramps to production-style analyses.',
  whoFor: [
    'A reproducible, levelled benchmark to compare methods fairly and understand failure modes.',
    'Benchmarks that start simple but move toward LVK/LISA-style parameter estimation constraints.',
  ],
  goals: [
    'A suite of standardised metrics with automatic (blind) evaluation — upload your posteriors and get comparable results.',
    'Standardised tasks, data formats, and reference posteriors to make comparisons reproducible.',
    'A clear “level ladder”: quick iteration at low levels, realism and stress tests at higher levels.',
    'A shared environment where SBI is genuinely useful — GW inference has rich structure, degeneracies, and calibration demands.',
  ],
};

export const aboutCopy = {
  title: 'About',
  /** Short hero line; link URL is next to the label below (also listed under “Elsewhere” on the page). */
  heroSubtitle: [
    'How a conference workshop led to a community-built benchmark effort.',
  ] satisfies InlineSegment[],
  /** Main narrative — single flow, no card grid. */
  narrative: {
    intro: [
      'This effort began at the ',
      { href: externalLinks.gwFreerideWorkshop, label: 'GWFreeride' },
      ' conference in Sexten, Italy (26–30 January 2026). Between talks and discussions about machine learning and gravitational waves, conversations in the spa, and — of course — skiing, the week made clear that successful use of ML methods, in particular simulation-based inference (SBI), in gravitational-wave science is growing fast.',
    ] satisfies InlineSegment[],
    challengesIntro:
      'New opportunities came with challenges. Two that kept coming up were:',
    challenges: [
      'There are no strong, standardised ways to compare different machine-learning methods on equal footing.',
      'Evaluating whether a method is ready for production-style use is tedious and often ad hoc.',
    ],
    workshop:
      'Given that, a few people sat together for several workshop sessions during the conference and laid groundwork for a benchmark: target audiences, goals, metrics, methods, and more.',
    teamCardTitle: 'After the conference',
    teamCardBody:
      'After the conference, the work continued: others joined, and momentum kept building. We are now an international team of machine learning and gravitational wave scientists working in multiple working groups with regular meetings. The goal is to ship a first version of the benchmark as soon as possible. ',
  },
  contactEmail: 'james.alvey@cam.ac.uk',
  contactEmailDisplay: 'james.alvey@cam.ac.uk',
  links: [
    {
      href: '/benchmarks',
      label: 'Benchmarks',
      description:
        'Levels, tasks, and how ground-based work connects to longer-term LISA / PTA ideas.',
    },
    {
      href: '/evaluation',
      label: 'Evaluation',
      description:
        'Which metrics we use and why — accuracy, calibration, and distributional checks.',
    },
    {
      href: '/submit',
      label: 'Submit',
      description:
        'Blind evaluation flow: what to upload, how results are returned, and leaderboards.',
    },
  ],
};

/** One-line hero; keep the title card light. */
export const benchmarksPageHeroSubtitle =
  'Aligned-spin binary-black-hole tasks with a clear level ladder — from an easy shared track toward production-style analyses.';

/** Compact glossary for a narrow sidebar (not the main narrative). */
export const benchmarksAbbreviations: { term: string; text: string }[] = [
  { term: 'GW', text: 'Gravitational waves.' },
  {
    term: 'PE',
    text: 'Parameter estimation — inferring source parameters from data.',
  },
  {
    term: 'SBI',
    text: 'Simulation-based inference — train on simulator draws.',
  },
  { term: 'LVK', text: 'LIGO–Virgo–KAGRA ground-based network.' },
  { term: 'BBH', text: 'Binary black hole merger.' },
  { term: 'PSD', text: 'Power spectral density of the noise.' },
];

/** Short opening: physics in plain language, why PE/SBI, benchmark philosophy. */
export const benchmarksPageIntro = {
  title: 'What this benchmark is about',
  paragraphs: [
    'In the aligned-spin binary black hole setup, the two black holes spiral together with spins aligned with the orbit: it is a standard, slightly simplified class of mergers that still matches much of what ground-based detectors see, but is easier to specify and simulate than the fully generic spin-precessing case.',
    'Parameter estimation means recovering quantities such as masses, spins, distance, and sky location from the noisy strain measured in multiple detectors. That inverse problem is Bayesian and high-dimensional, so the community invests heavily in simulation-based inference (SBI): neural or other learned components trained on waveform simulations, because each exact likelihood evaluation is expensive.',
    'These benchmarks are deliberately simple and easy to use at the start: fixed simulators, noise, and priors so machine-learning researchers can compare methods fairly. As levels go up, tasks become harder and closer to production workflows (more parameters, more freedom), so gravitational-wave scientists can later test what still works outside the toy regime.',
  ],
};

export type BenchmarkSpecRow = { aspect: string; detail: string };

export type BenchmarkLadderLevel = {
  slug: string;
  step: '0' | '1';
  heading: string;
  tagline: string;
  timelineNotes: string[];
  tableTitle: string;
  rows: BenchmarkSpecRow[];
};

/** Level ladder: copy next to each step + rows for the on-page specification tables. */
export const benchmarkLadderLevels: BenchmarkLadderLevel[] = [
  {
    slug: 'bbh-pe-l0',
    step: '0',
    heading: 'Level 0',
    tagline:
      'Intrinsic parameters only (~5): extrinsic sky and timing are fixed for you.',
    timelineNotes: [
      'Extrinsic parameters describe where the signal is on the sky, how the binary is oriented toward Earth, distance, and arrival time across the network. Here they are held fixed by the benchmark, so your model only explores a smaller intrinsic space — good for debugging architectures and calibration on a realistic waveform family.',
      'For machine learning, Level 0 is the friendly track: lower dimension, shared simulator and Gaussian noise with a fixed PSD, standard Bilby BBH prior, and blind or unblind splits so you can iterate quickly before tackling the full extrinsic problem.',
    ],
    tableTitle: 'Level 0 benchmark specification',
    rows: [
      { aspect: 'Track slug', detail: 'bbh-pe-l0' },
      {
        aspect: 'Source physics',
        detail: 'Aligned-spin binary black hole (BBH)',
      },
      {
        aspect: 'Detector network',
        detail: 'Three ground-based detectors (LVK-style geometry)',
      },
      {
        aspect: 'Noise',
        detail:
          'Gaussian noise with a fixed, known power spectral density (PSD)',
      },
      {
        aspect: 'Extrinsic parameters',
        detail:
          'Fixed by the task (sky location fixed; coherent arrival times in at least two detectors as specified)',
      },
      {
        aspect: 'Parameters to infer',
        detail: 'About five intrinsic parameters (masses, spins, …)',
      },
      {
        aspect: 'Prior',
        detail: 'Standard Bilby BBH prior shipped with the benchmark',
      },
      {
        aspect: 'Simulator',
        detail: 'Provided — everyone uses the same forward model',
      },
      {
        aspect: 'Evaluation splits',
        detail: 'Support for blind and/or unblind datasets',
      },
    ],
  },
  {
    slug: 'bbh-pe-l1',
    step: '1',
    heading: 'Level 1',
    tagline:
      'Same setup as Level 0, but you also infer extrinsic parameters (11D).',
    timelineNotes: [
      'Extrinsic parameters are now free: sky position, orientation, distance, and related quantities enter the state vector (eleven extrinsic dimensions in our published parameterisation). The likelihood is the same class of problem, but the posterior can be more complex (multiple modes, stronger degeneracies), and classical samplers (MCMC, nested sampling) need more compute per event.',
      'For machine learning, Level 1 is the same data format and noise contract as Level 0, but your density model or sampling scheme must scale to a larger, more structured parameter space — a better stress test before future production-style levels with more pipeline freedom.',
    ],
    tableTitle: 'Level 1 benchmark specification',
    rows: [
      { aspect: 'Track slug', detail: 'bbh-pe-l1' },
      {
        aspect: 'Source physics',
        detail: 'Same aligned-spin BBH class as Level 0',
      },
      {
        aspect: 'Detector network',
        detail: 'Same three-detector network as Level 0',
      },
      {
        aspect: 'Noise',
        detail: 'Same fixed-PSD Gaussian noise model as Level 0',
      },
      {
        aspect: 'Extrinsic parameters',
        detail:
          'Free — full extrinsic block (11 dimensions; exact ordering in the task sheet)',
      },
      {
        aspect: 'Parameters to infer',
        detail: 'Intrinsic plus extrinsic (full PE vector)',
      },
      {
        aspect: 'Prior',
        detail: 'Same Bilby BBH prior family as Level 0 unless noted otherwise',
      },
      {
        aspect: 'Simulator',
        detail: 'Same philosophy as Level 0 — shared forward model',
      },
      {
        aspect: 'Difficulty vs Level 0',
        detail:
          'Larger sampling space; reference posteriors from standard samplers are more expensive to generate',
      },
    ],
  },
];

/** Short line above the LVK / LISA / PTA cards. */
export const benchmarksRoadmapIntro =
  'We begin with ground-based BBH tasks; the same evaluation ideas should later cover space-based (LISA) and pulsar-timing (PTA) science once those tracks are ready.';

/** Labels for the three roadmap tiles (icons on the benchmarks page). */
export const benchmarksRoadmapCards = [
  {
    key: 'lvk',
    title: 'LVK / ground',
    body: 'Interferometric strain from Earth-based detectors — this is where Level 0 and Level 1 live today.',
  },
  {
    key: 'lisa',
    title: 'LISA (outlook)',
    body: 'Space-based timelines for massive black-hole binaries and galactic binaries — future benchmark generation.',
  },
  {
    key: 'pta',
    title: 'PTA (outlook)',
    body: 'Pulsar timing arrays for very low-frequency waves — different data format, same need for clear tasks and metrics.',
  },
] as const;

export const benchmarksCopy = {
  outlook:
    'Longer term we expect additional tracks with more simulator and noise-model freedom for “does it work in our pipeline?” studies. For space-based and pulsar-timing science, LISA and PTA-style benchmarks remain on the roadmap — the outlook cards on this site are already a good home for that story once concrete tasks ship.',
  workInProgress:
    'Task sheets, data releases, and evaluation servers are still being finalised. Nothing here should be read as frozen specification until the first public package and leaderboard launch.',
};

export const evaluationCopy = {
  intro:
    'No single number can certify a posterior. We focus on a small suite of complementary metrics, organised into three questions:',
  taxonomy: [
    {
      title: 'Accuracy',
      bullets: [
        'Does your approximate posterior look like it came from the same distribution as a reference posterior?',
        'Main tool: classifier two-sample tests (C2ST), which tend to work well even for multimodal posteriors.',
      ],
    },
    {
      title: 'Robustness / calibration',
      bullets: [
        'Is your posterior calibrated (not systematically overconfident or underconfident)?',
        'Main tools: expected coverage curves and P–P plots, often summarised with a KS-style statistic.',
      ],
    },
    {
      title: 'Precision',
      bullets: [
        'Given two reasonably calibrated posteriors, which one is closer / sharper in the right way?',
        'Candidates we expect to use: distributional distances such as JSD and simple posterior sample comparisons (e.g. KS on 1D marginals) where appropriate.',
      ],
    },
  ],
  note: 'Exact metric choices can be benchmark-dependent, but the goal stays the same: easy-to-run, hard-to-game, and informative across SBI and traditional samplers.',
};

/** Example of an established amortised SBI stack in GW — not an endorsement, a reference point. */
export const dingoExample = {
  name: 'DINGO',
  tagline:
    'Deep inference for gravitational-wave observations — neural posterior estimation (normalising flows) trained on simulations, with fast inference on new events.',
  why: 'Methods like DINGO are exactly why we need standard benchmarks: they’re powerful, but we want apples-to-apples comparisons and calibration checks against reference posteriors.',
  paperUrl: 'https://arxiv.org/abs/2106.12594',
  paperLabel: 'arXiv:2106.12594',
  codeUrl: 'https://github.com/dingo-gw/dingo',
  codeLabel: 'github.com/dingo-gw/dingo',
  docsUrl: 'https://dingo-gw.readthedocs.io',
  docsLabel: 'dingo-gw.readthedocs.io',
};

export type SubmitBenchmarkSection = {
  slug: string;
  title: string;
  intro: string;
  checklist: string[];
};

export const submitCopy = {
  intro:
    'We aim to run blind evaluations: you run inference on a published test set, submit posterior samples in a prescribed format, and receive scores against reference posteriors. You can then opt in to a public leaderboard for the benchmark level you entered.',
  workInProgress:
    'The benchmark is not finished yet — submission formats, blind splits, and the upload path are still in design. The lists below describe what we expect you will need conceptually; exact schemas and validation will ship with the first release package.',
  globalChecklist: [
    'Register or note a team / method identifier for leaderboard display.',
    'Reproduce the training and evaluation environment (Python version, dependency pins) once the reference repository is published.',
    'Follow the parameter ordering and units in the task specification so samples line up with reference posteriors.',
  ],
  byBenchmark: [
    {
      slug: 'bbh-pe-l0',
      title: 'Level 0 — aligned-spin BBH, fixed extrinsic',
      intro:
        'Submit posteriors over the intrinsic parameter vector defined in the Level 0 task sheet (~5 parameters), under the standard Bilby BBH prior and the provided simulator. Extrinsic parameters are not inferred: they are fixed by the benchmark.',
      checklist: [
        'Train or adapt your method using the released simulations and fixed PSD Gaussian noise model.',
        'Run inference on every observation in the blind (or unblind) test set for the track you enter.',
        'Output posterior samples in the required format for the intrinsic parameters only, unless the task explicitly asks for additional quantities.',
        'Record hyperparameters, random seeds, and training budget — we will ask for light provenance metadata alongside uploads.',
      ],
    },
    {
      slug: 'bbh-pe-l1',
      title: 'Level 1 — aligned-spin BBH, full extrinsic (11D)',
      intro:
        'Same noise model and prior family as Level 0, but submit posteriors over the full parameter vector, including eleven extrinsic dimensions, exactly as parameterised in the released specification.',
      checklist: [
        'Ensure your model covers the enlarged extrinsic space (11D) without collapsing corners that the reference samplers explore.',
        'Expect longer runtimes per event for classical baselines; amortised methods should report wall-clock and hardware.',
        'Use the same sample format as Level 0 where possible so evaluation tooling can stay shared; any deltas will be documented in the Level 1 package.',
      ],
    },
  ] satisfies SubmitBenchmarkSection[],
  uploadNote:
    'The upload mechanism (web form, API, or scripted ingest) and blind-evaluation workflow are still being implemented. Watch the gwbenchmark GitHub organisation and this page for the first runnable instructions.',
};
