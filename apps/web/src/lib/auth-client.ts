import { createAuthClient } from 'better-auth/react';

const baseURL =
  import.meta.env.VITE_AUTH_BASE_URL ?? 'http://127.0.0.1:8787/api/auth';

export const authClient: ReturnType<typeof createAuthClient> = createAuthClient({
  baseURL,
});
