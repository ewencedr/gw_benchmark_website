import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export type FeaturedMethod = {
  name: string;
  tagline: string;
  why: string;
  paperUrl: string;
  paperLabel: string;
  codeUrl: string;
  codeLabel: string;
  docsUrl?: string;
  docsLabel?: string;
};

export function FeaturedMethodCard({ method }: { method: FeaturedMethod }) {
  return (
    <div className="to-gw-orange/10 rounded-2xl border border-white/10 bg-linear-to-br from-white/10 via-transparent p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-gw-orange text-xs font-medium tracking-wider uppercase">
            Example method
          </p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">
            {method.name}
          </h3>
          <p className="mt-2 max-w-2xl text-base text-white/80">
            {method.tagline}
          </p>
          <p className="mt-3 text-sm text-white/70">{method.why}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col">
          {method.docsUrl && (
            <Link
              href={method.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              Docs
              <ExternalLink className="h-4 w-4 opacity-70" />
              <span className="sr-only">
                ({method.docsLabel ?? 'documentation'})
              </span>
            </Link>
          )}
          <Link
            href={method.paperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Paper
            <ExternalLink className="h-4 w-4 opacity-70" />
            <span className="sr-only">({method.paperLabel})</span>
          </Link>
          <Link
            href={method.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-gw-orange/30 bg-gw-orange/10 text-gw-orange hover:bg-gw-orange/20 inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition"
          >
            Code
            <ExternalLink className="h-4 w-4 opacity-70" />
            <span className="sr-only">({method.codeLabel})</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
