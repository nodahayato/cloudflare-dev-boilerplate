import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { ExampleMessageSchema, parseExampleMessage } from '@starter/shared';
import { createAuth, type AuthEnv } from './auth';

type AppEnv = {
  Bindings: AuthEnv;
};

const app = new Hono<AppEnv>();

app.get('/api/health', (c) => {
  return c.json({ ok: true, service: 'starter-api' });
});

app.post('/api/examples', zValidator('json', ExampleMessageSchema), (c) => {
  const payload = parseExampleMessage(c.req.valid('json'));
  return c.json(payload);
});

app.on(['GET', 'POST'], '/api/auth/*', async (c) => {
  const auth = createAuth(c.env);
  return auth.handler(c.req.raw);
});

export default app;
