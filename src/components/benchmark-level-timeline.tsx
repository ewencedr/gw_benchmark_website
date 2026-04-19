import React from 'react';
import type {
  BenchmarkLadderLevel,
  BenchmarkSpecRow,
} from '@/content/site-copy';

const dotBase =
  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold';

const accentDotActive: Record<string, string> = {
  orange: 'border-gw-orange bg-gw-orange/15 text-gw-orange',
  purple: 'border-gw-purple bg-gw-purple/15 text-gw-purple',
  cyan: 'border-cyan-400 bg-cyan-400/15 text-cyan-400',
};

const accentDotPlanned: Record<string, string> = {
  orange: 'border-gw-orange/35 bg-gw-orange/8 text-gw-orange/55',
  purple: 'border-gw-purple/35 bg-gw-purple/8 text-gw-purple/55',
  cyan: 'border-cyan-400/35 bg-cyan-400/8 text-cyan-400/55',
};

const accentSlugBorder: Record<string, string> = {
  orange: 'border-gw-orange/30 bg-gw-orange/10 text-gw-orange',
  purple: 'border-gw-purple/30 bg-gw-purple/10 text-gw-purple',
  cyan: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-400',
};

function SpecTable({
  title,
  rows,
}: {
  title: string;
  rows: BenchmarkSpecRow[];
}) {
  return (
    <div className="border-border/50 bg-card/40 overflow-hidden rounded-xl border">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="border-b border-white/10 bg-white/4 px-4 py-3 text-left text-xs font-semibold tracking-wide text-white/85">
          {title}
        </caption>
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            <th
              scope="col"
              className="w-[min(10rem,32%)] px-4 py-2 text-xs font-semibold tracking-wide text-white/50 uppercase"
            >
              Aspect
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-xs font-semibold tracking-wide text-white/50 uppercase"
            >
              Specification
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.aspect}
              className="border-b border-white/10 last:border-b-0"
            >
              <th
                scope="row"
                className="px-4 py-2.5 align-top font-medium text-white/85"
              >
                {row.aspect}
              </th>
              <td className="px-4 py-2.5 text-white/65">{row.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TrackStep({
  level,
  isLast,
}: {
  level: BenchmarkLadderLevel;
  isLast: boolean;
}) {
  const dotClass =
    level.status === 'active'
      ? (accentDotActive[level.accent] ?? accentDotActive.orange)
      : (accentDotPlanned[level.accent] ?? accentDotPlanned.orange);
  const slugClass = accentSlugBorder[level.accent] ?? accentSlugBorder.orange;

  const cardClass =
    level.status === 'planned'
      ? 'rounded-xl border border-dashed border-white/12 bg-white/3 p-5'
      : 'rounded-xl border border-white/10 bg-white/5 p-5';

  return (
    <div className="flex gap-5">
      <div className="flex shrink-0 flex-col items-center">
        <div className={`${dotBase} ${dotClass}`}>{level.step}</div>
        {!isLast && <div className="mt-2 w-px flex-1 bg-white/10" />}
      </div>
      <div className="min-w-0 flex-1 space-y-4 pb-2">
        <div className={cardClass}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p
              className={`text-lg font-semibold ${level.status === 'planned' ? 'text-white/70' : 'text-white'}`}
            >
              {level.heading}
            </p>
            {level.slug && (
              <code
                className={`rounded-md border px-2 py-0.5 font-mono text-xs ${slugClass}`}
              >
                {level.slug}
              </code>
            )}
          </div>
          <p
            className={`mt-2 text-sm font-medium ${level.status === 'planned' ? 'text-white/60' : 'text-white/85'}`}
          >
            {level.tagline}
          </p>
          {level.status === 'planned' && (
            <span className="mt-2 inline-block rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-white/40 uppercase">
              Scope under design
            </span>
          )}
          <div
            className={`mt-4 space-y-3 text-sm leading-relaxed ${level.status === 'planned' ? 'text-white/55' : 'text-white/72'}`}
          >
            {level.timelineNotes.map((note, i) => (
              <p key={i}>{note}</p>
            ))}
          </div>
        </div>
        {level.tableTitle && level.rows && level.rows.length > 0 && (
          <SpecTable title={level.tableTitle} rows={level.rows} />
        )}
      </div>
    </div>
  );
}

export function TrackTimeline({
  levels,
  futureText,
}: {
  levels: BenchmarkLadderLevel[];
  futureText?: string;
}) {
  return (
    <div className="relative py-2">
      <div className="relative space-y-10">
        {levels.map((level, i) => (
          <TrackStep
            key={level.slug}
            level={level}
            isLast={i === levels.length - 1 && !futureText}
          />
        ))}

        {futureText && (
          <div className="flex gap-5 opacity-80">
            <div className="flex w-10 shrink-0 justify-center pt-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-white/20 bg-white/5 text-xs text-white/40">
                …
              </div>
            </div>
            <div className="min-w-0 flex-1 rounded-xl border border-dashed border-white/12 bg-linear-to-b from-white/4 to-transparent p-5">
              <p className="font-semibold text-white/70">Coming next</p>
              <p className="mt-1 text-sm text-white/45">{futureText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
