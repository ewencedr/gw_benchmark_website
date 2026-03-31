import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RippleDivider } from '@/components/ripple-divider';

export const metadata: Metadata = {
  title: 'About',
  description: 'About the GW-SBI Benchmark project and team.',
};

const teamMembers = [
  {
    name: 'Dr. Alice Researcher',
    role: 'Principal Investigator',
    affiliation: 'Max Planck Institute for Gravitational Physics',
  },
  {
    name: 'Dr. Bob Scientist',
    role: 'Co-PI, Benchmark Design',
    affiliation: 'LIGO Laboratory, Caltech',
  },
  {
    name: 'Carol Developer',
    role: 'Software & Infrastructure',
    affiliation: 'University of Glasgow',
  },
  {
    name: 'Dr. David Analyst',
    role: 'Evaluation & Metrics',
    affiliation: 'Nikhef, Amsterdam',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          About the Project
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          The GW-SBI Benchmark is a community-driven effort to standardise
          evaluation of simulation-based inference methods in gravitational wave
          astronomy.
        </p>
      </div>

      <section className="text-muted-foreground mb-12 space-y-4 text-sm">
        <p>
          Simulation-based inference (SBI) has emerged as a powerful approach
          for tackling intractable likelihood problems in gravitational wave
          data analysis. However, the field currently lacks a unified benchmark
          for comparing methods across tasks, making it difficult to assess
          progress and identify strengths and weaknesses of different
          approaches.
        </p>
        <p>
          This benchmark aims to provide a standardised evaluation framework
          with well-defined tasks, metrics, and reference posteriors. Our goal
          is to accelerate methodological development by enabling fair,
          reproducible comparisons between SBI methods applied to gravitational
          wave problems.
        </p>
        <p>
          The benchmark is designed to grow with the community. We welcome
          contributions of new tasks, metrics, and baseline methods.
        </p>
      </section>

      <RippleDivider />

      <section className="mt-8">
        <h2 className="mb-6 text-xl font-semibold">Team</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {teamMembers.map((member) => (
            <Card key={member.name} className="border-border/50 bg-card/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-xs">
                  {member.affiliation}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <RippleDivider />

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Citing the Benchmark</h2>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <pre className="bg-background/80 text-muted-foreground overflow-x-auto rounded-md p-4 font-mono text-xs">
              {`@article{gwsbi2026,
  title={GW-SBI: A Benchmark for Simulation-Based Inference
         in Gravitational Wave Astronomy},
  author={Researcher, A. and Scientist, B. and Developer, C.
          and Analyst, D.},
  journal={arXiv preprint arXiv:2026.XXXXX},
  year={2026}
}`}
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">Contact</h2>
        <p className="text-muted-foreground text-sm">
          For questions, issues, or contributions, please open an issue on our{' '}
          <a
            href="https://github.com"
            className="text-gw-orange hover:text-gw-orange-light underline underline-offset-4"
          >
            GitHub repository
          </a>{' '}
          or contact us at{' '}
          <span className="text-gw-orange font-mono">
            gw-sbi-benchmark@example.org
          </span>
          .
        </p>
      </section>
    </div>
  );
}
