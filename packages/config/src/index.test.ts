import { describe, expect, it } from 'vitest';
import { parsePublicEnv } from './index';

describe('config env parser', () => {
  it('returns validated public env', () => {
    expect(
      parsePublicEnv({
        VITE_APP_NAME: 'starter',
        VITE_API_BASE_URL: 'https://api.example.com',
      }),
    ).toEqual({
      VITE_APP_NAME: 'starter',
      VITE_API_BASE_URL: 'https://api.example.com',
    });
  });

  it('rejects invalid API urls', () => {
    expect(() =>
      parsePublicEnv({
        VITE_APP_NAME: 'starter',
        VITE_API_BASE_URL: 'not-a-url',
      }),
    ).toThrow(/invalid url/i);
  });
});
