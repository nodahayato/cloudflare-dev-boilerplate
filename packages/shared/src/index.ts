import { z } from 'zod';

export const ExampleMessageSchema = z.object({
  message: z.string().min(1, 'Message must contain at least 1 character'),
});

export type ExampleMessage = z.infer<typeof ExampleMessageSchema>;

export function parseExampleMessage(input: unknown): ExampleMessage {
  return ExampleMessageSchema.parse(input);
}
