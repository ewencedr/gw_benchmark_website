import Image from 'next/image';

const regions = [
  { emoji: '🇪🇺', label: 'Europe' },
  { emoji: '🇬🇧', label: 'UK' },
  { emoji: '🇺🇸', label: 'North America' },
  { emoji: '🌏', label: 'Asia-Pacific' },
  { emoji: '🌍', label: '+ more' },
];

export function WorldCollabCard() {
  return (
    <div className="from-gw-purple/15 to-gw-orange/10 flex flex-col gap-6 overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br via-transparent p-6 md:flex-row md:items-center md:p-8">
      <div className="flex shrink-0 justify-center md:w-40">
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/15 bg-white/5 shadow-[0_0_60px_rgba(255,122,24,0.15)]">
          <Image
            src="/globe.svg"
            alt=""
            width={72}
            height={72}
            className="opacity-90"
          />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-gw-purple text-xs font-medium tracking-wider uppercase">
          International team
        </p>
        <h3 className="mt-1 text-xl font-semibold text-white md:text-2xl">
          People across time zones, one benchmark mindset
        </h3>
        <p className="mt-3 text-base text-white/75">
          We meet regularly in small working groups (data, metrics, submission
          tools) and stitch the pieces together — so the benchmark stays usable,
          not just ambitious.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {regions.map((r) => (
            <span
              key={r.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/85"
            >
              <span aria-hidden>{r.emoji}</span>
              {r.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
