import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Latex, LatexBlock } from '@/components/latex';
import {
  PPCurveMini,
  PPPlotMini,
  TwoSampleMini,
} from '@/components/mini-plots';
import { RippleDivider } from '@/components/ripple-divider';
import { SectionHero } from '@/components/section-hero';

export const metadata: Metadata = {
  title: 'Evaluation',
  description: 'Metrics and evaluation procedures for the GW-SBI benchmark.',
};

const taxonomyCategories = [
  {
    icon: '✅',
    title: 'Accuracy',
    description:
      'Does the method get roughly the right answer? Measures whether approximate posterior samples are statistically indistinguishable from a reference.',
    metrics: ['C2ST'],
    pillClass: 'bg-purple-500/10 text-purple-300 border border-purple-500/25',
  },
  {
    icon: '📐',
    title: 'Robustness / Calibration',
    description:
      'Is the posterior well-calibrated — neither overconfident nor underconfident? Credible intervals should contain the truth at the right frequency.',
    metrics: ['Expected coverage', 'P–P plots'],
    pillClass: 'bg-orange-500/10 text-orange-300 border border-orange-500/25',
  },
  {
    icon: '🎯',
    title: 'Precision',
    description:
      'How close is the approximate posterior to the true one? Distributional distances give a finer-grained comparison beyond pass/fail accuracy.',
    metrics: ['KL divergence', 'JSD', 'IS-ESS'],
    pillClass: 'bg-green-500/10 text-green-300 border border-green-500/25',
  },
];

/** Shared min-height for badge+title+description — keeps plots aligned within each row. */
const hdrCls = 'min-h-[4rem]';
/** Card is a flex column so CardContent can grow and pin the reference to the bottom. */
const cardCls = 'border-border/50 bg-card/50 overflow-hidden flex flex-col';
/** CardContent fills remaining height; reference link uses mt-auto to stick to bottom. */
const contentCls = 'flex flex-col flex-1 gap-3';
const refCls =
  'mt-auto pt-1 text-gw-orange hover:text-gw-orange-light inline-block text-xs underline underline-offset-4';

export default function EvaluationPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SectionHero
        title="Evaluation"
        subtitle={
          <>
            We use a small suite of metrics to check <strong>accuracy</strong>,{' '}
            <strong>calibration</strong>, and <strong>precision</strong> of
            approximate posteriors — across SBI and classical samplers.
          </>
        }
      />

      <section className="mx-auto mt-10 mb-12 max-w-3xl text-left">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          How evaluation works
        </h2>
        <div className="space-y-3 text-base text-white/75">
          <p>
            Submissions are evaluated against reference posteriors computed by
            the benchmark maintainers. In general, this means you provide
            posterior samples for each test observation, and we compare them to
            the reference using the metrics below.
          </p>
          <p>
            The evaluation is designed to be method-agnostic: it should work for
            amortised SBI, hybrid SBI + MCMC, and traditional samplers alike.
          </p>
          <p>
            If you want the submission workflow details, see{' '}
            <Link
              href="/submit"
              className="text-gw-orange hover:text-gw-orange-light underline underline-offset-4"
            >
              Submit
            </Link>
            .
          </p>
        </div>
      </section>

      <RippleDivider />

      {/* ── Metrics ─────────────────────────────────────────────── */}
      <section className="mt-10">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight">Metrics</h2>

        <p className="mb-8 max-w-3xl text-base text-white/75">
          No single number can certify a posterior. Different failure modes
          require different lenses: a method can produce samples that{' '}
          <em>look</em> like the reference on average while being systematically
          overconfident, or it can be calibrated but diffuse. We therefore
          organise evaluation around three complementary questions, each
          targeting a distinct failure mode.
        </p>

        {/* Taxonomy overview */}
        <div className="mb-12 grid gap-4 lg:grid-cols-3">
          {taxonomyCategories.map((cat) => (
            <div
              key={cat.title}
              className="border-border/40 bg-card/30 rounded-xl border p-5"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xl">{cat.icon}</span>
                <span className="text-base font-semibold">{cat.title}</span>
              </div>
              <p className="mb-4 text-sm text-white/65">{cat.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {cat.metrics.map((m) => (
                  <span
                    key={m}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${cat.pillClass}`}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Accuracy ──────────────────────────────────────────── */}
        <div className="mb-3 flex items-center gap-3">
          <span className="text-lg">✅</span>
          <h3 className="text-xl font-semibold tracking-tight">Accuracy</h3>
          <span className="text-white/30">—</span>
          <span className="text-sm text-white/50">classifier-based tests</span>
        </div>
        <div className="mb-10 grid gap-4 lg:grid-cols-2">
          <Card className={cardCls}>
            <CardHeader>
              <div className={hdrCls}>
                <div className="mb-1">
                  <span className="rounded-full border border-purple-500/25 bg-purple-500/10 px-2.5 py-0.5 text-xs font-medium text-purple-300">
                    Accuracy
                  </span>
                </div>
                <CardTitle className="text-lg">
                  C2ST — Classifier Two-Sample Test
                </CardTitle>
                <CardDescription className="text-sm">
                  Can a classifier tell your samples from the reference?
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className={contentCls}>
              <TwoSampleMini className="h-36 w-full rounded-xl border border-white/10 bg-white/5" />
              <p className="text-sm text-white/70">
                Train a binary classifier to separate approximate samples{' '}
                <Latex math="\hat{q}" /> from the reference <Latex math="p" />.
                If the two distributions match, the classifier can do no better
                than random guessing — its accuracy converges to 0.5.
              </p>
              <a
                href="https://arxiv.org/abs/1610.06545"
                target="_blank"
                rel="noopener noreferrer"
                className={refCls}
              >
                Lopez-Paz &amp; Oquab (2017)
              </a>
            </CardContent>
          </Card>
        </div>

        {/* ── Robustness / Calibration ──────────────────────────── */}
        <div className="mb-3 flex items-center gap-3">
          <span className="text-lg">📐</span>
          <h3 className="text-xl font-semibold tracking-tight">
            Robustness / Calibration
          </h3>
          <span className="text-white/30">—</span>
          <span className="text-sm text-white/50">coverage checks</span>
        </div>
        <div className="mb-10 grid gap-4 lg:grid-cols-2">
          {/* Expected Coverage */}
          <Card className={cardCls}>
            <CardHeader>
              <div className={hdrCls}>
                <div className="mb-1">
                  <span className="rounded-full border border-orange-500/25 bg-orange-500/10 px-2.5 py-0.5 text-xs font-medium text-orange-300">
                    Calibration
                  </span>
                </div>
                <CardTitle className="text-lg">Expected Coverage</CardTitle>
                <CardDescription className="text-sm">
                  Do credible intervals contain the truth at the right rate?
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className={contentCls}>
              <PPPlotMini
                accent="#ff7a18"
                className="h-36 w-full rounded-xl border border-white/10 bg-white/5"
              />
              <p className="text-sm text-white/70">
                At nominal level <Latex math="\alpha" />, the fraction of test
                events where the true parameter falls inside the credible region
                should equal <Latex math="\alpha" />. A well-calibrated
                posterior traces the diagonal; the shaded gap reveals systematic
                over- or under-confidence.
              </p>
              <LatexBlock
                math={
                  '\\mathrm{Coverage}(\\alpha)=\\frac{1}{N}\\sum_{i}\\mathbb{1}[\\theta_i^*\\in C_\\alpha(x_i)]'
                }
              />
              <a
                href="https://arxiv.org/abs/2302.03026"
                target="_blank"
                rel="noopener noreferrer"
                className={refCls}
              >
                Lemos et al. (2023) — TARP
              </a>
            </CardContent>
          </Card>

          {/* P–P Plot */}
          <Card className={cardCls}>
            <CardHeader>
              <div className={hdrCls}>
                <div className="mb-1">
                  <span className="rounded-full border border-orange-500/25 bg-orange-500/10 px-2.5 py-0.5 text-xs font-medium text-orange-300">
                    Calibration
                  </span>
                </div>
                <CardTitle className="text-lg">P–P Plots</CardTitle>
                <CardDescription className="text-sm">
                  Are posterior rank statistics uniformly distributed?
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className={contentCls}>
              <PPCurveMini className="h-36 w-full rounded-xl border border-white/10 bg-white/5" />
              <p className="text-sm text-white/70">
                For each parameter, rank the true value among posterior samples.
                Under a calibrated posterior these ranks follow a uniform
                distribution — their empirical CDF (solid) should trace the
                diagonal. Deviations reveal per-parameter miscalibration.
              </p>
              <a
                href="https://arxiv.org/abs/1804.06788"
                target="_blank"
                rel="noopener noreferrer"
                className={refCls}
              >
                Talts et al. (2018) — Simulation-Based Calibration
              </a>
            </CardContent>
          </Card>
        </div>

        {/* ── Precision ─────────────────────────────────────────── */}
        <div className="mb-3 flex items-center gap-3">
          <span className="text-lg">🎯</span>
          <h3 className="text-xl font-semibold tracking-tight">Precision</h3>
          <span className="text-white/30">—</span>
          <span className="text-sm text-white/50">
            distributional distances
          </span>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {/* KL Divergence */}
          <Card className={cardCls}>
            <CardHeader>
              <div className={hdrCls}>
                <div className="mb-1">
                  <span className="rounded-full border border-green-500/25 bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-300">
                    Precision
                  </span>
                </div>
                <CardTitle className="text-lg">KL Divergence</CardTitle>
                <CardDescription className="text-sm">
                  Asymmetric information cost of using the approximation.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className={contentCls}>
              <p className="text-sm text-white/70">
                Measures the average extra bits needed to encode samples from{' '}
                <Latex math="p" /> when using <Latex math="\hat{q}" /> instead.
                Asymmetric —{' '}
                <Latex math="\mathrm{KL}(p\|\hat{q})\neq\mathrm{KL}(\hat{q}\|p)" />{' '}
                — and unbounded when <Latex math="\hat{q}" /> assigns zero mass
                to regions where <Latex math="p>0" />.
              </p>
              <LatexBlock
                math={
                  '\\mathrm{KL}(p\\|\\hat{q})=\\mathbb{E}_{p}\\!\\left[\\log\\frac{p(\\theta)}{\\hat{q}(\\theta)}\\right]'
                }
              />
              <a
                href="https://doi.org/10.1214/aoms/1177729694"
                target="_blank"
                rel="noopener noreferrer"
                className={refCls}
              >
                Kullback &amp; Leibler (1951)
              </a>
            </CardContent>
          </Card>

          {/* JSD */}
          <Card className={cardCls}>
            <CardHeader>
              <div className={hdrCls}>
                <div className="mb-1">
                  <span className="rounded-full border border-green-500/25 bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-300">
                    Precision
                  </span>
                </div>
                <CardTitle className="text-lg">JSD — Jensen–Shannon</CardTitle>
                <CardDescription className="text-sm">
                  Symmetric, bounded divergence via a mixture midpoint.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className={contentCls}>
              <p className="text-sm text-white/70">
                The Jensen–Shannon divergence symmetrises KL by averaging the
                two directed divergences through the mixture{' '}
                <Latex math="M=(p+\hat{q})/2" />. Unlike KL it is bounded in{' '}
                <Latex math="[0,\log 2]" />, making it easier to compare across
                different benchmarks and parameter spaces.
              </p>
              <LatexBlock
                math={String.raw`\begin{aligned}
\mathrm{JSD}(p\|\hat{q}) &= \tfrac{1}{2}\mathrm{KL}(p\|M)+\tfrac{1}{2}\mathrm{KL}(\hat{q}\|M)\\[3pt]
M &= \tfrac{p+\hat{q}}{2}
\end{aligned}`}
              />
              <a
                href="https://doi.org/10.1109/18.61115"
                target="_blank"
                rel="noopener noreferrer"
                className={refCls}
              >
                Lin (1991)
              </a>
            </CardContent>
          </Card>

          {/* IS-ESS */}
          <Card className={cardCls}>
            <CardHeader>
              <div className={hdrCls}>
                <div className="mb-1">
                  <span className="rounded-full border border-green-500/25 bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-300">
                    Precision
                  </span>
                </div>
                <CardTitle className="text-lg">IS-ESS</CardTitle>
                <CardDescription className="text-sm">
                  Effective sample size under importance reweighting.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className={contentCls}>
              <p className="text-sm text-white/70">
                Reweight samples by{' '}
                <Latex math="w_i\propto p(\theta_i)/\hat{q}(\theta_i)" />. When{' '}
                <Latex math="\hat{q}\approx p" />, all weights are roughly equal
                and ESS&nbsp;≈&nbsp;
                <Latex math="N" />. Degenerate weights indicate poor overlap and
                distributional mismatch.
              </p>
              <LatexBlock
                math={
                  '\\mathrm{ESS}=\\frac{(\\sum_i w_i)^2}{\\sum_i w_i^2}\\in[1,N]'
                }
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
