import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Latex, LatexBlock } from '@/components/latex';
import { RippleDivider } from '@/components/ripple-divider';
import { getAllMetrics } from '@/lib/supabase/queries';

export const metadata: Metadata = {
  title: 'Evaluation',
  description: 'Metrics and evaluation procedures for the GW-SBI benchmark.',
};

const metricFormulas: Record<string, string> = {
  c2st: '\\text{C2ST} = \\frac{1}{N}\\sum_{i=1}^{N} \\mathbb{1}[\\hat{y}_i = y_i]',
  'log-prob':
    '\\text{LogProb} = \\frac{1}{N}\\sum_{i=1}^{N} \\log q_\\phi(\\theta^*_i | x_i)',
  rmse: '\\text{RMSE} = \\sqrt{\\frac{1}{N}\\sum_{i=1}^{N} \\|\\hat{\\theta}_i - \\theta^*_i\\|^2}',
  coverage:
    '\\text{Coverage}(\\alpha) = \\frac{1}{N}\\sum_{i=1}^{N} \\mathbb{1}[\\theta^*_i \\in C_\\alpha(x_i)]',
  nlpd: '\\text{NLPD} = -\\frac{1}{N}\\sum_{i=1}^{N} \\log p(\\theta^*_i | x_i)',
};

export default async function EvaluationPage() {
  const metrics = await getAllMetrics();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Evaluation
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          All submissions are evaluated using a standardised set of metrics
          designed to assess posterior quality, calibration, and predictive
          performance.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Procedure</h2>
        <div className="text-muted-foreground space-y-3 text-sm">
          <p>
            Each submitted method receives a held-out test set of{' '}
            <Latex math="N = 1000" /> observations. For each observation{' '}
            <Latex math="x_i" />, the method must produce an approximate
            posterior <Latex math="q_\phi(\theta | x_i)" />. We then compare
            these approximate posteriors against reference posteriors obtained
            via MCMC sampling.
          </p>
          <p>
            Scores are computed per-observation and averaged. Methods are ranked
            per metric, and an aggregate ranking is computed using a normalised
            scoring scheme.
          </p>
        </div>
      </section>

      <RippleDivider />

      <section className="mt-8">
        <h2 className="mb-6 text-xl font-semibold">Metrics</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {metrics.map((metric) => {
            const formula = metricFormulas[metric.slug];

            return (
              <Card key={metric.id} className="border-border/50 bg-card/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{metric.name}</CardTitle>
                    <span className="text-muted-foreground text-xs">
                      {metric.higher_is_better
                        ? 'Higher is better'
                        : 'Lower is better'}
                    </span>
                  </div>
                  <CardDescription>{metric.description}</CardDescription>
                </CardHeader>
                {formula && (
                  <CardContent>
                    <LatexBlock math={formula} />
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </section>

      <RippleDivider />

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Reference Posteriors</h2>
        <p className="text-muted-foreground text-sm">
          Reference posteriors are obtained using the{' '}
          <span className="text-gw-orange font-mono">emcee</span> affine
          invariant ensemble sampler with <Latex math="10^6" /> samples per
          observation after a burn-in of <Latex math="5 \\times 10^4" /> steps.
          Convergence is verified using the Gelman-Rubin statistic{' '}
          <Latex math="\\hat{R} < 1.01" />.
        </p>
      </section>
    </div>
  );
}
