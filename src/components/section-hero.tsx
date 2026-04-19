import React from 'react';
import Image from 'next/image';

export function SectionHero({
  title,
  subtitle,
  iconSrc = '/globe.svg',
  iconAlt = '',
  eyebrow,
  showIcon = false,
  className,
  contentClassName,
}: {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  iconSrc?: string;
  iconAlt?: string;
  eyebrow?: React.ReactNode;
  /** Decorative icon on the right — off by default; use only when it adds meaning. */
  showIcon?: boolean;
  className?: string;
  /** Applied to the inner title/subtitle wrapper (e.g. `mx-auto text-center`). */
  contentClassName?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-white/5 p-8 md:p-10 ${className ?? ''}`}
    >
      {/* Top accent line — fades in from the left, peaks in the centre, fades out */}
      <div className="via-gw-orange/60 absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-linear-to-r from-transparent to-transparent" />

      <div className="pointer-events-none absolute inset-0 mask-[radial-gradient(60%_50%_at_50%_20%,black,transparent)] opacity-60">
        <div className="from-gw-orange/25 via-gw-purple/20 to-gw-orange/10 absolute -top-24 left-1/2 h-72 w-160 -translate-x-1/2 rounded-full bg-linear-to-r blur-3xl" />
      </div>

      <div
        className={`relative flex flex-col gap-6 ${showIcon ? 'md:flex-row md:items-center md:justify-between' : ''}`}
      >
        <div className={`max-w-3xl ${contentClassName ?? ''}`}>
          <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-base text-pretty text-white/75 md:text-lg">
            {subtitle}
          </p>
        </div>

        {showIcon && (
          <div className="shrink-0 self-start md:self-auto">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <Image src={iconSrc} alt={iconAlt} width={28} height={28} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
