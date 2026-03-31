import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-border/50 mt-auto border-t">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Separator className="mb-6 opacity-30" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-muted-foreground text-sm">
            GW-SBI Benchmark &mdash; Simulation-Based Inference for
            Gravitational Wave Astronomy
          </p>
          <p className="text-muted-foreground/60 text-xs">
            Video credit: NASA Goddard Space Flight Center
          </p>
        </div>
      </div>
    </footer>
  );
}
