import { getMigrations } from 'better-auth/db/migration';
import { createAuth, type AuthEnv } from './auth';

export async function compileBetterAuthSql(env: AuthEnv) {
  const auth = createAuth(env);
  const migrations = await getMigrations(auth.options);

  return migrations.compileMigrations();
}
