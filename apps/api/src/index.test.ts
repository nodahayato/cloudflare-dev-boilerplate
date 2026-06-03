import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Miniflare } from 'miniflare';
import { afterEach, describe, expect, it } from 'vitest';
import app from './index';

const miniflares: Miniflare[] = [];

async function createAuthTestEnv() {
  const mf = new Miniflare({
    modules: true,
    script: 'export default { async fetch() { return new Response("ok"); } }',
    d1Databases: ['AUTH_DB'],
  });
  miniflares.push(mf);

  const db = await mf.getD1Database('AUTH_DB');
  const sql = await readFile(resolve(process.cwd(), 'migrations/0001_better_auth.sql'), 'utf8');
  await db.exec(sql);

  return {
    AUTH_DB: db,
    BETTER_AUTH_SECRET: 'test-secret-test-secret-test-secret',
    BETTER_AUTH_URL: 'http://127.0.0.1:8787/api/auth',
  };
}

afterEach(async () => {
  while (miniflares.length > 0) {
    await miniflares.pop()?.dispose();
  }
});

describe('starter api', () => {
  it('returns health status', async () => {
    const response = await app.request('https://example.com/api/health');

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true, service: 'starter-api' });
  });

  it('validates shared example payloads', async () => {
    const response = await app.request('https://example.com/api/examples', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message: 'starter ready' }),
    });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ message: 'starter ready' });
  });

  it('creates a Better Auth user against D1', async () => {
    const env = await createAuthTestEnv();
    const response = await app.fetch(
      new Request('http://127.0.0.1:8787/api/auth/sign-up/email', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: 'hayato@example.com',
          password: 'correct horse battery staple',
          name: 'Hayato',
        }),
      }),
      env,
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      token: expect.any(String),
      user: expect.objectContaining({
        email: 'hayato@example.com',
        name: 'Hayato',
      }),
    });

    const storedUsers = await env.AUTH_DB.prepare('select email, name from user').all();
    expect(storedUsers.results).toEqual([{ email: 'hayato@example.com', name: 'Hayato' }]);
  });
});
