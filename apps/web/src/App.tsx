import { parseExampleMessage } from '@starter/shared';
import { authClient } from './lib/auth-client';

const sharedExample = parseExampleMessage({ message: 'welcome to the starter' });
const authEndpoints = Object.keys(authClient).filter((key) => key !== '$fetch').slice(0, 6);

export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-50">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">
            Cloudflare Pages + Workers
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Cloudflare multi-product starter with Better Auth PoC
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Shared foundation for personal products built with React, Hono, Zod, Drizzle,
            and a first-pass Better Auth flow on Workers + D1.
          </p>
        </div>

        <section className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20">
          <h2 className="text-xl font-semibold">Shared schema example</h2>
          <p className="text-slate-300">{sharedExample.message}</p>
          <ul className="grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
            <li>• apps/web for the frontend</li>
            <li>• apps/api for the Worker API</li>
            <li>• packages/shared for schemas</li>
            <li>• packages/db for Drizzle schema and migrations</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-emerald-900/50 bg-emerald-950/20 p-6">
          <h2 className="text-xl font-semibold">Better Auth client stub</h2>
          <p className="mt-2 text-sm text-slate-300">
            The frontend is already wired with <code>better-auth/react</code> and points to
            <code> VITE_AUTH_BASE_URL</code>.
          </p>
          <p className="mt-4 text-sm text-emerald-300">Detected client helpers:</p>
          <code className="mt-2 block rounded-xl bg-slate-950 p-4 text-sm text-emerald-200">
            {authEndpoints.join(', ')}
          </code>
        </section>
      </div>
    </main>
  );
}
