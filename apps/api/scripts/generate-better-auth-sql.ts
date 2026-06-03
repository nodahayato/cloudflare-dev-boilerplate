import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { Miniflare } from 'miniflare';
import { compileBetterAuthSql } from '../src/auth-migrations';

const outPath = resolve(process.cwd(), 'migrations/0001_better_auth.sql');
const mf = new Miniflare({
  modules: true,
  script: 'export default { async fetch() { return new Response("ok"); } }',
  d1Databases: ['AUTH_DB'],
});

try {
  const db = await mf.getD1Database('AUTH_DB');
  const sql = await compileBetterAuthSql({
    AUTH_DB: db,
    BETTER_AUTH_SECRET: 'dev-secret-dev-secret-dev-secret',
    BETTER_AUTH_URL: 'http://127.0.0.1:8787/api/auth',
  });

  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, sql, 'utf8');
  console.log(`Wrote ${outPath}`);
} finally {
  await mf.dispose();
}
