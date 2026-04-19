<p align="center">
  <img src="public/gw_benchmark_logo.svg" width="80" height="80" alt="GW-SBI Benchmark logo" />
</p>

<h1 align="center">GW-SBI Benchmark</h1>

<p align="center">
  <strong>Simulation-Based Inference Benchmark for Gravitational Wave Astronomy</strong>
</p>

<p align="center">
  This repository is the <strong>official website</strong> for the community GW simulation-based inference (SBI) benchmark: it explains the effort, documents tasks and metrics, and surfaces live leaderboards backed by a database.
</p>

<p align="center">
  <a href="https://github.com/gwbenchmark">Organisation on GitHub</a>
</p>

---

## What you will find on the site

| Route           | Page                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| `/`             | **Home** — hero, goals, quick links, and a preview of leaderboard results.                                   |
| `/leaderboards` | **Leaderboards** — browse rankings and scores across benchmark tasks (ground-based and LISA-oriented picks). |
| `/benchmarks`   | **Benchmarks** — level ladder, tasks, and how the suite is structured.                                       |
| `/evaluation`   | **Evaluation** — metrics, calibration, and how methods are judged.                                           |
| `/submit`       | **Submit** — blind evaluation flow: what to upload and how results appear on leaderboards.                   |
| `/about`        | **About** — how the benchmark started (GWFreeride workshop), team context, and contact.                      |

Copy and navigation labels live in [`src/content/site-copy.ts`](src/content/site-copy.ts) so marketing text stays in one place.

## Why this implementation

- **Server-first data**: leaderboard and benchmark metadata are loaded with the App Router (React Server Components) via Supabase, so visitors get HTML with real numbers without a separate public API layer for read-only views.
- **Clear information architecture**: each major topic has its own page, mirroring how researchers look for “tasks”, “metrics”, or “how to submit”.
- **Polished UI**: responsive navigation, motion where it helps (e.g. hero), accessible components (Base UI–style primitives under `src/components/ui`), and a cohesive GW-themed palette (`gw-orange` / `gw-purple` in Tailwind).
- **Tables that scale**: leaderboards use TanStack Table for sorting and layout while staying aligned with the design system.
- **Math where needed**: KaTeX is available for notation on technical pages (e.g. evaluation).
- **Assets in sync**: `npm run icons:generate` (runs automatically before `next build` via `prebuild`) regenerates favicons and touch icons from the logo using small Node scripts.

## Stack and tooling

**Runtime / app**

- [Next.js](https://nextjs.org) 16 (App Router), React 19, TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4 with `@tailwindcss/typography`
- [Supabase](https://supabase.com) (`@supabase/supabase-js`, `@supabase/ssr`) for Postgres-backed benchmarks and leaderboard rows

**UI and content**

- [Base UI](https://base-ui.com/)–aligned primitives, [class-variance-authority](https://cva.style/), [Lucide](https://lucide.dev/) icons
- [Framer Motion](https://www.framer.com/motion/) for animation
- [KaTeX](https://katex.org/) / `react-katex` for LaTeX rendering
- [@tanstack/react-table](https://tanstack.com/table) for data tables

**Quality and repo hygiene**

- ESLint (`eslint-config-next`), Prettier (with Tailwind class sorting), TypeScript `strict` checks via `npm run typecheck`
- Husky + lint-staged for pre-commit formatting and lint on staged files
- `npm run check` runs format check, lint, typecheck, and production build

**Environment**

Leaderboards and home preview need a configured Supabase project. Set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the home page by modifying [`src/app/page.tsx`](src/app/page.tsx). The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to load **Inter** and **JetBrains Mono** as CSS variables in [`src/app/layout.tsx`](src/app/layout.tsx).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
