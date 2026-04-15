import Link from 'next/link';
import {
  FlaskConical,
  Gauge,
  Globe2,
  Layers,
  Radar,
  Scale,
  ShieldCheck,
  UploadCloud,
} from 'lucide-react';
import { HeroVideo } from '@/components/hero-video';
import { LeaderboardTable } from '@/components/leaderboard-table';
import { RippleDivider } from '@/components/ripple-divider';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getLeaderboard, getBenchmarks } from '@/lib/supabase/queries';
import { homeCopy } from '@/content/site-copy';

const navCards = [
  {
    href: '/leaderboards',
    title: 'Leaderboards',
    description: 'Explore results across all benchmark tasks and metrics.',
  },
  {
    href: '/benchmarks',
    title: 'Benchmarks',
    description: 'Learn about the inference tasks and data generation.',
  },
  {
    href: '/evaluation',
    title: 'Evaluation',
    description: 'Metrics, scoring procedures, and calibration tests.',
  },
  {
    href: '/submit',
    title: 'Submit',
    description: 'Submit your method and join the benchmark.',
  },
];

export default async function HomePage() {
  const benchmarks = await getBenchmarks();
  const primaryBenchmark =
    benchmarks.find((b) => b.slug === 'bbh-pe-l0') ?? benchmarks[0];

  const { entries, metrics } = primaryBenchmark
    ? await getLeaderboard(primaryBenchmark.id)
    : { entries: [], metrics: [] };

  const topEntries = entries.slice(0, 5);

  return (
    <>
      <HeroVideo
        title={
          <>
            Gravitational Wave
            <br />
            <span className="from-gw-orange to-gw-purple bg-linear-to-r bg-clip-text text-transparent">
              SBI Benchmark
            </span>
          </>
        }
        subtitle={homeCopy.subtitle}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <Link href="/submit" className="w-full max-w-sm">
            <Button
              size="lg"
              className="from-gw-orange to-gw-purple w-full bg-linear-to-r px-10 py-7 text-lg font-semibold text-white hover:opacity-90"
            >
              Submit your method
            </Button>
          </Link>
          <Link href="/leaderboards">
            <Button size="lg" variant="ghost" className="font-medium">
              View leaderboard →
            </Button>
          </Link>
        </div>
      </HeroVideo>

      <RippleDivider />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Who is this benchmark for?
          </h2>
          <p className="mt-3 text-lg text-pretty text-white/80">
            Built for researchers who develop inference methods and researchers
            who use them in gravitational-wave science — with a clear ladder
            from easy to more production-like settings.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="border-border/50 bg-card/50 rounded-2xl border p-8">
            <div className="flex items-start gap-4">
              <div className="from-gw-orange/15 to-gw-purple/10 mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br">
                <FlaskConical className="h-5 w-5 text-white/90" aria-hidden />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold">
                  For ML & SBI researchers
                </h3>
                <p className="mt-1 text-sm text-white/70">
                  A standardised suite with multiple levels — so methods are
                  comparable, and progress is measurable.
                </p>
              </div>
            </div>
            <ul className="mt-5 space-y-3 text-base text-white/80">
              <li className="flex gap-2">
                <span className="text-gw-orange mt-0.5 shrink-0">•</span>
                {homeCopy.whoFor[0]}
              </li>
              <li className="flex gap-2">
                <span className="text-gw-orange mt-0.5 shrink-0">•</span>
                Evaluated with purpose-built, optimised metrics — accuracy,
                calibration, and robustness — against reference posteriors.
              </li>
              <li className="flex gap-2">
                <span className="text-gw-orange mt-0.5 shrink-0">•</span>
                GW inference is a rich SBI playground: degeneracies, multimodal
                structure, and realistic simulator constraints.
              </li>
            </ul>
          </div>
          <div className="border-border/50 bg-card/50 rounded-2xl border p-8">
            <div className="flex items-start gap-4">
              <div className="from-gw-purple/15 to-gw-orange/10 mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br">
                <Radar className="h-5 w-5 text-white/90" aria-hidden />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold">
                  For gravitational-wave scientists
                </h3>
                <p className="mt-1 text-sm text-white/70">
                  Benchmarks close to your research that ramp from “easy to run”
                  toward LVK/LISA-style parameter estimation.
                </p>
              </div>
            </div>
            <ul className="mt-5 space-y-3 text-base text-white/80">
              <li className="flex gap-2">
                <span className="text-gw-purple mt-0.5 shrink-0">•</span>
                {homeCopy.whoFor[1]}
              </li>
              <li className="flex gap-2">
                <span className="text-gw-purple mt-0.5 shrink-0">•</span>
                Higher levels aim to be close to production workflows, so you
                can stress-test implementations for production readiness.
              </li>
              <li className="flex gap-2">
                <span className="text-gw-purple mt-0.5 shrink-0">•</span>
                Transparent evaluation makes it easier to decide what to trust,
                and what needs work.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/submit" className="w-full max-w-md">
            <Button
              size="lg"
              className="from-gw-orange to-gw-purple w-full bg-linear-to-r px-12 py-7 text-lg font-semibold text-white hover:opacity-90"
            >
              Submit your method for blind evaluation →
            </Button>
          </Link>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
              What you get
            </h2>
            <p className="mt-3 text-base text-pretty text-white/75 md:text-lg">
              Everything you need to run, compare, and trust inference methods —
              on a problem that actually matters.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-border/50 bg-card/50 rounded-2xl border p-6">
              <div className="from-gw-orange/15 to-gw-purple/10 mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br">
                <UploadCloud className="h-5 w-5 text-white/90" aria-hidden />
              </div>
              <p className="text-base font-semibold text-white">
                Automated blind evaluation
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/70">
                Submit posterior samples and receive scores automatically —
                blind, reproducible, and immediately comparable to every other
                submission.
              </p>
            </div>

            <div className="border-border/50 bg-card/50 rounded-2xl border p-6">
              <div className="from-gw-purple/15 to-gw-orange/10 mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br">
                <Scale className="h-5 w-5 text-white/90" aria-hidden />
              </div>
              <p className="text-base font-semibold text-white">
                A suite of optimised metrics
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/70">
                Accuracy, calibration, and robustness — a carefully chosen set
                that captures what actually matters, not just a single score.
              </p>
            </div>

            <div className="border-border/50 bg-card/50 rounded-2xl border p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Gauge className="h-5 w-5 text-white/90" aria-hidden />
              </div>
              <p className="text-base font-semibold text-white">
                A clear level ladder
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/70">
                Start simple for quick iteration and debugging; climb toward
                harder, production-style PE tasks as your method matures.
              </p>
            </div>

            <div className="border-border/50 bg-card/50 rounded-2xl border p-6">
              <div className="from-gw-orange/10 to-gw-purple/15 mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br">
                <Globe2 className="h-5 w-5 text-white/90" aria-hidden />
              </div>
              <p className="text-base font-semibold text-white">
                Real-world science
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/70">
                Gravitational-wave parameter estimation is a genuine, hard
                inverse problem — not a synthetic toy, but a benchmark that
                means something in practice.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Badge
              variant="outline"
              className="border-gw-orange/30 bg-gw-orange/10 h-7 px-3 text-sm text-white/90"
            >
              <Layers className="h-3.5 w-3.5" aria-hidden />
              Comparable
            </Badge>
            <Badge
              variant="outline"
              className="border-gw-purple/30 bg-gw-purple/10 h-7 px-3 text-sm text-white/90"
            >
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              Calibrated
            </Badge>
            <Badge
              variant="outline"
              className="h-7 border-white/15 bg-white/5 px-3 text-sm text-white/85"
            >
              <Gauge className="h-3.5 w-3.5" aria-hidden />
              Levelled
            </Badge>
            <Badge
              variant="outline"
              className="h-7 border-white/15 bg-white/5 px-3 text-sm text-white/85"
            >
              <Globe2 className="h-3.5 w-3.5" aria-hidden />
              Real-world
            </Badge>
          </div>
        </div>
      </section>

      <RippleDivider />

      {primaryBenchmark && topEntries.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Leading Results
              </h2>
              <p className="text-muted-foreground mt-1">
                Top submissions on{' '}
                <span className="text-gw-orange">{primaryBenchmark.name}</span>
              </p>
            </div>
            <Link href="/leaderboards">
              <Button variant="ghost" size="sm">
                View all &rarr;
              </Button>
            </Link>
          </div>

          <LeaderboardTable
            entries={topEntries}
            metrics={metrics}
            compact={true}
          />
        </section>
      )}

      <RippleDivider />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">
          Explore the Benchmark
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {navCards.map((card) => (
            <Link key={card.href} href={card.href} className="group">
              <Card className="border-border/50 bg-card/50 group-hover:border-gw-orange/40 group-hover:bg-card/80 h-full transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
