import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RippleDivider } from '@/components/ripple-divider';
import { SectionHero } from '@/components/section-hero';
import { submitCopy } from '@/content/site-copy';

export const metadata: Metadata = {
  title: 'Submit',
  description:
    'How to submit posterior samples to the GW-SBI benchmark — task packages, packaging, and upload.',
};

const linkClass =
  'text-gw-orange hover:text-gw-orange-light underline underline-offset-4';

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-16">
      <section className="space-y-6">
        <SectionHero
          title="Submit your method"
          subtitle={submitCopy.heroSubtitle}
        />

        <div
          role="status"
          className="flex flex-col gap-3 rounded-xl border border-amber-500/35 bg-amber-500/8 px-4 py-4 sm:flex-row sm:items-start sm:gap-4"
        >
          <span className="shrink-0 self-start rounded-md border border-amber-500/40 bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-amber-200/95 uppercase">
            {submitCopy.wipBanner.label}
          </span>
          <div className="min-w-0 space-y-2 text-sm leading-relaxed text-white/80">
            <p className="font-medium text-white">
              {submitCopy.wipBanner.title}
            </p>
            <p className="text-white/70">{submitCopy.wipBanner.body}</p>
          </div>
        </div>

        <p className="text-center text-sm text-white/55">
          <Link href="/evaluation" className={linkClass}>
            Evaluation metrics
          </Link>
          <span className="text-white/25"> · </span>
          <Link href="/benchmarks" className={linkClass}>
            Benchmark definitions
          </Link>
        </p>
      </section>

      <div className="flex justify-center">
        <Button
          size="lg"
          className="from-gw-orange to-gw-purple bg-linear-to-r px-10 py-6 text-base font-medium text-white hover:opacity-90"
        >
          Submit posterior samples (coming soon)
        </Button>
      </div>

      <section>
        <h2 className="mb-5 text-lg font-semibold text-white">How it works</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {submitCopy.steps.map((step, index) => (
            <Card key={step.number} className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-baseline gap-3 text-base">
                  <span className="text-gw-orange/50 font-mono text-sm">
                    {step.number}
                  </span>
                  <span>{step.title}</span>
                </CardTitle>
                <CardDescription className="leading-relaxed text-pretty">
                  {index === 0 ? (
                    <>
                      On the{' '}
                      <Link href="/benchmarks" className={linkClass}>
                        Benchmarks
                      </Link>{' '}
                      page. {step.description}
                    </>
                  ) : (
                    step.description
                  )}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <RippleDivider />

      <section className="space-y-6">
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">
              {submitCopy.dataDownload.title}
            </CardTitle>
            <CardDescription className="leading-relaxed text-pretty">
              {submitCopy.dataDownload.intro}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <ul className="text-muted-foreground space-y-2 text-sm leading-relaxed">
              {submitCopy.dataDownload.bullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="bg-gw-orange/50 mt-2 h-1 w-1 shrink-0 rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed text-white/55">
              {submitCopy.dataDownload.uploadReminder}
            </p>
          </CardContent>
        </Card>

        <div className="max-w-3xl space-y-2">
          <h2 className="text-lg font-semibold text-white">LVK levels</h2>
          <p className="text-sm leading-relaxed text-white/65">
            {submitCopy.benchmarkSectionIntro}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {submitCopy.byBenchmark.map((b) => (
            <Card key={b.slug} className="border-border/50 bg-card/50">
              <CardHeader className="space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <CardTitle className="text-base">{b.title}</CardTitle>
                  <span className="text-gw-purple font-mono text-[11px]">
                    {b.slug}
                  </span>
                </div>
                <CardDescription className="text-sm leading-relaxed text-pretty">
                  {b.summary}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="border-border/50 bg-card/40">
          <CardContent className="pt-6 text-sm leading-relaxed text-white/65">
            {submitCopy.laterLevelsNote}
          </CardContent>
        </Card>
      </section>

      <div className="flex flex-col items-center gap-3">
        <Button
          size="lg"
          className="from-gw-orange to-gw-purple bg-linear-to-r px-10 py-6 text-base font-medium text-white hover:opacity-90"
        >
          Submit posterior samples (coming soon)
        </Button>
        <p className="text-center text-xs text-white/45">
          {submitCopy.footerNote}
        </p>
      </div>
    </div>
  );
}
