import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Latex } from '@/components/latex';
import { RippleDivider } from '@/components/ripple-divider';

export const metadata: Metadata = {
  title: 'Submit',
  description: 'Submit your SBI method to the GW-SBI benchmark.',
};

const steps = [
  {
    number: '01',
    title: 'Prepare Your Method',
    description:
      'Train your SBI method on the provided training data. Ensure your model can produce posterior samples or density evaluations for new observations.',
  },
  {
    number: '02',
    title: 'Generate Predictions',
    description:
      'Run inference on the test set and produce the required output format: posterior samples or log-density evaluations at specified parameter points.',
  },
  {
    number: '03',
    title: 'Package Submission',
    description:
      'Create an HDF5 file following the specification below. Include metadata such as team name, method name, and optional links to paper/code.',
  },
  {
    number: '04',
    title: 'Submit',
    description:
      'Upload your submission file. Results will be automatically evaluated and appear on the leaderboard within 24 hours.',
  },
];

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Submit Your Method
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Follow the steps below to submit your SBI method for evaluation on the
          gravitational wave benchmark.
        </p>
      </div>

      <section className="mb-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {steps.map((step) => (
            <Card key={step.number} className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-gw-orange/40 text-2xl font-bold">
                    {step.number}
                  </span>
                  {step.title}
                </CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <RippleDivider />

      <section className="mt-8 mb-12">
        <h2 className="mb-4 text-xl font-semibold">Submission Format</h2>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4 text-sm">
              Submissions must be in HDF5 format with the following structure.
              For each test observation <Latex math="x_i" />, provide{' '}
              <Latex math="N_s = 10{,}000" /> posterior samples.
            </p>
            <pre className="bg-background/80 text-muted-foreground overflow-x-auto rounded-md p-4 font-mono text-sm">
              {`submission.h5
├── metadata/
│   ├── team_name: str
│   ├── method_name: str
│   ├── description: str (optional)
│   ├── paper_url: str (optional)
│   └── code_url: str (optional)
└── posteriors/
    ├── observation_0: float64[N_s, D]
    ├── observation_1: float64[N_s, D]
    └── ...`}
            </pre>
            <p className="text-muted-foreground mt-4 text-xs">
              Where <Latex math="D" /> is the dimensionality of the parameter
              space for the chosen benchmark task.
            </p>
          </CardContent>
        </Card>
      </section>

      <div className="flex justify-center">
        <Button
          size="lg"
          className="from-gw-orange to-gw-purple bg-gradient-to-r px-10 font-medium text-white hover:opacity-90"
        >
          Submit Prediction File
        </Button>
      </div>

      <p className="text-muted-foreground mt-4 text-center text-xs">
        Submission evaluation is currently in preview. Contact the team for
        access.
      </p>
    </div>
  );
}
