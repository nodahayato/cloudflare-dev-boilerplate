import { describe, expect, it } from 'vitest';
import { ExampleMessageSchema, parseExampleMessage } from './index';

describe('shared schema', () => {
  it('parses a valid example message', () => {
    expect(parseExampleMessage({ message: 'welcome to the starter' })).toEqual({
      message: 'welcome to the starter',
    });
  });

  it('rejects empty messages', () => {
    expect(() => ExampleMessageSchema.parse({ message: '' })).toThrow(/at least 1 character/i);
  });
});
