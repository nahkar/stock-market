# Stock Market

Next.js App Router frontend for stock market dashboards (TradingView widgets, auth routes).

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended, e.g. 20.x)
- [pnpm](https://pnpm.io/) (lockfile uses `pnpm-lock.yaml`)

Other package managers work, but the instructions below assume pnpm.

## Setup

Clone the repo, install dependencies, and let Husky wire Git hooks (via the `prepare` script):

```bash
pnpm install
```

Then start the dev server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Description                            |
| ------------------- | -------------------------------------- |
| `pnpm dev`          | Dev server (`next dev`)                |
| `pnpm build`        | Production build (`next build`)        |
| `pnpm start`        | Serve production output (`next start`) |
| `pnpm lint`         | ESLint (includes Prettier via ESLint)  |
| `pnpm lint:fix`     | ESLint with `--fix`                    |
| `pnpm format`       | Format with Prettier                   |
| `pnpm format:check` | Check formatting only                  |

## Git hooks (Husky)

On every commit, the **pre-commit** hook runs **`pnpm lint`** then **`pnpm build`**. Fix errors locally before committing, or temporarily skip with `--no-verify` (use sparingly).

## Tech stack

- **Next.js** 16 · **React** 19 · **TypeScript**
- **Tailwind CSS** 4
- **ESLint** (Next + TypeScript presets, Prettier integrated)
- **Prettier**

## Recommended editor setup

Workspace settings recommend the ESLint and Prettier extensions ([`.vscode/extensions.json`](./.vscode/extensions.json)).

## Deploy

Build with `pnpm build` and deploy the output like any Next.js app (see [Deploying Next.js](https://nextjs.org/docs/app/building-your-application/deploying)).
