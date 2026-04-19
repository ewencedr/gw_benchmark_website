export const externalLinks = {
  gwFreerideWorkshop: 'https://sites.google.com/unimib.it/gwfreeride/home',
  githubOrg: 'https://github.com/gwbenchmark',
};

/** Plain text runs and `{ href, label }` links in reading order — edit as one paragraph. */
export type InlineLink = { href: string; label: string };
export type InlineSegment = string | InlineLink;

export const homeCopy = {
  subtitle:
    'Standardised benchmarks for simulation-based inference on gravitational-wave parameter estimation.',
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
  'A levelled benchmark suite for simulation-based inference on gravitational-wave parameter estimation — starting simple, building toward production-style realism.';

/** Short opening for CS audience. */
export const benchmarksPageIntro = {
  title: 'What the benchmark is about',
  paragraphs: [
    'When two black holes merge, they produce a gravitational wave — a ripple in spacetime that stretches and compresses interferometer arms by a fraction of a proton diameter. Detectors record this as a noisy strain time series. The inference task is to recover the posterior distribution over source parameters (masses, spins, sky position, distance, orientation) given that data.',
    'Because evaluating the exact likelihood requires expensive waveform simulations, the community invests heavily in simulation-based inference: train a neural network or other learned component once on simulations, then run inference on any new event in milliseconds. These benchmarks are designed to let researchers compare those methods on equal footing — standardised data formats, shared simulators, and blind evaluation against reference posteriors.',
    'The level ladder starts with a clean five-parameter problem and progressively adds the complexity of real analyses. The same evaluation ideas extend to LISA (space-based) and PTA (pulsar timing) science, each of which brings a distinct set of inference challenges.',
  ],
};

export type BenchmarkSpecRow = { aspect: string; detail: string };

export type BenchmarkLadderLevel = {
  slug: string;
  /** Short label shown in the timeline dot (e.g. "0", "1", "L0"). */
  step: string;
  heading: string;
  tagline: string;
  timelineNotes: string[];
  tableTitle?: string;
  rows?: BenchmarkSpecRow[];
  /** Controls dot and accent colour. */
  accent: 'orange' | 'purple' | 'cyan';
  /** Active levels have a solid dot; planned show a dashed/muted style. */
  status: 'active' | 'planned';
};

/** LVK ground-based track — Level 0 and Level 1. */
export const benchmarkLadderLevels: BenchmarkLadderLevel[] = [
  {
    slug: 'bbh-pe-l0',
    step: '0',
    heading: 'Level 0 — fixed extrinsic',
    tagline:
      'Five-dimensional posterior estimation over intrinsic parameters only.',
    accent: 'orange',
    status: 'active',
    timelineNotes: [
      'The input to your model is a strain vector from three detectors (H1, L1, V1). Your task is to return samples from the posterior over five parameters: chirp mass (M\u1d9c), mass ratio (q), luminosity distance (d\u2097), and the two aligned spin components (\u03c7\u2081, \u03c7\u2082). All extrinsic parameters — sky location, geocentric arrival time, coalescence phase, polarisation, and inclination — are held at fixed, known values by the benchmark.',
      'The noise is Gaussian with a fixed, known power spectral density, and the simulator is provided. Every participant uses the same forward model. This makes Level 0 a clean entry point: you can iterate on architectures and calibration without navigating the full extrinsic geometry. Both blind and unblind evaluation splits are available.',
    ],
    tableTitle: 'Level 0 specification',
    rows: [
      { aspect: 'Track slug', detail: 'bbh-pe-l0' },
      { aspect: 'Source', detail: 'Aligned-spin binary black hole (BBH)' },
      {
        aspect: 'Detectors',
        detail: 'H1 \u00b7 L1 \u00b7 V1  (three-detector LVK network)',
      },
      {
        aspect: 'Inference target',
        detail:
          'M\u1d9c, q, d\u2097, \u03c7\u2081, \u03c7\u2082  (5 dimensions)',
      },
      {
        aspect: 'Extrinsic',
        detail:
          'Fixed — sky position, time, phase, \u03c8, \u03b8\u2c7c\u2c7c held constant',
      },
      { aspect: 'Noise', detail: 'Gaussian \u00b7 fixed known PSD' },
      {
        aspect: 'Prior',
        detail: 'Standard Bilby BBH prior (shipped with benchmark)',
      },
      {
        aspect: 'Simulator',
        detail: 'Provided — shared forward model for all participants',
      },
      { aspect: 'Evaluation', detail: 'Blind and unblind splits available' },
    ],
  },
  {
    slug: 'bbh-pe-l1',
    step: '1',
    heading: 'Level 1 — full parameter space',
    tagline:
      'Eleven-dimensional inference — same setup, extrinsic parameters now free.',
    accent: 'purple',
    status: 'active',
    timelineNotes: [
      'Same data format and noise contract as Level 0. The difference: six extrinsic parameters are no longer fixed. Sky position (RA, dec), geocentric arrival time, coalescence phase, polarisation angle (\u03c8), and inclination (\u03b8\u2c7c\u2c7c) are now part of the posterior. Combined with the five intrinsic parameters from Level 0, the full inference target is eleven-dimensional.',
      'The posterior structure becomes more complex. Sky position in a three-detector network produces a characteristic ring-shaped degeneracy on the sphere, and inclination and distance are correlated. Classical nested samplers handle Level 1 but need significantly more compute per event — amortised SBI methods can still evaluate any new event in a single forward pass. Exposing that cost contrast is exactly what Level 1 is designed to do.',
    ],
    tableTitle: 'Level 1 specification',
    rows: [
      { aspect: 'Track slug', detail: 'bbh-pe-l1' },
      { aspect: 'Source', detail: 'Same aligned-spin BBH class as Level 0' },
      { aspect: 'Detectors', detail: 'Same H1 \u00b7 L1 \u00b7 V1 network' },
      {
        aspect: 'Inference target',
        detail:
          'M\u1d9c, q, d\u2097, \u03c7\u2081, \u03c7\u2082 + RA, dec, t_geo, \u03c6, \u03c8, \u03b8\u2c7c\u2c7c  (11 dimensions)',
      },
      { aspect: 'Extrinsic', detail: 'All six extrinsic parameters are free' },
      { aspect: 'Noise', detail: 'Same fixed-PSD Gaussian model as Level 0' },
      { aspect: 'Prior', detail: 'Same Bilby BBH prior family as Level 0' },
      { aspect: 'Simulator', detail: 'Same shared forward model as Level 0' },
      {
        aspect: 'vs. Level 0',
        detail:
          'Larger parameter space \u00b7 richer posterior geometry \u00b7 more expensive reference posteriors',
      },
    ],
  },
];

/** LISA space-based track — scope under active design. */
export const lisaLevels: BenchmarkLadderLevel[] = [
  {
    slug: 'mbhb-pe-lisa-l0',
    step: 'L0',
    heading: 'LISA Level 0 — scope under design',
    tagline:
      'MBHB inference with the reference LISA response: fixed noise, equal arm lengths, TDI 1.5.',
    accent: 'cyan',
    status: 'planned',
    timelineNotes: [
      'The philosophy matches LVK Level 0: tackle the real problem in a controlled setting. Fix the noise to the reference LISA PSD, assume equal arm lengths and circular spacecraft orbits, use TDI 1.5 rather than full TDI 2.0, and exclude precession. This strips away tooling complexity while preserving what makes LISA inference genuinely different: the full LISA detector response function, signal durations of weeks to months, and characteristic multimodal sky posteriors that arise in every MBHB observation regardless of SNR.',
      'Massive black-hole binary signals differ from LVK BBH in every relevant way — sources range from millions to billions of solar masses, SNR is much higher, and signals are much longer. The sky-localisation posterior is always multimodal by the geometry of a single orbiting constellation, and some degeneracies have no analogue in the ground-based case. LISA Level 0 will be a genuinely distinct benchmark, not a rescaled version of the LVK tracks.',
    ],
  },
];

/** Short line above the three track cards. */
export const benchmarksRoadmapIntro =
  'Three distinct experimental regimes — each with its own detector geometry, data format, and inference challenges. We start with LVK; LISA and PTA follow as the benchmark matures.';

/** Labels for the three track tiles. */
export const benchmarksRoadmapCards = [
  {
    key: 'lvk',
    title: 'LVK — ground-based',
    statusLabel: 'Active',
    accent: 'orange' as const,
    body: 'Short strain bursts from Earth-based interferometers. The first benchmark levels live here: fast iteration, a shared simulator, and clear reference posteriors.',
  },
  {
    key: 'lisa',
    title: 'LISA — space-based',
    statusLabel: 'Planning',
    accent: 'purple' as const,
    body: 'Heliocentric spacecraft constellation targeting massive black-hole binaries. Longer signals, higher SNR, a different sky-localisation geometry — Level 0 scope is under active design.',
  },
  {
    key: 'pta',
    title: 'PTA — pulsar timing',
    statusLabel: 'Outlook',
    accent: 'emerald' as const,
    body: 'An ensemble of millisecond pulsars acting as a galaxy-scale detector. A fundamentally different data format — timing residuals and correlation matrices — with early benchmark ideas being explored.',
  },
] as const;

export const benchmarksCopy = {
  lvkFuture:
    'Higher levels will introduce more pipeline freedom — varying noise realisations, more flexible simulators, and eventually production-style settings where methods must handle detector artifacts and non-Gaussian noise. The level ladder idea stays the same: each step adds one axis of realism.',
  workInProgress:
    'Task sheets, data releases, and evaluation servers are still being finalised. Nothing here should be read as a frozen specification until the first public package and leaderboard launch.',
};

export const ptaCopy = {
  intro:
    'Pulsar timing arrays monitor an ensemble of millisecond pulsars spread across the Milky Way. A stochastic gravitational-wave background imprints correlated timing residuals across pulsar pairs — the Hellings-Downs correlation — and the inference targets are the statistical properties of that background rather than individual merger events.',
  tasks:
    'The data format is fundamentally different from interferometric data: correlation matrices and sky maps rather than strain time series. Early PTA benchmark ideas focus on self-contained classification tasks — for example, distinguishing isotropic from anisotropic gravitational-wave backgrounds — that do not require the full machinery of a production PTA analysis pipeline. Concrete benchmark designs are still being explored.',
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

export type SubmitStep = {
  number: string;
  title: string;
  description: string;
};

/** Short per-level blurbs; full task sheets will ship with the first release. */
export type SubmitBenchmarkSection = {
  slug: string;
  title: string;
  summary: string;
};

export const submitCopy = {
  heroSubtitle:
    'Choose a benchmark, download its task package, then upload posterior samples for scoring.',

  wipBanner: {
    label: 'Work in progress',
    title: 'Submission details are not final yet',
    body: 'Exact file formats, manifests, and the upload path are still being built. When they are ready, the definitive instructions will appear on this page. Datasets and automated evaluation are planned to live on Hugging Face; the same links and summaries will be mirrored here.',
  },

  steps: [
    {
      number: '01',
      title: 'Choose a benchmark',
      description:
        'Pick the track and level you want to enter (for now: LVK Level 0 or Level 1), then download the release from Hugging Face once it is published — strain, PSD, metadata, simulator, and any reference materials for that level.',
    },
    {
      number: '02',
      title: 'Run your inference',
      description:
        'Train or configure your method using the released simulations and rules for that level, then run it on every test observation and collect posterior samples in the task parameterisation.',
    },
    {
      number: '03',
      title: 'Package to the specification',
      description:
        'Arrange samples and sidecar metadata exactly as the release notes describe — layout, naming, dtypes, and parameter ordering will be validated automatically once the checker ships.',
    },
    {
      number: '04',
      title: 'Upload',
      description:
        'Upload your posterior files through the channel we announce, together with any required companion fields (team or method id, seeds, short run notes). You receive scores against reference posteriors and can opt in to the public leaderboard.',
    },
  ] satisfies SubmitStep[],

  dataDownload: {
    title: 'Downloading the data',
    intro:
      'We expect to host datasets on Hugging Face. The on-disk layout is still being finalised; the intent is roughly as follows.',
    bullets: [
      'Strain as NumPy NPZ files in the frequency domain, together with the detector PSD and the frequency array.',
      'Metadata (event identifiers, splits, and related columns) as Parquet.',
    ],
    uploadReminder:
      'You will submit posterior samples in a prescribed layout, plus any small sidecar fields the release asks for. Exact schemas will ship with the first public package.',
  },

  benchmarkSectionIntro:
    'LVK Level 0 and Level 1 share the same BBH setting and on-disk data layout; only the parameter dimensionality differs. See the Benchmarks page for physics and priors. LISA and PTA are separate road-map tracks and are not on this submission path yet.',

  byBenchmark: [
    {
      slug: 'bbh-pe-l0',
      title: 'Level 0 — fixed extrinsic (bbh-pe-l0)',
      summary:
        'Five intrinsic parameters; extrinsic quantities fixed by the benchmark. Full column ordering, splits, and evaluation rules will be documented in the release.',
    },
    {
      slug: 'bbh-pe-l1',
      title: 'Level 1 — full parameter space (bbh-pe-l1)',
      summary:
        'Same data as Level 0; infer the full eleven-dimensional parameter vector. Task details will be spelled out alongside the Level 0 package.',
    },
  ] satisfies SubmitBenchmarkSection[],

  laterLevelsNote:
    'Higher benchmark levels may ask for more than posterior files alone — for example runnable simulator code, pinned dependencies, or Docker images so results can be reproduced under stricter pipeline rules. For Level 0 and Level 1 we intend to keep the barrier low: posteriors plus light metadata should be enough.',

  footerNote:
    'Questions while the pipeline is still moving: use the contact options on the About page.',
};
