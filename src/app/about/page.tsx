import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  ExternalLink,
  Globe2,
  Mail,
  Mountain,
  Scale,
  Upload,
  UsersRound,
} from 'lucide-react';
import { InlineRichText } from '@/components/inline-rich-text';
import { SectionHero } from '@/components/section-hero';
import { aboutCopy, externalLinks } from '@/content/site-copy';

export const metadata: Metadata = {
  title: 'About',
  description: 'About the GW-SBI Benchmark project and team.',
};

const gwFreerideLinkClass =
  'text-gw-orange underline decoration-gw-orange/35 underline-offset-4 hover:text-gw-orange-light';

const contactAnchorClass =
  'font-medium text-gw-orange underline decoration-gw-orange/40 underline-offset-4 hover:text-gw-orange-light';

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalResourceCard({
  href,
  title,
  children,
  icon,
}: {
  href: string;
  title: string;
  children: ReactNode;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-card/50 hover:border-gw-orange/40 hover:bg-card/85 flex gap-4 rounded-2xl border border-white/10 p-5 transition"
    >
      <div className="group-hover:border-gw-orange/30 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/90">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-white">{title}</h3>
          <ExternalLink
            className="group-hover:text-gw-orange h-4 w-4 shrink-0 text-white/40 transition"
            aria-hidden
          />
        </div>
        <p className="mt-1 text-sm text-white/65">{children}</p>
      </div>
    </a>
  );
}

const internalLinkMeta: Record<
  string,
  {
    Icon: typeof BarChart3;
    cardClass: string;
    iconBoxClass: string;
  }
> = {
  '/benchmarks': {
    Icon: BarChart3,
    cardClass:
      'border-gw-orange/35 hover:border-gw-orange/55 hover:shadow-[0_0_24px_rgba(255,122,24,0.1)]',
    iconBoxClass: 'border-gw-orange/25 text-gw-orange bg-gw-orange/10',
  },
  '/evaluation': {
    Icon: Scale,
    cardClass:
      'border-gw-purple/35 hover:border-gw-purple/55 hover:shadow-[0_0_24px_rgba(168,85,247,0.1)]',
    iconBoxClass: 'border-gw-purple/25 text-gw-purple bg-gw-purple/10',
  },
  '/submit': {
    Icon: Upload,
    cardClass:
      'border-white/15 hover:border-gw-orange/45 hover:shadow-[0_0_20px_rgba(255,122,24,0.08)]',
    iconBoxClass: 'border-gw-orange/20 text-gw-orange bg-gw-orange/10',
  },
};

const jamesAlveyUrl = 'https://www.ast.cam.ac.uk/people/james.alvey';

export default function AboutPage() {
  const { narrative } = aboutCopy;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SectionHero
        title="About"
        subtitle={
          <InlineRichText
            segments={aboutCopy.heroSubtitle}
            externalLinkClassName={gwFreerideLinkClass}
          />
        }
        className="border-gw-orange/20 from-gw-orange/12 via-card/90 to-gw-purple/14 shadow-gw-purple/5 bg-linear-to-br shadow-lg"
      />

      <div className="mx-auto mt-10 max-w-3xl space-y-5 text-left text-base leading-relaxed text-white/75">
        <p>
          <InlineRichText
            segments={narrative.intro}
            externalLinkClassName={gwFreerideLinkClass}
          />
        </p>
        <p className="font-medium text-white">{narrative.challengesIntro}</p>
        <ul className="marker:text-gw-orange list-disc space-y-3 pl-6">
          {narrative.challenges.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <p className="mx-auto mt-10 max-w-3xl text-left text-base leading-relaxed text-white/75">
        {narrative.workshop}
      </p>

      <div className="border-gw-purple/25 from-gw-purple/15 via-card/95 to-gw-orange/10 relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border bg-linear-to-br p-6 md:p-8">
        <div className="pointer-events-none absolute -top-10 -right-10 opacity-[0.06]">
          <Globe2 className="text-gw-purple h-48 w-48" strokeWidth={0.75} />
        </div>
        <div className="relative grid items-center gap-6 md:grid-cols-[auto_1fr] md:gap-8 lg:gap-10">
          <div className="from-gw-purple/20 to-gw-orange/10 relative mx-auto flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-linear-to-br shadow-[0_0_32px_rgba(168,85,247,0.12)] md:mx-0 md:h-36 md:w-36">
            <Globe2
              className="text-gw-orange h-16 w-16 md:h-20 md:w-20"
              strokeWidth={1.25}
              aria-hidden
            />
            <div className="bg-card/90 text-gw-purple absolute -right-1.5 -bottom-1.5 flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 shadow-md">
              <UsersRound className="h-5 w-5" aria-hidden />
            </div>
          </div>
          <div className="text-left">
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              {narrative.teamCardTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              {narrative.teamCardBody}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-6 text-left">
        <p className="text-base leading-relaxed text-white/75">
          Benchmark definitions, evaluation metrics, and submission instructions
          are all on the pages linked below. For questions about the benchmark
          or interest in contributing, don&apos;t hesitate to{' '}
          <a href="#contact" className={contactAnchorClass}>
            get in touch
          </a>
          .
        </p>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-sm font-medium text-white/50">On this site</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aboutCopy.links.map((link) => {
            const meta = internalLinkMeta[link.href];
            const Icon = meta?.Icon ?? BarChart3;
            const cardClass = meta?.cardClass ?? 'border-white/10';
            const iconBoxClass =
              meta?.iconBoxClass ?? 'border-white/10 text-white bg-white/5';
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group bg-card/50 flex h-full flex-row gap-4 rounded-2xl border p-5 transition lg:p-6 ${cardClass}`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${iconBoxClass}`}
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <span className="group-hover:text-gw-orange text-lg font-semibold text-white">
                      {link.label}
                    </span>
                    <span
                      className="group-hover:text-gw-orange shrink-0 text-xl text-white/30 transition group-hover:translate-x-0.5"
                      aria-hidden
                    >
                      →
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {link.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-sm font-medium text-white/50">Elsewhere</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <ExternalResourceCard
            href={externalLinks.githubOrg}
            title="Code & organisation"
            icon={<GitHubIcon className="h-6 w-6" />}
          >
            Open-source repos and datasets under the gwbenchmark organisation.
          </ExternalResourceCard>
          <ExternalResourceCard
            href={externalLinks.gwFreerideWorkshop}
            title="GWFreeride workshop"
            icon={<Mountain className="h-6 w-6" aria-hidden />}
          >
            Conference site (Sexten, Italy — programme and context).
          </ExternalResourceCard>
        </div>
      </section>

      <div
        id="contact"
        className="border-gw-orange/30 from-gw-orange/15 via-card to-gw-purple/12 relative mx-auto mt-12 max-w-4xl scroll-mt-24 overflow-hidden rounded-3xl border bg-linear-to-br pt-12 shadow-lg shadow-black/20"
      >
        <svg
          className="text-gw-orange/25 absolute top-0 right-0 left-0 h-10 w-full"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0,24 C240,48 480,0 720,24 S1200,48 1440,16 L1440,0 L0,0 Z"
          />
        </svg>
        <div className="relative px-6 pt-4 pb-8 md:px-10 md:pb-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl text-left">
              <p className="flex items-center gap-2 text-sm font-medium text-white/55">
                <Mail className="text-gw-orange h-4 w-4 shrink-0" aria-hidden />
                Contact
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
                Get in touch
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/75">
                For questions about the benchmark, contributing, or joining a
                working group, please{' '}
                <a
                  href={jamesAlveyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactAnchorClass}
                >
                  drop James an email
                </a>
                .
              </p>
            </div>
            <a
              href={jamesAlveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-gw-orange/40 bg-gw-orange/15 text-gw-orange hover:bg-gw-orange/25 inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-xl border px-6 py-3 text-base font-semibold transition"
            >
              <ExternalLink className="h-5 w-5 shrink-0" aria-hidden />
              James Alvey
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
