import { betterAuth } from 'better-auth';
import type { D1Database } from '@cloudflare/workers-types';

export interface AuthEnv {
  AUTH_DB: D1Database;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL?: string;
  CORS_ORIGIN?: string;
  PUBLIC_APP_URL?: string;
}

const DEFAULT_AUTH_BASE_URL = 'http://127.0.0.1:8787/api/auth';
const DEFAULT_WEB_ORIGINS = ['http://127.0.0.1:5173', 'http://localhost:5173'];

function normalizeOrigin(value: string): string {
  return value.trim().replace(/\/+$/, '');
}

function collectTrustedOrigins(env: AuthEnv): string[] {
  const dynamicOrigins = [env.CORS_ORIGIN, env.PUBLIC_APP_URL]
    .filter((value): value is string => Boolean(value?.trim()))
    .flatMap((value) => value.split(','))
    .map(normalizeOrigin)
    .filter(Boolean);

  return Array.from(new Set([...DEFAULT_WEB_ORIGINS, ...dynamicOrigins]));
}

export function createAuth(env: AuthEnv) {
  return betterAuth({
    database: env.AUTH_DB,
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL ?? DEFAULT_AUTH_BASE_URL,
    trustedOrigins: collectTrustedOrigins(env),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
  });
}
