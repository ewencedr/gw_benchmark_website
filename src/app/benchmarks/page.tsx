import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Latex, LatexBlock } from '@/components/latex';
import { RippleDivider } from '@/components/ripple-divider';
import { getBenchmarks } from '@/lib/supabase/queries';

export const metadata: Metadata = {
  title: 'Benchmarks',
  description: 'Benchmark tasks for gravitational wave SBI.',
};

const benchmarkDetails: Record<
  string,
  { latex: string; details: string[]; blockLatex?: string }
> = {
  'bbh-pe': {
    latex: 'p(\\theta | d)',
    details: [
      'Simulated strain data from the LIGO/Virgo detector network',
      '15-dimensional parameter space including masses, spins, sky location, and distance',
      'Gaussian noise coloured with the Advanced LIGO design sensitivity PSD',
      'Signal-to-noise ratios between 8 and 30',
    ],
    blockLatex:
      'd(t) = h(t; \\theta) + n(t), \\quad n \\sim \\mathcal{N}(0, S_n(f))',
  },
  'bns-detection': {
    latex: 'p(\\mathcal{H}_1 | d)',
    details: [
      'Binary neutron star signals in realistic non-Gaussian noise',
      'Mixed dataset: 50% signal + noise, 50% noise-only segments',
      'Tidal deformability parameters included in the waveform model',
      'Evaluation on sensitivity at fixed false alarm rate thresholds',
    ],
    blockLatex:
      '\\mathrm{SNR} = \\sqrt{4 \\int_0^\\infty \\frac{|\\tilde{h}(f)|^2}{S_n(f)} df}',
  },
  'gw-waveform': {
    latex: 'p(h(t) | d)',
    details: [
      'Model-agnostic waveform recovery from noisy data',
      'Evaluation against injected waveforms from numerical relativity',
      'Time and frequency domain reconstruction quality',
      'Applicable to unmodelled searches for exotic GW sources',
    ],
    blockLatex:
      '\\mathcal{O}(h_{\\mathrm{rec}}, h_{\\mathrm{true}}) = \\frac{\\langle h_{\\mathrm{rec}} | h_{\\mathrm{true}} \\rangle}{\\sqrt{\\langle h_{\\mathrm{rec}} | h_{\\mathrm{rec}} \\rangle \\langle h_{\\mathrm{true}} | h_{\\mathrm{true}} \\rangle}}',
  },
};

export default async function BenchmarksPage() {
  const benchmarks = await getBenchmarks();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Benchmark Tasks
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Each task targets a distinct challenge in gravitational wave data
          analysis using simulation-based inference.
        </p>
      </div>

      <div className="space-y-6">
        {benchmarks.map((benchmark) => {
          const detail = benchmarkDetails[benchmark.slug];

          return (
            <Card key={benchmark.id} className="border-border/50 bg-card/50">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">{benchmark.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {benchmark.description}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-gw-purple/40 text-gw-purple shrink-0"
                  >
                    {benchmark.level}
                  </Badge>
                </div>
              </CardHeader>
              {detail && (
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      Target posterior: <Latex math={detail.latex} />
                    </p>

                    {detail.blockLatex && (
                      <LatexBlock math={detail.blockLatex} />
                    )}

                    <ul className="text-muted-foreground space-y-1.5 text-sm">
                      {detail.details.map((d, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="bg-gw-orange/60 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <RippleDivider />

      <div className="border-border/50 bg-card/30 mt-8 rounded-lg border p-6">
        <h2 className="mb-3 text-lg font-semibold">Future Levels</h2>
        <p className="text-muted-foreground text-sm">
          Additional benchmark levels with increasing complexity are planned.
          Level 2 will introduce multi-detector data with realistic glitches,
          and Level 3 will feature full Bayesian model comparison tasks.
        </p>
      </div>
    </div>
  );
}
