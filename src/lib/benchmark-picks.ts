import type { Benchmark } from '@/types/database';

function isLisaBenchmark(b: Benchmark): boolean {
  return /lisa/i.test(b.slug) || /lisa/i.test(b.level);
}

function isGroundLevel0Benchmark(b: Benchmark): boolean {
  if (isLisaBenchmark(b)) return false;
  if (
    /level\s*1|level-1/i.test(b.level) &&
    !/level\s*0|level-0/i.test(b.level)
  ) {
    return false;
  }
  return (
    b.slug === 'bbh-pe-l0' ||
    b.slug === 'lvk-bbh-l0' ||
    b.slug === 'bbh-pe' ||
    /level\s*0|level-0|^l0$/i.test(b.level)
  );
}

/** Canonical Level 0 task for the home preview (prefer ladder slug `bbh-pe-l0`). */
export function pickPrimaryLevel0Benchmark(
  benchmarks: Benchmark[]
): Benchmark | undefined {
  return (
    benchmarks.find((b) => b.slug === 'bbh-pe-l0') ??
    benchmarks.find((b) => b.slug === 'bbh-pe') ??
    benchmarks.find(isGroundLevel0Benchmark)
  );
}

export function pickLisaLevel0Benchmark(
  benchmarks: Benchmark[]
): Benchmark | undefined {
  return (
    benchmarks.find((b) => b.slug === 'lisa-l0') ??
    benchmarks.find((b) => isLisaBenchmark(b) && /0|level/i.test(b.level))
  );
}

export function pickBbhLevel1Benchmark(
  benchmarks: Benchmark[]
): Benchmark | undefined {
  return benchmarks.find((b) => b.slug === 'bbh-pe-l1');
}
