# Cloudflare App Starter

Minimal reusable starter for personal products built around:

- React + Vite + Tailwind CSS
- Hono on Cloudflare Workers
- Zod validation
- Drizzle ORM with D1-friendly SQLite workflows
- Better Auth proof of compatibility on Workers + D1
- Shared TypeScript packages for schemas and config

This repo is intended to be a **generic starter**, not a product-complete app. It gives you a verified baseline you can clone for future projects without baking in business logic, roles, or a full auth UI.

## Workspace layout

- `apps/web` — React frontend
- `apps/api` — Hono Worker API
- `packages/shared` — shared Zod schemas and helpers
- `packages/config` — env parsing helpers
- `packages/db` — Drizzle schema and migration generation

## What is already wired

- Monorepo with pnpm workspaces
- Root `pnpm check` for lint + typecheck + test + build
- Better Auth server wiring in `apps/api/src/auth.ts`
- Better Auth client stub in `apps/web/src/lib/auth-client.ts`
- D1-backed Better Auth integration test
- Example `wrangler.jsonc` with D1 plus commented R2 / Queue placeholders
- Example env files for both the web app and Worker

## Prerequisites

Verified on this server with:

- Node: `v22.22.1`
- pnpm: `11.5.0`
- git: `2.43.0`

If you use `nvm`:

```bash
nvm use
```

## Quick start

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.dev.vars.example apps/api/.dev.vars
pnpm check
```

Run the apps in separate terminals:

```bash
pnpm dev:web
pnpm dev:api
```

Default local URLs:

- Web: `http://127.0.0.1:5173`
- API / auth: `http://127.0.0.1:8787`
- Better Auth base: `http://127.0.0.1:8787/api/auth`

## Git setup

Initialize the starter as its own repository:

```bash
git init
git add .
git commit -m "chore: initialize cloudflare app starter"
```

## Environment files

### Web app

Template file:

- `apps/web/.env.example`

Typical local values:

```dotenv
VITE_APP_NAME=Cloudflare App Starter
VITE_API_BASE_URL=http://127.0.0.1:8787
VITE_AUTH_BASE_URL=http://127.0.0.1:8787/api/auth
```

### Worker local development

Template file:

- `apps/api/.dev.vars.example`

Typical local value:

```dotenv
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
```

For deployed environments, keep secrets out of git and use Wrangler:

```bash
wrangler secret put BETTER_AUTH_SECRET
```

## Cloudflare bindings template

`apps/api/wrangler.jsonc` currently includes:

- `AUTH_DB` D1 binding
- local-development vars for auth and origin handling
- commented placeholders for:
  - `r2_buckets`
  - `queues.producers`
  - `env.preview`
  - `env.production`

When creating a real app from this starter, rename bindings to suit the app and replace placeholder IDs / names.

## Authentication notes

This starter intentionally stops at a **Better Auth compatibility proof**:

- API route wiring exists
- D1 integration is tested
- migration generation is present
- frontend client wiring exists

It does **not** include a product-ready auth UX, roles, account settings, or email-verification flow by default.

## Database workflows

Generate Drizzle SQL from `packages/db/src/schema.ts`:

```bash
pnpm db:generate
```

Generate the Better Auth SQL migration used by the API test:

```bash
pnpm --filter @starter/api auth:generate
```

## Verification

The baseline verification command is:

```bash
pnpm check
```

This should validate:

- lint
- typecheck
- tests
- production build

## Suggested next step when cloning this starter

1. Rename app/workspace package names
2. Replace placeholder Cloudflare binding names and IDs
3. Add your product schema to `packages/db`
4. Decide whether the app needs R2, Queues, email, and full auth UX
5. Keep product-specific code out of the starter branch/template
