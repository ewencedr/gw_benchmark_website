import Link from 'next/link';
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
import { getLeaderboard, getBenchmarks } from '@/lib/supabase/queries';

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
  const primaryBenchmark = benchmarks[0];

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
            <span className="from-gw-orange to-gw-purple bg-gradient-to-r bg-clip-text text-transparent">
              SBI Benchmark
            </span>
          </>
        }
        subtitle="A standardised benchmark for Simulation-Based Inference methods applied to gravitational wave data analysis."
      >
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/leaderboards">
            <Button size="lg" className="font-medium">
              View Leaderboard
            </Button>
          </Link>
          <Link href="/submit">
            <Button variant="outline" size="lg" className="font-medium">
              Submit Your Method
            </Button>
          </Link>
        </div>
      </HeroVideo>

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
