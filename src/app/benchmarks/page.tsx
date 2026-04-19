import type { Metadata } from 'next';
import { TrackTimeline } from '@/components/benchmark-level-timeline';
import {
  GroundInterferometerIcon,
  PtaPulsarIcon,
  SpaceTriangleIcon,
} from '@/components/experiment-icons';
import { PhysicsPrimer } from '@/components/physics-primer';
import { RippleDivider } from '@/components/ripple-divider';
import { SectionHero } from '@/components/section-hero';
import {
  benchmarkLadderLevels,
  benchmarksCopy,
  benchmarksPageHeroSubtitle,
  benchmarksPageIntro,
  benchmarksRoadmapCards,
  benchmarksRoadmapIntro,
  lisaLevels,
  ptaCopy,
} from '@/content/site-copy';

export const metadata: Metadata = {
  title: 'Benchmarks',
  description: 'Benchmark tasks for gravitational wave SBI.',
};

const roadmapIcons = [
  GroundInterferometerIcon,
  SpaceTriangleIcon,
  PtaPulsarIcon,
] as const;

type Accent = 'orange' | 'purple' | 'emerald';

const statusColors: Record<string, string> = {
  Active: 'bg-gw-orange/15 text-gw-orange border-gw-orange/30',
  Planning: 'bg-gw-purple/15 text-gw-purple border-gw-purple/30',
  Outlook: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/25',
};

const cardAccent: Record<Accent, string> = {
  orange: 'border-gw-orange/20 hover:border-gw-orange/40 hover:bg-gw-orange/5',
  purple: 'border-gw-purple/20 hover:border-gw-purple/40 hover:bg-gw-purple/5',
  emerald:
    'border-emerald-400/15 hover:border-emerald-400/35 hover:bg-emerald-400/4',
};

const trackSectionAccent: Record<
  Accent,
  { border: string; badge: string; line: string }
> = {
  orange: {
    border: 'border-l-gw-orange/60',
    badge: 'border-gw-orange/30 bg-gw-orange/15 text-gw-orange',
    line: 'from-gw-orange/40 to-transparent',
  },
  purple: {
    border: 'border-l-gw-purple/60',
    badge: 'border-gw-purple/30 bg-gw-purple/15 text-gw-purple',
    line: 'from-gw-purple/40 to-transparent',
  },
  emerald: {
    border: 'border-l-emerald-400/50',
    badge: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-400',
    line: 'from-emerald-400/30 to-transparent',
  },
};

interface TrackSectionProps {
  id: string;
  title: string;
  statusLabel: string;
  accent: Accent;
  intro: string;
  children: React.ReactNode;
}

function TrackSection({
  id,
  title,
  statusLabel,
  accent,
  intro,
  children,
}: TrackSectionProps) {
  const a = trackSectionAccent[accent];
  return (
    <section id={id} className="scroll-mt-24">
      <div className={`mb-8 border-l-2 pl-5 ${a.border}`}>
        <div className="mb-2 flex items-center gap-3">
          <h2 className="text-xl font-semibold text-white md:text-2xl">
            {title}
          </h2>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${a.badge}`}
          >
            {statusLabel}
          </span>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-white/65 md:text-base">
          {intro}
        </p>
      </div>
      {children}
    </section>
  );
}

export default function BenchmarksPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4 py-16">
      {/* Hero */}
      <div className="space-y-4">
        <SectionHero
          title="Benchmark tasks"
          subtitle={benchmarksPageHeroSubtitle}
        />
        <p className="text-center text-sm text-white/38">
          {benchmarksCopy.workInProgress}
        </p>
      </div>

      {/* Three track cards — first visual element, clickable scroll anchors */}
      <section>
        <h2 className="text-lg font-semibold text-white md:text-xl">
          Three experimental tracks
        </h2>
        <p className="mt-1 mb-6 max-w-2xl text-sm text-white/60 md:text-base">
          {benchmarksRoadmapIntro}
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {benchmarksRoadmapCards.map((c, i) => {
            const Icon = roadmapIcons[i];
            const statusClass = statusColors[c.statusLabel] ?? '';
            const accentClass = cardAccent[c.accent as Accent] ?? '';
            return (
              <a
                key={c.key}
                href={`#${c.key}`}
                className={`bg-card/40 group flex cursor-pointer flex-col items-center rounded-2xl border p-5 text-center transition-all duration-200 ${accentClass}`}
              >
                <Icon className="h-16 w-16 transition-transform duration-200 group-hover:scale-105 md:h-20 md:w-20" />
                <div className="mt-3 flex flex-col items-center gap-1.5">
                  <p className="font-semibold text-white">{c.title}</p>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${statusClass}`}
                  >
                    {c.statusLabel}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-snug text-white/55">
                  {c.body}
                </p>
                <span className="mt-4 text-[10px] font-medium tracking-wider text-white/25 uppercase transition-colors group-hover:text-white/50">
                  View track ↓
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <RippleDivider />

      {/* Intro text — centered in wide container */}
      <section className="mx-auto max-w-3xl">
        <h2 className="text-lg font-semibold text-white md:text-xl">
          {benchmarksPageIntro.title}
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-white/70 md:text-base">
          {benchmarksPageIntro.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Physics primer — single accordion with card grid */}
      <div className="mx-auto max-w-5xl">
        <PhysicsPrimer />
      </div>

      <RippleDivider />

      {/* LVK track */}
      <TrackSection
        id="lvk"
        title="LVK — ground-based track"
        statusLabel="Active"
        accent="orange"
        intro="Each LVK observation is a short strain time series from three Earth-based interferometers (LIGO Hanford, LIGO Livingston, Virgo). The benchmark task: given that data, return samples from the posterior over the source parameters. We start here because the data format is well-understood, reference posteriors exist, and the inference problem has the right mix of difficulty for SBI methods."
      >
        <TrackTimeline
          levels={benchmarkLadderLevels}
          futureText={benchmarksCopy.lvkFuture}
        />
      </TrackSection>

      <RippleDivider />

      {/* LISA track */}
      <TrackSection
        id="lisa"
        title="LISA — space-based track"
        statusLabel="Planning"
        accent="purple"
        intro="LISA is a triangular constellation of spacecraft in heliocentric orbit, sensitive to gravitational waves at frequencies far below what ground-based detectors can reach. Its primary target is massive black-hole binary (MBHB) mergers — sources with millions to billions of solar masses. The detector response, signal duration (weeks to months), and sky-localisation degeneracies are all qualitatively different from the LVK case, making LISA a genuinely distinct inference problem."
      >
        <TrackTimeline
          levels={lisaLevels}
          futureText="Further LISA levels and additional source classes (e.g. galactic binaries) will follow once Level 0 scope is finalised and tooling is in place."
        />
      </TrackSection>

      <RippleDivider />

      {/* PTA */}
      <section id="pta" className="scroll-mt-24">
        <div className="mb-4 border-l-2 border-l-emerald-400/50 pl-5">
          <div className="mb-2 flex items-center gap-3">
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              PTA — pulsar timing
            </h2>
            <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-emerald-400 uppercase">
              Outlook
            </span>
          </div>
        </div>
        <div className="max-w-3xl space-y-3 rounded-2xl border border-white/8 bg-white/3 p-6 text-sm leading-relaxed text-white/60 md:text-base">
          <p>{ptaCopy.intro}</p>
          <p>{ptaCopy.tasks}</p>
        </div>
      </section>
    </div>
  );
}
