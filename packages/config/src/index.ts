import { z } from 'zod';

export const PublicEnvSchema = z.object({
  VITE_APP_NAME: z.string().min(1),
  VITE_API_BASE_URL: z.url(),
});

export type PublicEnv = z.infer<typeof PublicEnvSchema>;

export function parsePublicEnv(input: Record<string, unknown>): PublicEnv {
  return PublicEnvSchema.parse(input);
}
